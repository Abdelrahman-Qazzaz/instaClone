import React from 'react'
import ThreeDots from './ThreeDots'

function MsgNavButton() {
  return (
    <>
    <button className="btn btn-secondary p-0" style={{width:'83px',height:'32px',lineHeight:'32px',marginLeft:'25px'}}>Message</button>
    <button className="btn" style={{backgroundColor:'transparent',height:'32px',display:'flex',alignItems:'center'}}>
        <ThreeDots/>
    </button>
    </>
  )
}

export default MsgNavButton