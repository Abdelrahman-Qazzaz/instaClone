import React, { useContext, useEffect, useState } from 'react'
import { Navigate,Link } from 'react-router-dom';
import axios from "axios"

import EnvelopeWithHeartIcon from '../../assets/EnvelopeWithHeartIcon'
import userContext from '../../../UserContext';


function ConfirmationCodeSection(props) {



  


  const { user,fetchUser } = useContext(userContext)
  const [codeInput,setCodeInput] = useState('')

  useEffect(()=>{

    createPendingUser()
  },[])


  async function createPendingUser(){
    console.log(props.formData)
    try {
      await axios.post('http://localhost:4000/pending_users',props.formData)
    } catch (error) {
      console.log(error)
    }
    
  }

  async function handleConfirmation(){
    const temp = props.formData
    temp.codeInput = codeInput
    try {
    const { data } = await axios.post('http://localhost:4000/users',temp,{withCredentials:true})
    await axios.post('http://localhost:4000/login',{username: data.user.username,password: props.formData.password},{withCredentials:true})
    const response = await axios.get('http://localhost:4000',{withCredentials:true})
    console.log(response)
    const userID = response.data.user_id
    await fetchUser(userID)

    } catch (error) {
      console.log(error)
    }


    if(user.id != -1)
     { return <Navigate to="/new-location" replace />}

  }










  function handleChange(e){
    const { value } = e.target
    setCodeInput(value)
  }

 

  return (
    <div className='border text-center' style={{height:'380px'}}>
      <div className='mt-4' ><EnvelopeWithHeartIcon/></div>
      <div className='mt-4'>
        <text style={{color:'#686D76',fontWeight:500}}>Enter Confirmation Code</text><br/>
        <text style={{fontSize:'0.8rem'}}>Enter the confirmation code we sent to biniyam10d@gmail.com. <button style={{backgroundColor:'transparent',fontSize:'0.8rem',marginBottom:'2px'}} className='btn text-info p-0'>Resend Code.</button></text>
      </div>
      <div className='mt-4'>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <input value={codeInput} onChange={handleChange} placeholder='Confirmation Code' type="text" class="form-control" aria-describedby="emailHelp" style={{width:'260px',opacity:'0.7'}}/>
            </div>
            <div className="row  d-flex justify-content-center mt-3">
            <button onClick={handleConfirmation} className="btn btn-info text-light p-0" style={{width:'260px'}}>Next</button>
            </div>
            <div className="row  d-flex justify-content-center mt-2">
            <button onClick={() => props.setCurrentSection('birthdaySection')} className="btn text-info p-0" style={{width:'260px',backgroundColor:'transparent'}}>Go Back</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationCodeSection