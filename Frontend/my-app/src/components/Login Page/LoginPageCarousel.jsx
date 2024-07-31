import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function LoginPageCarousel(props) {
   const sources = props.sources
  return (
   <Carousel indicators={false} controls={false} style={{zIndex:1,border:"",overflow:'hidden'}}>
      {sources.map((source)=>(
                 <Carousel.Item style={{zIndex:1}}>
                 <img width='253px' height='540px' src={source} alt="" style={{zIndex:1}} />
               </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default LoginPageCarousel