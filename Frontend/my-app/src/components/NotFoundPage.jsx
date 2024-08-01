import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../UserContext'
function NotFoundPage() {
  const { isLoading } = useContext(userContext)
  const navigate = useNavigate()
  return (
    isLoading
    ?
    <></>
    :
   <div className='d-flex flex-column flex-md-row' style={{height:'100vh'}}>

    <div className='d-flex flex-column align-items-center' style={{border:'',flex:1}}>
      <div className='mt-5 text-center'> <text className='fw-bold' style={{fontSize:'1.5rem'}}> Sorry, this page isn't available.   </text></div>
      <div className='mt-4 text-center'> <text> The link you followed may be broken, or the page may have been removed. <button className='p-0' onClick={()=> navigate('/')} style={{textDecoration:'none',color:'#405D72',border:"none",backgroundColor:'transparent'}}>Go back to Instagram.</button></text></div>
    </div>

   </div>
  )
}

export default NotFoundPage