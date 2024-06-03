import { VenueType } from "@prisma/client";

export type TEvent = {
  id: string;
  title: string;
  location: string;
  city: string;

  venue_type: VenueType;
  scheduled_at: Date;
  start_time: Date;
  end_time: Date;

  discount_amount: number | null;
  ticket_price?: number | undefined;
  ticket_amount: number | undefined;
  discountCalculation?: number | null;

  assigned_pic?: string | null;
  pic_phone_no?: string | null;

  user_id?: string;

  created_at?: Date;
  updated_at?: Date;
};

export type TEventDetails = {
  title: string;
  location: string;
  city: string;
  venue_type: VenueType;
  details: string;
  scheduled_at: Date;
  start_time: Date;
  end_time: Date;
  ticket_amount: number;
};

export type FilterType = "venue_type" | "status" | "city";
export type OrderType = "city" | "title" | "ticket_amount" | "scheduled_at";
export type Order = "asc" | "desc";
