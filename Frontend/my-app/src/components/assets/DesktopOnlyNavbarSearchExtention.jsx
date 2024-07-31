import React, { useContext, useState } from 'react'
import { FilledInput } from '@mui/material'
import XIcon from './XIcon'
import axios from 'axios'
import userContext from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import UserTab from '../UserTab'

function DesktopOnlyNavbarSearchExtention() {

    const [inputValue,setInputValue] = useState('')
    const [searchSuggestions,setSearchSuggestions] = useState([])

    const navigate = useNavigate()
    
    function emptyInput(){
      setInputValue('')
    }
    async function handleChange(e){
      const { value } = e.target
      if(value.trim() == '' && inputValue.trim() != ''){
        setInputValue('')
      }
      else if(value.trim() != ''){
        setInputValue(value)
      const { data } = await axios.get(`http://localhost:4000/search-suggestions?input=${value}`,{withCredentials:true})
      const filtered = data.users.filter((suggestedUser)=>suggestedUser._id != user._id)
      setSearchSuggestions(filtered)
    }

  
    }
  
  
    const { user } = useContext(userContext)
    function getAndSetpeopleYouFollowThatFollowTheSuggestedUser(searchSuggestion){
      let temp = []
      for(const following of user.following){
      const target = searchSuggestion.followedBy_ids.find((followerID)=> followerID == following._id)
      if(target){
        temp.push(following)
        }
      }
      return temp
    }


  return (
    <div className='d-none d-md-flex border border-left px-2' style={{width:'400px',borderRadius:'2%',height:'100%',backgroundColor:'white',border:'',flexDirection:'column'}}>

    <div className={`${ inputValue== '' ? 'border-bottom' : ' '}`} style={{height:'160px',display:'flex',alignItems:'flex-end',border:''}}>
        <div className='' style={{height:'80%',border:''}}>
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

   <div style={{border:'',display:'flex',flexDirection:'column',justifyContent:'center'}}>

          {searchSuggestions.map((searchSuggestion)=>{
              searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser = getAndSetpeopleYouFollowThatFollowTheSuggestedUser(searchSuggestion)
            return <>
              <UserTab targetUser={searchSuggestion} searchSuggestion={true}/>
              {/* */}
            </>
            
          })}

    </div>

  </div>
  )
}

export default DesktopOnlyNavbarSearchExtention