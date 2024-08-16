import React from 'react'
import GooglePlayIcon from './GooglePlayIcon'

function GooglePlayDownload() {
  return (
    <a href='https://play.google.com/store/apps/details?id=com.instagram.android&pli=1' style={{width:'133px',height:'38px'}} className='btn btn-dark'>
    <div style={{height:'100%',display:'flex',justifyContent:'space-around'}}>
        <div><GooglePlayIcon/></div>
        <div style={{fontSize:'0.4rem'}}>
            <text style={{fontSize:'0.4rem'}}>GET IT ON</text>
            <br/>
            <text style={{fontSize:'0.8rem'}}>Google Play</text>
        </div>
    </div>
</a>
  )
}



export default GooglePlayDownload