import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DesktopOnlyNavbarExtended from '../components/assets/DesktopOnlyNavbarExtended'
import ExploreIcon from '../components/assets/ExploreIcon'
import HomeIcon from '../components/assets/HomeIcon'
import InstagramIcon from '../components/assets/InstagramIcon'
import MessengerIcon from '../components/assets/MessengerIcon'
import NewPostIcon from '../components/assets/NewPostIcon'
import SearchIcon from '../components/assets/SearchIcon'
import UserPFPIcon from '../components/assets/UserPFPIcon'
import styles from '../rest.module.css'
import userContext from '../UserContext'

function DesktopNavbar() {
    const [desktopOnlyNavbarType,setDesktopOnlyNavbarType] = useState(null)
    const [showExtraText,setShowExtraText] = useState(true)
    const { user,setShowCreateNewPostScreen } = useContext(userContext)
    const [divStyle,setDivStyle] = useState({})
    const [numOfNotis,setNumOfNotis] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user && user.notifications)
            {setNumOfNotis(user.notifications.length)}
    },[user.notifications])
    useEffect(()=>{
        if(desktopOnlyNavbarType)
            {setShowExtraText(false)}
    },[desktopOnlyNavbarType])

    function handleDesktopOnlyNavbarType(type){
        if(desktopOnlyNavbarType == type)
            {setDesktopOnlyNavbarType(null); setShowExtraText(true)}
        else
            {setDesktopOnlyNavbarType(type)}
    }

  return (
    <>
    <div className='p-0 d-none d-md-flex border border-right' style={{border:'none',backgroundColor:'transparent',border:'',position:'fixed',top:'0',height:'100vh',backgroundColor:'white',zIndex:1,border:''}}>

        <div className='p-0 px-2 d-flex flex-column' style={{border:'none',backgroundColor:'transparent',border:'',minWidth:'6vw'}}>


       


            <div className='flex-grow-1 d-flex flex-column justify-content-between' style={{border:'',marginBottom:"7vh",marginTop:"5vh"}}>

                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`}  style={{border:'',backgroundColor:'transparent'}}>
                         <button onClick={()=>{ handleDesktopOnlyNavbarType('');navigate('/')}}  className={`${styles.zenLoop}  d-xl-flex p-0`}   style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none',}}>
                            {showExtraText ? null : <div className='p-0 m-0'><InstagramIcon/></div>}
                            {!showExtraText ? null : <div className='p-0 d-block d-xl-none' ><InstagramIcon/></div>}
                            <div style={{border:""}} className='p-0 d-none d-xl-block'>{showExtraText ? 'instaClone' : ''}</div> 
                        </button>
                </div>  
                
                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`}  style={{border:'',backgroundColor:'transparent',}}>
                    <button onClick={()=>{ handleDesktopOnlyNavbarType('');navigate('/')}}  className='p-0 d-flex'  style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none'}}>
                        <HomeIcon/>
                        <div className='p-0 ms-3 d-none d-xl-block'>{showExtraText ? 'Home' : ''}</div> 
                    </button>
                </div>
                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`} style={{border:'none',backgroundColor:'transparent',}}>
                    <button className='p-0 d-flex' onClick={() => handleDesktopOnlyNavbarType('Search')} style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none',cursor:'pointer'}}>
                    <SearchIcon/>
                    <div style={divStyle} onMouseEnter={()=> setDivStyle((prev)=> ({...prev,cursor:'pointer'}))} className='p-0 ms-3 d-none d-xl-block'>{showExtraText ? 'Search' : ''}</div>
                    </button>
                

                </div>
                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`} style={{border:'none',backgroundColor:'transparent',}}>
                    <button onClick={()=>{ handleDesktopOnlyNavbarType('');navigate('/explore/')}}  className='p-0 d-flex'  style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none'}}>
                    <ExploreIcon/>
                    <div className='p-0 ms-3 d-none d-xl-block'>{showExtraText ? 'Explore' : ''}</div> 
                    </button>
                </div>

                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`} style={{border:'none',backgroundColor:'transparent',}}>
                <button  className='p-0 d-flex'  onClick={() => {handleDesktopOnlyNavbarType('Messages'); navigate('/direct/inbox/')}} style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none'}} >
                    <MessengerIcon/>
                    <div className='p-0 ms-3 d-none d-xl-block'>{showExtraText ? 'Messages' : ''}</div> 
                </button>
                </div>
        
                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`}  style={{border:'none',backgroundColor:'transparent',}}>
                    <button  className='p-0 d-flex' onClick={()=>{ handleDesktopOnlyNavbarType('');setShowCreateNewPostScreen(true)}}  style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none',cursor:'pointer'}}>
                        <NewPostIcon/>
                        <div className='p-0 ms-3 d-none d-xl-block'>{showExtraText ? 'Create' : ''}</div> 
                        </button>
                </div>
                <div className={`p-0  d-flex justify-content-center ${showExtraText ? 'justify-content-xl-start' : ''}`}  style={{border:'none',backgroundColor:'transparent'}}>
                <button onClick={()=>{ handleDesktopOnlyNavbarType('');navigate('/'+user.username+'/')}} className='p-0 d-flex' style={{border:'none',backgroundColor:'transparent',color:'black',textDecoration:'none',}}>
                    <UserPFPIcon src={user.pfpFirebasePathURL ? user.pfpFirebasePathURL : null}/>
                    <div className='p-0 ms-3 d-none d-xl-block'>{showExtraText ? 'Profile' : ''}</div> 
                </button>
                </div>
            </div>
            

        </div>
        <DesktopOnlyNavbarExtended desktopOnlyNavbarType={desktopOnlyNavbarType} setDesktopOnlyNavbarType={setDesktopOnlyNavbarType}/>

    </div>

    </>
  )
}

export default DesktopNavbar

/*
   
        
         */