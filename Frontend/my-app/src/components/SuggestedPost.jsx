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
      <div style={{width:'100%',height:'260px',border:'',backgroundColor:''}}>
          <video width='100%' height='100%' style={{objectFit:'contain',objectPosition:"center"}} src={props.post.firebasePathURLs[0].fileUrl} alt='vid'></video>
      </div>
    </button>
    :
    null
      :
        <button onClick={() => {navigate('/p/'+props.post._id)}} style={{position:'relative',border:'',backgroundColor:'transparent'}} className='p-0'>
          <div style={{position:'absolute',left:'85%',top:'5%',}}>

          </div>
          <div style={{width:'100%',height:'260px',border:'',backgroundColor:''}}>
            {
              props.post.firebasePathURLs[0].type == 'video'
              ?
              <video width='100%' height='100%' style={{objectFit:'contain',objectPosition:"center"}} src={props.post.firebasePathURLs[0].fileUrl} alt='vid'></video>
              :
              <img width='100%' height='100%' style={{objectFit:'contain',objectPosition:"center"}} src={props.post.firebasePathURLs[0].fileUrl} alt="Post"/>
            }
          </div>
        </button>
        :
        null
  )
}

export default SuggestedPost