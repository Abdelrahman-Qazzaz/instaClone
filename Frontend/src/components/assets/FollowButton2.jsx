import React, { useContext } from 'react'
import userContext from '../../UserContext'

function FollowButton2(props) {

    const { followUser } = useContext(userContext)


  return (
    <>
    {props.DesktopOnlySuggestedPage 
    ?
    <button onClick={async()=> await followUser(props.suggestedUser._id)} className="btn text-info p-0" style={{lineHeight:'32px',fontSize:"0.9rem",fontWeight:'500'}}>Follow</button> 
    :     
    <button onClick={async()=> await followUser(props.suggestedUser._id)} className="btn text-info mx-4 p-0" style={{width:'83px',height:'32px',lineHeight:'32px',fontSize:"0.9rem",fontWeight:'500'}}>Follow</button>}
    </>
    
  )
}

export default FollowButton2