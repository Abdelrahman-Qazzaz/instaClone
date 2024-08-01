import React, { useState } from 'react';

function UserTab(props) {


    const [backgroundColor,setBackgroundColor] = useState('transparent')
const classes = props.noBottomBorder ? 'd-flex align-items-center mt-2 p-2' : 'border-bottom d-flex align-items-center'
  return (
    <>
    {props.inbox ?
    <div className={classes} style={{minWidth:'250px'}}> 
        <div>
            <img style={{width:'60px',height:'60px',borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ? props.targetUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'}  alt="" />
        </div>
        <div className='ms-3' style={{fontWeight:'600'}}>
            {props.targetUser.username}
        </div>
        <div className='flex-grow-1 d-flex justify-content-end' style={{border:''}}>
            <button onClick={props.onClick} className='btn btn-primary me-3' style={{width:'80px'}}>Send</button>
        </div>
    </div>
    :
    props.searchSuggestion
    ?
<button onClick={()=>{
  if(!props.onMobile){
    props.setDesktopOnlyNavbarType('');
  }
  props.navigate(`/${props.targetUser.username}/`)
  
  }} className='p-0 mb-3' style={{width:'100%',border:'none',backgroundColor:backgroundColor}} onMouseEnter={()=> setBackgroundColor('#e0e0e0')} onMouseLeave={()=>setBackgroundColor('transparent')}>
              <div  style={{height:'75px',display:'flex',alignItems:'center'}}>
                <div style={{width:'44px',height:'44px'}}><img style={{borderRadius:'50%'}} width='100%' src={props.targetUser.pfpFirebasePathURL ? props.targetUser.pfpFirebasePathURL  : "/defaultInstaPFP.jpg"} alt="" /></div>
                <div className='mx-3 '>
                  <div className='' style={{textAlign:'left'}}>
                    <text style={{fontWeight:'650',color:'black'}}>{props.targetUser.username}</text>
                  </div>
                  <div className='' style={{textAlign:'left'}}>
                    <text style={{color:'#758694',}}>{props.targetUser.full_name} {props.targetUser.peopleYouFollowThatFollowTheSuggestedUser.length !== 0 ? '• Followed by '
                    + 
                    (props.targetUser.peopleYouFollowThatFollowTheSuggestedUser.map((aUser,index)=> 
                    (aUser.username + (index !=  props.targetUser.peopleYouFollowThatFollowTheSuggestedUser.length-1 && props.targetUser.peopleYouFollowThatFollowTheSuggestedUser.length > 1 ? ' ,' : '')))): ''}
                    </text>
                  </div>
                </div>
              </div>
            </button> 
    :
    <div className='border-bottom d-flex align-items-center p-2' style={{minWidth:'250px'}}> 
    <div>
        <img style={{width:'50px',height:'50px'}} src={props.targetUser.pfpFirebasePathURL ? props.targetUser.pfpFirebasePathURL : '/defaultInstaPFP.jpg'}  alt="" />
    </div>
    <div className='ms-3' style={{fontWeight:'600'}}>
        {props.targetUser.username}
    </div>
    <div className='flex-grow-1 d-flex justify-content-end' style={{border:''}}>
        <button onClick={props.onClick} className='btn btn-primary me-3' style={{width:'80px'}}>Send</button>
    </div>
</div>}

    </>
  )
}

export default UserTab