import React, { useContext, useEffect, useState } from 'react'

import BlackHeart from '../assets/BlackHeart'
import CommentIcon from '../assets/CommentIcon'
import SavePostIcon from '../assets/SavePostIcon'
import ShareIcon from '../assets/ShareIcon'

import userContext from '../../UserContext'
import RedHeart from '../assets/RedHeart'
import UnsavePostIcon from '../assets/UnsavePostIcon'
import ImagesAndVidsPreviewCarousel from '../ImagesAndVidsPreviewCarousel'
import PostInfo from './PostInfo'
import styles from './profilePage.module.css'


function MobileOnlyPPPSection(props) {
  const [showPostInfo,setShowPostInfo] = useState(false)
  const { savePost,user,formatCreationDate,setSharePostScreenPostData } = useContext(userContext)
  const [postCreationDate,setPostCreationDate] = useState()

  useEffect(()=>{
    const formattedCreationDate = formatCreationDate(props.post.creationDate)
    setPostCreationDate(formattedCreationDate)
  },[])
  return (
    <div style={{border:'',width:'100%',maxWidth:'400px',zIndex:1}} className={`${styles.hideForDesktop} `}>
      <div style={{height:'100%',border:''}} className="d-flex flex-column">
{        !showPostInfo
        ?
        <>
        <div className={styles.hideForDesktop} style={{border:''}}>
          <ImagesAndVidsPreviewCarousel forPPP={true} slides={props.post.firebasePathURLs}/>
        </div>
        <div className={`${styles.hideForDesktop} flex-grow-1`} style={{border:' blue',backgroundColor:'white'}}>    
            <div  style={{minHeight:'100px',backgroundColor:'',border:' green',width:'100%',zIndex:1}} className='d-flex justify-content-center'>
                <div className='d-flex flex-column' style={{border:'red',height:'45px',width:'98%'}} >
                    <div className='d-flex mt-2'>
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
                            <button onClick={()=> setShowPostInfo(true)} className='ms-3 p-0' style={{border:'none',backgroundColor:'transparent'}}><CommentIcon ProfilePagePost={true}/></button>
                            <button onClick={()=>setSharePostScreenPostData(props.post)} className='ms-3 p-0' style={{border:'none',backgroundColor:'transparent'}}><ShareIcon ProfilePagePost={true}/></button>
                        </div>
                        <button onClick={()=>savePost(props.post._id)} style={{width:'24px',border:'none',backgroundColor:'transparent'}} className='d-flex align-items-center p-0'>
                        {user.savedPosts_ids.find((savedPosts_id)=> savedPosts_id == props.post._id) ? <UnsavePostIcon/>: <SavePostIcon/>}
                        </button>
                    </div>
                    <div className='mt-2' style={{height:'15px'}}>{props.post.likes ? <p className='fw-bold'>{props.post.likes.length} likes</p> : <p>Be the first to <button className='p-0'style={{border:'none',backgroundColor:'transparent',fontWeight:'500'}}>like this</button></p> }</div>
                    <div className='mt-3' style={{height:'10px',color:'#758694',fontSize:'0.8rem'}} >{postCreationDate}</div>
                </div>
              </div>
        </div>   
       </>
        :
        <div style={{position:"fixed",top:0,left:0,width:'100vw',height:'100vh',border:" red"}} className='d-flex justify-content-center align-items-center'>
          <PostInfo post={props.post} setPost={props.setPost} owner = {props.owner} setInput = {props.setInput} userIsReplying =  {props.userIsReplying} userReplyingToComment_id = {props.userReplyingToComment_id} handleHeartClick =  {props.handleHeartClick} inputRef = {props.inputRef} handleChange = {props.handleChange} input =          {props.input} btnDisable =     {props.btnDisable} btnOpacity =     {props.btnOpacity}/>
        </div>
      }
      </div>
</div>
  )
}

export default MobileOnlyPPPSection