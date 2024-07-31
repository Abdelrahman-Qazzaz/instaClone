import React, { useContext, useEffect, useState } from 'react'

import userContext from '../../UserContext'
import FollowButton from '../assets/FollowButton'
import UnfollowButton from '../assets/UnfollowButton'
import XIcon from '../assets/XIcon'
import styles from "./homePage.module.css"

function SuggestedPage(props) {
    const { user,fetchSuggestedUsers,toggleUnfollowConfirmationScreen,setShowSuggestedPage } = useContext(userContext)
    const [suggestedUsers,setSuggestedUsers] = useState([])

    useEffect(()=>{
        setup()
    },[])

    



    async function setup(){
        const suggestedUsers = props.userList ? props.userList : await fetchSuggestedUsers() // for the props.userList, it's not actually for suggestions, it's for the list of following and followers
        setSuggestedUsers(suggestedUsers)
    }
  return (

    <>
    <div style={{position:'fixed',top:"2%",left:'80%',zIndex:10}}>
       <button onClick={()=> props.onClick() ? props.onClick() : setShowSuggestedPage(false)} className='p-0' style={{backgroundColor:"transparent",border:"none"}}>
         <XIcon width='40'/>
       </button>
    </div>
    <div  className={styles.c} style={{width:'100%',height:'100%',backgroundColor:'white',position:'fixed',left:'0',display:'flex',justifyContent:'center',zIndex:10}}>
        <div className={`${styles.s}`} style={{width:'100%',maxWidth:'630px',}}>
            <div className='mx-3 my-4' style={{height:'fit-content'}}>
                <text style={{fontWeight:'650'}}>Suggested for you</text>
            </div>
            <div style={{height:'fit-content'}}>
                {suggestedUsers && suggestedUsers.map((suggestedUser)=>
                (
                    <div style={{width:'100%',height:'68px',display:'flex',alignItems:'center'}}>
                        <img width='44px' style={{borderRadius:'50%'}} className='mx-3' src={suggestedUser.pfpFirebasePathURL ? suggestedUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="image" />
                        <div className='' style={{width:'70%',height:'52px'}}>
                            <span style={{height:'18px'}}><text style={{fontWeight:'600'}}>{suggestedUser.username}</text></span>

                        </div>
                        {user.following_ids && user.following_ids.find((following_id)=> following_id == suggestedUser._id) ?    <UnfollowButton suggestedUser={suggestedUser}/> : <FollowButton suggestedUser={suggestedUser}/>  } 
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}

export default SuggestedPage