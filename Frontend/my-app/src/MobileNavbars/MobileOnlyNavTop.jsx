import { FilledInput } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../components/assets/SearchIcon';
import UserTab from '../components/UserTab';
import styles from "../rest.module.css";
import userContext from '../UserContext';


function MobileOnlyNavTop() {

  const [showSearchTab,setShowSearchTab] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const { user } = useContext(userContext)
  const [searchSuggestions,setSearchSuggestions] = useState([])
  const navigate = useNavigate()

  function toggleSearchTab(){
    setShowSearchTab(!showSearchTab)
  }

  async function handleChange(e){
    const { value } = e.target
    if(value.trim() == '' && inputValue.trim() != ''){
      setInputValue('')
    }
    else if(value.trim() != ''){
      setInputValue(value)
    const { data } = await axios.get(`${process.env.REACT_APP_BACKENDAPI}/search-suggestions?input=${value}`,{withCredentials:true})
    const filtered = data.users.filter((suggestedUser)=>suggestedUser._id != user._id)
    setSearchSuggestions(filtered)
  }
}


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

  const [height,setHeight] = useState("fit-content")
  useEffect(()=>{
    if(showSearchTab){
      setHeight('100vh')
    }
    else{
      setHeight('fit-content')
    }
  },[showSearchTab])

  return (
    <div style={{position:'fixed',top:0,left:0,height,width:'100vw',zIndex:1,border:'2px solid red'}} className='d-flex flex-column border-bottom'>
      <navbar className='d-md-none d-block m-0 p-0' style={{height:'60px',backgroundColor:'white',border:'',zIndex:4}}>
          <div className="container p-0 m-0" style={{width:'100%',height:'100%',maxWidth:'100%',}}>
              <div className="row m-0 p-1" style={{width:'100%',height:'100%',width:'100%',display:'flex'}}>
                  <button onClick={()=> navigate('/')} className='col-6 p-0' style={{textAlign:'left',alignContent:'center',border:"none",backgroundColor:"transparent"}}><text className={styles.zenLoop}>instaClone</text></button>
                  <div className="col-6 d-flex justify-content-end align-items-center  p-0" style={{alignContent:'center',border:""}}>
                    <button className='p-0' style={{border:'none',backgroundColor:"transparent"}} onClick={toggleSearchTab}><SearchIcon width='20px'/></button>
                  </div>
              </div>
          </div>
      </navbar>
     { 
     showSearchTab
     ?
      <div style={{border:"",backgroundColor:"white",zIndex:928109021903291}} className='flex-grow-1 border-top'>
        <FilledInput onChange={handleChange} value={inputValue} inputProps={{placeHolder: 'Search',style:{height:"40px",lineHeight:"40px",border:"",padding:'0 3px 0 3px',zIndex:329810}}} size='small' style={{height:'40px',padding:0,width:'100%',zIndex:32189,marginTop:'1px'}} disableUnderline={true}/>
     
        {searchSuggestions && searchSuggestions.length ? searchSuggestions.map((searchSuggestion)=>{
          searchSuggestion.peopleYouFollowThatFollowTheSuggestedUser = getAndSetpeopleYouFollowThatFollowTheSuggestedUser(searchSuggestion)
          return    <div onClick={()=> {navigate(`/${searchSuggestion.username}/`); toggleSearchTab()} } style={{padding:'0 3px 0 3px'}}>
            <UserTab onMobile={true} navigate={navigate} targetUser={searchSuggestion} searchSuggestion={true}/>
            </div>}) : null}

      </div>
      :
    null
      }
    </div>
  )
}

export default MobileOnlyNavTop

/*
 */



/**
 *
 */