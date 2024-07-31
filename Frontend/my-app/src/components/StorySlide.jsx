import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../UserContext';
import LeftArrowFillIcon from './assets/LeftArrowFillIcon';
import RightArrowFillIcon from './assets/RightArrowFillIcon';
import XIcon from './assets/XIcon';
import StoryProgressBars from './StoryProgressBars';

function StorySlide(props) {

    const videoRef = useRef()
    const [vidIsPaused,setVidIsPaused] = useState(true)
    const [hasBeenPlayingFor,setHasBeenPlayingFor] = useState(0)
    const [progressBarArray,setProgressBarArray] = useState([])
    const { updateStorySlideViewsAndUpdateUserData,user,formatAge } = useContext(userContext)
    const [slideAge,setSlideAge] = useState()
    

  const navigate = useNavigate()
        const handleNext = () => {
          

          let forLoop = true
          if(props.currentSlide == props.numOfSlides - 1){
            if(props.autoPlay){
              for(const nextUser of user.following){
                if(nextUser.username != props.targetUser.username)
                  if(forLoop){
                    if(nextUser.story){
                      if(nextUser.story.slides){
                        const unwatched = nextUser.story.slides.find((slide)=> {
                          
                          if(!(slide.views)) // if slide has no views
                            {return true}
                          const filtered = slide.views.filter((view)=> view.user_id == user._id)
                          if(filtered.length == 0){
                          return true
                          }


                        }) 
                        if(unwatched){
                          forLoop = false
                          navigate(`/stories/${nextUser.username}?autoPlayNext=true`)
                          console.log(nextUser.username)
                        }
                        else{
                          navigate('/')
                        }
                      }
                    }}
              }
            }
            else{
              navigate('/')
            }



          }
    
            props.setCurrentSlide((prevSlide) => (prevSlide + 1));
            
          };

          const handlePrev = () => {
            props.setCurrentSlide((prevSlide) => (prevSlide - 1));
          }
        
    
    
    
    function toggleVidPlay(){
      if(videoRef.current.paused){
        videoRef.current.play()
        setVidIsPaused(false)//for icons
      }
      else{
        videoRef.current.pause()
        setVidIsPaused(true)// for icons
      }
    }
    
    useEffect(()=>{
      const formattedAge = formatAge(props.slide.id)
      setSlideAge(formattedAge)
    },[props.currentSlide])

    useEffect(()=>{

      handleProgressBarsArray()
      updateStorySlideViewsAndUpdateUserData(props.slide.id,props.targetUser.username)


      let temp = 0
      let duration = props.slide.duration
      const interval = setInterval(()=>{
        if(temp >= 0){setHasBeenPlayingFor((prev)=>prev+0.1)
        temp+= 0.1

    }
        if(temp > duration){
          temp = -1 // this is just so that the interval doesnt keep running while handleNext is executing
          handleNext()
        }
      },100)

      return async()=> {
        clearInterval(interval)
        console.log('interval cleared')
      }
    },[])

    useEffect(()=>{
      handleProgressBarsArray()
    },[props.numOfSlides])
 

   function handleProgressBarsArray(){
    const temparray = []
    for(let i = 0; i<props.numOfSlides ; i++){
        temparray.push('push')
    }
    setProgressBarArray(temparray) 
   }


  return (
    <>


      <div style={{position:'absolute',width:'100%',border:'',height:'100%'}} className='d-flex flex-column align-items-center'>
        <div style={{top:0,left:0,height:'50px',width:'98%'}} className='d-flex flex-column '>
          <div style={{border:''}}>
          
              <StoryProgressBars key={props.targetUser.username} progressBarArray={progressBarArray} currentSlide={props.currentSlide} slideDuration={props.slide.duration} hasBeenPlayingFor={hasBeenPlayingFor}/>


                <div className='d-flex justify-content-between align-items-center' style={{height:'100%'}}>
                    <div className='d-flex align-items-center' style={{border:'',height:'100%'}}>
                        <img width='32px' height='32px' style={{borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ? props.targetUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'}/>
                        <div style={{color:'white'}} className='ms-2'>{props.targetUser.username}</div>
                        <div style={{color:'white',opacity:'0.7'}} className='ms-2'>{slideAge}</div>
                    </div>
                    <div className=''>
                      <button onClick={()=> navigate('/')} className='p-0' style={{border:"none",backgroundColor:'transparent'}}>
                        <XIcon color='white' width='40'/>
                      </button>
                    </div>
                </div>
          </div>
        </div>
        <div style={{border:'',width:'98%'}} className='flex-grow-1 d-flex justify-content-between'>
                        <button onClick={handlePrev} className='btn p-0' style={{zIndex:1}}>
                          <LeftArrowFillIcon/>
                        </button>
                      <button onClick={handleNext} className='btn p-0 ' style={{zIndex:1}}>
                          <RightArrowFillIcon/>
                      </button>
        </div>
    </div>


{
props.slide.type == "image" 
? 
<img height='100%' width='320px' style={{objectFit:'cover'}} src={props.slide.firebasePathURL} alt="" /> 
: 
<video ref={videoRef} autoPlay height='100%' width='320px' style={{objectFit:'cover'}} src={props.slide.firebasePathURL}></video>
}


</>
  )
}

export default StorySlide

/**    <div style={{width:'100%',height:'100%',border:''}} className='d-flex justify-content-between align-items-center'>
        
                  </div> */