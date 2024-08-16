import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../../UserContext'
import FollowButton2 from './FollowButton2'
import UserPFPIcon from './UserPFPIcon'
import XIcon from './XIcon'

function SuggestedUserCard(props) {

  const { user,getPeopleYouFollowThatFollowTheSuggestedUser,toggleUnfollowConfirmationScreen } = useContext(userContext)
  const navigate = useNavigate()

  const [peopleYouFollowThatFollowTheSuggestedUser,setPeopleYouFollowThatFollowTheSuggestedUser] = useState([])

  
  useEffect(()=>{
   setup()
  },[])

  async function setup(){
    const pplYkThatFollowThisUser = await getPeopleYouFollowThatFollowTheSuggestedUser(props.suggestedUser)
    setPeopleYouFollowThatFollowTheSuggestedUser(pplYkThatFollowThisUser)
  }



  function removeSuggestion(){
    props.setSuggestedUsers((prev)=>{
      const filteredArray = prev.filter((elem)=> elem._id != props.suggestedUser._id)
      return filteredArray
    })
  }

  return (
    <>
<div class="card mx-1" style={{minWidth: '170px',maxWidth:'170px',height:'250px',position:'relative'}}>
  <div style={{position:'absolute',left:'82%',top:'2%',zIndex:1}}><button onClick={removeSuggestion} className='p-0' style={{backgroundColor:'transparent',border:'none'}}><XIcon /></button></div>
<div className='mt-3 mb-2' style={{display:'flex',justifyContent:'center',zIndex:1}}><button onClick={() => navigate(props.suggestedUser.username + '/')} className='p-0' style={{border:'none',backgroundColor:'transparent'}}><UserPFPIcon src={props.suggestedUser.pfpFirebasePathURL ? props.suggestedUser.pfpFirebasePathURL : null} forCard={true}/></button> </div>

<div class="card-body p-0" style={{textAlign:'center',display:'flex',flexDirection:'column'}}>
  <text class="card-title mb-1" style={{fontWeight:'600',overflow:'hidden',textOverflow:'ellipsis'}}>{props.suggestedUser.username}</text>
  <div  style={{display:'flex',flex:1,justifyContent:'center',textAlign:'center'}}><p class="card-text" style={{width:'90%',border:'',color:'#758694'}}>{peopleYouFollowThatFollowTheSuggestedUser.length == 0 ? 'Popular' : 'Followed by'}</p></div>

  {peopleYouFollowThatFollowTheSuggestedUser.length ?
  <div style={{display:'flex',justifyContent:'center',}}>
    <div style={{height:'50px',border:'',width:'52%',}}>
    <p style={{overflow:'hidden',textOverflow:'ellipsis',color:'#758694',textAlign:'center'}}>{peopleYouFollowThatFollowTheSuggestedUser.map((aUser,index)=>{ return index != 0 ? ', ' + aUser.username : aUser.username})}</p>
    </div>
  </div> : null
  }

  <div className='border-top' style={{height:'42px',backgroundColor:'',zIndex:1}}>
   {user.following_ids.includes((props.suggestedUser._id)) ? <button onClick={()=>{toggleUnfollowConfirmationScreen(props.suggestedUser)}} style={{width:'100%',height:'42px',lineHeight:'42px',fontWeight:'600'}} className="btn text-info p-0 b-0">Following</button>: <FollowButton2 suggestedUser={props.suggestedUser}/>}
  </div>
</div>


</div>


  </>
  )
}

export default SuggestedUserCard


/*


<div class="card mx-1" style={{minWidth: '170px',maxWidth:'170px',maxHeight:'250px',position:''}}>
  <div className='' style={{height:'fit-content',display:'flex',justifyContent:'end'}}><button className='mx-2 mt-1 p-0' style={{backgroundColor:'transparent',border:'none'}}><XIcon/></button></div>
<div className='mt-3 mb-2' style={{display:'flex',justifyContent:'center'}}><img class="card-img-top"  src="defaultInstaPFP.jpg" alt="Card image cap" style={{width:'74px',height:'74px',borderRadius:'50%'}}/></div>
<div class="card-body p-0" style={{textAlign:'center',display:'flex',flexDirection:'column'}}>
  <text class="card-title mb-1" style={{fontWeight:'600'}}>catgirl</text>
  <div  style={{display:'flex',justifyContent:'center',textAlign:'center'}}><p class="card-text" style={{width:'90%',border:'',color:'#758694'}}>Followed by</p></div>
  <div style={{display:'flex',justifyContent:'center',}}><div style={{height:'50px',border:'',width:'52%',}}><p style={{overflow:'hidden',textOverflow:'ellipsis',color:'#758694',textAlign:'center'}}>Katie,Katie,Katie,Katie,Katie</p></div></div>
  <div className='border-top' style={{flex:1,height:'42px'}}><button style={{width:'100%',height:'42px',lineHeight:'42px',fontWeight:'600'}} className="btn text-info p-0 b-0">Follow</button></div>
</div>
</div>

*/