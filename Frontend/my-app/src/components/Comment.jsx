import React, { useContext, useEffect, useState } from 'react'
import userContext from '../UserContext'
import BlackHeart from './assets/BlackHeart'
import HorizontalLine from './assets/HorizontalLine'
import RedHeart from './assets/RedHeart'
import Reply from './Reply'


function Comment(props) {
  


  const [commentAge,setCommentAge] = useState()
  // const [displayedReplies, setDisplayedReplies] = useState([])
  const [buttonText,setButtonText] = useState(`View replies (${props.comment.replies.length})`)
  const { formatAge,user,handleCommentLikeUnlike } = useContext(userContext)
  const [forceUpdateTrigger, setForceUpdateTrigger] = useState({});
  const [numOfDisplayedReplies,setNumOfDisplayedReplies] = useState(0)




  useEffect(()=>{
    setButtonText(`View replies (${props.comment.replies.length})`)
  },[props.comment.replies.length])
  useEffect(()=>{
    const formattedAge = formatAge(props.comment.creationDate)
    setCommentAge(formattedAge)
  },[])
  useEffect(()=>{
    if(numOfDisplayedReplies >= props.comment.replies.length){
      setButtonText('Hide all replies')
    }
    else if(numOfDisplayedReplies != 0){
      setButtonText('Show more replies')
    }

  },[numOfDisplayedReplies])





 async function handleRepliesDisplay(){
  if(buttonText == 'Hide all replies'){
    setNumOfDisplayedReplies(0)
    setButtonText(`View replies (${props.comment.replies.length})`)
  }
  else{
    setNumOfDisplayedReplies((prev)=> prev + 3)
  }

 }

    async function handleClick(){
      const newComments = await handleCommentLikeUnlike(props.post._id, props.comment.id); // from UserContext
      props.setPost((prev)=> ({...prev,comments:newComments}))
    }

  



  return (
<div style={{width:'',border:''}}>
<div className='d-flex' style={{border:'',}}>
  <img width='32px' height='32px' src={props.comment.owner.pfpFirebasePathURL ? props.comment.owner.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="userPFP" style={{borderRadius:'50%'}} />
  <div className='flex-grow-1 ms-3' style={{border:' red'}}> 
    <div className='me-3' style={{float:'left',fontWeight:'550'}}>
      {props.comment.owner ? props.comment.owner.username : ''}
    </div>
    <div style={{border:'',wordBreak:'break-word',height:'fit-content',border:''}}>
      {props.comment.content}
    </div>
    <div style={{border:'',fontSize:'14px',color:'#758694'}} className='d-flex'>
      <div>{commentAge}</div>
      {props.comment.likes ? <div className='ms-3'>{props.comment.likes.length} likes</div>: null}
      <div className='ms-3'><button onClick={() => {props.userReplyingToComment_id.current = props.comment.id ;props.userIsReplying.current = true; props.setInput('@'+props.comment.owner.username)}} className='p-0' style={{border:'none',backgroundColor:'transparent',color:'#758694'}}>Reply</button></div>
    </div>
    {
    props.comment.replies.length 
    ?
    <div style={{border:' red',fontSize:'14px',}} className='d-flex'>
        <div className='ms-2 flex-grow-1' style={{border:' red'}}>
          <button onClick={handleRepliesDisplay}  className='p-0 d-flex' style={{border:'none',backgroundColor:'transparent',color:'#758694'}}>
            <div className='d-flex align-items-center'><div style={{height:'26px'}}><HorizontalLine/></div><div className='ms-2'>{buttonText}</div></div>
          </button>
          <div style={{border:' red'}}>
            {props.comment.replies.length ? props.comment.replies.map((displayedReply,index)=>(
             index + 1 <= numOfDisplayedReplies ? <Reply setPost={props.setPost} setInput={props.setInput} userReplyingToComment_id={props.userReplyingToComment_id} userIsReplying={props.userIsReplying} displayedReply={displayedReply} fetchData={props.fetchData} fetchPostData={props.fetchPostData} post={props.post} comment={props.comment}/> : null
            )) : null}
          </div>
        </div>
    </div>
    :
    null
    }
  </div>
  <div style={{border:''}} className='me-3'>
    <button onClick={handleClick} className='p-0' style={{border:'none',backgroundColor:'transparent'}}>
      {
      props.comment.likes && props.comment.likes.some((like)=> (like.byUser_id == user._id)) 
      ?
      <RedHeart width='12px'/>
      :
      <BlackHeart width='12px'/>
      }
    </button>
  </div>
  
</div>
</div>
  )
}

export default Comment 

/* 
i
*/