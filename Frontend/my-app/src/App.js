import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import io from 'socket.io-client';



import Rest from './Rest';
import { UserContextProvider } from './UserContext';
function App() {

  const socket = io(`${process.env.REACT_APP_BACKENDAPI}`, { transports : ['websocket'] });


  return (

      <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
    <UserContextProvider socket={socket}>
      <Rest/>
    </UserContextProvider>
    </>
    
  )
}//    ?NEXT FINISH THE NOT FOUND PAGE?

export default App


/*
    FOR IMAGE UPLOADS, PASS THE ENCODED URL TO THE BACKEND, THEN STORE THE URL IN MONGODB
<Test/>
*/