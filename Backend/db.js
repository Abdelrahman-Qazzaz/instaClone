
import connectMongo from 'connect-mongo';
import env from "dotenv";
import { MongoClient } from 'mongodb';

env.config();


const mongoUri = process.env.MONGOURI;
async function connectToDb() {
  try {
    const client = await MongoClient.connect(mongoUri);
    const db = client.db("InstaClone");
    const sessionStore = connectMongo.create({
      client: client,
      dbName: 'sessions', // You can choose a different database name
      collectionName: 'sessions'
    });

    return { db, sessionStore}
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}


export async function getUserData(user_id,getFollowingsData,getPostsData,getFollowingsPosts){
  const Users = db.collection("Users")
  const filter = {_id:user_id}
  const targetUser = await Users.findOne(filter)
  if(getFollowingsData)
  {targetUser.following = []
  for(const following_id of targetUser.following_ids){
    const temp = await getUserData(following_id,false,false)
    targetUser.following.push(temp)
  }}
  if(getFollowingsPosts){
    for(const following of targetUser.following){
      following.posts = []
      for(const post_id of following.posts_ids)
      {
        const post = await getPostData(post_id)
        following.posts.push(post)
      }
    }
  }
  if(getPostsData)
 { targetUser.posts = []
  for(const post_id of targetUser.posts_ids){
    const temp = await getPostData(post_id)
    targetUser.posts.push(temp)
  }}
  targetUser.password =''
  return targetUser
}
export async function getPostData(post_id){

  const Posts = db.collection("Posts")
    const filter = {_id: post_id}
    const targetPost = await Posts.findOne(filter)
  return targetPost
}

 const { db, sessionStore } = await connectToDb();

export { db, sessionStore };
