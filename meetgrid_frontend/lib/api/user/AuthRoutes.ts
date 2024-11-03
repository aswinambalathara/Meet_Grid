import axios from 'axios';
import IUser from '@/interfaces/IUser';
import apiURLs from '@/config/apiConfig';
const {BASE_URL} = apiURLs

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    headers : {
        'Content-Type':"application/json"
    },
    withCredentials:true
})

export const signUpUser = async (user: IUser) => {
    const response = await axiosInstance.post('/register', user);
        return response.data;
};


export const loginUser = async (email:string,password:string)=>{
    const response = await axiosInstance.post('/login',{email,password});
    return response.data;
}

export const loginOTPEmail = async (email:string) =>{
    const response = await axiosInstance.post('/login_OTP/email',{email});
    return response.data;
}

export const loginWithOTP = async (otp:string)=>{
    const response = await axiosInstance.post('/login_OTP/email',{otp});
    return response.data;
}

export const forgotPassword = async (email:string)=>{
    const response = await axiosInstance.post('/forgot_password',{email});
    return response.data;
}