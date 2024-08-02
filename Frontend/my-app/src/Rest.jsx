import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home Page/HomePage';
import LoginPage from './components/Login Page/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import ProfilePage from './components/Profile Page/ProfilePage';
import SignupPage from './components/Signup Page/SignupPage';
import userContext from './UserContext';

import Explore from './components/Explore Page/Explore';
import Inbox from './components/Inbox';
import ProfilePagePost from './components/Profile Page/ProfilePagePost';
import StoryPreview from './components/StoriesPreview';
import Layout from './Layout';
import styles from "./rest.module.css";
function Rest() {

    const { user } = useContext(userContext)


    /*
    to do:
    1.remove any anchor tag, and use useNavigate instead.
    2.refactor
    */

      



      

  
      
      return (
      //   fix story so that it navigates correctly 
      //   fix axios requests from localhost4000 to a url that you get from either a .env or just the context
      <div className={styles.fadeFromOutToIn} style={{minHeight:'100vh',position:'relative'}}>
        <BrowserRouter>


          <Routes>
          { 
           user._id === -1 || !(user) 
            ?
            <>
             <Route path='*' element={<LoginPage/>}/>
            <Route path= '/accounts/emailsignup'  element={<SignupPage/>}/>
            <Route path= '/p/*' element= {<ProfilePagePost/>}/>     {/*  done removing anchors*/}
           </>
           
            :
            <>
          
            <Route path='/' element={<Layout/>}>
              <Route index  element={<HomePage/>}/> {/*done removiong anchors, (for now) done refactoring */}
              <Route path= '/accounts/emailsignup'  element={<SignupPage/>}/>  {/*done removing anchors*/}
              <Route path= '/explore' element= {<Explore/>}/>  {/* done removing anchors,done refactoring */}
              <Route path= '/direct/inbox/*' element={<Inbox/>}/>  {/* done removing anchors, PS : for exit chat socket events, do them via the useEffect clean up*/}
              <Route path= '/notFound' element= {<NotFoundPage/>}/>  {/* done removing anchors*/}
              <Route path= '/stories/:username' element= {<StoryPreview/>}/>      {/*  done removing anchors, done refactoring? it's mediocre*/}
              <Route path= '/p/*' element= {<ProfilePagePost/>}/>     {/*  done removing anchors*/}
              <Route path= '*'  element= {<ProfilePage/>}/>       {/* done removing anchors */}
            </Route>
            </>
            } 
          </Routes>

        </BrowserRouter>
      </div>
      )
}

export default Rest
  














  
  
  
  
