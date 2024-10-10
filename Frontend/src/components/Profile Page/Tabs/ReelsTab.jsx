import React from 'react'
import SuggestedPost from '../../SuggestedPost'

function ReelsTab(props) {
  console.log('here')
  return (
    <div className='mt-2' style={{display:'grid',gap:'4px',gridTemplateRows:'repeat(3, 1fr)',gridTemplateColumns:'repeat(3, 1fr)'}} >
         {props.targetUser.posts.length ? props.targetUser.posts.map((post)=>(
          <SuggestedPost post={post} vidOnly={true}/>
         )):null}
    </div>
  )
}

export default ReelsTab