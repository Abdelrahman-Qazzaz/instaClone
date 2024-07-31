import React, { useContext, useEffect, useRef, useState } from 'react'
import LeftArrowIcon from '../../assets/LeftArrowIcon'
import userContext from "../../../UserContext"
import styles from "../profilePage.module.css"
import ImagesAndVidsPreviewCarousel from '../../ImagesAndVidsPreviewCarousel'
import RightArrowIcon from '../../assets/RightArrowIcon'
import PicAndVidIcon from '../../assets/PicAndVidIcon'
function SetCaptionSection(props) {


    const { user } = useContext(userContext)
    const userPFP = user.pfpFirebasePathURL ?  user.pfpFirebasePathURL : '/defaultInstaPFP.jpg'
   

    const [captionLength,setCaptionLength] = useState(0)

    function handleChange(e){
        let { value } = e.target
        if(captionLength < 2200 || value.length <= 2200)
        {
        if(value.length > 2200)
            {value = value.substring(0,2200)}
        props.setCaption(value)
        setCaptionLength(value.length)
   
        }
    }

 



  return (//    <div className='d-flex flex-column' style={{maxWidth:'500px',width:'100%',height:'540px',borderRadius:'5%',backgroundColor:''}}>

    <div className='d-flex flex-column' style={{maxWidth:'700px',width:'100%',height:'fit-content',borderRadius:'2%',backgroundColor:'white',zIndex:4}}>
            <div style={{border:''}} className='d-flex justify-content-between align-items-center py-1 mt-2 mx-3  border-bottom'>
                  <div><button onClick={()=>{props.setSection('Choose Image')}} style={{border:'none',backgroundColor:'transparent'}}><LeftArrowIcon /></button></div>
                  <div style={{fontSize:'1.1rem',fontWeight:'650',textAlign:'center'}}>Create new post</div>
                  <div><button onClick={props.handleShare} className='btn text-info fw-bold p-0'>Share</button></div>
            </div>
            
            <div className='d-flex' style={{border:''}}>
                    <div>
                        <ImagesAndVidsPreviewCarousel slides={props.tempFiles}/>
                    </div>
                    <div style={{width:'350px',border:''}} className='d-flex flex-column ms-1'>
                            <div className="d-flex mt-3">
                                <div className='me-2' style={{border:''}}>
                                    <img style={{width:'30px'}} src={user.pfpFirebasePathURL ? user.pfpFirebasePathURL : '/defaultInstaPFP.jpg'} alt="" />
                                </div>
                                <div style={{border:''}} className='d-flex align-items-center'>
                                    {user.username}
                                </div>
                            </div>
                            <div className='flex-grow-1 mt-3'>
                                <textarea value={props.caption} onChange={handleChange} class="flex-grow-1" style={{outline:'none',border:'none',width:'100%',height:'100%'}} placeholder='Write a caption...'></textarea>
                            </div>
                    </div>
            </div>
    
        </div>
  )
}

export default SetCaptionSection
/*

<div className='flex-grow-1 d-flex flex-column align-items-center' style={{maxWidth:'840px',width:'100%',backgroundColor:'',border:''}}>
        <div className='flex-grow-1 container' style={{border:'',maxWidth:'100%'}}>
            <div className="row" style={{border:' red',height:'100%'}}>
                <div className='col-sm-7 col-12 p-0 d-flex justify-content-center mt-2' style={{border:' yellow',maxHeight:'100%',overflow:'hidden'}}>
                    
                
                    <ImagesAndVidsPreviewCarousel tempFiles={props.tempFiles} />

                </div>
                <div className='col-sm-5 col-12 d-flex flex-column'>
                    <div className='d-flex justify-content-center mt-3' style={{border:''}}>
                        <div className='d-flex' style={{width:'93%',}}>
                            <div> <img src={userPFP} width='28px' height='28px' style={{borderRadius:'50%'}} alt="" /></div>
                            <div className='ms-2'><text style={{fontWeight:'600'}}>{user.username}</text></div>
                        </div>
                    </div>
                    <div className='flex-grow-1 d-flex flex-column align-items-center mt-3' style={{border:''}}>
                        <textarea value={props.caption} onChange={handleChange} class="flex-grow-1" style={{outline:'none',border:'none',width:'95%'}} placeholder='Write a caption...'></textarea>
                        <div className='d-flex justify-content-end' style={{color:"#758694"}}>{captionLength}/2,200</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     */