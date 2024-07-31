import React from 'react'
import EnvelopeIcon from './EnvelopeIcon'
import Circle from "./Circle"
import Heart from './Heart'
import styles from "./assets.module.css"

function EnvelopeWithHeartIcon() {
  return (
    <div style={{position:'relative'}}>
        <EnvelopeIcon width='70'/>
        <div style={{position:'absolute',left:'54%',top:'60%'}}>
            <Circle >
                <Heart width='25'/>
            </Circle>

          
        </div>  
    </div>
  )
}

export default EnvelopeWithHeartIcon