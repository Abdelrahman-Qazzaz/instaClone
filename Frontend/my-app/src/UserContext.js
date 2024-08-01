import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'


const userContext = createContext()

export function UserContextProvider({ children,...props }) {

  const socket = props.socket
  const [user,setUser] = useState({_id:-1}) // immer

  const [showBlackBackGround,setShowBlackBackground] = useState(false)
  const [showSuggestedPage,setShowSuggestedPage] = useState()
  const [showSwitchScreen,setShowSwitchScreen] = useState(false)
  const [showCreateNewPostScreen,setShowCreateNewPostScreen] = useState(false)
  const [showSharePostScreen,setShowSharePostScreen] = useState(false)
  const [showUnfollowConfirmationScreen,setShowUnfollowConfirmationScreen] = useState(false)
  const [unfollowConfirmationScreenTargetUser,setUnfollowConfirmationScreenTargetUser] = useState()
  const [sharePostScreenPostData,setSharePostScreenPostData] = useState()



  const [isLoading,setIsLoading] = useState(false)

   useEffect(()=>{
     setUpUser() // will be useful for two cases: 1.if user logged in, then closed the website, then opened it again. 2. if the user refreshes the browser, cuz it will prevent the user from having to re login... PS: dont do this in any other place, even if it says cant read properties of undefined, cuz all that means is that this function hasnt done executing yet, so to fix the cant read properties of undefined, just render conditionally, this should take care of the error, and the component will render normally once this function is done executing.
   },[])



  function toggleUnfollowConfirmationScreen(targetUser = null){
    if(showUnfollowConfirmationScreen)
    {setShowUnfollowConfirmationScreen(false)}
    else{
      setUnfollowConfirmationScreenTargetUser(targetUser)
      setShowUnfollowConfirmationScreen(true)
    }
  }

  function toggleSharePostScreen(post=null){
    setShowSharePostScreen(!showSharePostScreen)
    if(post){
      setSharePostScreenPostData(post)
    }

  }


   async function setUpUser(){
    let { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/`,{withCredentials:true})
    if(data.user_id && data.user_id != -1){
      const result = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${data.user_id}`,{withCredentials:true})
      setUser(result.data.user)
      socket.emit('auth',result.data.user._id) // cuz this whole function (setUpUser)'s purpose is for when the user logged in, then either refreshed or closed the website and reopened it, but since they wont have to login, we have to make sure that they still get added to the connectedUsers array in the backend, cuz the only way for a user to get added to that array is via the 'auth' event
    }
   }


  async function updatePosts(){

  }

  async function updateChats(){

  }

  async function updateNotifications(){

  }

  async function updateFollowing(){
    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/following`,{withCredentials:true})
    // setUser(produce((draft)=>{draft.following = data.following; draft.following_ids = data.following_ids}))
    setUser((prev)=>({...prev,following_ids: data.following_ids,following: data.following}))
  }

  async function login(username,password){
    const { data } =  await axios.post(`${process.env.REACT_APP_BACKENDAPI}/login`,{username,password},{withCredentials:true})
    const userID = data.user_id
    if(userID != -1){
    const result = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${userID}`,{withCredentials:true})
    // setUser(produce((draft) => {draft = result.data.user}))
    socket.emit('auth',result.data.user._id)
    setUser(result.data.user)}
  }
  async function logout(){
    const { status } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/logout`,{withCredentials:true})
    return status
}


  async function fetchSuggestedUsers(){
    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/suggested-users`,{withCredentials:true})
    const suggestedUsers = data.suggested_users
    return suggestedUsers
  }

  async function fetchFeedPosts(){
    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/feed-posts`,{withCredentials:true})
    return data.feedPosts
  }

  async function fetchSuggestedPosts(){
    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/suggested-posts`,{withCredentials:true})
    return data.suggestedPosts
  }

  async function followUser(targetUser_id){
    const { status } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/following`,{targetID: targetUser_id},{withCredentials:true})//update who the user is following, "targetID" is the id of the  person who's been newly added to the user's following list.
    console.log(status)
    if(status === 200){
        await updateFollowing()
    }
}

  async function unfollowUser(targetUser_id){
    try{ 
    const { status } = await axios.delete(`${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/following/${targetUser_id}`,{withCredentials:true})
    console.log(status)
    if(status === 204){
        await updateFollowing()
        toggleUnfollowConfirmationScreen()
    }
}
    catch(err){console.log(err)}
   
}

async function handlePostLikeUnLikeAndGetTheUpdatedLikesForThisPost(post_id){ // postID x
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/likes`,{},{withCredentials:true})
  return data.newLikesForPost // this will return the new array of likes for postID x
}
async function handleCommentLikeUnlike (post_id,commentID){
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${commentID}/likes`,{},{withCredentials:true})
  return data.newLikesForComment
}

async function postStorySlide(slideFormData){
  await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/story`,slideFormData,{headers: {'Content-Type': 'multipart/form-data'},withCredentials:true})
}


