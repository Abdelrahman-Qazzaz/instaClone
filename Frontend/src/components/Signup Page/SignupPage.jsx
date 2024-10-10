import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../../UserContext'
import AppStoreDownload from '../assets/AppStoreDownload'
import GooglePlayDownload from '../assets/GooglePlayDownload'
import BirthdayFormSection from './Sections/BirthdayFormSection'
import ConfirmationCodeSection from './Sections/ConfirmationCodeSection'
import SignupFormSection from './Sections/SignupFormSection'
function SignupPage() {
  const navigate = useNavigate()
  const [currentSection,setCurrentSection] = useState('signupSection')

  const [formData, setFormData] = useState({numOrEmail: '',fullName:'',username:'',password:'',birthday:{month: '',year:'',day:''}})

  const { user,setUpUser } = useContext(userContext)

  useEffect(()=>{
    if(user._id && user._id != -1)
      {navigate('/')}
  },[user._id])


  return (
    <>
    <div style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',backgroundColor:'white',zIndex:4,overflowY:'auto'}}>
      <div style={{ width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',border:""}}>
        <div className='mb-3' style={{width:350,border:""}}>

          {currentSection == 'signupSection' ?  <SignupFormSection setCurrentSection={setCurrentSection} formData={formData} setFormData={setFormData}/> : currentSection == 'birthdaySection' ? <BirthdayFormSection setCurrentSection={setCurrentSection} formData={formData} setFormData={setFormData}/> : currentSection == 'confirmationCodeSection' ? <ConfirmationCodeSection setCurrentSection={setCurrentSection} formData={formData} setFormData={setFormData}/> : null}


          <div className='border mt-3  d-flex align-items-center justify-content-center' style={{width:'350px',height:'70px',border:''}}>
            <text style={{fontSize:'',border:''}} className=''>Have an account? <button onClick={()=>{navigate('/')}}  className='ms-1 p-0 text-info text-decoration-none' style={{border:'none',backgroundColor:'transparent'}}>Log in</button></text>
          </div>
          <section className='mt-3 text-center'>
          Get the app.
          <div className='mt-3' style={{width:'350px', height:'44px'}}><AppStoreDownload/> <GooglePlayDownload/></div>
        </section>
  

        </div>
      </div>
    </div>
    </>
  )
}

export default SignupPage