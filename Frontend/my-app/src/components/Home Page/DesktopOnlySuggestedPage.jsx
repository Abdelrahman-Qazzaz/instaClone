import React, { useContext,useState,useEffect } from 'react'
import userContext from '../../UserContext'
import UserSuggestion from '../assets/UserSuggestion'
import UserPFPIcon from '../assets/UserPFPIcon'

function DesktopOnlySuggestedPage(props) {
    const { user,fetchSuggestedUsers,setShowSuggestedPage,setShowSwitchScreen } = useContext(userContext)
    const [suggestedUsers,setSuggestedUsers] = useState([])

    useEffect(()=>{
        setup()
    },[])
    
    async function setup(){
        const suggestedUsers = await fetchSuggestedUsers()
        setSuggestedUsers(suggestedUsers)
    }
  return (
    <div className=' mt-4' style={{width:'319px',height:'547px',display:'flex',flexDirection:'column'}}>
        <div className='' style={{height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{width:'44px',height:'44px'}}><UserPFPIcon forDesktopOnlySuggestions={true} src={user.pfpFirebasePathURL}/></div>
            <div className='' style={{width:'240px',display:'flex',justifyContent:'center'}}>
                <div className=' mx-3' style={{width:'100%',height:'fit-content'}} >
                    <div className=''><text  style={{fontWeight:'600',fontSize:'0.9rem',}}> {user.username}</text></div>
                    <div className=' '><text  style={{fontWeight:'600',fontSize:'0.7rem',color:'#758694'}}> {user.username}</text></div>
                </div>
            </div>
            <div><button onClick={()=> setShowSwitchScreen(true)} style={{height:'18px',lineHeight:'18px',fontWeight:'500',fontSize:'0.85rem'}} className='btn text-info p-0'>Switch</button></div>
        </div>
        <div className='mt-3' style={{flex:1,display:'flex',flexDirection:'column'}}>
            <div className='mb-1' style={{display:'flex',justifyContent:'space-between'}}><div><text style={{color:'#758694',fontWeight:'550'}}>Suggested for you</text></div><button onClick={()=> setShowSuggestedPage(true)} className='p-0' style={{border:"none",backgroundColor:'transparent'}}><text style={{fontSize:'0.82rem',fontWeight:'600'}}>See All</text></button></div>
            <div className='' style={{flex:1}}>
                {suggestedUsers && suggestedUsers.map((aUser)=>(
                <UserSuggestion  suggestedUser={aUser}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DesktopOnlySuggestedPage





/*
    <div className='mt-4 mx-5 ' style={{:'',width:'319px',height:'547px',display:'flex',flexDirection:'column'}}>

         <div className='' style={{:'',height:'44px',display:'flex',justifyContent:'space-between'}}>
            <div className='mt-1' style={{width:'44px'}}>
                <img width='100%' height='100%' src="defaultInstaPFP.jpg" alt="" />
            </div>
            <div className='mx-3' style={{flex:1,:''}}>
                <div ><text style={{fontWeight:'600',fontSize:'0.9rem',}}>Katie</text></div>
                <div style={{display:'flex',alignContent:'flex-start'}}><text style={{fontWeight:'600',fontSize:'0.9rem',color:'#758694'}}>Katie</text></div>
            </div>
            <div style={{width:'50px',display:'flex',alignItems:'center'}}>
                <button style={{height:'18px',lineHeight:'18px',fontWeight:'500',fontSize:'0.85rem'}} className='btn text-info p-0'>Switch</button>
            </div>
         </div>
         <div className='mt-4 ' style={{:'',flex:1}}>
            <div className='' style={{display:'flex',justifyContent:'space-between',height:'fit-content'}}>
                <div className='mx-3'><text style={{color:'#758694',fontWeight:'550'}}>Suggested for you</text></div>
                <div className='mx-4'><button className='' style={{:"none",backgroundColor:'transparent',fontSize:'0.82rem',fontWeight:'600'}}>See All</button></div>
            </div>
            <div style={{:''}}>
                

                      {suggestedUsers && suggestedUsers.map((suggestedUser)=>
                (
               <UserSuggestion suggestedUser={suggestedUser}/>
                ))}



            </div>
         </div>
    </div>
*/