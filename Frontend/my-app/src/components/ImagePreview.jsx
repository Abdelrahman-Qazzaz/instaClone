import React, { useEffect, useState } from 'react'
import XIcon from './assets/XIcon';


function ImagePreview(props) {

    //props.file
    const [selectedImage,setSelectedImage] = useState(null)


    useEffect(()=>{
        const selectedFile = props.file
        if (selectedFile) {
  
          const reader = new FileReader();
    
          reader.onload = function(event) {
            setSelectedImage(event.target.result);
          };
    
          reader.readAsDataURL(selectedFile);
        }
    },[])
    useEffect(()=>{
        console.log(selectedImage)
    })

  
      function discardImage(){
        setSelectedImage(null)
        props.setFiles((prev)=>{
            const filteredPrev = prev.filter((file)=> file != props.file)
            return filteredPrev
        })
      }

  return (
    selectedImage 
    ? 
    <div className='me-3' style={{width:'48px',height:'48px',border:'',position:'relative'}}>
        <div style={{position:'absolute',left:'40px',top:'-12px',width:'fit-content',height:'18px',width:'18px',borderRadius:'50%',border:'1px solid black'}} className='d-flex justify-content-center align-items-center'><button onClick={discardImage} className='p-0' style={{backgroundColor:'transparent',border:'none'}}><XIcon chatImagePreview={true}/></button></div>
        <img height='100%' width='100%' src={selectedImage} alt="" style={{borderRadius:'30%'}} /> 
    </div>
    : 
    null
  )
}

export default ImagePreview