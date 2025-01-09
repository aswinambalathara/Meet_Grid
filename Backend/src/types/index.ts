import { Request } from "express";



export enum StatusCode {
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentError = 402,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

export enum Cookie {
  Admin = "adminToken",
  User = "userToken",
}

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  status: boolean;
  message: string;
};

export type response = {
  status: boolean;
  message: string;
};

export type payloadResponse = {
  status: boolean;
  message: string;
  data: object;
};

export interface CustomRequest extends Request {
  user?: {
    email: string;
    id: string;
    name?: string;
    image?: string;
  };
  admin?: {
    email: string;
    id: string;
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      email: string;
      id: string;
      image?: string;
      fullName?: string;
    }
    interface Request {
      NormalUser?: User & { email: string; id: string };
      admin?: { email: string; id: string };
    }
  }
}

export type EventFilter =  {
  categoryGroup: "Professional" | "General";
  coordinates?: {latitude: string; longitude: string};
  maxDistance?:number
  category?:string
  search?:string,
  eventType?:"Online" | "In-Person",
};

export type professionalInfoProps = {
  companyName: string;
  jobTitle: string;
  linkedinUrl: string;
  skills: string[];
};




export {};
