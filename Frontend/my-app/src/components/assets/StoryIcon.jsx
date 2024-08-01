import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./assets.module.css"


function StoryIcon(props) {

  const navigate = useNavigate()
  
  return (
    <div className=' mx-2' style={{display:'flex',alignItems:'center',border:'',zIndex:1}}> 
      <div>
        <div style={{border:'',}} className='d-flex flex-column justify-content-center align-items-center'>
            <div  style={{height:"56px",width:'56px'}}>
              <button onClick={()=> navigate(`/stories/${props.following.username}?autoPlayNext=true`)} className='p-0' style={{border:'none',backgroundColor:'transparent'}}>
                <div className={`${styles.storyIcon} m-0`} style={{borderRadius:'50%',border:'none'}}>
                  <div className={`${styles.innerStoryIcon} m-0`} style={{borderRadius:'50%',border:'none'}}>
                  <img style={{borderRadius:'50%'}} className='' width='100%' height='100%' src={ props.following.pfpFirebasePathURL ? props.following.pfpFirebasePathURL : '/defaultinstaPFP.jpg'} alt="" />
                  </div>
                </div>
              </button>
            </div>
            <div className='mt-1' style={{textAlign:'center',fontSize:'0.85rem',width:'',border:''}}>{props.following.username}</div>
        </div>
      </div>
    </div>
   
  )
}

export default StoryIcon