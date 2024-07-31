import passport from "passport";
import LocalStrategy from "passport-local";

import bcrypt from 'bcryptjs';
import env from "dotenv";
import db from "./db.js";


env.config();



export async function verifyCallback(req,username, password, done) {// username means username OR email ?OR phone number?

   username = req.body.username 
   password = req.body.password 
   //

  //
    try{
    const Users = db.collection("Users")
    const filter = {
      $or: [
        { username: username },
        { email: username}, 
      ],
    };
    const targetUserDocument = await Users.findOne(filter)

    if(!targetUserDocument)
      { return done(null, false); }//user doesn't exist
  if(targetUserDocument)
      {
          const user = targetUserDocument
          const correctPassword = await helperFuncVerifyPassword(user,password)
          if(!correctPassword)
              {return done(null, false);}//wrong password
               return done(null, user);// successful login
      }
    }catch(err){ return done(err); }

  }

async function helperFuncVerifyPassword(user,password){
   return await bcrypt.compare(password, user.password);
}

const strategy = new LocalStrategy({ passReqToCallback: true } ,verifyCallback)


passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null,  user );
});

export default passport