import { Prisma } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";

import { prisma } from "../../libs/prisma";
import { nanoid, generateReferral } from "../../utils/generate";
import { comparePassword, hashPassword } from "../../utils/hashPassword";
import {
  BASE_URL,
  NODEMAILER_USER,
  SECRET_KEY_ACCESS,
  SECRET_KEY_FORGET_PASSWORD,
  SECRET_KEY_FORGET_PASSWORD_ACCESS,
  SECRET_KEY_REFRESH,
} from "../../configs/env";
import {
  transpoter,
  verifyEmailPath,
  verifyForgetEmailPath,
} from "../../helpers/nodemailer";

import type { User } from "@prisma/client";
import type { Request } from "express";
import type { UserType } from "../../models/user.model";
import { emailTemplate } from "../../templates/email-template";
import { createToken } from "../../libs/jwt";
import { add } from "date-fns";
import sharp from "sharp";

class EchosService {
  async register(req: Request) {
    const {
      username,
      email,
      referrance,
      firstname,
      lastname,
      password,
      gender,
    } = req.body as User;

    const { file } = req;

    return await prisma.$transaction(
      async () => {
        const checkUser = await prisma.user.findFirst({
          where: { OR: [{ email }, { username }] },
          select: { id: true },
        });
        if (checkUser?.id)
          throw new Error("Username or Email is already exist", {
            cause:
              "The provided username or email address is already associated with an existing account in the system.",
          });
        if (referrance) {
          const checkReferral = await prisma.user.findFirst({
            where: {
              referral: referrance,
            },
            select: {
              id: true,
              point: true,
              expPoint: true,
            },
          });
          if (!checkReferral)
            throw new Error(
              "Invalid referral code. Please check and try again. ",
              {
                cause:
                  "The referral code provided does not match the expected format or is incorrect.",
              }
            );
          const newExpDate = add(new Date(), { months: 3 });
          await prisma.user.update({
            where: { id: checkReferral.id },
            data: {
              point:
                checkReferral.expPoint! > new Date()
                  ? checkReferral.point + 10000
                  : 10000,
              expPoint: newExpDate,
            },
          });
        }
        const hashPass = await hashPassword(password);
        const referral = generateReferral(1).toUpperCase();
        const data: Prisma.UserCreateInput = {
          id: nanoid(),
          firstname,
          lastname,
          username,
          email,
          referrance: !referrance ? null : referrance,
          referral,
          password: hashPass,
          gender,
        };

        const token = sign({ id: data.id }, SECRET_KEY_ACCESS, {
          expiresIn: "15m",
        });
        const path = verifyEmailPath;
        const baseUrl = BASE_URL;
        const { html } = emailTemplate({
          firstname,
          ...(lastname ? { lastname } : { lastname: "" }),
          token,
          baseUrl,
          path,
        });

        await prisma.user.create({ data });
        if (file) {
          const blob = await sharp(file.buffer).webp().toBuffer();
          const name = (file.fieldname + nanoid(15))
            .toLocaleLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
          const image: Prisma.ImageCreateInput = {
            id: nanoid(),
            blob,
            name,
          };
          await prisma.image.create({ data: image });
          await prisma.user.update({
            where: { id: data.id },
            data: { imageId: image.id },
          });
        }
        await transpoter.sendMail({
          from: NODEMAILER_USER,
          to: data.email,
          subject: "Welcome to Synesthesia",
          html,
        });
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  }

  async registerValidation(req: Request) {
    const { token } = req.params;
    const value = verify(token, SECRET_KEY_ACCESS) as { id: string };
    await prisma.$transaction(
      async () => {
        const chechReferral = await prisma.user.findFirst({
          where: { id: value.id },
          select: { referrance: true },
        });

        if (chechReferral?.referrance) {
          await prisma.voucher.create({
            data: {
              id: nanoid(),
              userId: value.id,
              from_userId: chechReferral.referrance,
            },
          });
        }
        await prisma.user.update({
          where: { id: value.id },
          data: { isVerified: true },
        });
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  }

  async login(req: Request) {
    const { username_email, password } = req.body;
    const select: Prisma.UserSelect = {
      id: true,
      imageId: true,
      firstname: true,
      lastname: true,
      username: true,
      email: true,
      password: true,
      birth: true,
      gender: true,
      address: true,
      referral: true,
      referrance: true,
      point: true,
      phoneNumber: true,
      expPoint: true,
      isVerified: true,
      isDelete: true,
      createdAt: true,
      updatedAt: true,
      image: { select: { name: true } },
      Promotor: {
        select: {
          id: true,
          promotorName: true,
          promotorDescription: true,
          promotorImage: { select: { name: true } },
          balance: true,
        },
      },
    };
    const data = (await prisma.user.findFirst({
      where: {
        OR: [{ username: username_email }, { email: username_email }],
      },
      select,
    })) as UserType;

    if (!data?.password) throw new Error("Wrong Username or Email");
    const checkUser = await comparePassword(data.password, password);
    const date = new Date(data.createdAt!);
    const now = new Date();
    const time = now.getTime() - date.getTime();
    const tolerance = 1 * 60 * 1000;
    if (!checkUser) throw new Error("Wrong password");
    if (!data.isVerified) {
      if (time > tolerance) {
        const token = sign({ id: data.id }, SECRET_KEY_ACCESS, {
          expiresIn: "15m",
        });
        const baseUrl = BASE_URL;
        const { html } = emailTemplate({
          firstname: data.firstname,
          lastname: data.lastname,
          token,
          baseUrl,
          path: verifyForgetEmailPath,
        });

        await transpoter.sendMail({
          from: NODEMAILER_USER,
          to: data.email,
          subject: "Welcome to Synesthesia",
          html,
        });
      }
      throw new Error("Need verify your account", {
        cause: "Sorry, you need to check your email or try it again",
      });
    }

    delete data.isVerified;
    delete data.isDelete;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.password;
    const access_token = createToken(data, SECRET_KEY_ACCESS, "15m");
    const refresh_token = createToken(
      { id: data.id },
      SECRET_KEY_REFRESH,
      "20hr"
    );

    return { access_token, refresh_token };
  }

  async keepLogin(req: Request) {
    const select: Prisma.UserSelect = {
      id: true,
      imageId: true,
      firstname: true,
      lastname: true,
      username: true,
      email: true,
      birth: true,
      gender: true,
      address: true,
      referral: true,
      referrance: true,
      point: true,
      phoneNumber: true,
      expPoint: true,
      image: {
        select: {
          name: true,
        },
      },
      Promotor: {
        select: {
          id: true,
          promotorName: true,
          promotorDescription: true,
          promotorImage: { select: { name: true } },
          balance: true,
        },
      },
    };

    return await prisma.$transaction(async () => {
      const user = await prisma.user.findUnique({
        select,
        where: {
          id: req.user?.id,
        },
      });

      if (!user?.id) throw new Error("Need to login");
      const checkDate = user?.expPoint;
      const nowDate = new Date();
      if (checkDate === nowDate)
        await prisma.user.update({
          where: { id: user.id },
          data: { point: 0 },
        });

      const access_token = createToken(user, SECRET_KEY_ACCESS, "1hr");
      return { access_token, is_verified: user.isVerified };
    });
  }

  async editUser(req: Request) {
    const params = req.params.username;
    const {
      firstname,
      lastname,
      username,
      email,
      // password,
      // birth,
      address,
      phoneNumber,
    } = req.body as User;
    const { file } = req; // avatar: imageId
    return await prisma.$transaction(
      async (prisma) => {
        const data: Prisma.UserUpdateInput = {
          ...(firstname && { firstname: firstname }),
          ...(lastname && { lastname: lastname }),
          ...(username && { username: username }),
          ...(email && { email: email }),
          // ...(password && { password: await hashPassword(password) }),
          // ...(birth && { birth: birth }),
          ...(address && { address: address }),
          ...(phoneNumber && { phoneNumber: phoneNumber }),
        };

        if (file) {
          const blob = await sharp(file.buffer).webp().toBuffer();
          const name = (file.fieldname + nanoid(15))
            .toLocaleLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
          const image: Prisma.ImageCreateInput = {
            id: nanoid(),
            blob,
            name,
          };

          if (req.user?.imageId) {
            await prisma.image.update({
              data: { blob, name },
              where: { id: req.user?.imageId! },
            });
          } else {
            await prisma.image.create({
              data: { ...image },
            });
            await prisma.user.update({
              where: { id: req.user?.id },
              data: { imageId: image.id },
            });
          }

          const user = await prisma.user.update({
            data,
            where: { username: params, id: req.user?.id },
          });

          const access_token = sign({ ...user }, SECRET_KEY_ACCESS, {
            expiresIn: "15m",
          });

          return access_token;
        }
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  }

  async validationEmail(req: Request) {
    const { email } = req.body;
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        username: true,
      },
    });

    if (!user)
      throw new Error("Invalid email.", {
        cause: "Cannot find your account, please check your email.",
      });

    const token = sign({ id: user.id }, SECRET_KEY_FORGET_PASSWORD, {
      expiresIn: "15m",
    });

    const token_access = sign(
      { username: user.username },
      SECRET_KEY_FORGET_PASSWORD_ACCESS,
      {
        expiresIn: "15m",
      }
    );

    const { html } = emailTemplate({
      baseUrl: BASE_URL,
      firstname: user.firstname,
      lastname: user.lastname!,
      token: token_access,
      path: verifyForgetEmailPath,
    });

    await transpoter.sendMail({
      from: NODEMAILER_USER,
      to: user.email,
      subject: "Synesthesia - Forget password",
      html,
    });

    return { token }; // { id: string }
  }

  async forgetPassword(req: Request) {
    const { token } = req.params;
    const { password } = req.body;
    const username = req.user?.username;
    const { id } = verify(token, SECRET_KEY_FORGET_PASSWORD) as {
      id: string;
    };
    await prisma.$transaction(
      async () => {
        const newPassword = await hashPassword(password);
        await prisma.user.update({
          where: { id, username },
          data: { password: newPassword },
        });
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    );
  }

  async getForgetUser(req: Request) {
    const { username } = req.params;
    return await prisma.user.findFirst({
      where: { username },
      select: { username: true, id: true },
    });
  }
}

export default new EchosService();
