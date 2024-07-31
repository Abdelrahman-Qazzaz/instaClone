import React from 'react'
import MessengerIcon from '../assets/MessengerIcon'

function DesktopOnlyChatPageSearchUsers() {
  return (
    <div className='border border-left d-none d-md-flex flex-column col-7 justify-content-center align-items-center' style={{border:'2px solid red'}}>
        <div style={{width:'96px',height:'96px', border:'2px solid black',borderRadius:'50%'}} className='d-flex justify-content-center align-items-center'>
            <MessengerIcon width='60%' />
        </div>
        <div className='mt-2' style={{fontSize:'20px',}}>Your messages</div>
        <div className='mt-2' style={{fontSize:'14px',color:'#758694'}}>Send a message to start a chat.</div>
  </div> 
  )
}

export default DesktopOnlyChatPageSearchUsers