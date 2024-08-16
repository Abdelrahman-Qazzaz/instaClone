import React, { useContext } from 'react'
import userContext from '../../UserContext'

function FollowButton(props) {

    const { followUser } = useContext(userContext)

    
    
  return (
    props.ProfilePage 
    ?
    <button onClick={async()=> await followUser(props.suggestedUser._id)} className="btn btn-primary me-2 py-0" style={{width:'83px',height:'28px',lineHeight:'28px'}}>Follow</button>
    : 
    <button onClick={async()=> await followUser(props.suggestedUser._id)} className="btn btn-primary mx-4 p-0" style={{width:'83px',height:'32px',lineHeight:'32px'}}>Follow</button>
  )
}

export default FollowButton