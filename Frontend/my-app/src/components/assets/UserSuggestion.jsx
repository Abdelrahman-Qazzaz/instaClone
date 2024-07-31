import React, { useContext,useState,useEffect } from 'react'
import FollowButton from '../assets/FollowButton'
import UnfollowButton from '../assets/UnfollowButton'
import FollowButton2 from '../assets/FollowButton2'
import UnfollowConfirmationScreen from './Confirmation Screens/UnfollowConfirmationScreen'
import userContext from '../../UserContext'
import UserPFPIcon from './UserPFPIcon'

function UserSuggestion(props) {

    const { user,getPeopleYouFollowThatFollowTheSuggestedUser,toggleUnfollowConfirmationScreen } = useContext(userContext)


    const [peopleYouFollowThatFollowTheSuggestedUser,setPeopleYouFollowThatFollowTheSuggestedUser] = useState([])
       //
  
      
      useEffect(()=>{
        setup()
      },[])
      //

      function setup(){
        const pplYkThatFollowThisUser = getPeopleYouFollowThatFollowTheSuggestedUser(props.suggestedUser)
        setPeopleYouFollowThatFollowTheSuggestedUser(pplYkThatFollowThisUser)
      }

      //<img width='100%' src="defaultInstaPFP.jpg" alt="" />

  return (

        <div className='' style={{height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{width:'44px'}}><UserPFPIcon src={props.suggestedUser.pfpFirebasePathURL}/></div>
        <div className='' style={{width:'240px',display:'flex',justifyContent:'center'}}>
            <div className=' mx-3' style={{width:'100%',height:'fit-content'}} >
                <div className=''><text  style={{fontWeight:'600',fontSize:'0.9rem',}}> {props.suggestedUser.username}</text></div>
                <div className=' '><text  style={{fontWeight:'600',fontSize:'0.7rem',color:'#758694'}}>{peopleYouFollowThatFollowTheSuggestedUser && peopleYouFollowThatFollowTheSuggestedUser.length ? 'Followed by ' + peopleYouFollowThatFollowTheSuggestedUser.map((aUser,index)=>aUser.username + (peopleYouFollowThatFollowTheSuggestedUser.length > 1 && peopleYouFollowThatFollowTheSuggestedUser.length-1 != index  ? ',' : '')) : 'instaClone recommended'}</text></div>
            </div>
        </div>
        <div style={{width:'41px',border:''}}>
        {user.following && user.following.some((aSuggestedUser) => aSuggestedUser._id == props.suggestedUser._id) ?   
        <UnfollowButton DesktopOnlySuggestedPage={true} suggestedUser={props.suggestedUser}/> 
        : 
        <FollowButton2  DesktopOnlySuggestedPage={true} suggestedUser={props.suggestedUser}/>  } 
        </div>
         </div>

  )
}

export default UserSuggestion

/*
<div className='mt-4' style={{width:'100%',height:'68px',display:'flex',alignItems:'center',border:''}}>
    <div><img width='44px' className='mx-3' src="defaultInstaPFP.jpg" alt="image" /></div>
    <div className='' style={{flex:1,width:'125px',minWidth:'125px',height:'100%',display:'flex',flexDirection:'column',border:''}}>
        <span style={{height:'fit-content',width:'100%',border:'',overflow:'hidden',textOverflow:'ellipsis'}}><text style={{fontWeight:'600',textOverflow:'ellipsis'}}>{props.suggestedUser.username}</text></span>
        <span style={{height:'fit-content',overflow:'hidden',textOverflow:'ellipsis'}}><text style={{color:'#758694',fontSize:'0.8rem'}}>{ !peopleYouFollowThatFollowThesuggestedUser.length   ?   'instaClone recommended' : 'Followed by ' + peopleYouFollowThatFollowThesuggestedUser.map((elem)=>(elem.username))}</text></span>

    </div>
    <div>
        {user.following && user.following.some((aSuggestedUser) => aprops.suggestedUser._id == props.suggestedUser._id) ?   <UnfollowButton  toggleUnfollowConfirmationScreen={() => props.toggleUnfollowConfirmationScreen(suggestedUser)}/> : <FollowButton2 suggestedUser={suggestedUser}/>  } 
    </div>
</div>
*/