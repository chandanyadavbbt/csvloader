import React, { useState } from 'react'
import Structure from '../utils/Structure'
import FullScreenLoader from '../utils/LoadingPage'

function Countries() {
  const [loading,setLoding]=useState(false)
  return (
    <>
    {/* {loading?<FullScreenLoader />:<Structure setLoding={setLoding}/>} */}
    
    <Structure/>
    {/* <FullScreenLoader/> */}
    </>
  )
}

export default Countries