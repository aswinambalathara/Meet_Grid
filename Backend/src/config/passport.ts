
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET } from "./env";

 const googleStrategy = new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID!,
    clientSecret:GOOGLE_CLIENT_SECRET!,
    callbackURL:'http://localhost:4000/api/user/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    const {displayName,id,emails,photos} = profile
    const email = emails?.[0].value || ''
    const photo = photos?.[0].value

    const user:Express.User = {id,name:displayName,email,photo}
    return done(null,user)
})


// passport.serializeUser((user:Express.User,done)=>{
//     done(null,user.id);
// })

// passport.deserializeUser((id:string,done)=>{
//     done(null,{id})
// })
export default googleStrategy