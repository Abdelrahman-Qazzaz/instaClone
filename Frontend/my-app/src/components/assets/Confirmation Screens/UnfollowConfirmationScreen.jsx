import React, { useContext } from 'react'
import userContext from '../../../UserContext'
import BlackBackground from '../BlackBackground'

//style={{background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: '0',left: '0' ,width: '100%', height: '100%'}}

function UnfollowConfirmationScreen(props) {

    const { user,setUser,fetchUser,toggleUnfollowConfirmationScreen,unfollowUser } = useContext(userContext)


  return ( 
    <>
    <BlackBackground/>
    <div style={{position:'fixed',height:'100vh',width:'100vw',backgroundColor:'',zIndex:1,display:'flex',justifyContent:'center',alignItems:'center',left:0,zIndex:6}}>
        <div style={{width:'400px',height:'293px',backgroundColor:'white',borderRadius:'5%'}} className='d-flex flex-column'>
            <div className='flex-grow-1'>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100%'}}>
                    <img width='90px' height='90px' src="/defaultInstaPFP.jpg" alt="" />
                    <div className='mt-4'>Unfollow @{props.suggestedUser.username}?</div>
                </div>
            </div>
            <div style={{height:'48px'}} className='border-top d-flex justify-content-center'><button className='btn fw-bold' style={{color:'red',width:'100%'}} onClick={() => unfollowUser(props.suggestedUser._id)}>Unfollow</button></div>
            <div style={{height:'48px'}} className='border-top d-flex justify-content-center'><button className='btn'  style={{width:'100%'}}  onClick={()=>{toggleUnfollowConfirmationScreen()}}>Cancel</button></div>
        </div>
    </div>
    </>
  )
}

export default UnfollowConfirmationScreen

/*
    <div className='' style={{backgroundColor:'',height:'99.4%',position:'fixed',width:'31%',left:'34.5%',display:'flex',alignItems:'center'}}>

        <div className='border' style={{height:'293px',width:'100%',backgroundColor:'white'}}>
            <div className='border-bottom ' style={{height:'197px',display:'flex',justifyContent:'center'}}>
                <div style={{width:'336px',border:'',display:'flex',justifyContent:'center',alignItems:'center',height:'197px'}}>
                    <div className="container">
                        <div className="row d-flex justify-content-center mb-4" ><img className='' width="90px" src="" alt="" /></div>
                        <div className="row d-flex justify-content-center">Unfollow @{props.user.username}?</div>
                    </div>
                </div>
            </div>
            <div className=' border-bottom' style={{height:'48px',display:'flex',alignItems:'center'}}><button className='btn text-danger fw-bold' style={{width:'100%'}}>Unfollow</button></div>
            <div onClick={()=>{props.setShowUnfollowConfirmationScreen(false)}} className=' border-bottom' style={{height:'48px',display:'flex',alignItems:'center'}}><button className='btn' style={{width:'100%'}}>Cancel</button></div>
        </div>
    </div>

    <div style={{position:'fixed',width:'100%',height:'100%',left:0,border:'2px solid blue',zIndex:1,background: 'rgba(0, 0, 0, 0.5)',}}>
    <div className='' style={{height:'99.4%',position:'fixed',width:'31%',left:'34.5%',display:'flex',backgroundColor:'',alignItems:'center'}}>
        <div className='border' style={{height:'293px',width:'400px',backgroundColor:'white',borderRadius:'5%'}}>
            <div className='border-bottom ' style={{height:'197px',display:'flex',justifyContent:'center'}}>
                <div style={{width:'336px',border:'',display:'flex',justifyContent:'center',alignItems:'center',height:'197px'}}>
                    <div className="container ">
                        <div className=' d-flex justify-content-center'><div className="row mb-4" style={{height:"90px",width:'110px'}} ><img className=''    src="/defaultInstaPFP.jpg" alt="" /></div></div>
                        <div className="row d-flex justify-content-center">Unfollow @{props.suggestedUser.username}?</div>
                    </div>
                </div>
            </div>
            <div className=' border-bottom' style={{height:'48px',display:'flex',alignItems:'center'}}><button onClick={unfollowUser} className='btn text-danger fw-bold' style={{width:'100%'}}>Unfollow</button></div>
            <div onClick={()=>{props.setShowUnfollowConfirmationScreen(false)}} className=' border-bottom' style={{height:'48px',display:'flex',alignItems:'center'}}><button className='btn' style={{width:'100%'}}>Cancel</button></div>
        </div>
    </div>
</div>
*/