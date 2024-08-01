import axios from 'axios'
import React, { useContext, useState } from 'react'
import userContext from '../../UserContext'
import FollowButton from "../assets/FollowButton"
import MessageUserButton from "../assets/MessageUserButton"
import PlusCircle from '../assets/PlusCircle'
import UnfollowButton from '../assets/UnfollowButton'
import styles from "./profilePage.module.css"

import UserIcon from './UserIcon'
function UserDetails(props) {

    
    const { user, setUpUser,setShowCreateNewPostScreen,showUnfollowConfirmationScreen,setShowUnfollowConfirmationScreen,setIsLoading,fetchUserData,setUser} = useContext(userContext)
    const [peopleYouFollowThatFollowThisUser,setPeopleYouFollowThatFollowThisUser] = useState([])

    async function getAndSetPeopleYouFollowThatFollowThisUser(){
      let temp = []
      console.log(user)
    for(const following of user.following){
      const target = props.targetUser.followedBy_ids.find((followerID)=> followerID == following._id)
  
      if(target){
        temp.push(following)
        }
      }
      setPeopleYouFollowThatFollowThisUser(temp)
    }


    async function uploadPFP(e){
      setIsLoading(true)
      const files = e.target.files
      const formData = new FormData()
      formData.append('image',files[0])
      try{
         const { status }=  await axios.post(`${process.env.REACT_APP_BACKENDAPI}/me/setProfilePicture`,formData,{headers: {'Content-Type': 'multipart/form-data'},withCredentials:true})
         if(status === 200)
              {
                await props.fetchTargetUserData(true)
              }




      }catch(err){
          console.log(err)
      }
      
      setIsLoading(false)
  }

    

  return (
    <>
      <div className={`${styles.userDetails} d-flex flex-column`} >
        <div className={`d-flex flex-column`} style={{overflow:'hidden',border:' blue'}}>
            <div className='flex-grow-1 d-flex mt-3' style={{border:' red'}}>
                <div style={{height:'100%',width:'fit-content',border:'',position:'relative'}} className='d-flex flex-column align-items-center my-4'>
                  <UserIcon targetUser={props.targetUser} setTargetUser={props.setTargetUser} uploadPFP={uploadPFP}/>
                  {
          user._id == props.targetUser._id 
          ? 
          <div className='d-flex justify-content-center' style={{border:'',width:'100px'}}>
              <button onClick={()=>{setShowCreateNewPostScreen(true)}} className='p-0 mt-4 d-flex flex-column align-items-center' style={{border:'none',backgroundColor:'transparent'}}>
                <PlusCircle/>
                <p style={{color:'#758694'}}>New post</p>
              </button>
            </div>
            :
            null
            }
                </div>
                <div style={{height:'100%',border:' green'}} className='flex-grow-1 ms-4 d-flex flex-column'>
                    <div className='d-flex flex-column flex-sm-row align-items-sm-center mt-4' style={{border:' blue'}}>
                        <div className='me-sm-2' style={{fontWeight:'600',fontSize:'1.4rem'}}>
                            {props.targetUser.username}
                        </div>
                        <div>
                        {
                            user._id != props.targetUser._id 
                            ?
                            <div className='d-flex mt-2 mt-sm-0 align-items-center'>
                                <div className=''>
                                    {user.following_ids && user.following_ids.find((_id)=> _id == props.targetUser._id) ? <UnfollowButton  suggestedUser={props.targetUser} ProfilePage={true}/> : <FollowButton suggestedUser={props.targetUser} ProfilePage={true}/>}
                                </div>
                                <div>
                                    <MessageUserButton suggestedUser={props.targetUser} ProfilePage={true}/>
                                </div>
                            </div>
                            :
                            null
                        }
                        </div>
                    </div>
                    <div className='my-3' style={{border:'  purple',flex:1,overflow:'hidden'}}><p style={{wordBreak:'break-word',width:'100%',maxHeight:'100%',border:'2px  red',}}>{props.targetUser.description ? props.targetUser.description : 'No description.'}</p> </div>
                </div>
            </div>
        </div>

        {
       user._id != props.targetUser._id && peopleYouFollowThatFollowThisUser.length
       ? 
      <div className='' style={{border:'',maxWidth:'300px',}}>
        <p style={{color:'#758694'}}>Followed by 
          {peopleYouFollowThatFollowThisUser.map((person,index)=>(
            <>
            <span style={{color:'black'}}> {person.username}</span>
            {index !=  peopleYouFollowThatFollowThisUser.length-1 && peopleYouFollowThatFollowThisUser.length != 1? ', ' : ''}
            </>
            ))}
        </p>
      </div>
        :
        null
        }
      </div>
    </>


  )
}

