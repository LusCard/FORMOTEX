import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    user_id: number;
    role: "admin" | "user";
    email: string;
  };
}

export interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}

export interface LoginBody {
  email: string;
  password: string;
}
