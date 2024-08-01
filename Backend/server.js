import bodyParser from "body-parser";
import cors from 'cors';
import express from "express";
import session from "express-session";

// import pg from "pg"
import bcrypt from 'bcryptjs';
import env from "dotenv";
import http from 'http';
import { ObjectId } from 'mongodb';
import multer from "multer";
import { Server } from 'socket.io';
import validator from "validator";
import db, { getUserData } from "./db.js";
import passport from "./passport.js";
import { uploadImage, uploadImagesAndVids } from "./upload.js";









env.config();

export const upload = multer({ dest: 'uploads/' });  // Configure temporary storage directory

const app = express()
const server = http.createServer(app);
const io = new Server(server);
const port = 4000

app.use(cors(
  {
  origin: 'https://instaclone0.netlify.app',
  credentials: true
}));

app.use(
    session({
      secret: process.env.SECRETWORD,
      resave: false,
      saveUninitialized: true,
      cookie: { httpOnly: true }
    })
  );

app.use(bodyParser.json({ limit: '70mb' })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(passport.initialize());
app.use(passport.session()); // Use if using sessions
//
// app.use(checkAdmin) // for postman
// async function checkAdmin(req,res,next){
//   if(req.headers.adminkey === process.env.ADMINKEY){ // pass the adminkey as header for every request you make in postman
//     const Users = db.collection("Users")
//     // const filter = {_id: ObjectId.createFromHexString('6697605adaa9c129a51aae79')}
//     req.user = await Users.findOne(filter)
//     req.user._id = req.user._id + ''
//   }
//   next()
// }
app.use(checkAuth)
async function checkAuth(req,res,next){
  if(req.isAuthenticated()){  // either authenticated cuz user is logged in, or cuz req.user was set up from the checkAdmin
    next()
  }
  else{

    if(req.path == '/temp'||req.path == '/login' || req.path == '/pending_users' || req.path == '/users' || req.path == '/' || req.path.startsWith('/posts') || req.path.startsWith('/users') || req.path == '/suggested-posts')
      {next()} // skip authentication
    else{res.sendStatus(401)}
  }
}
//
app.get('/temp',async(req,res)=>{


})



app.post('/login', passport.authenticate('local', {
    failureRedirect: '/', // Redirect on failed login
  }), (req, res) => {
    res.redirect('/'); 
  });

app.get('/logout',(req,res)=>{
  req.logout((err) => { 
    if (err) { res.sendStatus(500) }
    res.sendStatus(200)
  });
})





const saltRounds = 10; 
async function hash(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash
  } catch (error) {console.log(error);}
}


 app.post('/me/setProfilePicture',uploadImage)
 app.post('/users/:user_id/posts',uploadImagesAndVids)
 app.post('/chats/:chat_id/messages',uploadImagesAndVids)
 app.patch('/users/:user_id/story',uploadImage)
 

 app.get('/users/:username/story',async(req,res)=>{
  const Users = db.collection("Users")
  const filter = {username: req.params?.username}
  const { story } = await Users.findOne(filter)
  res.json({story})
 })

 app.patch('/users/:username/story/slides/:slideID',async(req,res)=>{

  try {
    const Users = db.collection("Users")
    const filter = {username: req?.params?.username}
    const targetUser = await Users.findOne(filter)
    const targetUserStory =targetUser?.story
    const filteredSlides = targetUserStory?.slides?.filter((slide)=> slide.id != req.params.slideID )
    const targetSlide = targetUserStory?.slides?.find((slide)=> slide.id == req.params?.slideID )
    if(!(targetSlide?.views))
      {targetSlide.views = []}
    targetSlide.views.push({user_id: ObjectId.createFromHexString(req.user._id)})
    const newSlides = [...filteredSlides,targetSlide]
    const update = {$set:{story: {slides:newSlides}}}
    await Users.updateOne(filter,update)
    const { story } = await Users.findOne(filter)
    res.status(200).json({story})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

 }) 

 app.delete('/me/setProfilePicture',async(req,res)=>{
    const user_id = req.user._id 
    const Users = db.collection("Users")
    const filter = {_id: ObjectId.createFromHexString(user_id)} 
    const update = { $unset: { "pfpFirebasePathURL": 1 } }
    try {
      await Users.updateOne(filter,update)
      res.sendStatus(204)
    } catch (error) {
      res.sendStatus(500)
    }
 })




app.get('/',(req,res)=>{  // ? this as far as postman is concerned is useless... postman will never use this route ?
  if(req.isAuthenticated()){
      res.json({user_id:req.user._id})
  }
  else{
      res.json({user_id:-1})
  }
})

app.get('/users/:userID',async(req,res)=>{

  try {
    if(req.user && req.user._id == req.params.userID){// get user's own data  //chekcing for req.user because some axios requests are sent to this route without credintials.
      const userObjectId = ObjectId.createFromHexString(req.user._id)
      let user = await getUserData(userObjectId,true,true,true)
      user._id = req.user._id
      res.json({user})
    }
    else{// get some other user's data (for example for visiting their profile page)
  
        const targetUserObjectId = ObjectId.createFromHexString(req.params.userID)
        let targetUser = await getUserData(targetUserObjectId,false,true,false)
        targetUser.password = ''
        res.json({targetUser})
  
  
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

app.get('/posts/:post_id',async(req,res)=>{
  try {
    const Posts = db.collection("Posts")
    const post_id = req.params.post_id
    const post_ObjectId = ObjectId.createFromHexString(post_id)
    const filter = {_id:post_ObjectId}
    const targetPost = await Posts.findOne(filter)
    if(targetPost.comments){
      targetPost.comments.sort((a,b)=> b.creationDate - a.creationDate)
      for (const comment of targetPost.comments){
        if(comment.replies){
          comment.replies.sort((a,b)=> b.creationDate - a.creationDate)
        }
      }
    }


    res.status(200).json({targetPost})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
app.patch('/users/:userID/following',async(req,res)=>{
  if(req.user && req.user._id === req.params.userID){
    const { targetID } = req.body
    // console.log(targetID)
    try{
      // //await db.query('UPDATE users SET following_ids = array_append(following_ids, $1) WHERE id = $2',[targetID,req.user.id])
      const Users = db.collection("Users")
      let filter = { _id: ObjectId.createFromHexString(req.user._id) }; 
      let update = { $push: { following_ids: ObjectId.createFromHexString(targetID)} };
      await Users.updateOne(filter,update)

          filter = { _id: ObjectId.createFromHexString(targetID) };
          update = { $push: { followedBy_ids: ObjectId.createFromHexString(req.user._id)} };
      await Users.updateOne(filter,update)

      res.sendStatus(200)
    }
    catch(err){
      res.status(500).json({err:err})
    }
   
    
  }else{
    res.sendStatus(401)
  }
})

app.patch('/posts/:post_id/likes',async(req,res)=>{

  try {
    const userObjectID = ObjectId.createFromHexString(req.user._id)

    const Users = db.collection("Users")
    let filter = {_id: userObjectID}
    const user = await Users.findOne(filter)
  
    const Posts = db.collection("Posts")
    const postObjectID = ObjectId.createFromHexString(req.params.post_id)
          filter = {_id: postObjectID}
    const targetPost = await Posts.findOne(filter)
  
    if(!(targetPost.likes))
      {targetPost.likes = []}
    const otherLikesForThisPost = targetPost.likes.filter((like)=> like.byUser_id != req.user._id)
    const userLikedThisPost = targetPost.likes.find((like)=> like.byUser_id == req.user._id) ? true : false  //boolean
    let newLikes
    if(userLikedThisPost)
      {
        newLikes = [...otherLikesForThisPost]
      }
      else
      {
        newLikes = [...otherLikesForThisPost,{byUser_id:req.user._id}]
      }
      const update = {$set: {likes: newLikes}}
      await Posts.updateOne(filter,update)
      res.status(200).json({newLikesForPost:newLikes})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})

app.post('/posts/:post_id/comments',async(req,res)=>{

    try {
      const Users = db.collection("Users")
      const Posts = db.collection("Posts")
      const filter = {_id: ObjectId.createFromHexString(req.params.post_id)}
      const targetDocument = await Posts.findOne(filter)
      const numOfComments = targetDocument.comments ? targetDocument.comments.length : 0;
      const { comment } = req.body
      const owner = await Users.findOne({_id: ObjectId.createFromHexString(req.user._id)})
      const update = {$push:{comments: {id: numOfComments+'' ,content:comment,owner:owner,creationDate: Date.now(),replies:[]}}}
      const result = await Posts.updateOne(filter,update)

      res.status(201).json({newComment:{id: numOfComments+'' ,content:comment,owner:owner,creationDate: Date.now(),replies:[]}})
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  

})
app.post('/posts/:post_id/comments/:commentId/replies',async(req,res)=>{
    try {
    const { reply } = req.body
    const Posts = db.collection("Posts")
    const Users = db.collection("Users")
    const filter = {_id: ObjectId.createFromHexString(req.params.post_id)}
    const targetDocument = await Posts.findOne(filter)

    const filteredCommentsArray = targetDocument.comments.filter((comment)=> comment.id != req.params.commentId) // returns the comments to the post, excluding the comment which got replied to.
    const targetComment = targetDocument.comments.find((comment)=> comment.id == req.params.commentId) //find target comment.
    const owner = await Users.findOne({_id: ObjectId.createFromHexString(req.user._id)})
    targetComment.replies.push({id:targetComment.replies ? targetComment.replies.length+'' : '0', content:reply, owner,creationDate: Date.now()})
    const newComments = [...filteredCommentsArray,targetComment]
    const update = {$set:{comments: newComments}}
    await Posts.updateOne(filter,update)
    res.status(201).json({newComments})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})


app.patch('/posts/:post_id/comments/:commentID/likes',async(req,res)=>{
  const Posts = db.collection("Posts")
  const filter = {_id: ObjectId.createFromHexString(req.params.post_id)}
  const targetDocument = await Posts.findOne(filter)
  const targetComment = targetDocument.comments.find((comment)=> comment.id == req.params.commentID)
  const otherComments = targetDocument.comments.filter((comment)=> comment.id != req.params.commentID)


  if(!(targetComment.likes)){targetComment.likes = []}
  let userLikedComment = targetComment.likes.find((like)=>like.byUser_id == req.user._id)
  if(userLikedComment){
    const temp = targetComment.likes.filter((like)=> like.byUser_id != req.user._id)
    targetComment.likes = temp
  }
  else{
    targetComment.likes.push({byUser_id: req.user._id})
  }
  const newComments = [...otherComments,targetComment]
  const update = {$set:{comments: newComments}}
  await Posts.updateOne(filter,update)
  newComments.sort((a,b)=> b.creationDate - a.creationDate)
  res.status(200).json({newLikesForComment:newComments})
})
app.patch('/posts/:post_id/comments/:commentID/replies/:replyID/likes',async(req,res)=>{
  const Posts = db.collection("Posts")
  const filter = {_id: ObjectId.createFromHexString(req.params.post_id)}
  const targetDocument = await Posts.findOne(filter)
  const targetComment = targetDocument.comments.find((comment)=> comment.id == req.params.commentID)
  const otherComments = targetDocument.comments.filter((comment)=> comment.id != req.params.commentID)
  const targetReply = targetComment.replies.find((reply)=>reply.id == req.params.replyID)
  const otherReplies = targetComment.replies.filter((reply)=> reply.id != req.params.replyID)

  if(!(targetReply.likes)){targetReply.likes = []}
  let userLikedReply = targetReply.likes.find((like)=>like.byUser_id == req.user._id)
  let newReplies
  if(userLikedReply){
    const temp = targetReply.likes.filter((like)=> like.byUser_id != req.user._id)
    targetReply.likes = temp
  }
  else{
    targetReply.likes.push({byUser_id: req.user._id})
  }
  newReplies = [...otherReplies,targetReply]
  targetComment.replies = newReplies

  const newComments = [...otherComments,targetComment]
  const update = {$set:{comments: newComments}}
  await Posts.updateOne(filter,update)
  newComments.sort((a,b)=> b.creationDate - a.creationDate)
  res.status(200).json({newLikesForComment:newComments})
})


app.get('/users/:user_id/following',async(req,res)=>{
  if(req.params.user_id == req.user._id){
    const Users = db.collection("Users")
    const filter = {_id: ObjectId.createFromHexString(req.user._id)}
    const targetUser = await Users.findOne(filter)
    targetUser.following = []
    if(targetUser){
      for(const following_id of targetUser.following_ids){
        const following = await Users.findOne({_id: following_id})
        targetUser.following.push(following)
      }
      res.json({following: targetUser.following,following_ids: targetUser.following_ids})
    }
    else{
      res.sendStatus(500)
    }
  }else{
    res.sendStatus(401)
  }
})
app.delete('/users/:user_id/following/:targetUser_id',async(req,res)=>{
  if(req.user._id == req.params.user_id){
    try {
      const Users = db.collection("Users")
      let filter = {_id: ObjectId.createFromHexString(req.user._id)}
      let update = {$pull: {following_ids: ObjectId.createFromHexString(req.params.targetUser_id)}}
      await Users.updateOne(filter,update)
          filter = {_id: ObjectId.createFromHexString(req.params.targetUser_id)}
          update = {$pull: {followedBy_ids: ObjectId.createFromHexString(req.user._id)}}
      await Users.updateOne(filter,update)
      res.sendStatus(204)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }
  else{
    res.sendStatus(401)
  }
})


app.post('/users',async(req,res)=>{// make sure to not apply the check authentication middleware to this route


    const user = req.body
    const users = db.collection("Users");
    user.following_ids = []//array of strings
    user.followedBy_ids = []//array of strings
    user.posts_ids = []//array of strings
    user.chats_ids = []//array of strings
    user.savedPosts_ids = []
    user.password = await hash(req.body.password)
    await users.insertOne(user)
    res.sendStatus(201)

    


})




app.patch(`/users/:user_id/saved-posts`,async(req,res)=>{
  if(req.user._id == req.params.user_id){
    try {
      const  { targetPost_id } = req.body
      const Users = db.collection("Users")
      let filter = {_id: ObjectId.createFromHexString(req.user._id)}
      const targetUser = await Users.findOne(filter)
      if(!(targetUser.savedPosts_ids))
        {targetUser.savedPosts_ids = []}
      const userHasThisPostSaved = targetUser.savedPosts_ids.find((post_id)=> post_id + '' == targetPost_id) ? true : false

      let update;
      if(userHasThisPostSaved){
        filter = {_id: ObjectId.createFromHexString(targetPost_id)}
        update = {$pull: {savedPosts_ids: filter._id}}
      }
      else{
        update = {$push: {savedPosts_ids: ObjectId.createFromHexString(targetPost_id)}}
      }
      filter = {_id: ObjectId.createFromHexString(req.user._id)}
      await Users.updateOne(filter,update) 
      const { savedPosts_ids } = await Users.findOne(filter)
      res.status(200).json({savedPosts_ids})
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  }
  else{
    res.sendStatus(401)
  }
})
app.get('/suggested-users',async(req,res)=>{
  try{
    const Users = db.collection("Users")
    const pipeline = [
      {
        $group: {
          _id: "$_id",
          originalDoc: { $first: "$$ROOT" },
          followedBy_ids: { $push: "$followedBy_ids" }, 
        },
      },
      {
        $sort: { "followedBy_ids.length": -1 } // Sort by followedBy_ids array length (descending)
      },
      {
        $match: { 
          _id: { $ne: ObjectId.createFromHexString(req.user._id) } 
        }
      }
    ];

    const cursor = Users.aggregate(pipeline);
    const temp = await cursor.toArray();

    const user = await Users.findOne({_id: ObjectId.createFromHexString(req.user._id)})
    let documents = []
    for(const document of temp){
      if(!(user.following_ids.find(((following_id)=> following_id+'' == document.originalDoc._id+'')))){
        documents.push(document.originalDoc)
      }
     
    }
    for(const document of documents){
      document.password =''
    }
    res.status(200).json({suggested_users:documents})
  }catch(err){
    console.log(err)
    res.status(500).json({Error:err})
  }
})

app.get('/search-suggestions',async(req,res)=>{
    const sanitizedInput = validator.escape(req.query.input); 
    const Users = db.collection("Users")
    const filter = {username: {"$regex": '^'+sanitizedInput}} 
    const cursor =  Users.find(filter)
    const users = await cursor.toArray();
    for(const user of users){
      user.password = ''
    }
    res.status(200).json({users})
})


app.get('/feed-posts',async(req,res)=>{ // 1 page = 10 posts
  const Users = db.collection("Users")
  const Posts = db.collection("Posts")
  const feed_posts  = []
  let filter = {_id: ObjectId.createFromHexString(req.user._id)}
  const user = await Users.findOne(filter)
  for (const following_id of user.following_ids){
    filter = {_id: following_id}
    const following = await Users.findOne(filter)
    for(const post_id of following.posts_ids){
      filter = {_id: post_id}
      const post = await Posts.findOne(filter)
      if(post)
      {feed_posts.push(post)}
    }
  }
  feed_posts.sort((a,b)=> b.creationDate - a.creationDate)
  res.json({feedPosts: feed_posts})

})
app.get('/suggested-posts',async(req,res)=>{ // explore page
  try {
    const Posts =  db.collection("Posts")
    const suggestedPosts = await Posts.find().toArray()
    res.json({suggestedPosts})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.get('/:username',async(req,res)=>{
  const Users = db.collection("Users")
  const filter = {username: req.params.username}
  const targetUser = await Users.findOne(filter)
  if(targetUser){
    res.redirect(`/users/${targetUser._id}`)
  }
  else{
    res.sendStatus(404)
  }

})

app.post('/chats',async(req,res)=>{
  const Chats = db.collection("Chats")
  const { user1_id, user2_id } = req.body
  const targetChat = await Chats.findOne({user1_id:ObjectId.createFromHexString(user1_id), user2_id:ObjectId.createFromHexString(user2_id)})
  if(targetChat){
    res.json({targetChat})//resource already exists
  }
  else{
    const { insertedId } = await Chats.insertOne({user1_id:ObjectId.createFromHexString(user1_id), user2_id:ObjectId.createFromHexString(user2_id)})
    const Users = db.collection("Users")
    const filter = {$or: [
      { _id: ObjectId.createFromHexString(user1_id) },
      { _id: ObjectId.createFromHexString(user2_id) }
    ]}

    const update = {$push:{chats_ids:insertedId}}
    await Users.updateMany(filter,update)
    res.status(201).json({chat_id:insertedId})
}
})


app.get('/chats/:chat_id',async(req,res)=>{
  try {
    const Chats = db.collection("Chats")

    const filter = {_id: ObjectId.createFromHexString(req.params.chat_id)}
    const targetChat = await Chats.findOne(filter)
    if(req.user._id == targetChat.user1_id || req.user._id == targetChat.user2_id)
    { const Users = db.collection("Users") 
      targetChat.user1 = await Users.findOne({_id: targetChat.user1_id})
      targetChat.user2 = await Users.findOne({_id: targetChat.user2_id})

      res.json({targetChat})
    }
    else
    {res.sendStatus(401)}
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

})






// make sure to try to keep the sockets strictly for improving user experience as much as possible, cuz you dont wanna mess up the postman stuff 
let connectedUsers = []
io.on('connection', (socket) => { //emit: broadcast to all users.

 
  if(socket.recovered){

  }
  socket.on('auth', (user_id) => {
    const socketID = socket.id  
    connectedUsers.push({socketID, user_id})


  });

  socket.on('userEnteredChat',(chat_id)=> {
    const socketID = socket.id 
    const targetUser = connectedUsers.find((connectedUser)=> connectedUser.socketID == socketID)
    if(targetUser)
{    
    const filteredConnectedUsers = connectedUsers.filter((connectedUser)=> connectedUser.socketID != socketID)
    
    targetUser.inChatWith_id = chat_id
    connectedUsers = [...filteredConnectedUsers,targetUser]}
  })

  socket.on('exittedChat',()=>{
    const filteredArray = connectedUsers.filter((connectedUser)=> connectedUser.socketID != socket.id)
    const user = connectedUsers.find((connectedUser)=> connectedUser.socketID == socket.id)
    if(user)  
    {user.inChatWith_id = null
    connectedUsers = [...filteredArray,user]}
  })

  socket.on('messageSent', async (chat_id) => {  
    const Chats = db.collection("Chats")
    const filter = {_id: ObjectId.createFromHexString(chat_id)}
    const targetChat = await Chats.findOne(filter)
    const user1_id = targetChat.user1_id
    const user2_id = targetChat.user2_id

    let sendingUser = connectedUsers.find((connectedUser)=> connectedUser.socketID == socket.id)
    let recievingUser_id;  
    const temp = sendingUser.user_id


    if(user1_id + '' == temp)
    {recievingUser_id = user2_id}
    else if(user2_id + '' == temp)
    {recievingUser_id = user1_id}
    else{
      //we're in trouble
    }

        recievingUser_id = recievingUser_id + '' //string
    let recievingUserIsOnline = connectedUsers.find((connectedUser)=> connectedUser.user_id == recievingUser_id) ? true : false


    const recievingUser = connectedUsers.find((connectedUser)=> connectedUser.user_id == recievingUser_id)
    const recievingUserSocketID = recievingUser ? recievingUser.socketID : null



    if(recievingUserIsOnline && (recievingUser && recievingUser.inChatWith_id == targetChat._id.toString())) // online and in that chat
      {

        io.to(recievingUserSocketID).emit('refetchThisChat')
        
        }
    else{ 
          // not in that chat, either online or offline
              const Users = db.collection("Users")
              const filter = {_id: ObjectId.createFromHexString(recievingUser_id)}

              try {
                sendingUser = await Users.findOne({_id: ObjectId.createFromHexString(sendingUser.user_id)})
                const update = {$push: {notifications: {type:'chat',_id:targetChat._id,content:`${sendingUser.username} sent you a message.`}}}
                await Users.updateOne(filter,update)
              } catch (error) {
                console.log(error)
              }
  
           //


      if(recievingUserIsOnline) // online but not in that chat
        {
          io.to(recievingUserSocketID).emit('refetchUser')
         }



    }
       


    


  });

  socket.on('disconnect', () => {
   
    connectedUsers = connectedUsers.filter((connectedUser)=> connectedUser.socketID != socket.id)



  });
});

server.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})