export default UserDetails


/*
import React, { useContext, useEffect, useState } from 'react'
import userContext from '../../UserContext'
import styles from "./profilePage.module.css"
import FollowButton from "../assets/FollowButton"
import MessageUserButton from "../assets/MessageUserButton"
import UnfollowButton from '../assets/UnfollowButton'
import UnfollowConfirmationScreen from '../assets/Confirmation Screens/UnfollowConfirmationScreen'
function UserDetails(props) {

    
    const { user, setUpUser} = useContext(userContext)
    const [peopleYouFollowThatFollowThisUser,setPeopleYouFollowThatFollowThisUser] = useState([])

    async function getAndSetPeopleYouFollowThatFollowThisUser(){
        if(!user.following){await setUpUser()}
      let temp = []
    for(const following of user.following){
      const target = props.targetUser.followedBy_ids.find((followerID)=> followerID == following._id)
  
      if(target){
        temp.push(following)
        }
      }
      setPeopleYouFollowThatFollowThisUser(temp)
    }


    useEffect(()=>{
       if(user._id != -1 && user._id != props.targetUser._id){getAndSetPeopleYouFollowThatFollowThisUser()}
    },[user])

    const [showUnfollowConfirmationScreen,setShowUnfollowConfirmationScreen] = useState(false)
    function toggleUnfollowConfirmationScreen(){
        setShowUnfollowConfirmationScreen(!showUnfollowConfirmationScreen)
    }
  return (
    <>
  {      showUnfollowConfirmationScreen
        ?
        <UnfollowConfirmationScreen suggestedUser={props.targetUser} setShowUnfollowConfirmationScreen={setShowUnfollowConfirmationScreen}/>
        :
        null}
        <div className={`${styles.responsiveMaxHeight} d-flex mt-3`} style={{height:'fit-content',border:'2px  red'}}>
        <div style={{height:'100%',border:'2px  red'}}><img className={styles.responsiveWidth} src="/defaultInstaPFP.jpg" alt="Profile Picture" /></div>
        <div style={{height:'100%',border:'10px  green'}} className='flex-grow-1 ms-4 d-flex flex-column'>
            <div className='d-flex flex-column flex-sm-row align-items-sm-center' style={{border:'2px  blue'}}>
                <div className='me-sm-2' style={{fontWeight:'600'}}>
                    {props.targetUser.username}
                </div>
                <div>
                {
                    user._id != props.targetUser._id 
                    ?
                    <div className='d-flex mt-2 mt-sm-0 align-items-center'>
                        <div className=''>
                            {user.following_ids.find((_id)=> _id == props.targetUser._id) ? <UnfollowButton toggleUnfollowConfirmationScreen={toggleUnfollowConfirmationScreen}  ProfilePage={true}/> : <FollowButton suggestedUser={props.targetUser} ProfilePage={true}/>}
                        </div>
                        <div>
                            <MessageUserButton suggestedUser={props.targetUser} ProfilePage={true}/>
                        </div>
                    </div>
                    :
                    null
                }
                </div>
            </div>
            <div className='my-3' style={{border:'2px  purple',flex:1,overflow:'hidden'}}><p style={{wordBreak:'break-word',width:'100%',maxHeight:'100%',border:'2px  red',}}>adwnpq dwdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwdwdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwdwdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwdwdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwdwdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwdwdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdwqdw</p> </div>
        </div>
    </div>
    </>


  )
}

export default UserDetails


*/