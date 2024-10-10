import React, { useContext, useEffect, useState } from 'react'
import userContext from '../UserContext'
import ChatPostLink from './Chat Page/ChatPostLink'

function Message(props) {

    const { user } = useContext(userContext)

    const [sentByUser,setSentByUser] = useState(null)
    useEffect(()=>{
        if(user && user._id && user._id != -1){
            if(user._id == props.message.sender_id)
                {setSentByUser(true)}
            else
                {setSentByUser(false)}
        }
    },[user])


 
  return (
    sentByUser === null
    ?
    <></>
    :
    sentByUser
    ?
    <div className='me-2 my-1 d-flex flex-column align-items-end ' >
        { props.message.text ?
       

            
       props.message.text.startsWith('POST_ID')
       ?
       <div className='text-light p-2' style={{borderRadius:props.borderRadius}}>
       <ChatPostLink post_id={props.message.text.split('POST_ID')[1].trim()}/>
       </div>
       :
       <div className='bg-primary text-light p-2' style={{borderRadius:props.borderRadius}}>
       {props.message.text}
       </div>
       


   : null}
        {props.message.firebasePathURLs && props.message.firebasePathURLs.length ? props.message.firebasePathURLs.map((url)=>(
            url.type == 'image'
            ?
            <img className='my-1' src={url.fileUrl} style={{width:'150px',height:'150px',borderRadius:'8%'}} alt="" />
            :
            <video className='my-1' src={url.fileUrl} style={{width:'150px',height:'150px',borderRadius:'8%'}} alt="" ></video>
        )) : null}
    </div>
    :
    <div className='ms-2 my-1 d-flex flex-column align-items-start ' >
        { props.message.text ?
       

            
            props.message.text.startsWith('POST_ID')
            ?
            <div className='text-light p-2' style={{borderRadius:props.borderRadius}}>
            <ChatPostLink post_id={props.message.text.split('POST_ID')[1].trim()}/>
            </div>
            :
            <div className='bg-secondary text-light p-2' style={{borderRadius:props.borderRadius}}>
            {props.message.text}
            </div>
            


        : null}
        {props.message.firebasePathURLs && props.message.firebasePathURLs.length ? props.message.firebasePathURLs.map((url)=>(
            <img className='my-1' src={url.fileUrl} style={{width:'150px',height:'150px',borderRadius:'8%'}} alt="" />
        )) : null}
    </div>
  )
}

export default Message