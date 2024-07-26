import React from 'react'
// import Form from './Form'
import { Routes,Route } from 'react-router-dom'
import Countries from './pages/Countries'
import Companies from './pages/Companies'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Countries/>}/>
      <Route path="/companies" element={<Companies/>}/>
    </Routes>
  
  )
}

export default App

// this is demo change