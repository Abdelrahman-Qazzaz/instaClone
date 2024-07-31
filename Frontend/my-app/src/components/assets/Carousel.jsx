import React from 'react'

function Carousel(props) {
    const sources = props.sources
  return (
<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
        <img class="d-block w-100" src={sources[1]} alt="First slide"/>
    </div>
    <div class="carousel-item active">
        <img class="d-block w-100" src={sources[2]} alt="Second slide"/>
    </div>
  </div>
</div>

  )
}

export default Carousel


/*
    {sources.map((source)=>(
    <div class="carousel-item active">
    <img class="d-block w-100" src={source}/>
  </div>
    ))}
*/