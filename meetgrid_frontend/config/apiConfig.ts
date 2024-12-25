
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY

 const apiURLs = {
    BASE_URL:BASE_URL,
    USER_URL:`${BASE_URL}/api/user`,
    ADMIN_URL:`${BASE_URL}/api/admin`
}

export default apiURLs