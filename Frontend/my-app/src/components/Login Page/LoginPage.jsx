import React from 'react'

import styles from "./loginPage.module.css"
import LoginPageDesktopOnlyBox from "./LoginPageDesktopOnlyBox"
import LoginPageSecondBox from "./LoginPageSecondBox"

//https://www.instagram.com



function LoginPage() {

 


  
  return (
   <div style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:4,backgroundColor:'white',border:"",overflowY:'auto'}} className='d-flex align-items-center'> 
    <div className='mb-5' style={{border:'',height:"fit-content",flexGrow:1,display:'flex',justifyContent:'center',alignItems:'',}}>
      <div style={{maxWidth:'380px',width:'100%'}} className={styles.desktopOnlyLoginPageBox}><LoginPageDesktopOnlyBox/></div>
      <div className={styles.loginPageSecondBox} style={{height:'600px'}}><LoginPageSecondBox/></div>
    </div>
  </div>
  )
}

export default LoginPage

/*
dekstop only 
380x580
other
350x590
*/

/*
    <div className={styles.loginPageContainer} style={{border:'',display:'flex',justifyContent:'center',alignItems:'center'}}>

          <div  className={styles.loginPageContentContainer} style={{position:'relative',width:'880px',height:'630px',border:''}}>
            <div className="container" style={{width:'100%',height:'100%'}}>
              <div className="row" style={{width:'100%',height:'100%',display:'flex',justifyContent:'center'}}>
                <div className={`col-6  ${styles.desktopOnlyLoginPageBox}`}>
                 <div  style={{width:'380px',height:'580px'}}><LoginPageDesktopOnlyBox/></div>
                </div>
                <div className="col-6">
                 <div  style={{width:'350px',height:'590px'}} ><LoginPageSecondBox/></div>
                </div>
              </div>
            </div>
          </div>

    </div>
*/