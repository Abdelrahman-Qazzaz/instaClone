import React from 'react'
import styles from "./loginPage.module.css"
import Iphone from "../assets/Iphone"

function LoginPageDesktopOnlyBox() {
  return (
    <div style={{position:'relative',width:'100%',height:'100%'}}>
      <div><Iphone sources={['/layingdownpic.png']}/></div>
      <div style={{position:'absolute',top:20,left:50}}><Iphone sources={['/profilepagepic.png','/girlcatpic.png','/chatpic.png']}/></div>
    </div>
  )
}

export default LoginPageDesktopOnlyBox