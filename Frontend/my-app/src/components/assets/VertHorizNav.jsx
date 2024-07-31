import React, { useContext, useState } from 'react'
import InstagramIcon from './InstagramIcon'
import BlackHeart from './BlackHeart'
import HomeIcon from './HomeIcon'
import SearchIcon from './SearchIcon'
import ExploreIcon from './ExploreIcon'
import ReelsIcon from './ReelsIcon'
import MessengerIcon from './MessengerIcon'
import NewPostIcon from './NewPostIcon'
import ListIcon from './ListIcon'
import UserPFPIcon from './UserPFPIcon'
import styles from "../Home Page/homePage.module.css"


import DesktopOnlyNavbarExtended from './DesktopOnlyNavbarExtended'
import userContext from '../../UserContext'

function VertHorizNav() {




  const [showDesktopOnlyNavbarExtended,setShowDesktopOnlyNavbarExtended] = useState(false)
  const [desktopOnlyNavbarType,setDesktopOnlyNavbarType] = useState(null)
  const { user } = useContext(userContext)

  function setShowDesktopOnlyNavbarExtentionType(type){
    console.log(type)
    setDesktopOnlyNavbarType(type)
    setShowDesktopOnlyNavbarExtended(!showDesktopOnlyNavbarExtended)
  }

  return (
    <div className={styles.adjust}>

    </div>

  )
}

export default VertHorizNav




/*
import React, { useContext, useState } from 'react'
import InstagramIcon from './InstagramIcon'
import BlackHeart from './BlackHeart'
import HomeIcon from './HomeIcon'
import SearchIcon from './SearchIcon'
import ExploreIcon from './ExploreIcon'
import ReelsIcon from './ReelsIcon'
import MessengerIcon from './MessengerIcon'
import NewPostIcon from './NewPostIcon'
import ListIcon from './ListIcon'
import UserPFPIcon from './UserPFPIcon'
import styles from "../Home Page/homePage.module.css"


import DesktopOnlyNavbarExtended from './DesktopOnlyNavbarExtended'
import userContext from '../../UserContext'

function VertHorizNav() {




  const [showDesktopOnlyNavbarExtended,setShowDesktopOnlyNavbarExtended] = useState(false)
  const [desktopOnlyNavbarType,setDesktopOnlyNavbarType] = useState(null)
  const { user } = useContext(userContext)

  function setShowDesktopOnlyNavbarExtentionType(type){
    console.log(type)
    setDesktopOnlyNavbarType(type)
    setShowDesktopOnlyNavbarExtended(!showDesktopOnlyNavbarExtended)
  }

  return (
    <div className='' style={{zIndex:1,height:'100%',display:'flex',justifyContent:'',border:'',overflow:'hidden'}}>
    <div className={`${styles.mbNav} border border-right`} style={{width:'100%',display:'flex',backgroundColor:'',border:'',justifyContent:''}}>


       <div className={`${styles.k} ${styles.mbDiv} ${styles.xx} d-flex flex-md-column ` }>

       
          <div className={`${styles.DCCLXVIINavbarElement}  m-0 mb-3`} style={{display:'flex',alignItems:'center',width:'100%',justifyContent:'center',}}>


              {showDesktopOnlyNavbarExtended 
              ? 
              <div  style={{marginRight:'4px'}}><a href='/' style={{textDecoration:'none',color:'black'}}><InstagramIcon/></a></div>
              :
              <>
              <div className={`${styles.inverseDesktopOnlyText}`} style={{marginRight:'4px'}}><a href='/' style={{textDecoration:'none',color:'black'}}><InstagramIcon/></a></div>
              <div className={`${styles.desktopOnlyText}  mb-4 mx-2`} style={{marginTop:'27px',width:'100%'}}><a  href='/' className={styles.zenLoop} style={{textDecoration:'none',color:'black'}}>instaClone</a></div> 
              </>
             }
          </div>
       



                                <div className=' mt-md-2' >
                                     <a className='btn ' href='/' style={{backgroundColor:'transparent',border:''}}>
                                        <HomeIcon/>
                                       {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`} style={{fontSize:''}}>Home</text> : null /} 
                                       </a>
                                       </div>
       
       
       
       
                                       <div className={`${styles.DCCLXVIINavbarElement} mt-4`} >
                                           <button onClick={() => setShowDesktopOnlyNavbarExtentionType('Search')} className='btn ' style={{backgroundColor:'transparent',border:''}}>
                                               <SearchIcon/>
                                               {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Search</text> : null }
                                           </button>
                                       </div>
       
                               
                           
       
                                       <div className='mt-md-4' style={{display:'flex'}}>
                                       <a className='btn ' href='/explore/' style={{backgroundColor:'transparent',border:''}}>
                                               <ExploreIcon/>
                                               {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Explore</text> : null }
                                               
                                           </a>
                                       </div>
       
                           
       
                                       <div className='mt-md-4' style={{display:'flex'}}>
                                       <a className='btn ' href='/reels/' style={{backgroundColor:'transparent',border:''}}>
                                               <ReelsIcon/>
                                               {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Reels</text> : null }
                                           </a>
                                       </div>
       
                           
       
                                       <div className='mt-md-4' style={{display:'flex',border:''}}>
                                          <a className='btn ' href='/direct/inbox/' style={{backgroundColor:'transparent',border:''}}>
                                               <MessengerIcon/>
                                               {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Messages</text> : null }
                                           </a>
                                       </div>
       
                       
       
                                       <div className={`${styles.DCCLXVIINavbarElement} mt-md-4`}  style={{display:'flex',border:''}}>
                                         <button className=' btn'><BlackHeart/></button>
                                         {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Notifications</text> : null }
                                       </div>
       
       
                       
       
                                       <div className='mt-md-4' style={{display:''}}>
                                         <button className='btn ' href='/' style={{backgroundColor:'transparent',border:''}}>
                                                 <NewPostIcon/>
                                                 {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Create</text> : null }
                                             </button>
                                       </div>
       
                       
       
                                       <div className=''>
                                        <a className='btn  mt-md-4' href={`/${user.username}`} style={{backgroundColor:'transparent',border:'',display:'flex'}}>
                                               <UserPFPIcon src={user.pfpFirebasePathURL ? user.pfpFirebasePathURL : null}/>
                                               {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>Profile</text> : null }
                                           </a>
                                       </div>
       
       
       
                                       <div className={`${styles.DCCLXVIINavbarElement} mt-5`}  style={{display:'flex'}}>
                                       <button className='btn' href='/' style={{backgroundColor:'transparent',border:'',display:'flex'}}>
                                               <ListIcon/>
       
                                               {!showDesktopOnlyNavbarExtended ? <text className={`${styles.desktopOnlyText} mx-2`}>More</text> : null }
                                           </button>
                                       </div>
       
       
       
       
       
             </div>
             {showDesktopOnlyNavbarExtended ? 
             <DesktopOnlyNavbarExtended desktopOnlyNavbarType={desktopOnlyNavbarType}/>
             
           : null}
       
           </div>
           </div>
       
         )
       }
       
       export default VertHorizNav
       
        */