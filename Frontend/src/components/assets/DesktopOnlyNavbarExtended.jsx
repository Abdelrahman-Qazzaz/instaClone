import React from 'react'

import DesktopOnlyNavbarSearchExtention from './DesktopOnlyNavbarSearchExtention'

function DesktopOnlyNavbarExtended(props) {



  return (
    props.desktopOnlyNavbarType == 'Search' ? <DesktopOnlyNavbarSearchExtention setDesktopOnlyNavbarType={props.setDesktopOnlyNavbarType}/> : <></>

  )
}

export default DesktopOnlyNavbarExtended


/*
 <div className='d-none d-md-flex' style={{width:'400px',borderRadius:'2%',height:'100%',backgroundColor:'white',border:'',flexDirection:'column'}}>

    <div className={`${ inputValue== '' ? 'border-bottom' : ' '}`} style={{height:'160px',display:'flex',alignItems:'flex-end',border:''}}>
        <div className='mx-4' style={{height:'80%',border:''}}>
          <div className='mb-4' style={{height:'30%',border:'',display:'flex',alignItems:'center',}}>
            <text className='' style={{fontSize:'1.6rem',fontWeight:'630'}}>Search</text>
          </div>
          <div className='' style={{height:'fit-content',border:''}}>
               <FilledInput endAdornment={
                <button onClick={emptyInput} className='p-0' style={{border:'none', backgroundColor:'grey',opacity:0.4,borderRadius:'50%',height:'35%',display:'flex',alignItems:'center'}}><XIcon forDesktopOnlyExtendedNavBar/></button>
               } inputProps={{placeHolder: 'Search',style:{lineHeight:'40px',padding:'0 10px 0 10px'},value:inputValue,onChange:handleChange}} size='small' style={{height:'40px',width:'360px',borderRadius:'2%'}} disableUnderline={true} />
          </div>
        </div>
    </div>

   <div style={{flex:1,border:'',display:'flex',justifyContent:'center'}}>
      <div style={{width:'85%',border:'',height:'fit-content'}}>
          {searchSuggestions.map((searchSuggestion)=>{
              searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser = getAndSetpeopleYouFollowThatFollowTheSuggestedUser(searchSuggestion)
            return <button onMouseEnter={()=>{document.getElementById('div').style.backgroundColor = '#e0e0e0'}} style={{width:'100%',backgroundColor:'transparent',border:'none'}}>
              <div id='div' style={{height:'60px',display:'flex',alignItems:'center'}}>
                <div style={{width:'44px',height:'44px'}}><img width='100%' src="defaultInstaPFP.jpg" alt="" /></div>
                <div className='mx-3 '>
                  <div className=''>
                    <text style={{fontWeight:'650'}}>{searchSuggestion.username}</text>
                  </div>
                  <div className='' style={{textAlign:'left'}}>
                    <text style={{color:'#758694',}}>{searchSuggestion.full_name} {searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser.length !== 0 ? '• Followed by '+ (searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser.map((aUser,index)=> (aUser.username + (index !=  searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser.length-1 && searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser.length > 1 ? ' ,' : '')))): ''}</text>
                  </div>
                </div>
              </div>
            </button>
          })}
      </div>
    </div>

  </div>
*/