import React, { useContext, useEffect, useRef, useState } from 'react';
import Caption from '../Caption';

import { TextField } from '@mui/material';
import UserContext from '../../UserContext';
import ImageIcon from '../assets/ImageIcon';

import { useParams } from 'react-router-dom';
import ImagePreview from '../ImagePreview';
import Message from '../Message';

function Chat(props) {

  const params = useParams()
  const { user,sendMessage,socket,fetchChat,socketEmitUserEnteredChat } = useContext(UserContext)
  const [chat,setChat] = useState(null)
  const [input,setInput] = useState('')
  const [files,setFiles] = useState([])
  const scrollableDiv = useRef(null)

   // for the  notReallyACaption 



  socket.on('refetchThisChat',async()=>{
    const subStrings = props.path.split('/')
    let targetChat_id = subStrings[1]
     const targetChat = await fetchChat(targetChat_id)
     setChat(targetChat)
  })


  useEffect(()=>{
    setup()
    return ()=>{//clean up
      socket.emit('exittedChat')
    }
  },[])

  useEffect(()=>{
    socket.emit('exittedChat') 
    setup()
  },[params['*']])




  


  async function setup(){
    let targetChat_id = params['*']
    console.log(targetChat_id)
    const targetChat = await fetchChat(targetChat_id)
    socketEmitUserEnteredChat(targetChat_id)
    setChat(targetChat)
  }










  function handleChange(e){
    const { value } = e.target 
    setInput(value)
  }
  async function handleImage(e){
    let { files } = e.target
    setFiles((prev)=>{
      const repeated = prev.find((file)=> file == files[0]) ? true : false
      if(repeated)
        {return prev}
      else{
        return [...prev,files[0]]
      }
    })

  }
  async function handleKeyPress(e){
    const { key } = e
    if(key === 'Enter'){
      await handleSendMessage()
    }
  }

  
  async function handleSendMessage(){
    setInput('')
    setFiles([])
    const formData = new FormData()
    formData.append('text',input)
    for(const file of files){
      formData.append('files',file)
    }
    const newMessage = await sendMessage(chat._id,formData)
    setChat((prev)=> {
      const prevMessages = prev.messages
      const newMessages = [...prevMessages,newMessage]
      return {...prev,messages:newMessages}})


  }





useEffect(()=>{
  const timer = setTimeout(() => {
    const scrollHeight = scrollableDiv.current.scrollHeight;
    const elementHeight = scrollableDiv.current.clientHeight;
    const idealScrollPosition = scrollHeight - elementHeight;
    scrollableDiv.current.scrollTo(0, idealScrollPosition);
  }, 200); 

  return () => clearTimeout(timer);
},[chat])







 
//  function scrollToBottom (){
//   const scrollHeight = scrollableDiv.current.scrollHeight
//   const elementHeight = scrollableDiv.current.clientHeight;
//   const idealScrollPosition = scrollHeight - elementHeight;
//   scrollableDiv.current.scrollTo(0, idealScrollPosition);
//  }


 //

 function handleBorderRadius(index){



  const prevMessageSender_id = chat.messages[index-1] ? chat.messages[index-1].sender_id : null
  const currentMessageSender_id = chat.messages[index].sender_id
  const nextMessageSender_id = chat.messages[index + 1] ? chat.messages[index + 1].sender_id : null

  const typeA = currentMessageSender_id == user._id ? '18px 18px 0 18px' : '18px 18px 18px 0'
  const typeB = currentMessageSender_id == user._id ?'18px 0 0 18px'  : '0 18px 18px 0'
  const typeC = currentMessageSender_id == user._id ? '18px 0 18px 18px' : '0 18px 18px 18px'

     if(currentMessageSender_id == prevMessageSender_id  && currentMessageSender_id == nextMessageSender_id)
      {return typeB}
else if(currentMessageSender_id == prevMessageSender_id)
       {return typeC}
else if(currentMessageSender_id == nextMessageSender_id)
        {return typeA}

 }


  return (



<div className='col-md-7 col-12 justify-content-center align-items-center border border-left' style={{border:'10px solid purple',maxHeight:'100%'}}>
    
<div className='d-flex flex-column' style={{border:'',height:'100%'}}>
<div className='border-bottom p-2' style={{width:'',border:''}}>
  <Caption notReallyACaption={true} chat={chat} otherUser={props.targetUser}/>
</div>

<div ref={scrollableDiv} className='flex-grow-1 d-flex flex-column align-items-center mb-3' style={{border:'5px green',overflowY:'auto'}}>
  <div className='mt-5 d-flex flex-column align-items-center' style={{border:''}}>
    <img style={{width:'96px',height:'96px',}}  height='100%' src={props.targetUser && props.targetUser.pfpFirebasePathURL ? props.targetUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="" />
    <div className='mt-3' style={{fontWeight:'600',fontSize:'20px',textAlign:'center'}}>{props.targetUser ? props.targetUser.username : ''}</div>
  </div>

  <div className='flex-grow-1 d-flex align-items-end' style={{border:'5px blue',width:'100%'}}>
      <div className='flex-grow-1' style={{wordBreak:'break-word',maxHeight:'95%',border:''}}>
      {chat && chat.messages ? chat.messages.map((message,index)=><Message message={message} borderRadius={handleBorderRadius(index)}/>) : <></>}
      </div>
  </div>
</div>

    <div className='d-flex justify-content-center' style={{border:'',height:'50px',position:'relative',}}>
      <div className='d-flex flex-column align-items-center' style={{border:'',width:'90%'}}>

            <div className='d-flex' style={{width:'fit-content',border:'',alignSelf:'start',position:'absolute',top:'-55px',}}>
              {files.length ? files.map((file) =>(<ImagePreview file={file} setFiles={setFiles}/*for discarding images*//>)) : null}
            </div> 

            <div style={{height:'45px',width:'100%',border:'',}} className='d-flex justify-content-center align-items-center mb-3'>
              <TextField onKeyDown={handleKeyPress} onChange={handleChange} value={input} placeholder='Message...' size='small' InputProps={{endAdornment:(<button onClick={handleSendMessage} style={{fontSize:'0.875rem',fontWeight:'600'}} className='btn text-info'>Send</button>)}} style={{width:'100%'}}/>
              <label htmlFor="ImagesInput"><div className='ms-3'><ImageIcon /></div></label>
              <input id='ImagesInput' onChange={handleImage} hidden type="file"/>
            </div>

      </div>
    </div>



</div>
</div>

  )
}

export default Chat



