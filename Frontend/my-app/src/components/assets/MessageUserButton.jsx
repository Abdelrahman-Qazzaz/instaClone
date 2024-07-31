import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../../UserContext'

function MessageUserButton(props) {
  console.log(props)

  const { user,createChatAndGetIts_id } = useContext(userContext)
  const navigate = useNavigate()
  async function openChat(){
    let chat_id = getCommonElement(user.chats_ids,props.suggestedUser.chats_ids)
    if(!(chat_id)){

      chat_id = await createChatAndGetIts_id(user._id,props.suggestedUser._id) // create a chat between these two users... yes passing the user._id is unnecessary but its just for enhancing readability.
      navigate(`/direct/inbox/t/${chat_id}`)

    }
    else{
      console.log('dwq')
    navigate(`/direct/inbox/t/${chat_id}`)

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

  return (
    props.ProfilePage 
    ?
    <button onClick={openChat} className="btn me-2 py-0" style={{backgroundColor:'#EEEEEE',width:'83px',height:'28px',lineHeight:'28px'}}>Message</button>
    :
    <button className='btn p-0' style={{backgroundColor:'#EEEEEE',width:'83px',height:'32px',lineHeight:'32px'}}>Message</button>
  )
}

export default MessageUserButton