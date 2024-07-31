import React, { useContext, useEffect } from 'react'
import styles from '../rest.module.css'
import userContext from '../UserContext'
import XIcon from './assets/XIcon'
import UserTab from './UserTab'
function SharePostScreen(props) {

    const { user,sendMessage,createChatAndGetIts_id,toggleSharePostScreen,setShowBlackBackground } = useContext(userContext)

    useEffect(()=>{
      setShowBlackBackground(true)
      return ()=>{
        setShowBlackBackground(false)
      }
    },[])
    
    async function handleClick(targetUser){
        let chat_id = getCommonElement(user.chats_ids, targetUser.chats_ids)
        if(!chat_id)
            {chat_id = createChatAndGetIts_id(user._id,targetUser._id)}
        const formData = new FormData() 
        formData.append('text','POST_ID '+props.post._id)
       await sendMessage(chat_id,formData)
       toggleSharePostScreen()
    }

    function getCommonElement(arr1, arr2) {
        if(arr1 && arr2){
          for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
              if (arr1[i] === arr2[j]) {
    
                return arr1[i];
              }
            }
          }
        }
          return false;
        }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',border:'2px solid red',zIndex:6}}>
        <div className={`${styles.sharePostScreen} d-flex flex-column`} style={{backgroundColor:'white',zIndex:4,borderRadius:'2%'}}>
            <div style={{height:'45px'}} className='d-flex flex-column justify-content-center border-bottom'>
                <div className='d-flex'>
                    <div style={{width:'33%'}}></div>
                    <div style={{width:'33%',fontWeight:'650',fontSize:'18px'}} className='d-flex justify-content-center align-items-center'>Share</div>
                    <div style={{width:'33%'}} className='d-flex justify-content-end align-items-center'>
                      <button onClick={toggleSharePostScreen} className='p-0' style={{border:"none",backgroundColor:'transparent'}}>
                        <XIcon sharePostScreen={true} color={'black'}/>
                      </button>
                    </div>
                </div>
            </div>
            <div className='flex-grow-1 d-flex flex-column align-items-center' style={{border:'2px solid red'}}>
                <div className='flex-grow-1 border-bottom' style={{width:'100%'}}>
                    {user.following.map((targetUser) => (<UserTab targetUser={targetUser} onClick={()=>handleClick(targetUser)}/>))}
                </div>


            </div>
        </div>
    </div>
    </>
  )
}

export default SharePostScreen