function getPeopleYouFollowThatFollowTheSuggestedUser(targetUser){
   let temp = []
   for(const following of user.following){
  const target = targetUser.followedBy_ids.find((followerID)=> followerID == following._id)

   if(target){
    temp.push(following)
    }
  }
 return temp
}

async function savePost(post_id){
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/saved-posts`,{targetPost_id: post_id},{withCredentials:true})
  const { savedPosts_ids } = data

  setUser((prev)=>({...prev,savedPosts_ids}))
}

async function fetchStory(targetUserUsername){
const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${targetUserUsername}/story`,{withCredentials:true})
return data.story
}

async function fetchStories(){
  const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${user.username}/feed-stories`,{withCredentials:true})
  return data.stories
}

async function updateStorySlideViewsAndUpdateUserData(slideID,targetUser_username){
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/users/${targetUser_username}/story/slides/${slideID}`,{},{withCredentials:true})
  setUser((prev)=> {
    const filteredFollowing = user.following.filter((following)=> following.username != targetUser_username)
    const targetUser = user.following.find((following)=> following.username == targetUser_username)
    targetUser.story = data.story // setting their story to the new story, which is the same as their previous one, except with one of the slides updated by having the user as a view added to it.
    const following = [...filteredFollowing,targetUser]
    return {...prev,following} 
  })

}

async function fetchChat(targetChat_id){

  if(targetChat_id.length == 24){

    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/chats/${targetChat_id}`,{withCredentials:true})


    return data.targetChat
  }

}

async function createChatAndGetIts_id(user1_id,user2_id){
  const { data } = await axios.post(`${process.env.REACT_APP_BACKENDAPI}/chats`,{user1_id, user2_id},{withCredentials:true})
  return data.chat_id
}
function socketEmitUserEnteredChat(chat_id){
  socket.emit('userEnteredChat',(chat_id)) 
}
function socketChatMessagesUpdate(chat_id){
  socket.emit('messageSent',chat_id)
}

async function createPostAndUpdateUserData(formData){
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKENDAPI}/users/${user._id}/posts`,formData,{headers: {'Content-Type': 'multipart/form-data'},withCredentials:true})
    setUser((prev)=>({...prev,posts_ids:data.posts_ids, posts:[...prev.posts,data.newPost]}))
    }catch (error) {
      console.log(error)
    }
}
function formatCreationDate(creationDate){
  const creationDateDateObj = new Date(creationDate)
  const now = new Date()// for comparision
  return creationDateDateObj.toLocaleDateString('default',{month: 'long'}) + ' ' + creationDateDateObj.getDate() + (now.getFullYear() - creationDateDateObj.getFullYear() == 0 ? '' : ' '+creationDateDateObj.getFullYear() )
}


async function handlePostLikeUnLike(post_id){
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/likes`,{},{withCredentials:true})
  return data.newLikesForPost
}
async function handleCommentLikeUnlike (post_id,commentID){
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${commentID}/likes`,{},{withCredentials:true})
  return data.newLikesForComment
}

async function handleReplyLikeUnlike(post_id,commentID,replyID){
  const { data } = await axios.patch(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${commentID}/replies/${replyID}/likes`,{},{withCredentials:true})
  return data.newLikesForComment
}

function formatAge(creationDate){
  const now = Date.now()
  const age = now - creationDate
  const seconds = Math.floor(age / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if(seconds < 60)
    {return 'Just now'}
  if(minutes < 60)
    {
      return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
    }
  if(hours < 24)
    {
      return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
    }
  if(days < 30){
    return `${days} ${days > 1 ? 'days' : 'day'} ago`
  }
  if(months < 12)
    {
     return `${months} ${months > 1 ? 'months' : 'month'} ago`
    }
  return `${years} ${years > 1 ? 'years' : 'year'} ago`
  }


  async function postComment(post_id,comment){
    if(user && user._id != -1)
        {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments`,{comment},{withCredentials:true})
                return data.newComment
               
            } catch (error) {
                console.log(error)
            }
        }
}
async function postReply(post_id,comment_id,reply){
    if(user && user._id != -1)
        {
            try {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKENDAPI}/posts/${post_id}/comments/${comment_id}/replies`,{reply},{withCredentials:true})
                return data.newComments
            } catch (error) {
                console.log(error)
            }
        }
}

async function fetchUserData(user_id){
  const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${user_id}`) // this is for fetching other people's data, hence the no credentials.
  return data.targetUser
}

