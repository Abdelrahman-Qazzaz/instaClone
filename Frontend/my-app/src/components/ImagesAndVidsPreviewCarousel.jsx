import React, { useRef, useState } from 'react';
import LeftArrowIcon from './assets/LeftArrowIcon';
import PauseVideoIcon from './assets/PauseVideoIcon';
import PlayVideoIcon from './assets/PlayVideoIcon';
import RightArrowIcon from './assets/RightArrowIcon';

function ImagesAndVidsPreviewCarousel(props) {




const videoRef = useRef()
const [vidIsPaused,setVidIsPaused] = useState(true)
const [currentSlide,setCurrentSlide] = useState(0)
const [userIsHovering,setUserIsHovering] = useState()
const [opacity,setOpacity] = useState('0.4')

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % props.slides.length);
      };
    
      const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 +  props.slides.length) %  props.slides.length);
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

     
  return (
 
    props.feedPost
    ?
    <div className="carousel mt-2" style={{width:'100%',height:'fit-content',position:'relative'}}>
        {props.slides.map((slide, index) => {
          const src = slide.fileUrl ? slide.fileUrl : slide.objectUrl ? slide.objectUrl : null
          return (
        <div className={`carousel-item ${index === currentSlide ? 'active' : ''}`} style={{border:'',width:'100%',height:'',position:'relative'}}>

          {slide.type.startsWith('video') ?<video ref={videoRef} style={{maxHeight:"400px",width:'100%',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',objectPosition:"center"}}  controls={false}><source src={src} type="video/mp4"/></video> : <img style={{maxHeight:"400px",width:'100%',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',objectPosition:"center"}} src={src}/>}

            
            
            
            <div style={{position:'absolute',height:'100%',width:'100%',top:0,left:0,border:'',}} className={`d-flex ${props.slides.length > 1 ? 'justify-content-between' : 'justify-content-center'} align-items-center`}  onMouseEnter={()=>{setUserIsHovering(true); setOpacity('1')}} onMouseLeave={()=>{setUserIsHovering(false); setOpacity('0.4')}}>  
              {props.slides.length > 1 ? <button onClick={handlePrev} className='p-0 ms-2' style={{width:'30px',height:'30px',border:'none',backgroundColor:'transparent',opacity:opacity}}><LeftArrowIcon width='30' feedPost={true}/></button> : null}
              {slide.type.startsWith('video') && vidIsPaused ? <button onClick={toggleVidPlay} className='p-0' style={{height:'fit-content',width:'fit-content',border:'none',backgroundColor:'transparent', opacity:opacity}}><PlayVideoIcon/></button> : null}
              {slide.type.startsWith('video') && !(vidIsPaused) && userIsHovering ? <button onClick={toggleVidPlay} className='p-0' style={{height:'fit-content',width:'fit-content',border:'none',backgroundColor:'transparent',opacity:opacity}}><PauseVideoIcon/></button> : null}
              {props.slides.length > 1 ? <button onClick={handleNext} className='p-0 me-2' style={{width:'30px',height:'30px',border:'none',backgroundColor:'transparent',opacity:opacity}}><RightArrowIcon width='30' feedPost={true}/></button> : null}
            </div> 
       
        </div>
      )})}
    </div>
    :
  props.forPPP
    ?
    <div className="carousel" style={{width:'100%',border:" green",zIndex:4}}>
     
    {props.slides.map((slide, index) => {
      
      const src = slide.fileUrl ? slide.fileUrl : slide.objectUrl ? slide.objectUrl : null
      return (
    <div className={`carousel-item ${index === currentSlide ? 'active' : ''}`} style={{border:' blue',height:'fit-content',maxWidth:'100%'}}>
      <div style={{width:'100%',height:'fit-content',overflow:'hidden'}} className=''>
      {slide.type.startsWith('video') ? <video  style={{maxWidth:'400px',maxHeight:"400px",width:'100%',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',objectPosition:"center"}} controls={false}><source src={src} type="video/mp4"/></video> : <img style={{maxWidth:'400px',maxHeight:"400px",width:'100%',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',objectPosition:"center"}} src={src}/>}
      </div>
    </div>
  )})}
  <div>       <button style={{zIndex:10,border:''}} className='btn p-0'><LeftArrowIcon color={'white'}/></button>
  <button><RightArrowIcon/></button>
</div>

</div>
    :
    <div className="carousel" style={{width:'100%'}}>
     
        {props.slides.map((slide, index) => {
          
          const src = slide.fileUrl ? slide.fileUrl : slide.objectUrl ? slide.objectUrl : null
          return (
        <div className={`carousel-item ${index === currentSlide ? 'active' : ''}`} style={{border:'',maxWidth:'100%'}}>
          <div style={{width:'100%',height:'400px',overflow:'hidden'}}>
          {slide.type.startsWith('video') ? <video  style={{height:'100%',width:'100%',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',}} controls={false}><source src={src} type="video/mp4"/></video> : <img style={{height:'100%',width:'100%',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',}} src={src}/>}
          </div>
        </div>
      )})}
      <div>       <button style={{zIndex:10,border:''}} className='btn p-0'><LeftArrowIcon color={'white'}/></button>
      <button><RightArrowIcon/></button>
</div>

    </div>
    )
}
export default ImagesAndVidsPreviewCarousel

