import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../UserContext';
import AppStoreDownload from "../assets/AppStoreDownload";
import GooglePlayDownload from "../assets/GooglePlayDownload";
import MyTextField from '../assets/MyTextField';
import PasswordField from '../assets/PasswordField';
import styles from "./loginPage.module.css";

function LoginPageSecondBox() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const { login } = useContext(userContext)
  const navigate = useNavigate()
 

  async function handleKeyDown(e){
    const { key } = e
    if(key == "Enter"){
      await login(username,password)
    }
  }
  function handleChange(e){

    const { name,value } = e.target

    if(name === 'username'){
      setUsername(value)
    }
    else if(name === 'password'){
      setPassword(value)
    }

  }


  return (
    <div  style={{width:'100%',height:'100%',overflow:'hidden',border:''}} className='d-flex flex-column justify-content-center'>

      <section className={`${styles.conditionalBorder} pb-5`} style={{border:''}} >
          <div className='mt-4' style={{textAlign:'center', }}>
            <text className={styles.instagramTextLogo}>instaClone</text>
          </div>

           <div style={{justifyContent:'center',display:'flex'}}>
             <MyTextField  textFieldName='username' textFieldValue={username} textFieldOnChange={handleChange} textFieldOnKeyDown={handleKeyDown}  label={'Phone number, username, or email'}/>
           </div>
            <div style={{justifyContent:'center',display:'flex'}}>
              <PasswordField  passwordFieldName='password' passwordFieldValue={password} passwordFieldOnChange={handleChange} passwordFieldOnKeyDown={handleKeyDown} />
            </div>

            <div className={styles.loginBtnContainer}> 
              <button onClick={async()=>{await login(username,password)}} style={{width:'268px',height:'50%'}} className='btn btn-info mt-4 text-light'>Log in</button>
            </div>


      </section>


      <section className={`${styles.conditionalBorder} mt-3 text-center py-3`}>
      Don't have an account? <button onClick={() => {navigate("/accounts/emailsignup/")}} className='text-info p-0' style={{border:'none',backgroundColor:'transparent'}}>Sign up</button>
      </section>

      <section className='mt-3 text-center d-flex flex-column align-items-center'>
        <div>Get the app.</div>
        <div className='mt-3' style={{width:'350px', height:'44px'}}><AppStoreDownload/> <GooglePlayDownload/></div>
      </section>

    </div>
  )
}

export default LoginPageSecondBox


