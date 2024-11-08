export default interface IUser{
    readonly _id?:string;
    readonly createdAt?:string;
    readonly updatedAt?:string;
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