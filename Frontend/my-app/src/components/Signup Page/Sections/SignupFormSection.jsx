import React, { useState } from 'react'
import MyTextField from '../../assets/MyTextField'
import styles from "../signupPage.module.css"



function SignupFormSection(props) {


function handleChange(e){
  const { name, value } = e.target
  props.setFormData((prevFormData)=> {return {...prevFormData,[name]:value}})
}


function handleSignup(e){
  e.preventDefault()
  //validate input...
  //if input is valid:
  props.setCurrentSection('birthdaySection')

}

  function handleKeyDown(e){
    const { key } = e 
    if(key == 'Enter'){
      props.setCurrentSection('birthdaySection')
    }
  }
  const [showPassword,setShowPassword] = useState(false)
  return (
    <div className='border text-center' style={{height:'fit-content',paddingBottom:'10%'}}>
          <div className='my-4'><text className={styles.instagramTextLogo}>Instagram</text></div>


          <form onSubmit={handleSignup}>
          
          <MyTextField textFieldOnKeyDown={handleKeyDown} textFieldName={'numOrEmail'} textFieldValue={props.formData.numOrEmail} textFieldOnChange={handleChange} label={'Mobile Number or Email'}/>
          <MyTextField textFieldOnKeyDown={handleKeyDown} textFieldName={'fullName'}   textFieldValue={props.formData.fullName} textFieldOnChange={handleChange} label={'Full Name'}/>
          <MyTextField textFieldOnKeyDown={handleKeyDown} textFieldName={'username'}   textFieldValue={props.formData.username} textFieldOnChange={handleChange} label={'Username'}/>
          <MyTextField textFieldOnKeyDown={handleKeyDown} textFieldName={'password'}   textFieldValue={props.formData.password} textFieldOnChange={handleChange} label={'Password'} showPassword={showPassword} setShowPassword={setShowPassword}/>
     

          <button type='submit' style={{width:'268px',height:'32px'}} className='btn btn-info text-light mt-3 py-1'>Sign up</button>
          </form>
        </div>
  )
}

export default SignupFormSection