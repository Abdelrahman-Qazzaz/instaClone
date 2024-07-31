import env from "dotenv";
import admin from "firebase-admin";
import fs from 'fs';
import { ObjectId } from "mongodb";

import mime from 'mime';



import db from "./db.js";
import { upload } from "./server.js";



env.config()
const serviceAccount = JSON.parse(fs.readFileSync(process.env.SERVICEACCOUNT, 'utf8'))



const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGEBUCKET

  });

  const bucket = admin.storage().bucket();
  const storage = admin.storage

export async function uploadImage(req, res) {

  if(req.route.path == '/users/:user_id/story'){
    if(req.user._id == req.params.user_id)
        {try {

          upload.single('file')(req, res, async (err) => {
            if (err) {
              console.error("Error handling file upload:", err);
              return res.status(500).send({ message: 'Error uploading file' });
            }
      

            const uploadedFile = req.file;
            const fileName = uploadedFile.filename;
            const filePath = uploadedFile.path;

            const url = await uploadFileToFirebase(fileName, filePath,req.user._id,req.route.path,req.body,true);
            const Users = db.collection("Users")
            const filter = {_id: ObjectId.createFromHexString(req.user._id)}
            const { text, textColor,textPositionX, textPositionY,duration } = req.body
            const targetUser = await Users.findOne(filter)
            const prevSlides = targetUser.story && targetUser.story.slides ?  targetUser.story.slides : []
            const update = {$set:{story:{slides:[...prevSlides,{id: Date.now() + '',firebasePathURL:url,type:uploadedFile.mimetype.startsWith('video') ? 'video' : 'image', text,textPosition:{textPositionX,textPositionY},duration,textColor}]}}}
            await Users.updateOne(filter,update)
            return res.sendStatus(200)
          });
        } catch (err) {
          console.error("Error uploading file:", err);
          return res.status(500).send({ message: 'Error file image' });
        }}
        else{
          res.sendStatus(401)
        }
  }
else
{    try {
      // Use Multer to handle multipart form data
      upload.single('image')(req, res, async (err) => {
        if (err) {
          console.error("Error handling image upload:", err);
          return res.status(500).send({ message: 'Error uploading image' });
        }
  
        // Extract uploaded file details from Multer
        const uploadedFile = req.file;
        const fileName = uploadedFile.filename;
        const filePath = uploadedFile.path;
  
        // Upload the image to Firebase Storage
        await uploadFileToFirebase(fileName, filePath,req.user._id,req.route.path,req.body);

        return res.sendStatus(200)
      });
    } catch (err) {
      console.error("Error uploading image:", err);
      return res.status(500).send({ message: 'Error uploading image' });
    }
  }}


  export async function uploadImagesAndVids(req,res){
    try {
      // Use Multer to handle multipart form data
      upload.array('files')(req, res, async (err) => {
        if (err) {
          console.error("Error handling file(s) upload:", err);
          return res.status(500).send({ message: 'Error uploading file(s)' });
        }
  


        const uploadedFiles = req.files;
        const urls = [] //firebase urls
        

        for(const uploadedFile of uploadedFiles)
        {
          const fileName = uploadedFile.filename;
          const filePath = uploadedFile.path;
          const fileUrl = await uploadFileToFirebase(fileName, filePath,req.user._id,req.route.path,req.body,true);
          const type = uploadedFile.mimetype.startsWith('video') ? 'video' : 'image';
          urls.push({fileUrl,type})
        }

        const { text } = req.body 
        if(req.route.path == '/chats/:chat_id/messages'){
          const Chats = db.collection("Chats")
          const filter = {_id: ObjectId.createFromHexString(req.params.chat_id)}
          const update = {$push:{messages: {sender_id: req.user._id, firebasePathURLs:urls, text }}}
          await Chats.updateOne(filter,update)
          res.status(200).json({newMessage:{sender_id: req.user._id, firebasePathURLs:urls, text }})
        }
        else if(req.route.path == '/users/:user_id/posts'){
          const Posts = db.collection("Posts")
          const Users = db.collection("Users")
          let filter = {_id: ObjectId.createFromHexString(req.params.user_id)}
          const owner = await Users.findOne(filter)
   
          const { insertedId } = await Posts.insertOne({owner,firebasePathURLs:urls, caption: text, creationDate: Date.now()})
          let update = {$push:{posts_ids: insertedId}}
          await Users.updateOne(filter,update)
          res.status(201).json({posts_ids:[...owner.posts_ids,insertedId] ,newPost:{owner,firebasePathURLs:urls, caption: text, creationDate: Date.now(),comments:[]}})

        }


      });
    } catch (err) {
      console.error("Error uploading image:", err);
      return res.status(500).send({ message: 'Error uploading image' });
    }
    
  }
  
async function uploadFileToFirebase(fileName, filePath, reqUser_id,reqRoutePath,reqBody, returnUrl = false) {
  const contentType = mime.getType(filePath)

    try {
      const [ file ] = await bucket.upload(filePath, {
        destination: fileName, 
        metadata: {
          contentType: contentType,
        },
      });
  
      const url = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2025',
      });

      if(returnUrl)
        {return url[0]}
  


      const Users = db.collection("Users");
      const filter = { _id: ObjectId.createFromHexString(reqUser_id) };
      let update;
  
      if(reqRoutePath == '/me/setProfilePicture'){
      update = { $set: { pfpFirebasePathURL: url[0] } };
      Users.updateOne(filter,update)
      }
      else if(reqRoutePath == '/users/:user_id/posts'){
      const Posts = db.collection("Posts");
      const caption = reqBody.caption ? reqBody.caption : '';

      const Users = db.collection("Users")
      const owner = await Users.findOne({_id: ObjectId.createFromHexString(reqUser_id)})
      const result = await Posts.insertOne({owner, firebasePathURL: url[0],caption:caption,creationDate: Date.now()})


      update = {$push:{posts_ids: result.insertedId}}
      Users.updateOne(filter,update)
      }



  




    } catch (error) {
      console.error('Error uploading file:', error);
      return null; 
    }
  }
  
  
  

