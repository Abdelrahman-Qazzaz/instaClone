import React from 'react'
import AppleIcon from './AppleIcon'

function AppStoreDownload() {
  return (
    <a href='https://apps.apple.com/us/app/instagram/id389801252' style={{width:'133px',height:'38px'}} className='btn btn-dark'>
        <div style={{height:'100%',display:'flex',justifyContent:'space-around'}}>
            <div><AppleIcon/></div>
            <div style={{fontSize:'0.4rem'}}>
                <text style={{fontSize:'0.4rem'}}>Download on the </text>
                <br/>
                <text style={{fontSize:'0.8rem'}}>App Store</text>
            </div>
        </div>
    </a>
  )
}

export default AppStoreDownload




/*
<button type="button p-0" class="btn btn-dark" style={{maxheight:'100%'}}>
    <div style={{border:'2px solid red',maxheight:'100%'}}>
        <div className="container p-0"  style={{width:'100%'}}>
            <div className="row p-0" style={{width:'100%'}}>
                <div className="col-2">
                <AppleIcon/>
                </div>
                <div className="col-10 p-0">
                <text style={{fontSize:'0.5rem'}}>Download on the</text>
                <br/>
                <text>App Store</text>
                </div>
            </div>
        </div>
    </div>
</button>
*/