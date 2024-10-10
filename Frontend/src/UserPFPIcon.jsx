import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './components/assets/assets.module.css'
import userContext from './UserContext'
function UserPFPIcon(props) {
    const [targetUser,setTargetUser] = useState(null)
    const width = props.width 
    const height = props.width 
    const { user,fetchUserData } = useContext(userContext)
    const [unwatched,setUnwatched] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        setup()
    },[])
    useEffect(()=>{
        findUnwatched()
    },[targetUser])
    async function setup(){
       const targetUserData = await fetchUserData(props.targetUser_id)
       if(targetUserData){
        setTargetUser(targetUserData)
       }

    }
    function findUnwatched(){
        if(targetUser && targetUser.story && targetUser.story.slides && targetUser.story.slides.length){
            for(const slide of targetUser.story.slides) {
            const watched = slide.views && slide.views.find((view)=> view.user_id == user._id) ? true : false
            if(!watched){
                setUnwatched(true)
            }
          }
      }
    }
  return (
    <button onClick={()=>{navigate(unwatched ? `/stories/${targetUser.username}/`:`/${targetUser.username}/`)}} style={{borderRadius:'50%',border:"none",backgroundColor:'transparent'}} className='d-flex justify-content-center align-items-center p-0'>
         <div className={`${unwatched ? styles.storyIcon : null} d-flex justify-content-center align-items-center`} style={{borderRadius:'50%'}}>
            <div className={`${unwatched ? styles.innerStoryIcon : null} d-flex justify-content-center align-items-center`} style={{borderRadius:'50%'}}>
                {targetUser ? <img style={{height,width,borderRadius:'50%'}} src={targetUser.pfpFirebasePathURL ? targetUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="" /> : null}
            </div>                                                                                              
         </div>
        
    </button>
  )
}

export default UserPFPIcon