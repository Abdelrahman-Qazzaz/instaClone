import React, { useEffect, useState } from 'react';
import styles from './assets/assets.module.css';
import SendButton from './assets/SendButton';
import TextIcon from './assets/TextIcon';
import XIcon from './assets/XIcon';
import DraggableTextInput from './DraggableTextInput';
import StorySlide from './StorySlide';

function StoriesCarousel(props) {


const [currentSlide,setCurrentSlide] = useState(0)


useEffect(()=>{
  setCurrentSlide(0)
},[props.targetUser])


  return ( 
    props.myStory //this one isnt actually a carousel 
    ?
    <> 
    {props.showTextInput ? <DraggableTextInput onChange={props.onChange} input={props.input} color={props.color} setColor={props.setColor} currentTextFieldPosition={props.currentTextFieldPosition} setCurrentTextFieldPosition={props.setCurrentTextFieldPosition}/>: null}
    <div style={{height:'100%',position:'relative',border:'',width:''}} className={`${styles.storyResponsiveMinWidth} d-flex flex-column align-items-center`}>
        <div style={{position:'absolute',border:'',top:0,left:0,width:'100%',height:"100%"}} className='d-flex flex-column'>
            <div style={{position:'',border:'',width:'100%',top:0,left:0,height:'45px',}} className='flex-grow-1 d-flex justify-content-between align-items-start mt-2'>
                <div className='d-flex align-items-center'>
                    <XIcon color='white' width='40'/>
                </div>
                <div style={{border:''}} className='d-flex align-items-center'>
                    <button onClick={props.toggleTextInput} className='p-0' style={{border:'none',backgroundColor:'transparent',}}><TextIcon/></button>
                </div>
            </div>
            <div className="d-flex justify-content-end mb-3" style={{border:''}}>
                <div className='me-3' style={{zIndex:1}}>
                    <SendButton onClick={props.handleClick}/>
                </div>
            </div>
        </div>
        <div style={{position:'',top:0,left:0,height:'100%',width:'100%',border:""}}>
            {
            props.tempFile.type == 'image'
            ?
            <img height='100%' width='320px' style={{objectFit:'cover'}} src={props.tempFile.objectUrl} alt="" /> 
            :
            <video height='100%' width='320px' style={{objectFit:'cover'}} src={props.tempFile.objectUrl}></video>
            }
        </div>
    </div>
    </>
    :
    props.slides.map((slide,index)=> (
    <div style={{height:'100%',border:'',backgroundSize:'cover',backgroundPosition:'center',position:'relative'}} className={`${styles.storyResponsiveMinWidth}   ${index === currentSlide ? '' : 'd-none'}`}>
      {index === currentSlide ? <StorySlide autoPlay={props.autoPlay} slide={slide} targetUser={props.targetUser} numOfSlides={props.slides.length}/*this is purely for the progress bars, that's it, */  currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/> : null}
    </div> 
    ))

  )
}

export default StoriesCarousel

