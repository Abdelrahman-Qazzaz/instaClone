import React from 'react'
import styles from '../../rest.module.css'
import RedHeart from './RedHeart'

function PopUpHeart() {
  return (
    <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:3,backgroundColor:''}} className={`d-flex justify-content-center align-items-center ${styles.popUp}`}>
      <RedHeart width='100px'/>
    </div>
  )
}

export default PopUpHeart