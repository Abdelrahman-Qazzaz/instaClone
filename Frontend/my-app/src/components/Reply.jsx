import React, { useContext, useEffect, useState } from 'react'
import userContext from '../UserContext'
import BlackHeart from './assets/BlackHeart'
import RedHeart from './assets/RedHeart'

function Reply(props) {



    const [tag,setTag] = useState()
    const [replyAge,setReplyAge] = useState()
    const [text,setText] = useState()
    const { formatAge,user,handleReplyLikeUnlike } = useContext(userContext)



    useEffect(()=>{
        getFormattedReply()
    },[])

    useEffect(()=>{
      const formattedAge = formatAge(props.displayedReply.creationDate)
      setReplyAge(formattedAge)
    },[])


    function getFormattedReply(){
        const content = props.displayedReply.content
        const subStrings = content.split(' ')
        const tag = subStrings.find((subString) => subString.startsWith('@'))
        
        let text = ''
        for(const subString of subStrings){
            if(subString != tag)
                {text += ' ' + subString + ' '}
        }
        if(tag){setTag(tag)}
        setText(text)
    }
    async function handleClick(){
      const newComments =  await handleReplyLikeUnlike(props.post._id,props.comment.id,props.displayedReply.id); // from UserContext
      props.setPost((prev)=> {
        return{...prev,comments:newComments}})

    }

  

  return (
    props.displayedReply
    ?
    <div className='mt-3 mb-4 d-flex' style={{width:'100%',border:'2px solid red',fontSize:'16px'}}>


      <img width='32px' height='32px' src={props.displayedReply.owner.pfpFirebasePathURL ? props.displayedReply.owner.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="userPFP" style={{borderRadius:'50%'}} />
      <div className='flex-grow-1 ms-3 d-flex flex-column' style={{border:''}}> 
        <div>
          <div className='me-3' style={{float:'left',fontWeight:'550'}}>
            {props.displayedReply.owner ? props.displayedReply.owner.username : null}
          </div>
          <div className='flex-grow-1' style={{border:'',wordBreak:'break-word',height:'fit-content'}}>
            {tag ? <a href={tag.replace('@','/')} style={{textDecoration:'none'}}>{tag}</a> : null}<span className='ms-1'>{text}</span>
          </div>
        </div>
        <div style={{border:'',color:'#758694',fontSize:'13px'}} className='d-flex'>
          <div className='text-center'>{replyAge}</div>
          <div className='ms-3 text-center'> {props.displayedReply.likes ? props.displayedReply.likes.length : '0'} likes</div>
          <div className='ms-3 text-center'><button onClick={() => {props.userReplyingToComment_id.current = props.displayedReply.id ;props.userIsReplying.current = true; props.setInput('@'+props.displayedReply.owner.username)}} className='p-0' style={{border:'none',backgroundColor:'transparent',color:'#758694'}}>Reply</button></div>

        </div>

      </div>
      <div style={{border:''}} className='me-3'>
            <button onClick={handleClick} className='p-0' style={{border:'none',backgroundColor:'transparent'}}>
              {
              props.displayedReply.likes && props.displayedReply.likes.some((like)=>like.byUser_id == user._id)
              ?
              <RedHeart width='12px'/>
              :
              <BlackHeart width='12px'/>
              }
            </button>
        </div>

    


    </div>
  :
  null
  )
}
/*
    <div style={{border:''}} className='d-flex'>
          <div>{replyAge}</div>
        </div> */

export default Reply

