import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../UserContext';
import Chat from './Chat Page/Chat';
import DesktopOnlyChatPageSearchUsers from './Chat Page/DesktopOnlyChatPageSearchUsers';
import UserTab from './UserTab';
function Inbox() {

  const params = useParams()



   
    const { user,createChatAndGetIts_id,fetchChat } = useContext(UserContext)
    const location = useLocation()
    const [path,setPath] = useState(location.pathname)
    const navigate = useNavigate()
    const [targetUser,setTargetUser] = useState(null)
    
    async function openChat(following){
      setTargetUser(following)
      let chat_id = getCommonElement(user.chats_ids,following.chats_ids)
      if(!(chat_id)){
        chat_id = await createChatAndGetIts_id(user._id,following._id) // create a chat between these two users... yes passing the user._id is unnecessary but its just for enhancing readability.
        navigate(`t/${chat_id}`)
        setPath(`t/${chat_id}`)
      }
      else{
      navigate(`t/${chat_id}`)
      setPath(`t/${chat_id}`)
    }
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

        // PE
  useEffect(()=>{ // handles opening the chat from the profile page.
    if(params['*'].split('/')[0] == 't'){
      setupForOpeningChatFromProfilePage()
  }
  },[])
  //

    async function setupForOpeningChatFromProfilePage(){
        const chat_id = params['*'].split('/')[1]
        const chat = await fetchChat(chat_id)
        const targetUser_id = chat.user1_id == user._id ? chat.user2_id : chat.user1_id
        const targetUser = user.following.find((target)=> target._id == targetUser_id)
        setTargetUser(targetUser)
        
    }
  return (
    <div className='d-flex justify-content-center' style={{ width:'100%',border:'2px solid blue',height:'100%',}}>
        
        <div className='d-none d-md-block col-5'> {/*desktop only*/}
          {user && user.following && user.following.map((following)=>
            ( <UserTab noBottomBorder={true} inbox={true} targetUser={following} onClick={() => openChat(following)}/>))}
        </div> 
        {
        path == '/direct/inbox/' /*mobile only, if no chat is open, display this*/
        ? 
  
                <div className='d-md-none col-12'>
                {user.following.map((following)=>
                ( <UserTab targetUser={following} onClick={() => openChat(following)}/>)
                )}
              </div>
        :
        null
        }

        

        <Routes>
          <Route  path='/' element={<DesktopOnlyChatPageSearchUsers/>} /> {/*desktop only*/}
          {targetUser ? <Route path='/t/*' element={<Chat targetUser={targetUser} path={path}/>} /> : null}
        </Routes>

    </div>
  )
}

export default Inbox

