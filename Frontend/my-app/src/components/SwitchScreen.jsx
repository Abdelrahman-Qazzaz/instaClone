import React, { useContext, useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import userContext from '../UserContext'
import BlackBackground from './assets/BlackBackground'
import XIcon from './assets/XIcon'
import styles from "./components.module.css"

function SwitchScreen() {

    const [showPassword,setShowPassword] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const { fetchUser,logout,login,setShowSwitchScreen } = useContext(userContext)

    function handleChange(e){
        const { name, value } = e.target
        if(name == 'username'){
            setUsername(value)
        }
        else if(name == 'password'){
            setPassword(value)
        }
    }

    async function swicthAccount(){
        try{
           const status = await logout()
           if(status === 200)
                {try {
                    await login(username,password)
              
                } catch (error) {
                    console.log(error)
                }}
        }catch(err)
            {console.log(err)}    
    }
  return (
    <>
    <BlackBackground/>
        <div style={{zIndex:6,position:'fixed',height:'100vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className={styles.switchScreen} style={{position:"relative",width:'100%',maxWidth:'400px',backgroundColor:'white',borderRadius:'5%',border:""}}>
                <div style={{position:"absolute",border:"",width:"100%"}} className='d-flex justify-content-end'>
                    <button onClick={()=> setShowSwitchScreen(false)} className='p-0 m-2' style={{backgroundColor:"transparent",border:"none",}}>
                        <XIcon width='40'/>
                    </button>
                </div>

                <div>
                 <div className={`${styles.zenLoop} my-5`} style={{textAlign:'center',fontSize:'2rem'}}>instaClone</div> 
                 <div style={{border:'',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>



  <div class="form-group mt-3">
    <input name='username'  value={username} onChange={handleChange} style={{width:'270px',backgroundColor:'#EEEDEB'}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone number, username, or email"/>
  </div>

  <div class="form-group mt-3" style={{position:"relative",border:"",height:"fit-content",width:'fit-content'}}>
    <input  name='password' value={password} onChange={handleChange} style={{width:'270px',backgroundColor:'#EEEDEB'}} type={showPassword ? 'password' : 'text'} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
    <button onClick={()=>{setShowPassword((prev)=> !prev)}} className='p-0' style={{position:"absolute",top:0,left:'240px',border:"none",backgroundColor:'transparent',width:'30px',height:'100%'}}>
        {
            showPassword
            ?
            <Visibility/>
            :
            <VisibilityOff/>
        }
    </button>
  </div>
  <button onClick={swicthAccount}style={{width:'270px'}} class="btn btn-primary mt-4">Log in</button>

    

      



                 </div>
                </div>
            </div>
        </div>
    </>
   
  )
}

export default SwitchScreen

/*
               <TextField  
            type={showPassword ? 'text' : 'password'}
            label="Password"
            id="filled-start-adornment"
            sx={{ m: 1, }}
            variant="filled"
            InputLabelProps = {{style:{fontSize:'10px',}}}
            InputProps={{
              disableUnderline: true,
              endAdornment:(<InputAdornment position="end">

              </InputAdornment>)

            }}
            
          />
*/