/*

 props.forPPP     THIS IS NOT FOR CREATE POST
 ?
 <div className="flex-grow-1 carousel d-flex flex-column justify-content-center" style={{position:'relative'}}>
     <div style={{position:'absolute',top:'50%',width:'100%',border:'',zIndex:1}} className='d-flex justify-content-between'>
     <button className="carousel-button prev btn" onClick={handlePrev} style={{border:''}}>
         <LeftArrowIcon />
     </button>
     <button className="carousel-button next btn" onClick={handleNext}>
         <RightArrowIcon/>
     </button>
     </div>
   {props.firebasePathURLs.map((slide, index) => (
     <div
       className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
       style={{border:'',maxWidth:'100%'}}
     >
       {slide.type == 'video' ? (
         <video width="100%" height="100%" controls >
           <source src={slide.fileUrl} type="video/mp4" />
         </video>
       ) : (
         <img width="100%" height="100%" className="carousel-image" src={slide.fileUrl}  />
       )}
     </div>
   ))}

 </div>
 :
 <>

    
 <div className="carousel" style={{position:'relative',height:'100%',width:'100%',border:'',}}>
 <div style={{position:'absolute',top:'50%',width:'100%',border:'',zIndex:1}} className='d-flex justify-content-between'>
     <button className="carousel-button prev btn" onClick={handlePrev} style={{border:''}}>
         <LeftArrowIcon />
     </button>
     <button className="carousel-button next btn" onClick={handleNext}>
         <RightArrowIcon/>
     </button>
     </div>
   {props.tempFiles.map((slide, index) => (
     <div
       className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
       style={{border:'',width:'100%',height:'100%'}}
     >
       {slide.type == 'video' ? (
         <div style={{width:'100%',height:'100%',position:'relative'}} className='d-flex '>
           <video ref={videoRef} style={{width:'100%',height:'100%',borderRadius:'10px',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',}} controls={false} >
             <source src={slide.objectURL} type="video/mp4" />
           </video>
           <button onClick={toggleVidPlay} className='btn p-0' style={{position:'absolute',border:' red',width:'fit-content',height:'fit-content',top:'calc(50% - 75px)',left:'calc(50% - 75px)',zIndex:1}}>
             <PlayVideoIcon/>
           </button>
         </div>
       ) : (
         <img style={{border:' red',width:'100%',height:'100%',borderRadius:'10px',objectFit:'contain',backgroundColor:'rgba(0,0,0,1)',}}  src='/cr7.jpg' alt="" />
       )}
     </div>
   ))}

 </div>
 </>
*/

