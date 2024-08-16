import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Draggable, {DraggableCore} from 'react-draggable'; 
import styles from './assets/assets.module.css'
import { SketchPicker } from 'react-color'

function DraggableTextInput(props) {

    const [showSketchPicker,setShowSketchPicker] = useState(false)


    function togglesketchPicker(){
        setShowSketchPicker(!showSketchPicker)
    }
    function handleColorChange(updatedColor){
        props.setColor(updatedColor.hex);
    }

    function handleDrag(e,data){
        props.setCurrentTextFieldPosition({ x: data.x, y: data.y });
        console.log(props.currentTextFieldPosition)
    }
  return (

   
        <div style={{border:'',position:'fixed',top:0,left:0,height:'100vh',width:'100vw'}} className='d-flex justify-content-center align-items-center'>

                <div>
                    {showSketchPicker ? <SketchPicker color={props.color} onChange={handleColorChange}/> : null}
                    <Draggable onDrag={handleDrag}>
                    <div style={{border:'',position:'relative'}}>
                        <button onClick={togglesketchPicker} className='p-0' style={{position:'absolute',top:'-15px',left:'98%',border:'none',backgroundColor:'transparent'}}>
                            <div className={styles.backgroundGradient2} style={{borderRadius:'50%',width:'20px',height:'20px'}}></div>
                        </button>
                        <TextField onChange={props.onChange} size='small' variant='outlined'  inputProps={{style:{backgroundColor:'white',border:'none',outline:'none',height:'30px',backgroundColor:'transparent',color:props.color,width:'150px'}}}/>
                    </div>  
                    </Draggable> 
                </div>

        </div>
   

  )
}

export default DraggableTextInput