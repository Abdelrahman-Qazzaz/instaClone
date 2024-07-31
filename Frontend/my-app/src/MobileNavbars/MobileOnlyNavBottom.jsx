import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ExploreIcon from '../components/assets/ExploreIcon'
import HomeIcon from '../components/assets/HomeIcon'
import MessengerIcon from '../components/assets/MessengerIcon'
import NewPostIcon from '../components/assets/NewPostIcon'
import ReelsIcon from '../components/assets/ReelsIcon'
import UserPFPIcon from '../components/assets/UserPFPIcon'
import userContext from '../UserContext'

function MobileOnlyNavBottom() {
    const { user,setShowCreateNewPostScreen } = useContext(userContext)
    const navigate = useNavigate()
    
  return (
    <navbar className='d-md-none d-flex justify-content-center border-top' style={{width:'100%',position:'fixed',top:'calc(100vh - 50px)',height:'50px',backgroundColor:'white',zIndex:4}}>
        <div className='d-flex justify-content-between' style={{width:'90%'}}>
                                     <button onClick={()=>{navigate('/')}} className='btn ' style={{backgroundColor:'transparent',border:''}}>
                                        <HomeIcon/>
                                       </button>

       
       

                               
                           
       

                                       <button onClick={()=>{navigate('/explore/')}} className='btn '  style={{backgroundColor:'transparent',border:''}}>
                                               <ExploreIcon/>

                                               
                                           </button>
       
                           
       

                                       <button onClick={()=>{navigate('/reels/')}} className='btn '  style={{backgroundColor:'transparent',border:''}}>
                                               <ReelsIcon/>

                                           </button>

       
                           
       

                                          <button onClick={()=>{navigate('/direct/inbox/')}} className='btn '  style={{backgroundColor:'transparent',border:''}}>
                                               <MessengerIcon/>

                                           </button>

       
                       
       
                               

       
       
                       
       

                                         <button  onClick={()=>{setShowCreateNewPostScreen(true)}} className='btn'  style={{backgroundColor:'transparent',border:''}}>

                                         <NewPostIcon/>

                                             </button>

       
                       


                                        <button onClick={()=>{navigate('/'+user.username+'/')}} className='btn'  style={{backgroundColor:'transparent',border:'',display:'flex'}}>
                                               <UserPFPIcon src={user.pfpFirebasePathURL ? user.pfpFirebasePathURL : null}/>

                                           </button>

       
       
        </div>
    </navbar>
  )
}

export default MobileOnlyNavBottom