import React, { useContext, useState } from 'react'
import userContext from '../../UserContext'
import BlackBackground from '../assets/BlackBackground'
import ChooseImageSection from './CreatePostSections/ChooseImageSection'
import SetCaptionSection from './CreatePostSections/SetCaptionSection'
function CreateNewPostScreen(props) {

  const { user,setShowCreateNewPostScreen,createPostAndUpdateUserData,setIsLoading } = useContext(userContext)

  const [section,setSection] = useState('Choose Image')

  const [caption,setCaption] = useState('')
  const [selectedFiles,setSelectedFIles] = useState([])
  const [tempFiles,setTempFiles] = useState([])


  async function handleShare(){
    setIsLoading(true)
    const formData = new FormData()
   for (const selectedFile of selectedFiles){
    formData.append('files',selectedFile)
   }
    formData.append('text',caption)

       await createPostAndUpdateUserData(formData)
        setShowCreateNewPostScreen(false)
        setIsLoading(false)
    }

  return (
    <>
      <BlackBackground/>
     
    <div style={{position:'fixed',height:'100vh',width:'100vw',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center',zIndex:6,backgroundColor:'transparent'}}>
      {section == 'Choose Image' ? <ChooseImageSection setSection={setSection} selectedFiles={selectedFiles} setSelectedFIles={setSelectedFIles} tempFiles={tempFiles} setTempFiles={setTempFiles}/> : null}
      {section == 'Set Caption' ? <SetCaptionSection setSection={setSection} tempFiles={tempFiles} setCaption={setCaption} handleShare={handleShare} /> : null}


    </div>
    </>
  )
}

export default CreateNewPostScreen

/*

<div className='d-flex justify-content-between align-items-center mt-2  border-bottom'>
                  <LeftArrowIcon onClick={()=>{}}/>
                  <text className='' style={{fontSize:'1.1rem',fontWeight:'650'}}>Create new post</text>
                  <button onClick={props.handleShare} className='btn text-info fw-bold'>Share</button>
              </div>*/