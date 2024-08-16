import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../../UserContext'
import FeedPost from '../assets/FeedPost'
import StoryIcon from '../assets/StoryIcon'
import SuggestedUserCard from '../assets/SuggestedUserCard'
import YourStoryIcon from '../Your Story/YourStoryIcon'
import DesktopOnlySuggestedPage from './DesktopOnlySuggestedPage'
import styles from "./homePage.module.css"

function Feed() {  

    const navigate = useNavigate()
    const { fetchSuggestedUsers,fetchFeedPosts,toggleUnfollowConfirmationScreen,setShowSuggestedPage } = useContext(userContext)
    const [suggestedUsers,setSuggestedUsers] = useState([])
    const [feedPosts,setFeedPosts] = useState([])
    const { user } = useContext(userContext)

    useEffect(()=>{
     setup()
    },[])

    async function setup(){
      const suggestedUsers = await fetchSuggestedUsers()
      const fetchedPosts = await fetchFeedPosts()
      setSuggestedUsers(suggestedUsers)
      setFeedPosts(fetchedPosts)
    }

    function updateFeedPostsArrayState(updatedPost){
       const filteredFeedPosts = feedPosts.filter((post)=> post._id != updatedPost._id)
      const sorted = [...filteredFeedPosts,updatedPost].sort((a,b)=> b.creationDate - a.creationDate)
      setFeedPosts(sorted)
    }

  


  return (

    <>
    <div  style={{flex:1,display:'flex',justifyContent:'center',overflowX:'hidden',overflowY:"auto"}}>
      <div className='mx-md-2' style={{width:'100%',maxWidth:'630px',border:'',height:'fit-content',border:''}}>
        <div className='' style={{width:'100%',height:'100px',border:' ',display:'flex',flexDirection:'row',}}>
          <YourStoryIcon/> 
          {user.following.map((following)=>(
            following.story && following.story.slides && following.story.slides.length &&  following.story.slides.filter((slide)=> {
              const watched = slide.views && slide.views.find((view)=> view.user_id == user._id) ? true : false
              if(!watched){
                return slide
              }
            }).length ? <StoryIcon following={following}/> : null
          ))}
        </div>
        <div className='mt-3' style={{width:'100%',height:'fit-content',border:'',display:'flex',justifyContent:'center'}}>
          <div style={{maxWidth:'470px',width:'100%',height:'fit-content',}}>

            {suggestedUsers && suggestedUsers.length ? <div style={{height:'300px',display:'flex',flexDirection:'column',border:''}}>
              <div className='mb-3' style={{display:'flex',justifyContent:'space-between',zIndex:1}}><text className='mx-md-0 mx-1' style={{fontSize:'1.1rem',fontWeight:'570'}}>Suggestions for you</text> <button onClick={()=> setShowSuggestedPage(true)} style={{fontWeight:'500'}} className='btn text-info p-0 m-0 mx-1 mx-md-0'>See all</button></div>
              <div style={{border:'',flex:1,display:'flex',overflowX:'auto',overflowY:'hidden',whiteSpace:'nowrap',}}>
                {suggestedUsers ? suggestedUsers.map((suggestedUser)=>(<SuggestedUserCard suggestedUser={suggestedUser} setSuggestedUsers={setSuggestedUsers} toggleUnfollowConfirmationScreen={toggleUnfollowConfirmationScreen} />)) : null}
              </div>
            </div> : null}
            {feedPosts && feedPosts.length ? feedPosts.map((feedPost)=>{

              return(
              <FeedPost post={feedPost} updateFeedPostsArrayState={updateFeedPostsArrayState}/>
            )}): null}
          </div>
        </div>
      </div>

      <div className={`${styles.desktopOnlySuggestedPageContainer}`}>
      <DesktopOnlySuggestedPage />
      </div>
     


     

    </div>




</>
  )
}

export default Feed