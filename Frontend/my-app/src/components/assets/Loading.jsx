import React from 'react'
import spinner from "../../spinner.svg"
import BlackBackground from './BlackBackground'

//Frontend/my-app/src/Spinner.svg

function Loading() {
  return (
    <>

    <div style={{backgroundColor:'',zIndex:99999,position:'fixed',top:0,left:0,height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <BlackBackground/>
            <img src={spinner} width="4%" alt="" />

    </div>
    </>
  )
}

export default Loading

/*
    <div style={{position:'fixed',height:"100vh",backgroundColor:'black',opacity:0.5}}> </div>

    <div style={{position:'fixed',height:'100vh'}}><img src='/layingdownpic.png' alt="" /></div>
*/