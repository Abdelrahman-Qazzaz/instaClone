import React from 'react'
import LoginPageCarousel from '../Login Page/LoginPageCarousel'
function Iphone(props) {

  const sources = props.sources //array

  return (
    <div style={{position:'relative',border:'12px solid black',borderRadius:'12%',width:'270px',height:'555px',backgroundColor:'black',zIndex:3,overflow:"hidden"}}>
            {sources.length == 1 ? 
       <img width='253px' height='540px' src={sources[0]} style={{position:'absolute',top:-5,left:-1,borderRadius:'9%',zIndex:1}} />
       : <LoginPageCarousel sources={sources}/>
      } 
    </div>
  )
}

export default Iphone


/*import React from 'react'
import LoginPageCarousel from '../Login Page/LoginPageCarousel'

function Iphone(props) {

  const sources = props.sources //array

  return (
    <div style={{position:'relative',border:'12px solid black',borderRadius:'10%',width:'270px',height:'555px',backgroundColor:'black',zIndex:3,overflow:"hidden"}}>
      {sources.length == 1 ? 
       <img width='253px' height='540px' src={sources[0]} style={{position:'absolute',top:-5,left:-1,borderRadius:'9%',zIndex:1}} />
       : <LoginPageCarousel sources={sources}/>
      } 
    </div>
  )
}

export default Iphone


*/