async function sendMessage(chat_id,formData){//formData: text, files
  const { data } = await axios.post(`${process.env.REACT_APP_BACKENDAPI}/chats/${chat_id}/messages`,formData,{headers: {'Content-Type': 'multipart/form-data'},withCredentials:true})
  socketChatMessagesUpdate(chat_id)
  return data.newMessage
}

  return (
    <userContext.Provider value={{
      user,
      setUser,
      socket,
      login,
      fetchSuggestedUsers,
      toggleUnfollowConfirmationScreen,
      followUser,
      unfollowUser,
      updateFollowing,
      isLoading,
      setIsLoading,
      getPeopleYouFollowThatFollowTheSuggestedUser,
      fetchFeedPosts,
      fetchSuggestedPosts,
      showCreateNewPostScreen,
      setShowCreateNewPostScreen,
      handlePostLikeUnLikeAndGetTheUpdatedLikesForThisPost,
      handleCommentLikeUnlike,
      savePost,
      postStorySlide,
      fetchStory,
      updateStorySlideViewsAndUpdateUserData,
      fetchStories,
      socketEmitUserEnteredChat,
      socketChatMessagesUpdate,
      fetchChat,
      createChatAndGetIts_id,
      showSuggestedPage,
      setShowSuggestedPage,
      showSwitchScreen,
      setShowSwitchScreen,
      logout,
      createPostAndUpdateUserData,
      formatCreationDate,
      handlePostLikeUnLike,
      formatAge,
      postComment,
      postReply,
      handleReplyLikeUnlike,
      fetchUserData,
      sharePostScreenPostData,
      setSharePostScreenPostData,
      toggleSharePostScreen,
      sendMessage,
      showSharePostScreen,
      setShowSharePostScreen,
      showUnfollowConfirmationScreen,
      unfollowConfirmationScreenTargetUser,
      setUnfollowConfirmationScreenTargetUser,
      showBlackBackGround,
      setShowBlackBackground




      
      

    }}>
    {children}
    </userContext.Provider>
  )
}

export default userContext


/*
  // ?risky might cause bugs?
  socket.on('refetchUser',async()=>{
     await setUpUser()

  })
  async function setUpUser(){
    getUserID().then(async(userID)=>{
      if(userID !== -1 && userID){await fetchUser(userID)}
    }).catch((userID)=>{console.log('userID: '+userID) })
  }
  async function getUserID(){
    const { data } = await axios.get('${process.env.REACT_APP_BACKENDAPI}',{withCredentials:true})
    return new Promise((resolve,reject) => {
      if(data.user_id != -1){resolve(data.user_id)}
      else{reject(-1); }
    });
  }
  async function fetchUser(userID){
    if(userID != -1){
    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/users/${userID}`,{withCredentials:true})
    setUser(data.user)
    if(data.user._id && data.user._id != -1) 
      {console.log('foo')
        socket.emit('auth',data.user._id)}
        else{console.log('FOO')}
  }
  }
  useEffect(()=>{
    setUpUser()
    },[])


  




    const [suggestedUsers,setSuggestedUsers] = useState([])
    async function fetchSuggestions(){
        const { data } = await axios.get('${process.env.REACT_APP_BACKENDAPI}/suggested-users',{withCredentials:true})
        setSuggestedUsers(data.suggested_users)
    }




    function toggleSharePostScreen(){
      setShowSharePostScreen(!showSharePostScreen)
    }

    const [currentChat,setCurrentChat] = useState(null)

    
 
 


      return (
    <userContext.Provider value={{
      socket,
      formatAge,
      formatCreationDate,
      user,
      getUserID,
      fetchUser,
      setUpUser,
      suggestedUsers,
      setSuggestedUsers,
      fetchSuggestions,
      setIsLoading,
      setShowSwitchScreen,
      showCreateNewPostScreen,

      showUnfollowConfirmationScreen,
      setShowUnfollowConfirmationScreen,
      handlePostLikeUnLike,
      handleCommentLikeUnlike,
      handleReplyLikeUnlike,
      toggleSharePostScreen,
      socketChatMessagesUpdate,
      socketEmitUserEnteredChat

    }}>
 */