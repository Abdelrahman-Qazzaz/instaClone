import React from 'react'

function RightArrowIcon(props) {
  const width = props.width ? props.width : '26'
  const color = props.color ? props.color : 'black'
  return (
    props.feedPost
    ?
  <svg  xmlns="http://www.w3.org/2000/svg" style={{color:'#EEEEEE'}} width={width}  fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
  </svg>
    :
    <svg xmlns="http://www.w3.org/2000/svg" width={width} style={{color}} fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
    </svg>
  )
}

export default RightArrowIcon