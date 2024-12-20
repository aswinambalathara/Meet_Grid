export default interface IUser{
    readonly _id?:string
    email:string,
    fullName?:string;
    password:string;
    phone?:string;
    image?:string;
    bio?:string;
    gender?: "Male" | "Female" | "Others"
    professionalInfo?:{
        companyName?: string;
        jobTitle?: string;
        linkedinUrl?: string;
        skills?: string[];
    },
    location?:{
        addressLine:string;
        city:string;
        country:string;
        state:string;
        postalCode:string
    },
    isBlocked?:boolean,
    isDeactivated?:boolean
}

export interface IUserError {
    email?:string | null
    fullName?:string | null
    password?:string | null
    confirmPassword?:string | null
}