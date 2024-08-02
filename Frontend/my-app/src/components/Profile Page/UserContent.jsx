import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PostsIcon from '../assets/PostsIcon';
import ReelsIcon from '../assets/ReelsIcon';
import SuggestedPage from '../Home Page/SuggestedPage';
import PostsTab from './Tabs/PostsTab';
import ReelsTab from './Tabs/ReelsTab';



function UserContent(props) {
  const navigate = useNavigate()
  const baseProfilePagePath = props.targetUser.username
  console.log(baseProfilePagePath)


  const [showFollowersList,setShowFollowersList] = useState(false)
  function toggleFollowersList(){
    setShowFollowersList(!showFollowersList)
  }
  const [showFollowingList,setShowFollowingList] = useState(false)
  function toggleFollowingList(){
    setShowFollowingList(!showFollowingList)
  }
  
   
//userList
  return (
    showFollowersList
    ?
    <SuggestedPage userList={props.targetUser.followedBy} onClick={()=> setShowFollowersList(false)}/>
    :
    showFollowingList
    ?
    <SuggestedPage userList={props.targetUser.following}  onClick={()=> setShowFollowingList(false)}/>
    :
    <div className='mt-4' style={{width:'',overflowY:'auto'}}>

      <div className='container' style={{maxWidth:'100%'}}>
          <div className="row m-0 my-2 p-0 border-top border-bottom">
            <div className="col-4 d-flex flex-column align-items-center"><div className='fw-bold'>{props.targetUser.posts_ids.length}</div><div style={{color:'#758694'}}>posts</div></div>
            <button onClick={toggleFollowersList}className="col-4 d-flex flex-column align-items-center p-0" style={{border:'none',backgroundColor:"transparent"}}><div className='fw-bold'>{props.targetUser.followedBy_ids.length}</div><div style={{color:'#758694'}}>followers</div></button>
            <button onClick={toggleFollowingList} className="col-4 d-flex flex-column align-items-center p-0" style={{border:'none',backgroundColor:"transparent"}}><div className='fw-bold'>{props.targetUser.following_ids.length}</div><div style={{color:'#758694'}}>following</div></button>
          </div>
          <div className="row m-0 p-0" style={{}}>
            <div className="col-4 d-flex mt-2 justify-content-center"><button onClick={()=>{navigate('/'+baseProfilePagePath+'/')}}  className='p-0' style={{border:'none',backgroundColor:'transparent',color:"black"}}><PostsIcon/></button></div>
            <div className="col-4 d-flex mt-2 justify-content-center"><button onClick={()=>{navigate('/'+baseProfilePagePath+'/'+ 'reels/')}}  className='p-0' style={{border:'none',backgroundColor:'transparent',color:"black"}}><ReelsIcon width={'20'}/></button></div>
          </div>
      </div>
      <div className='mt-3'>
        <Routes>
          <Route path={`/${baseProfilePagePath}/`} element={<PostsTab targetUser={props.targetUser}/>} />
          <Route path={`/${baseProfilePagePath}/reels`} element={<ReelsTab targetUser={props.targetUser}/>} />

        </Routes>
      </div>
    </div>
  )
}

export default UserContent
/*
   <Routes>
    <Route path={'/'+props.path} element={<PostsTab/>} />
    <Route path={'/'+props.path+'Reels/'} element={<ReelsTab/>} />
    <Route path={'/'+props.path+'Tagged/'} element={<TaggedTab/>} />
  </Routes> */