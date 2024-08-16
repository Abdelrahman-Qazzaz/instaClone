import React from 'react'
import { useNavigate } from 'react-router-dom'



function SuggestedPost(props) {

  const navigate = useNavigate()
  console.log(props)

  return (
    props.post
    ?
      props.vidOnly 
      ?
      props.post.firebasePathURLs[0].type == 'video'
      ?
      <button onClick={() => {navigate('/p/'+props.post._id)}} style={{position:'relative',border:'none',backgroundColor:'transparent'}} className='p-0'>
      <div style={{position:'absolute',left:'85%',top:'5%',}}>

      </div>
      <div style={{width:'100%',height:'260px',border:'none',backgroundColor:''}}>
          <video width='100%' height='100%' style={{objectFit:'contain',objectPosition:"center",backgroundColor:'rgba(0,0,0,0.90)'}} src={props.post.firebasePathURLs[0].fileUrl} alt='vid'></video>
      </div>
    </button>
    :
    null
      :
        <button onClick={() => {navigate('/p/'+props.post._id)}} style={{position:'relative',border:'none',backgroundColor:'transparent'}} className='p-0'>
          <div style={{position:'absolute',left:'85%',top:'5%',}}>

          </div>
          <div style={{width:'100%',height:'260px',border:'none',backgroundColor:''}}>
            {
              props.post.firebasePathURLs[0].type == 'video'
              ?
              <video width='100%' height='100%' style={{objectFit:'contain',objectPosition:"center",backgroundColor:'rgba(0,0,0,0.90)'}} src={props.post.firebasePathURLs[0].fileUrl} alt='vid'></video>
              :
              <img width='100%' height='100%' style={{objectFit:'contain',objectPosition:"center",backgroundColor:'rgba(0,0,0,0.90)'}} src={props.post.firebasePathURLs[0].fileUrl} alt="Post"/>
            }
          </div>
        </button>
        :
        null
  )
}

export default SuggestedPost