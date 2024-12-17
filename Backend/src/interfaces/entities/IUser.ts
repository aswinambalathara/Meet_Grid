import { Document } from "mongoose";

export default interface IUser extends Document{
    readonly createdAt?:Date;
    readonly updatedAt?:Date;
    readonly email:string
    fullName:string;
    password:string;
    phone?:string;
    image?:string;
    bio?:string;
    gender?: 'Male' | 'Female' | 'Others';
    professionalInfo?:{
        companyName?: string;
        jobTitle?: string;
        linkedinUrl?: string;
        skills?: string[];
    };
    verificationToken?:{
        token:string,
        expiry:Date
    };
    otp?:{
        otp:number,
        expiry:Date
    };
    eventsHosted?:string[];
    eventsAttending?:string[];
    eventsAttended?:string[];
    location?:{
        addressLine:string;
        city:string;
        country:string;
        state:string;
        postalCode:string;
    };
    isDeactivated?:boolean;
    isBlocked?:boolean;
    isVerified?:boolean;
}