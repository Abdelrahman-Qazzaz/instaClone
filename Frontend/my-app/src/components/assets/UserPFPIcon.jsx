import React from 'react'

function UserPFPIcon(props) {
  const src = props.src ? props.src : "/defaultInstaPFP.jpg"
  let width = props.forCard ? '74px' : props.forDesktopOnlySuggestions ? '100%': '30px'

  return (
    <div className='' style={{width:width,height:width,borderRadius:'50%',overflow:'hidden',}}>
        <img className='card-img-top' width='100%' height='100%' src={src} alt="userPFP" />
    </div>
  )
}

export default UserPFPIcon