import React, { useContext, useRef, useState } from 'react';
import userContext from '../../UserContext';
import styles from '../assets/assets.module.css';
import StoriesCarousel from '../StoriesCarousel';

function YourStoryIcon() {

    const durationRef = useRef()
    const [file,setFile] = useState(null)
    const [tempFile,setTempFile] = useState(null)
    const [showTextInput,setShowTextInput] = useState(false)
    const { user,postStorySlide } = useContext(userContext)
    const [input,setInput] = useState('')
    const [color,setColor] = useState('#000000')
    const [currentTextFieldPosition, setCurrentTextFieldPosition] = useState({ x: 0, y: 0 });
    const [duration,setDuration] = useState(5) // default value incase it's an image

    function onChange(e){
        const { value } = e.target
        setInput(value)
    }

    function handleFile(e){
        const { files } = e.target
        setFile(files[0])
        setTempFile({objectUrl:URL.createObjectURL(files[0]),type:files[0].type.startsWith('video') ? 'video' : 'image'})
    }

    function toggleTextInput(){
        setShowTextInput(!showTextInput)
    }
    async function handleClick(){
        const slide = new FormData()
        slide.append('file',file)
        slide.append('text',input)
        slide.append('duration',duration)
        slide.append('textPositionX',currentTextFieldPosition.x)
        slide.append('textPositionY',currentTextFieldPosition.y)
        // console.log(currentTextFieldPosition.x)
        // console.log(currentTextFieldPosition.y)
        slide.append('textColor',color)
        await postStorySlide(slide)
        setFile(null)
        setTempFile(null)
        setInput('')
        setDuration(5)
        setCurrentTextFieldPosition({ x: 0, y: 0 })
        setColor('#000000')

    }

    function onLoadedMetadata(){
        setDuration(durationRef.current.duration)
    }

  return (
  
    <>
  { tempFile ? 
        tempFile.type == 'video' 
        ?
        <video ref={durationRef} hidden onLoadedMetadata={onLoadedMetadata} src={tempFile.objectUrl}></video>
        :
        null
: null}

{!file 
    ?
<>
<input onChange={handleFile} id='storyInput' hidden type='file'/>
<div className=' mx-2' style={{display:'flex',alignItems:'center',zIndex:1}}> 
      <div>
        <div style={{border:'',}} className='d-flex flex-column justify-content-center align-items-center'>
            <div  style={{height:"56px",width:'56px'}}>
              <label htmlFor="storyInput">
                <div className={`m-0`} style={{borderRadius:'50%',border:'none'}}>
                  <div className={`m-0`} style={{borderRadius:'50%',border:'none',position:'relative'}}>
                  <img style={{borderRadius:'50%'}} className='' width='100%' height='100%' src={user.pfpFirebasePathURL ? user.pfpFirebasePathURL : "/defaultinstaPFP.jpg"} alt="" />
                  <div  style={{position:'absolute',top:'70%',left:'75%'}}>
                    <svg style={{color:'#3FA2F6'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                    </svg>
                  </div>
                  </div>
                </div>
              </label>
            </div>
            <div className='mt-1' style={{textAlign:'center',fontSize:'0.85rem',width:'',border:''}}>Your story</div>
        </div>
      </div>
    </div>
</>
:
<>{/* editing section */}
<div style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:10}} className={`${styles.backgroundGradient} d-flex justify-content-center`}>
    <StoriesCarousel myStory={true} showTextInput = {showTextInput} onChange = {onChange}  input={input} color={color} setColor={setColor} currentTextFieldPosition={currentTextFieldPosition} setCurrentTextFieldPosition={setCurrentTextFieldPosition} tempFile={tempFile} toggleTextInput={toggleTextInput} handleClick={handleClick}/>
</div>
</>}
</>
  )
}




export default YourStoryIcon

/*
    <div className='mx-2' style={{display:'flex',alignItems:'center'}}> 
        <div>
            <label htmlFor='storyInput' style={{height:"56px",width:'56px',border:'',position:'relative'}}>
                <img width='100%' height='100%' src="/defaultInstaPFP.jpg" alt="" />
                <div  style={{position:'absolute',top:'70%',left:'75%'}}>
                    <svg style={{color:'#3FA2F6'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                    </svg>
                </div>
            </label>
            <div className='mt-2' style={{textAlign:'center',fontSize:'0.85rem'}}>
                Your story
            </div>
        </div>
    </div>
   
 */