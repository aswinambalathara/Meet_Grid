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
  status:boolean,
  message:string,
  data:object
}

export interface CustomRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
  admin?: {
    email: string;
    id: string;
  };
}


export type EventFilter = {
  category: string;
  coordinates?: string[];
  [key: string]: string | string[] | undefined;
}

export type professionalInfoProps = {
  companyName: string;
    jobTitle: string;
    linkedinUrl: string;
    skills: string[];
}