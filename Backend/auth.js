


import bcrypt from 'bcryptjs';
import env from "dotenv";
import jwt from 'jsonwebtoken';
import { db } from "./db.js";

env.config();



export async function login(req,res) {// username means username OR email ?OR phone number?

   const username = req.body.username 
   const password = req.body.password 


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
      {  return res.sendStatus(402) }//user doesn't exist
  if(targetUserDocument)
      {
          const user = targetUserDocument
          const correctPassword = await helperFuncVerifyPassword(user,password)
          if(!correctPassword)
              {return res.sendStatus(401)}//wrong password
          
          const token = generateJWTToken(user);
           res.json({ token ,user_id:user._id})

      }
    }catch(err){ console.log(err);res.status(500).json({err}); }

  }

async function helperFuncVerifyPassword(user,password){
   return await bcrypt.compare(password, user.password);
}
function generateJWTToken(user) {
  const payload = {
    _id: user._id, 
  };
  const token = jwt.sign(payload, process.env.SECRETWORD, { expiresIn: '168h' }); // Set expiration time
  return token;
}


export async function checkAuth(req,res,next){


  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null){ 
  if(req.path == '/temp'||req.path == '/login' || req.path == '/pending_users' || req.path == '/users' || req.path == '/' || req.path.startsWith('/posts') || req.path.startsWith('/users') || req.path == '/suggested-posts'){
    return next() // skip authentication
  } 
  return res.sendStatus(401);}    // Unauthorized
  jwt.verify(token, process.env.SECRETWORD, (err, user) => {
    if (err){
      console.log(err)
      if(req.path == '/temp'||req.path == '/login' || req.path == '/pending_users' || req.path == '/users' || req.path == '/' || req.path.startsWith('/posts') || req.path.startsWith('/users') || req.path == '/suggested-posts'){
        return next() // skip authentication
      } 
      else{
        return res.status(403).json({user_id:-1}); // Forbidden
      }
     
    } 
    req.user = user;  // this will make using req.user._id possible
    next();

  });
  
}







