import React, { useContext } from 'react'
import userContext from '../../../UserContext'
import LeftArrowIcon from '../../assets/LeftArrowIcon'
import PicAndVidIcon from "../../assets/PicAndVidIcon"

function ChooseImageSection(props) {

  const { setShowCreateNewPostScreen } = useContext(userContext)
  function handleFile(e){
    const { files } = e.target
    props.setSelectedFIles((prev)=>([...prev,files[0]]))
    props.setTempFiles((prev)=>([...prev,{objectUrl:URL.createObjectURL(files[0]), type:files[0].type}]))
    console.log(files)
}

function handleNext(){
  if(props.selectedFiles.length){
    props.setSection('Set Caption')
  }

}

  return (

    <>

   
    <div className='d-flex flex-column' style={{position:"relative",maxWidth:'500px',width:'100%',height:'540px',borderRadius:'2%',backgroundColor:'white',zIndex:4}}>
     
        {props.tempFiles.map((tempFile,index)=>
        tempFile.type.startsWith('video')
        ?
        <div style={{position:'absolute',border:"",top:60+(index*10)+'px',left:20+(index*15)+'px',zIndex:props.tempFiles.length - index}}>
          <video style={{width:'70px',height:"70px",objectFit:'contain'}} src={tempFile.objectUrl}/>
        </div>
        :
        <div style={{position:'absolute',border:"",top:60+(index*10)+'px',left:20+(index*15)+'px',zIndex:props.tempFiles.length - index}}>
          <img style={{width:'70px',height:"70px",objectFit:'contain'}} src={tempFile.objectUrl}/>
        </div>
        )}
      
            <div style={{border:''}} className='d-flex justify-content-between align-items-center py-1 mt-2 mx-3  border-bottom'>
                  <div><button onClick={()=>{setShowCreateNewPostScreen(false)}} className='p-0' style={{border:'none',backgroundColor:'transparent'}}><LeftArrowIcon /></button></div>
                  <div style={{fontSize:'1.1rem',fontWeight:'650',textAlign:'center'}}>Create new post</div>
                  <div><button onClick={handleNext} className='btn text-info fw-bold p-0'>Next</button></div>
            </div>
            <div className='flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
                <PicAndVidIcon/>
                <text style={{fontSize:'1.3rem',fontWeight:''}}>Drag photos and videos here</text>
                <label id='label' htmlFor="selectFromComputer" onMouseEnter={()=> document.getElementById('label').style.cursor = 'pointer'} className='btn btn-primary text-light py-1 px-3 mt-3'>Select from computer</label>
                <input  id='selectFromComputer' type='file' hidden onChange={handleFile}/>
            </div>
        </div>
        </>
  )
}

export default ChooseImageSection