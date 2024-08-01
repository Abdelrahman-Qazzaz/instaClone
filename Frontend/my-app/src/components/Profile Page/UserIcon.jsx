import axios from 'axios';
import React, { useContext, useState } from 'react';
import userContext from '../../UserContext';
import CameraIcon from '../assets/CameraIcon';
import styles from "./profilePage.module.css";

function UserIcon(props) {
    const { user,setUser,fetchUserData,setIsLoading,setShowSwitchScreen } = useContext(userContext)
    const [src,setSrc] = useState()





    async function removePFP(){
        setIsLoading(true)

        try {
            await axios.delete('http://localhost:4000/me/setProfilePicture',{withCredentials:true})
            const userData = await fetchUserData(user._id)
            setUser({...userData})
            togglePFPOptionsScreen()
        } catch (error) {
            console.log(error)
        }
        setTimeout(()=>{},3000)
        setIsLoading(false)
    }

    const [showPFPOptionsScreen,setShowPFPOptionsScreen] = useState(false)
    function togglePFPOptionsScreen(){
        setShowPFPOptionsScreen(!showPFPOptionsScreen)
    }



    const [labelStyle,setLabelStyle] = useState({position:'absolute',top:0,left:0,borderRadius:'50%',backgroundColor:'transparent',border:'none'})
    function changeLabelStyle(){
        setLabelStyle(prev => ({...prev,cursor:'pointer'}))
    }
  return (
    <>

    <img className={styles.responsiveWidth} style={{borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ?? "/defaultInstaPFP.jpg"} alt="Profile Picture" />

    {
    user._id == props.targetUser._id 
    ? 
    <>
   {!user.pfpFirebasePathURL ? <div className={styles.responsiveWidth} style={{position:'absolute',top:0,left:0,backgroundColor:'black',borderRadius:'50%',opacity:0.2}}>
    </div> : null}
    <label htmlFor='imageInput' onClick={props.togglePFPOptionsScreen} onMouseEnter={changeLabelStyle} className={`${styles.responsiveWidth} p-0 d-flex justify-content-center align-items-center`} style={labelStyle}>
      {!user.pfpFirebasePathURL ? <CameraIcon width='40'/>: null}
    </label>
   
    </> 
    : 
    null
    }
     <input id='imageInput' type="file" hidden onChange={props.uploadPFP}/>
    </>

  )
}

export default UserIcon
/*
<div style={{width:'200px'}}>
    <div  style={{width:'150px',height:'150px',borderRadius:'50%',border:'',position:'relative'}}>
        {user.pfpFirebasePathURL
        ?
        <button onClick={props.togglePFPOptionsScreen} className='p-0' style={{width:'100%',height:'100%',backgroundColor:'transparent',border:'none'}}>
        <div style={{width:'100%',height:'100%',}}>
            <img width='100%' height='100%' style={{borderRadius:'50%'}} src={user.pfpFirebasePathURL} alt="userPFP" />
        </div>
        </button>
        :
        <>
        <label htmlFor='imageInput' onMouseEnter={changeLabelStyle} style={labelStyle}>
        <div style={{width:'100%',height:'100%',border:'',display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:'url(/defaultInstaPFP.jpg)',backgroundSize:'100%',position:'relative'}}>  
            <div style={{width:'100%',height:'100%',border:'',position:'absolute',backgroundColor:'black',opacity:0.5,borderRadius:'50%'}}></div>
            <CameraIcon width={'40'}/>
        </div>
        </label>
        </>}

        <input id='imageInput' type="file" hidden onChange={uploadPFP}/>
      </div> 
</div> */