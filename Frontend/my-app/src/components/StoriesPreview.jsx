import { produce } from 'immer'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import userContext from '../UserContext'
import styles from './assets/assets.module.css'
import StoriesCarousel from './StoriesCarousel'

function StoryPreview(props) {


  const { user,fetchStory,setIsLoading } = useContext(userContext)
  const [story,setStory] = useState(null)
  const [targetUser,setTargetUser] = useState(null)
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams(); // for autoplay next STORY (not slide) or not
  const [autoPlay,setAutoPlay] = useState(false)

  useEffect(()=>{
    setup()
    if(searchParams.get('autoPlayNext')){
      setAutoPlay(true)
    }

  },[])
  useEffect(()=>{
    setup()
  },[params.username])

  async function setup(){

    setIsLoading(true)
    console.log(params.username)
    const result = await fetchStory(params.username)
    const target = user.following.find((someone)=> someone.username == params.username)
    setTargetUser(target)
    setStory(produce(draft => draft = {...result}))
    setIsLoading(false)
  }


  return (
    <div  style={{position:'fixed',top:0,left:0,height:'100vh',width:'100vw',zIndex:10}} className={`${styles.backgroundGradient} d-flex justify-content-center`}>

        {story && story.slides && story.slides.length ? <StoriesCarousel autoPlay={autoPlay} targetUser={targetUser}  slides={story.slides}  /> : null}

    </div>
  )
}

export default StoryPreview