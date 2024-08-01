import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FeedPost from '../assets/FeedPost'

function ChatPostLink(props) {

    const [post,setPost] = useState()

    useEffect(()=>{
        setup()
    },[])

    async function setup(){
       
       const { data } =  await axios.get(`${process.env.REACT_APP_BACKENDAPI}/posts/${props.post_id}`)
       const { targetPost } = data 
       setPost(targetPost)
    }

  return (
    <div className='bg-dark'>
        {
            post
            ?
            <FeedPost post={post} chatPostLink={true}/>
            :
            null
        }
     
    </div>
  )
}

export default ChatPostLink