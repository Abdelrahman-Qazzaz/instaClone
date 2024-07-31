import { TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../../UserContext'
import Caption from '../Caption'
import Comment from '../Comment'
import BlackHeart from '../assets/BlackHeart'
import CommentIcon from '../assets/CommentIcon'
import RedHeart from '../assets/RedHeart'
import SavePostIcon from '../assets/SavePostIcon'
import ShareIcon from '../assets/ShareIcon'
import UnsavePostIcon from '../assets/UnsavePostIcon'


function PostInfo(props) {

    const { user,toggleSharePostScreen,postComment,postReply,formatCreationDate,savePost, } = useContext(userContext)
    const [input,setInput] = useState('')
    const [btnDisable,setBtnDisable] = useState(true)
    const [btnOpacity,setBtnOpacity] = useState(0.3)
    const userIsReplying = useRef()
    const userReplyingToComment_id = useRef(-1)
    const [postCreationDate,setPostCreationDate]= useState()

    useEffect(()=>{
       const formattedAge =  formatCreationDate(props.post.creationDate)
       setPostCreationDate(formattedAge)
    },[])
    async function handlePostComment (){
       const newComment = await postComment(props.post._id,input)
      
       props.setPost((prev)=>{
        const newComments = prev.comments &&  prev.comments.length ? [...prev.comments, newComment] : [newComment]
        newComments.sort((a,b)=> b.creationDate - a.creationDate)
        return{...prev,comments:newComments}})
        setInput('')
    }
    async function handlePostReply (){
        const newComments = await postReply(props.post._id,userReplyingToComment_id.current,input)
        props.setPost((prev)=> ({...prev,comments:newComments}))
         setInput('')
    }



    function handleChange(e){
        const { value } = e.target
        if(value.length != 0 ){
            setBtnOpacity(1)
            setBtnDisable(false)
        }
        setInput(value)
    }
    
  return (
    <div style={{height:'100%',zIndex:1,backgroundColor:'white',border:' red',maxWidth:'550px',minWidth:'300px',height:'500px'}} className={`d-flex justify-content-center p-2`}>
    <div className="d-flex flex-column" style={{border:'',width:'97%'}}>
        <div className='flex-grow-1 mt-1 d-flex flex-column' style={{height:'',overflowY:'auto',border:'',width:''}}>
            {props.post.caption ? <Caption post={props.post} owner={props.owner}/> : null}
            {props.post.comments ? props.post.comments.map((comment)=>(
                <div className='mt-4'><Comment comment={comment} setInput={setInput} userIsReplying={userIsReplying} userReplyingToComment_id={userReplyingToComment_id} post={props.post} setPost={props.setPost}/></div>
                )) : null }
        </div>
        <div style={{height:'45px',border:''}} className=' d-flex'>
            <div style={{flex:1,border:''}} className='d-flex align-items-center'>
                <button onClick={props.handleHeartClick} className='p-0' style={{border:'none',backgroundColor:'transparent'}}>
                    {
                        props.post.likes && props.post.likes.find((like)=>like.byUser_id == user._id)
                        ?
                        <RedHeart/>
                        :
                        <BlackHeart/>
                    }
                </button>
                <button onClick={()=>{props.inputRef.current.focus()}} className='ms-3 p-0' style={{border:'none',backgroundColor:'transparent'}}><CommentIcon ProfilePagePost={true}/></button>
                <button onClick={()=>toggleSharePostScreen(props.post)} className='ms-3 p-0' style={{border:'none',backgroundColor:'transparent'}}><ShareIcon ProfilePagePost={true}/></button>
            </div>
            <button onClick={()=>savePost(props.post._id)} style={{width:'24px',border:'none',backgroundColor:'transparent'}} className='d-flex align-items-center p-0'>
                {user.savedPosts_ids.find((savedPosts_id)=> savedPosts_id == props.post._id) ? <UnsavePostIcon/>: <SavePostIcon/>}
            </button>
        </div>
        <div style={{height:'15px'}}>{props.post.likes ? <p className='fw-bold'>{props.post.likes.length} likes</p> : <p>Be the first to <button className='p-0'style={{border:'none',backgroundColor:'transparent',fontWeight:'500'}}>like this</button></p> }</div>
        <div style={{height:'10px',color:'#758694',fontSize:'0.8rem'}} className='my-3'>{postCreationDate}</div>
        <div className='mb-2 d-flex align-items-end' style={{height:'90px'}}><TextField inputRef={props.inputRef} onChange={handleChange} value={input} className='p-0' id="outlined-basic" label="Add a comment..." size="medium" style={{width:'100%'}} InputProps={{endAdornment:(<button disabled={btnDisable} onClick={userIsReplying.current ?  handlePostReply : handlePostComment} className='btn text-info fw-bold' style={{opacity:btnOpacity,fontSize:'13px',border:'none'}}>Post</button>)}}/></div>
    </div>
</div>
  )
}

export default PostInfo