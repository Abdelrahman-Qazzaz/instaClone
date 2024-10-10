import React, { useContext, useEffect, useState } from 'react'
import userContext from '../../UserContext'
import SuggestedPost from '../SuggestedPost'
function Explore() {

const { fetchSuggestedPosts } = useContext(userContext)
const [suggestedPosts,setSuggestedPosts] = useState([])


useEffect(()=>{
  setup() 
},[])

async function setup(){
 const suggestedPosts = await fetchSuggestedPosts()
 setSuggestedPosts(suggestedPosts)
}


  return (
    <div className='d-flex justify-content-center' style={{ width:'100%',border:'',minHeight:'100vh'}}>
        <div className='mt-4' style={{maxWidth:'960px',width:'100%',border:'',display:'grid',gap:'2px',gridTemplateRows:'repeat(3, 1fr)',gridTemplateColumns:'repeat(3, 1fr)'}}>
            {suggestedPosts.length ? suggestedPosts.map((suggestedPost)=>(
                <SuggestedPost post={suggestedPost}/>
            )) : null}
        </div>
    </div>
  )
}

export default Explore
