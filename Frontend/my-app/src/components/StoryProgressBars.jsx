import React from 'react'

function StoryProgressBars(props) {
  return (
    <div className='d-flex my-2'>
    {props.progressBarArray.map((_,index)=>(
        index == props.currentSlide 
        ?
        <div class="progress me-1" style={{border:'',width:'100%',backgroundColor:'#B4B4B8',height:'3px'}}>
            <div class="progress-bar " role="progressbar"  style={{width:((props.hasBeenPlayingFor/props.slideDuration) * 100)+'%',backgroundColor:'white'}}></div>
        </div>
        :
        <div class="progress me-1" style={{border:'',width:'100%',backgroundColor:'#B4B4B8',height:'3px'}}>
            <div class="progress-bar " role="progressbar"  style={{width:'0',backgroundColor:'white'}}></div>
        </div>

    ))}
</div>
  )
}

export default StoryProgressBars