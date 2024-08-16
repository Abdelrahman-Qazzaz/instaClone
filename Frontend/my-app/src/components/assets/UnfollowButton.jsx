import React, { useContext } from 'react'
import DownArrow from './DownArrow'
import userContext from '../../UserContext'

function UnfollowButton(props) {
  const { toggleUnfollowConfirmationScreen } = useContext(userContext)
  return (
    <>
    {props.DesktopOnlySuggestedPage 
      ? 
      <button onClick={() => toggleUnfollowConfirmationScreen(props.suggestedUser)} className="btn p-1" style={{backgroundColor:'#EEEDEB',fontWeight:'550'}}>Following</button>
      :
      props.ProfilePage 
      ? 
      <button onClick={() => toggleUnfollowConfirmationScreen(props.suggestedUser)} className="btn me-2 py-0 d-flex justify-content-center" style={{width:'95px',height:'28px',lineHeight:'28px',backgroundColor:'#EEEEEE'}}><div className='d-flex justify-content-center'><div className='me-1' style={{fontSize:'0.9rem'}}>Following</div> <DownArrow/></div></button>
      :
      <button onClick={() => toggleUnfollowConfirmationScreen(props.suggestedUser)} className="btn mx-4 p-0" style={{width:'83px',height:'32px',lineHeight:'32px',backgroundColor:'#EEEDEB',fontWeight:'550',lineHeight:'32px'}}>Following</button>
    }
    </>
  )
}

export default UnfollowButton