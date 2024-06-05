import type { $Enums } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export type UserType = {
  id: string;
  imageId: string | null;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  birth: Date | null;
  gender: $Enums.Gender;
  address: string | null;
  referral: string;
  referrance: string | null;
  point: number;
  phoneNumber: string | null;
  expPoint: Date | null;
  isVerified?: boolean;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  image: { name: string | null } | null;
  Promotor: {
    id: string;
    promotorName: string;
    promotorDescription: string | null;
    promotorImage: { name: string | null } | null;
    balance: Decimal;
  } | null;
} | null;
