import React, { useContext, useEffect, useState } from 'react'
import userContext from '../UserContext'
import UserPFPIcon from '../UserPFPIcon'


function Caption(props) {

  const { fetchUserData } = useContext(userContext)
  const [owner,setOwner] = useState()
useEffect(()=>{
  setup()
},[])

async function setup(){ // "why fetch the owner if it's already in the post?" because the owner property in the post is not up to date... i shouldn't have even designed the db this way but oh well too late now... anyways here im using the owner property _id to fetch the the user from the Users collection.
  const target_id = props.post && props.post.owner && props.post.owner._id ? props.post.owner._id : props.otherUser && props.otherUser._id ? props.otherUser._id : null
 const userData = await fetchUserData(target_id)
 setOwner(userData)
}


  return (
    !props.notReallyACaption //so yes, it is a caption 
    ?
    <div className='border-bottom py-2' style={{width:'',border:''}}>
      <div className='d-flex align-items-center' style={{border:'red',}}>
        <UserPFPIcon width='32px' targetUser_id={props.post.owner._id}/>
        <div className='flex-grow-1 ms-3' style={{border:''}}> 
          <div className='me-3' style={{float:'left',fontWeight:'550',border:'red'}}>
            {owner ? owner.username : null}
          </div>
          <div style={{border:'red',wordBreak:'break-word',height:'fit-content'}}>
            {props.post.caption}
          </div>
        </div>
      </div>
    </div>
    :
    props.chat
    ?

    <div className='d-flex ms-2 mt-2' style={{border:'',}}>
      <img width='46px' height='46px' src={props.otherUser && props.otherUser.pfpFirebasePathURL ? props.otherUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="userPFP" style={{borderRadius:'50%'}} />
      <div className='flex-grow-1 ms-3 d-flex align-items-center' style={{border:''}}> 
        <div className='me-3' style={{float:'',fontWeight:'600',border:'red'}}>
          {props.otherUser ? props.otherUser.username : null}
        </div>
      </div>
    </div>

  :
  <></>
  )
}
export default Caption

/*
    <div style={{width:'400px',minHeight:'60px',maxHeight:'100px',border:''}} className='d-flex'>
        <img className='ms-3' width='32px' height='32px' src={props.post.firebasePathURL} alt="userPFP" style={{borderRadius:'50%'}} />
        <div className='ms-3' style={{fontWeight:'550',border:''}}>
          {owner ? owner.username : null}
        </div>
        <div className='ms-3' style={{wordBreak:'break-word',border:''}}>
            <div style={{maxHeight:'100%',maxWidth:'100%'}}>{props.post.caption}</div>
        </div>
        <div style={{border:''}}></div>
    </div>
*/