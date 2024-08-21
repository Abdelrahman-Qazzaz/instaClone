import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../../UserContext";
import styles from "../../rest.module.css";
import NotFoundPage from "../NotFoundPage";
import LeftArrowIcon from "../assets/LeftArrowIcon";
import UserContent from "./UserContent";
import UserDetails from "./UserDetails";

function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();

  const [targetUser, setTargetUser] = useState(null);
  const { user, setUser, isLoading, setIsLoading, config } =
    useContext(userContext);
  const [showNotFound, setShowNotFound] = useState(false);

  async function fetchTargetUserData(pfpUpload = false) {
    setIsLoading(true);

    const username = params["*"].split("/")[0];

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKENDAPI}/${username}/`,
        config
      );

      if (data.targetUser) {
        setTargetUser({ ...data.targetUser });
      } else if (data.user) {
        setTargetUser({ ...data.user });
        if (pfpUpload) {
          setUser({ ...data.user });
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status == 401) {
        navigate("/");
      } else {
        navigate("/notFound");
      }
    }
    setIsLoading(false);
  }

  function manageTimer() {
    if (showNotFound) {
      setShowNotFound(false);
    }
    setTimeout(() => {
      setShowNotFound(true);
    }, 2000);
  }
  useEffect(() => {
    fetchTargetUserData();
    manageTimer();
  }, []);
  useEffect(() => {
    fetchTargetUserData();
    manageTimer();
  }, [params["*"]]);
  useEffect(() => {
    // for when on your own profile page.
    if (targetUser?._id == user._id) {
      fetchTargetUserData();
      manageTimer();
    }
  }, [user.posts_ids]);

  //

  //

  return isLoading ? null : !targetUser ? (
    showNotFound ? (
      <NotFoundPage />
    ) : (
      <></>
    )
  ) : (
    <>
      <div
        className={`${styles.adjustPoisitionProfilePage} d-flex flex-column flex-md-row mx-1`}
        style={{
          minHeight: "100vh",

          backgroundColor: "white",
          zIndex: 1,
        }}
      >
        <div
          className="d-flex d-md-none justify-content-between align-items-center border-bottom py-2"
          style={{ border: "", width: "" }}
        >
          <div style={{ width: "33.33%" }}>
            <button
              onClick={() => navigate("/")}
              className="p-0"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <LeftArrowIcon />
            </button>
          </div>
          <div
            style={{ width: "33.33%", fontWeight: "650" }}
            className="text-center"
          >
            {targetUser.username}
          </div>
          <div style={{ width: "33.33%" }}></div>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ border: " green", flex: 1 }}
        >
          <div
            className="d-flex flex-column flex-grow-1"
            style={{ maxWidth: "935px", border: "" }}
          >
            <UserDetails
              targetUser={targetUser}
              setTargetUser={setTargetUser}
              fetchTargetUserData={fetchTargetUserData}
            />
            <UserContent targetUser={targetUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

/*

UserIcon.jsx
const { user,fetchUser,setIsLoading,setShowSwitchScreen } = useContext(userContext)


    async function uploadPFP(e){
        setIsLoading(true)
        const files = e.target.files
        const formData = new FormData()
        formData.append('image',files[0])
        try{
           const { status }=  await axios.post('${process.env.REACT_APP_BACKENDAPI}/me/setProfilePicture',formData,{headers: {'Content-Type': 'multipart/form-data'},withCredentials:true})
            if(status === 200){
                await fetchUser(user._id)
                props.setShowPFPOptionsScreen(false)
            }
        }catch(err){
            console.log(err)
        }
        
        setIsLoading(false)
    }

    const [labelStyle,setLabelStyle] = useState({width:'100%',height:'100%',})
    function changeLabelStyle(){
        setLabelStyle(prev => ({...prev,cursor:'pointer'}))
    }
  return (
    <div style={{width:'200px'}}>
    <div  style={{width:'150px',height:'150px',borderRadius:'50%',border:'',position:'relative'}}>
        {user.pfpFirebasePathURL
        ?
        <button onClick={props.togglePFPOptionsScreen} className='p-0' style={{width:'100%',height:'100%',backgroundColor:'transparent',border:'none'}}>
        <div style={{width:'100%',height:'100%',}}>
            <img width='100%' height='100%' style={{borderRadius:'50%'}} src={user.pfpFirebasePathURL} alt="userPFP" />
        </div>
        </button>
        :
        <>
        <label htmlFor='imageInput' onMouseEnter={changeLabelStyle} style={labelStyle}>
        <div style={{width:'100%',height:'100%',border:'',display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:'url(/defaultInstaPFP.jpg)',backgroundSize:'100%',position:'relative'}}>  
            <div style={{width:'100%',height:'100%',border:'',position:'absolute',backgroundColor:'black',opacity:0.5,borderRadius:'50%'}}></div>
            <CameraIcon width={'40'}/>
        </div>
        </label>
        </>}

        <input id='imageInput' type="file" hidden onChange={uploadPFP}/>
      </div> 
</div>



MyProfilePage.jsx 
import React, { useState,useContext, useEffect } from 'react'
import { useLocation,useNavigate,Routes,Route } from 'react-router-dom';

import VertHorizNav from '../assets/VertHorizNav';
import 'filepond/dist/filepond.min.css';
import styles from "./profilePage.module.css"

import PostsIcon from '../assets/PostsIcon';
import ReelsIcon from '../assets/ReelsIcon';
import TaggedIcon from '../assets/TaggedIcon';
import PostsTab from './Tabs/PostsTab';
import ReelsTab from './Tabs/ReelsTab';
import TaggedTab from './Tabs/TaggedTab';
import userContext from '../../UserContext';


import CameraIcon from '../assets/CameraIcon';

import axios from 'axios';

import UserIcon from './UserIcon';
import UserDetails from './UserDetails';
import NewPostCircleIcon from './NewPostCircleIcon';
import CreateNewPostScreen from './CreateNewPostScreen';
import BlackBackground from '../assets/BlackBackground';


function MyProfilePage() {

    const { user,fetchUser,setIsLoading,setShowSwitchScreen } = useContext(userContext)




    const navigate = useNavigate()
    const location = useLocation()
    const [path,setPath] = useState(location.pathname)



    function redirect(subRoute){
        const substrings = path.split('/')
        const username = substrings[1]
        navigate(username + '/' + subRoute)

    }




    async function removePFP(){
        setIsLoading(true)

        try {
            await axios.delete('${process.env.REACT_APP_BACKENDAPI}/me/setProfilePicture',{withCredentials:true})
            await fetchUser(user._id)
            togglePFPOptionsScreen()
        } catch (error) {
            console.log(error)
        }
        setTimeout(()=>{},3000)
        setIsLoading(false)
    }
  

    const [showPFPOptionsScreen,setShowPFPOptionsScreen] = useState(false)
    function togglePFPOptionsScreen(){
        setShowPFPOptionsScreen(!showPFPOptionsScreen)
    }

    const [showCreateNewPostScreen,setShowCreateNewPostScreen] = useState(false)
  return (
    <div className='d-flex flex-column flex-md-row' style={{height:'100vh'}}>
        {
        showPFPOptionsScreen 
        ?
        <>
            <BlackBackground/>
            <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'fixed',zIndex:2}}>
                <div style={{position:'fixed',width:'350px',height:'350px',backgroundColor:'white',borderRadius:'5%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <label htmlFor='imageInput' style={{width:'100%'}} className='btn fw-bold border'>Change Profile Picture</label>
                    <button onClick={removePFP} className='btn fw-bold border' style={{color:'red',width:'100%'}}>Remove Profile Picture</button>
                </div>
            </div>

        </>
        :
        null
        }
        {
        showCreateNewPostScreen
        ?
        <CreateNewPostScreen setShowCreateNewPostScreen={setShowCreateNewPostScreen}/>
        :
        null
        }
   <div className='d-none d-md-block'><VertHorizNav/></div>

    <div className='d-flex flex-column align-items-center' style={{flex:1,overflowY:'auto'}}>
        <div className={`${styles.cw} d-flex flex-column`} style={{height:'100%',border:''}}>
            <div className="flex flex-column">
                <div className='d-flex justify-content-center ' style={{height:''}}>
                    <UserIcon setShowPFPOptionsScreen={setShowPFPOptionsScreen} togglePFPOptionsScreen={togglePFPOptionsScreen}/>
                    <UserDetails setShowSwitchScreen={setShowSwitchScreen}/>
                </div>
                <div className='mt-4 d-flex justify-content-center' style={{border:'    '}}>
                    <button onClick={()=> setShowCreateNewPostScreen(true)} style={{border:'none',backgroundColor:'transparent'}}><NewPostCircleIcon width={'50'}/></button>
                </div>
            </div>
         
            



            <div  className='border-top mt-3 flex-grow-1 d-flex flex-column'>
            <nav class="navbar navbar-light bg-light d-flex justify-content-center">
                <button onClick={() => redirect('')}  class="navbar-brand mx-4"> <PostsIcon/> <text style={{fontSize:'1rem'}}>Posts</text></button>
                <button onClick={() => redirect('Reels/')}  class="navbar-brand mx-4" href="/reels/"> <ReelsIcon width='16'/> <text style={{fontSize:'1rem'}}>Reels</text></button>
                <button onClick={() => redirect('Tagged/')} class="navbar-brand mx-4" href="/tagged/"> <TaggedIcon width='13' /> <text style={{fontSize:'1rem'}}>Tagged</text></button>
            </nav>
            <div className='border border-info flex-grow-1 justify-content-center' style={{overflowY:'auto'}}>
                <Routes>
                    <Route path={'/'+path} element={<PostsTab/>} />
                    <Route path={'/'+path+'Reels/'} element={<ReelsTab/>} />
                    <Route path={'/'+path+'Tagged/'} element={<TaggedTab/>} />
                </Routes>
            </div>
            </div>
           


            </div>

            </div>
        
            <div className='d-md-none'><VertHorizNav/></div>
        
           </div>
          )
        }
        
        export default MyProfilePage
*/

/*
Profile Page Desktop only
import React, { useEffect, useState,useContext } from 'react'
import { useLocation,useNavigate,Routes,Route } from 'react-router-dom';
import axios from "axios"
import NotFoundPage from '../NotFoundPage';
import VertHorizNav from '../assets/VertHorizNav';
import styles from "./profilePage.module.css"
import ThreeDots from "../assets/ThreeDots"
import LeftArrowIcon from '../assets/LeftArrowIcon';
import PostsIcon from '../assets/PostsIcon';
import ReelsIcon from '../assets/ReelsIcon';
import TaggedIcon from '../assets/TaggedIcon';
import PostsTab from './Tabs/PostsTab';
import ReelsTab from './Tabs/ReelsTab';
import TaggedTab from './Tabs/TaggedTab';
import userContext from '../../UserContext';
import UnfollowButton from '../assets/UnfollowButton';
import UnfollowConfirmationScreen from '../assets/Confirmation Screens/UnfollowConfirmationScreen';
import MyProfilePage from './MyProfilePage';
import UserPFPIcon from '../assets/UserPFPIcon';
import NewPostCircleIcon from './NewPostCircleIcon';
import FollowButton from '../assets/FollowButton'
import MessageUserButton from '../assets/MessageUserButton';
function ProfilePageDesktopOnly(props) {
    const { user,setUpUser } = useContext(userContext)
    const [peopleYouFollowThatFollowTheSuggestedUser,setPeopleYouFollowThatFollowTheSuggestedUser] = useState([])

    async function getAndSetpeopleYouFollowThatFollowTheSuggestedUser(){
        let temp = []
     if(!(user && user._id != -1))   /* 
                                        handles: 
                                        1.Non logged in users.
                                        2.Users who are logged in, but accessed the profile page by typing the URL into the search bar
                                     
                                        {await setUpUser()}         
                                        if(user.following){for(const following of user.following){
                                          const target = props.targetUser.followedBy_ids.find((followerID)=> followerID == following._id)
                                      
                                          if(target){
                                            temp.push(following)
                                            }
                                          }
                                          setPeopleYouFollowThatFollowTheSuggestedUser(temp)
                                        }
                                         
                                        }
                                      useEffect(()=>{
                                          getAndSetpeopleYouFollowThatFollowTheSuggestedUser()
                                      },[])
                                  
                                      const [showLinksPreview,setShowLinksPreview] = useState(false)
                                      function toggleLinksPreview(){
                                          setShowLinksPreview(!showLinksPreview)
                                      }
                                  
                                  
                                      /*
                                                                 {
                                                             user._id == props.targetUser._id 
                                                             ?
                                                              <>
                                                              <div className='d-flex justify-content-center' style={{width:'fit-content'}}>
                                                                  <div className='mt-3 d-flex flex-column align-items-center' style={{border:' red'}}>
                                                                      <div><button style={{border:'none',backgroundColor:'transparent'}}><NewPostCircleIcon width={'40'}/></button></div>
                                                                      <div className='mt-1' style={{color:'#758694'}}>New Post</div>
                                                                  </div>
                                                              </div>
                                                              </>
                                                              :
                                                              <></>
                                                              } 
                                    return (
                                      <>
                                          <div className='d-none d-md-block'><VertHorizNav/></div>
                                  
                                          <div className='flex-grow-1 d-none d-md-flex justify-content-center '>
                                              <div className='d-md-block d-none flex-column align-items-center' style={{width:'90%',overflowY:'auto'}}>
                                              <div className={`${styles.cw} d-flex flex-column`} style={{border:' blue',height:'100%',border:''}}>
                                                  <div className='d-flex flex-column'>
                                                      <div className='d-flex justify-content-center' style={{width:'',border:''}}>
                                                          <div className='d-flex' style={{minHeight:'200px',maxHeight:'300px',border:'',width:'85%'}}>
                                                              <div className='d-flex flex-column'><div className="flex-grow-1 d-flex align-items-center" style={{border:''}}><div style={{width:'120px',height:'120px',border:''}}><img width='100%' height='100%' src='/defaultInstaPFP.jpg' alt="" /></div></div></div>
                                                              <div className='flex-grow-1 mx-5 d-flex flex-column justify-content-center'>
                                                                  <div  style={{border:'',width:'100%',overflow:'hidden'}} className='d-flex align-items-center'><div style={{fontWeight:'650'}}>{props.targetUser.username}</div></div>
                                                                  <div style={{border:'',width:'fit-content'}} className='d-flex align-items-center justify-content-between my-2'>
                                                                      <div className='me-5'><text className='text-center'><span style={{fontWeight:'600'}}>{props.targetUser.posts_ids.length}</span> posts</text></div> 
                                                                      <div className='me-5'><text className='text-center'><span style={{fontWeight:'600'}}>{props.targetUser.followedBy_ids.length}</span> followers</text></div> 
                                                                      <div><text className='text-center'><span style={{fontWeight:'600'}}>{props.targetUser.following_ids.length}</span> following</text></div> 
                                                                  </div>
                                                                  <div style={{height:'90px',border:' red',width:'40%'}} className='d-flex flex-column'>
                                                                      <div style={{flex:1}}>
                                                                          <div style={{border:'',}}><text style={{fontWeight:'470'}}>{props.targetUser.full_name}</text></div>
                                                                          <div>description</div>
                                                                      </div>
                                                                      
                                                                      <div style={{border:' red',}}>
                                                                          <text style={{color:'#758694'}}>
                                                                              followed by {peopleYouFollowThatFollowTheSuggestedUser.map((user,index)=>(
                                                                                  index != peopleYouFollowThatFollowTheSuggestedUser.length - 1 
                                                                                  && index != peopleYouFollowThatFollowTheSuggestedUser.length > 1
                                                                                  ? user.username + ', '
                                                                                  : user.username + (index == peopleYouFollowThatFollowTheSuggestedUser.length -1 ? '.' : '')
                                                                                  ))}
                                                                              </text>
                                                                      </div>
                                                                  
                                                                  
                                                                  </div>
                                  
                                                              </div>
                                                  
                                  
                                                          </div>
                                                          
                                                      </div>
                                                      <div>
                                                                                     {
                                                             user._id == props.targetUser._id 
                                                             ?
                                                              <>
                                                              <div className='d-flex justify-content-center' style={{width:'fit-content'}}>
                                                                  <div className='mt-3 d-flex flex-column align-items-center' style={{border:' red'}}>
                                                                      <div><button onClick={()=> props.setShowCreateNewPostScreen(true)} style={{border:'none',backgroundColor:'transparent'}}><NewPostCircleIcon width={'40'}/></button></div>
                                                                      <div className='mt-1' style={{color:'#758694'}}>New Post</div>
                                                                  </div>
                                                              </div>
                                                              </>
                                                              :
                                                              <></>
                                                              }
                                                      </div>
                                                   </div>
                                          
                                  
                                  
                                                  <div className=' mt-3 p-0 m-0 container border-top' style={{maxWidth:'100%',border:'',}}>
                                                          <div className="row" style={{height:'100%',border:'',height:'60px'}}>
                                                              <div className="col-4" style={{border:' red',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                                  <div><text style={{fontWeight:'630'}}>{props.targetUser.posts_ids.length}</text></div>
                                                                  <div><text style={{color:'rgb(117, 134, 148)'}}>posts</text></div>
                                                              </div>
                                                              <div className="col-4" style={{border:' red',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                                  <div><text style={{fontWeight:'630'}}>{props.targetUser.followedBy_ids.length}</text></div>
                                                                  <div><text style={{color:'rgb(117, 134, 148)'}}>followers</text></div>
                                                              </div>
                                                              <div className="col-4" style={{border:' red',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                                  <div><text style={{fontWeight:'630'}}>{props.targetUser.following_ids.length}</text></div>
                                                                  <div><text style={{color:'rgb(117, 134, 148)'}}>following</text></div>
                                                              </div>
                                                          </div>
                                                  </div>
                                                  <div className='border-top flex-grow-1 d-flex flex-column'>
                                                  <nav class="navbar navbar-light bg-light d-flex justify-content-center">
                                                      <button onClick={() => props. redirect('')}  class="navbar-brand mx-4" style={{border:'none',backgroundColor:'transparent'}}> <PostsIcon/></button>
                                                      <button onClick={() => props. redirect('Reels/')}  class="navbar-brand mx-4" href="/reels/" style={{border:'none',backgroundColor:'transparent'}}> <ReelsIcon width='16'/></button>
                                                      <button onClick={() => props. redirect('Tagged/')} class="navbar-brand mx-4" href="/tagged/" style={{border:'none',backgroundColor:'transparent'}}> <TaggedIcon width='13' /></button>
                                                  </nav>
                                                  <div className='border border-info flex-grow-1 justify-content-center' style={{overflowY:'auto'}}>
                                                      <Routes>
                                                          <Route path={'/'+props.path} element={<PostsTab posts={props.targetUser.posts_ids}/>} />
                                                          <Route path={'/'+props.path+'Reels/'} element={<ReelsTab/>} />
                                                          <Route path={'/'+props.path+'Tagged/'} element={<TaggedTab/>} />
                                                      </Routes>
                                                  </div>
                                                  </div>
                                  
                                  
                                  
                                                  </div>
                                              </div>
                                          </div>
                                  
                                  
                                  
                                  
                                          
                                  
                                  
                                      </>
                                    )
                                  }
                                  
                                  export default ProfilePageDesktopOnly
                                  
                                  
                                  /*
                                             <div className='flex-grow-1 mx-2 mt-4' style={{border:' red',height:'fit-content'}}>
                                                              <div style={{border:''}}>
                                                                  <div className='d-flex flex-column' style={{width:'300px',border:''}}>
                                                                      <div><text style={{fontWeight:'630'}}>{props.targetUser.full_name}</text></div>
                                                                      <div className='' style={{border:'',maxHeight:'70px',minHeight:'40px',wordWrap:'break-word',overflow:'hidden'}}>
                                                                          <text style={{textOverflow:'ellipsis'}}>
                                                                              {props.targetUser.description ? props.targetUser.description : 'dnwq'}
                                                                          </text>
                                                                      </div>
                                                                      {user._id != props.targetUser._id && peopleYouFollowThatFollowTheSuggestedUser.length ? 
                                                                      <div className='mt-2'>
                                                                          <text style={{color:'#758694'}}>
                                                                          followed by {peopleYouFollowThatFollowTheSuggestedUser.map((user,index)=>(
                                                                              index != peopleYouFollowThatFollowTheSuggestedUser.length - 1 
                                                                              && index != peopleYouFollowThatFollowTheSuggestedUser.length > 1
                                                                              ? user.username + ', '
                                                                              : user.username + (index == peopleYouFollowThatFollowTheSuggestedUser.length -1 ? '.' : '')
                                                                              ))}
                                                                          </text>
                                                                      </div>: null}
                                                                  </div>
                                                              {
                                                              user._id == props.targetUser._id 
                                                              ?
                                                                  <>
                                                                  <div className='d-flex justify-content-center' style={{width:'fit-content'}}>
                                                                      <div className='mt-3 d-flex flex-column align-items-center' style={{border:' red'}}>
                                                                          <div><button style={{border:'none',backgroundColor:'transparent'}}><NewPostCircleIcon width={'40'}/></button></div>
                                                                          <div className='mt-1' style={{color:'#758694'}}>New Post</div>
                                                                      </div>
                                                                  </div>
                                                                  </>
                                                                  :
                                                                  <></>
                                                                  }
                                                              </div>
                                                          </div>
                                  */
/* mobile only
import React, { useEffect, useState,useContext } from 'react'
import { useLocation,useNavigate,Routes,Route } from 'react-router-dom';
import axios from "axios"
import NotFoundPage from '../NotFoundPage';
import VertHorizNav from '../assets/VertHorizNav';
import styles from "./profilePage.module.css"
import ThreeDots from "../assets/ThreeDots"
import LeftArrowIcon from '../assets/LeftArrowIcon';
import PostsIcon from '../assets/PostsIcon';
import ReelsIcon from '../assets/ReelsIcon';
import TaggedIcon from '../assets/TaggedIcon';
import PostsTab from './Tabs/PostsTab';
import ReelsTab from './Tabs/ReelsTab';
import TaggedTab from './Tabs/TaggedTab';
import userContext from '../../UserContext';
import UnfollowButton from '../assets/UnfollowButton';
import UnfollowConfirmationScreen from '../assets/Confirmation Screens/UnfollowConfirmationScreen';
import MyProfilePage from './MyProfilePage';
import UserPFPIcon from '../assets/UserPFPIcon';
import NewPostCircleIcon from './NewPostCircleIcon';
import CameraIcon from '../assets/CameraIcon';

function ProfilePageMobileOnly(props) {
    const { user,setUpUser } = useContext(userContext)
    const [peopleYouFollowThatFollowTheSuggestedUser,setPeopleYouFollowThatFollowTheSuggestedUser] = useState([])

    async function getAndSetpeopleYouFollowThatFollowTheSuggestedUser(){
        let temp = []
     if(!(user && user._id != -1))   /* 
                                        handles: 
                                        1.Non logged in users.
                                        2.Users who are logged in, but accessed the profile page by typing the URL into the search bar
                                     
                                        {await setUpUser()}         
                                        if(user.following){for(const following of user.following){
                                          const target = props.targetUser.followedBy_ids.find((followerID)=> followerID == following._id)
                                      
                                          if(target){
                                            temp.push(following)
                                            }
                                          }
                                          setPeopleYouFollowThatFollowTheSuggestedUser(temp)
                                        }
                                         
                                        }
                                      useEffect(()=>{
                                          getAndSetpeopleYouFollowThatFollowTheSuggestedUser()
                                      },[])
                                  
                                  
                                  
                                  
                                  
                                    return (
                                      <>
                                      <div className='d-flex d-md-none justify-content-between align-items-center border-bottom py-2 mb-4'>
                                         <div style={{width:'33.33%'}}><LeftArrowIcon/></div>
                                         <div style={{width:'33.33%',fontWeight:'650'}} className='text-center'>{props.targetUser.username}</div>
                                         <div style={{width:'33.33%'}}></div>
                                      </div>
                                      <div className='d-block d-md-none flex-column align-items-center' style={{border:'',flex:1,overflowY:'auto'}}>
                                          <div className={`${styles.cw} d-flex flex-column`} style={{border:' blue',height:'100%',border:' red'}}>
                                  
                                              <div className='d-flex' style={{width:'',border:' blue'}}>
                                                  <div className='flex-grow-1 d-flex flex-column' style={{minHeight:'200px',maxHeight:'300px',border:' red',}}>
                                                      <div className="flex flex-column ms-2" style={{height:'fit-content',border:''}}>
                                                          <div className='d-flex' style={{border:' blue',height:'fit-content'}}>
                                                              <div className='d-flex justify-content-left' style={{maxWidth:'130px',border:' blue'}}>
                                                                  <div className={styles.imgContainer} style={{border:'',position:'relative',border:''}}>
                                                                  {user._id == props.targetUser._id && !user.pfpFirebasePathURL?
                                                                  <button onClick={} className='p-0' style={{backgroundColor:'transparent',border:'none'}}>
                                                                      <img width='100%' height='100%' style={{borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ? user.pfpFirebasePathURL : "/defaultInstaPFP.jpg"} alt="" /> 
                                                                      <div style={{position:"absolute",top:0,left:0,width:'100%',height:'100%',backgroundColor:'black',borderRadius:'50%',opacity:'0.2'}}></div>
                                                                      <div style={{position:"absolute",top:0,left:0,width:'100%',height:'100%',border:'',display:'flex',justifyContent:'center',alignItems:'center'}}><CameraIcon width='30'/></div>
                                                                      </button>
                                                                  :
                                                                  user._id == props.targetUser._id ?
                                                                  <button onClick={} className='p-0' style={{backgroundColor:'transparent',border:'none'}}>
                                                                  <img width='100%' height='100%' style={{borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ? user.pfpFirebasePathURL : "/defaultInstaPFP.jpg"} alt="" /> 
                                                                  <div style={{position:"absolute",top:0,left:0,width:'100%',height:'100%',backgroundColor:'black',borderRadius:'50%',opacity:'0.2'}}></div>
                                                                  </button>
                                                                  :
                                                                  <img width='100%' height='100%' style={{borderRadius:'50%'}} src={props.targetUser.pfpFirebasePathURL ? user.pfpFirebasePathURL : "/defaultInstaPFP.jpg"} alt="" /> 
                                                                  }
                                                                  </div>
                                                              </div>
                                                              <div className='ms-3 ms-sm-4' style={{border:''}}>
                                                                  <div className='' style={{flex:1,display:'flex',flexDirection:'column',height:'100%',border:' red'}}>
                                                                      <div className='d-flex flex-column' style={{height:'48px',border:''}}>
                                                                          <div className='' style={{height:''}}>
                                                                              <text style={{fontWeight:'',fontSize:'1.3rem'}}>{props.targetUser.username}</text>
                                                                          </div>
                                                                          { 
                                                                          user._id != props.targetUser._id 
                                                                          ?
                                                                          <>
                                                                          <div  className=''>
                                                                              { user && user.following_ids && user.following_ids.find((id)=> id==props.targetUser._id) ? <UnfollowButton ProfilePage={true} toggleUnfollowConfirmationScreen={props.toggleUnfollowConfirmationScreen}/> : <button style={{maxWidth:'120px'}} onClick={props.followUser} className='btn btn-primary text-light p-1 px-3 me-2'>Follow</button>}<button className='btn text-dark p-1 px-3 ' style={{backgroundColor:'#EEEDEB',maxWidth:'120px'}}>Message</button> 
                                                                          </div>
                                                                          </>
                                                                          :
                                                                          <></>
                                                                          }
                                                                      </div>
                                                                  </div>
                                                              </div>
                                  
                                                          </div>
                                                      </div>
                                                      <div className='flex-grow-1 mx-2 mt-4' style={{border:' red',height:'fit-content'}}>
                                                          <div style={{border:''}}>
                                                              <div className='d-flex flex-column' style={{width:'300px',border:''}}>
                                                                  <div><text style={{fontWeight:'630'}}>{props.targetUser.full_name}</text></div>
                                                                  <div className='' style={{border:'',maxHeight:'70px',minHeight:'40px',wordWrap:'break-word',overflow:'hidden'}}>
                                                                      <text style={{textOverflow:'ellipsis'}}>
                                                                          {props.targetUser.description ? props.targetUser.description : 'dnwq'}
                                                                      </text>
                                                                  </div>
                                                                  {user._id != props.targetUser._id && peopleYouFollowThatFollowTheSuggestedUser.length ? 
                                                                  <div className='mt-2'>
                                                                      <text style={{color:'#758694'}}>
                                                                      followed by {peopleYouFollowThatFollowTheSuggestedUser.map((user,index)=>(
                                                                          index != peopleYouFollowThatFollowTheSuggestedUser.length - 1 
                                                                          && index != peopleYouFollowThatFollowTheSuggestedUser.length > 1
                                                                          ? user.username + ', '
                                                                          : user.username + (index == peopleYouFollowThatFollowTheSuggestedUser.length -1 ? '.' : '')
                                                                          ))}
                                                                      </text>
                                                                  </div>: null}
                                                              </div>
                                                             {
                                                             user._id == props.targetUser._id 
                                                             ?
                                                              <>
                                                              <div className='d-flex justify-content-center' style={{width:'fit-content'}}>
                                                                  <div className='mt-3 d-flex flex-column align-items-center' style={{border:' red'}}>
                                                                      <div><button onClick={()=> props.setShowCreateNewPostScreen(true)} style={{border:'none',backgroundColor:'transparent'}}><NewPostCircleIcon width={'40'}/></button></div>
                                                                      <div className='mt-1' style={{color:'#758694'}}>New Post</div>
                                                                  </div>
                                                              </div>
                                                              </>
                                                              :
                                                              <></>
                                                              }
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                         
                                  
                                  
                                              <div className=' mt-3 p-0 m-0 container border-top' style={{maxWidth:'100%',border:'',}}>
                                                      <div className="row" style={{height:'100%',border:'',height:'60px'}}>
                                                          <div className="col-4" style={{border:' red',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                              <div><text style={{fontWeight:'630'}} className='text-center'>{props.targetUser.posts_ids.length}</text></div>
                                                              <div><text style={{color:'rgb(117, 134, 148)'}} className='text-center'>posts</text></div>
                                                          </div>
                                                          <div className="col-4" style={{border:' red',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                              <div><text style={{fontWeight:'630'}} className='text-center'>{props.targetUser.followedBy_ids.length}</text></div>
                                                              <div><text style={{color:'rgb(117, 134, 148)'}} className='text-center'>followers</text></div>
                                                          </div>
                                                          <div className="col-4" style={{border:' red',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                                              <div><text style={{fontWeight:'630'}} className='text-center'>{props.targetUser.following_ids.length}</text></div>
                                                              <div><text style={{color:'rgb(117, 134, 148)'}} className='text-center'>following</text></div>
                                                          </div>
                                                      </div>
                                              </div>
                                              <div className='border-top flex-grow-1 d-flex flex-column'>
                                              <nav class="navbar navbar-light bg-light d-flex justify-content-center">
                                                  <button onClick={() => props. redirect('')}  class="navbar-brand mx-4" style={{border:'none',backgroundColor:'transparent'}}> <PostsIcon/></button>
                                                  <button onClick={() => props. redirect('Reels/')}  class="navbar-brand mx-4" href="/reels/" style={{border:'none',backgroundColor:'transparent'}}> <ReelsIcon width='16'/></button>
                                                  <button onClick={() => props. redirect('Tagged/')} class="navbar-brand mx-4" href="/tagged/" style={{border:'none',backgroundColor:'transparent'}}> <TaggedIcon width='13' /></button>
                                              </nav>
                                              <div className='border border-info flex-grow-1 justify-content-center' style={{overflowY:'auto'}}>
                                                  <Routes>
                                                      <Route path={'/'+props.path} element={<PostsTab posts={props.targetUser.posts_ids}/>} />
                                                      <Route path={'/'+props.path+'Reels/'} element={<ReelsTab/>} />
                                                      <Route path={'/'+props.path+'Tagged/'} element={<TaggedTab/>} />
                                                  </Routes>
                                              </div>
                                              </div>
                                  
                                  
                                  
                                              </div>
                                  
                                      </div>
                                      <div className='d-block d-md-none'><VertHorizNav/></div>
                                      </>
                                             
                                    )
                                  }
                                  
                                  export default ProfilePageMobileOnly
                                  
                                  
                                  
                                  
                                  
                                  
                                      
                                  */
