import type { NextFunction, Request, Response } from "express";
import echoService from "../services/echo.service";

class EchoController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      await echoService.register(req);

      res.status(201).send({
        title: "Congratulations! Your Account has been successfully created.",
        description: "Please check your email inbox for further access.",
      });
    } catch (error) {
      next(error);
    }
  }

  async registerValidation(req: Request, res: Response, next: NextFunction) {
    try {
      await echoService.registerValidation(req);
      res.status(200).send({
        title: "You're verify",
        description: "You're good to go",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token, refresh_token } = await echoService.login(req);
      res.send({
        title: "Login Successful",
        description:
          "Welcome back! You have successfully logged in to your account.",
        access_token,
        refresh_token,
      });
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token, is_verified } = await echoService.keepLogin(req);
      res.send({
        title: "Login Successful",
        description:
          "Welcome back! You have successfully logged in to your account.",
        access_token,
        is_verified,
      });
    } catch (error) {
      next(error);
    }
  }

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token = await echoService.editUser(req);
      res.send({
        title: "Successfully edit your profile",
        description: "",
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  async validationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = await echoService.validationEmail(req);
      res.send({
        title: "Password Reset Email Sent Successfully.",
        description:
          "We've successfully sent an email to your registered email address for password reset. Please check your inbox and follow the instructions to reset your password. If you don't receive the email within a few minutes, please check your spam folder or try again later.",
        forget_password_token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  async getForgetUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await echoService.getForgetUser(req);
      res.send({ ...data });
    } catch (error) {
      next(error);
    }
  }

  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await echoService.forgetPassword(req);
      res.send({
        title: "Your password has been changed",
        description: "successfully changing password, please login now.",
      });
    } catch (error) {
      next(error);
    }
  }

  /* async getAvatarById(req: Request, res: Response, next: NextFunction) {
        try {
            const avatar = await echoService.getAvatarById(req)
            res.set('Content-type', 'image/png')
            res.send(avatar)
        } catch (error) {
            console.log('test')
            next(error)
        }
    } */

  /* async editPassword(req: Request, res: Response, next: NextFunction) {
        try {
            await echoService.editPassword(req)
            res.send({
                title: 'Your password has been changed',
                description: 'successfully changing password',
            })
        } catch (error) {
            next(error)
        }
    } */
}

export default new EchoController();