/*
import React,{ useEffect, useRef,useState } from 'react'
import LeftArrowIcon from './assets/LeftArrowIcon';
import RightArrowIcon from './assets/RightArrowIcon';
import DraggableTextInput from './DraggableTextInput';
import styles from './assets/assets.module.css'
import XIcon from './assets/XIcon';
import TextIcon from './assets/TextIcon';
import SendButton from './assets/SendButton';

function StoriesCarousel(props) {

    const videoRef = useRef()
const [vidIsPaused,setVidIsPaused] = useState(true)
const [currentSlide,setCurrentSlide] = useState(0)
const [hasBeenPlayingFor,setHasBeenPlayingFor] = useState(0)

 
    const handleNext = () => {
    


        setCurrentSlide((prevSlide) => (prevSlide + 1));
        
      };
    



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

  let temp = 0
 
  let duration 
  props.slides.map((slide,index)=>{
    if(index == currentSlide)
      {duration = slide.duration}
  })

  const interval = setInterval(()=>{
    if(temp >= 0){setHasBeenPlayingFor((prev)=>prev+0.1)
    temp+= 0.1}
    if(temp > duration){
      temp = -1 // this is just so that the interval doesnt keep running while handleNext is executing
      clearInterval(interval)
      setHasBeenPlayingFor(0)
      handleNext(interval)
      
      
    }
    
  },100)
},[currentSlide])


  



  return ( 
    props.myStory //this one isnt actually a carousel 
    ?
    <> 
    {props.showTextInput ? <DraggableTextInput onChange={props.onChange} input={props.input} color={props.color} setColor={props.setColor} currentTextFieldPosition={props.currentTextFieldPosition} setCurrentTextFieldPosition={props.setCurrentTextFieldPosition}/>: null}
    <div style={{height:'100%',minWidth:'300px',maxWidth:'320px',border:''.back,backgroundSize:'cover',backgroundPosition:'center',position:'relative'}} className={`${styles.storyResponsiveMinWidth} d-flex flex-column`}>
        <div style={{position:'',border:'',width:'100%',top:0,left:0,height:'45px',}} className='flex-grow-1 d-flex justify-content-between align-items-start mt-2'>
            <div className='d-flex align-items-center'>
                <XIcon color='white' width='40'/>
            </div>
            <div style={{border:''}} className='d-flex align-items-center'>
                <button onClick={props.toggleTextInput} className='p-0' style={{border:'none',backgroundColor:'transparent',}}><TextIcon/></button>
            </div>
        </div>
        <div className="d-flex justify-content-end mb-3" style={{border:''}}>
            <div className='me-3' style={{zIndex:1}}>
                <SendButton onClick={props.handleClick}/>
            </div>
        </div>
        <div style={{position:'absolute',top:0,left:0,height:'100%',width:'100%'}}>
            {
            props.tempFile.type == 'image'
            ?
            <img height='100%' width='100%' style={{objectFit:'cover'}} src={props.tempFile.objectUrl} alt="" /> 
            :
            <video height='100%' width='100%' style={{objectFit:'cover'}} src={props.tempFile.objectUrl}></video>
            }
        </div>
    </div>
    </>
    :
    props.slides.map((slide,index)=> (
    <div style={{height:'100%',minWidth:'300px',maxWidth:'320px',border:'',backgroundSize:'cover',backgroundPosition:'center',position:'relative'}} className={`${styles.storyResponsiveMinWidth}   ${index === currentSlide ? '' : 'd-none'}`}>
        <div style={{width:'100%',height:'100%',border:''}} className='d-flex justify-content-between align-items-center'>
        </div>
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:''}}>
            <div style={{position:'absolute',top:0,left:0,height:'50px',width:'100%'}} className='d-flex flex-column'>
                <div className='d-flex my-1'>

                        {props.slides.map((slide,index)=>(
                            index == currentSlide 
                            ?
                            <div class="progress ms-1" style={{border:'',width:'100%',backgroundColor:'#B4B4B8',height:'3px'}}>
                                <div class="progress-bar " role="progressbar"  style={{width:((hasBeenPlayingFor/slide.duration)*100)+'%',backgroundColor:'white'}}></div>
                            </div>
                            :

                            <div class="progress ms-1" style={{border:'',width:'100%',backgroundColor:'#B4B4B8',height:'3px'}}>
                                <div class="progress-bar " role="progressbar" style={{width:'0',backgroundColor:'white'}} ></div>
                            </div>
                            ))}
                    
                </div>
                <div className='d-flex justify-content-between' style={{height:'100%'}}>
                    <div className='d-flex align-items-center' style={{border:'',height:'100%'}}>
                        <img width='32px' height='32px' style={{borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ? props.targetUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'}/>
                        <div style={{color:'white'}} className='ms-2'>{props.targetUser.username}</div>
                    </div>
                    <div>mute</div>
                </div>
            </div>
            {
            slide.type == "image" 
            ? 
            <img height='100%' width='100%' style={{objectFit:'cover'}} src={slide.firebasePathURL} alt="" /> 
            : 
            <video ref={videoRef} autoPlay height='100%' width='100%' style={{objectFit:'cover'}} src={slide.firebasePathURL}></video>
            }

        </div>
    </div> 
    ))

  )
}

export default StoriesCarousel

/*


*/


