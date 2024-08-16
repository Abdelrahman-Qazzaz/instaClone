import React from 'react'
import styles from "./assets.module.css"

function Circle({ children }) {
  return (
    <div className={styles.outerCircle}>
      <div className={styles.innerCircle}>
        {children}
        </div>
    </div>
  )
}

export default Circle