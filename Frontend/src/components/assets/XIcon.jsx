import React from 'react'

function XIcon(props) {
  let color =  props.color ? props.color : props.forDesktopOnlyExtendedNavBar || props.ProfilePagePost ? 'white' : '#758694'
      color = props.chatImagePreview ? 'black' : color;
  const width =  props.width ? props.width : props.forDesktopOnlyExtendedNavBar ? '14' : props.ProfilePagePost || props.sharePostScreen ? '35' : '24'
  return (
    <svg style={{color:color}} xmlns="http://www.w3.org/2000/svg" width={width} fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>
  )
}

export default XIcon