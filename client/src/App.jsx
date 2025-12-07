import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Login from './pages/Login'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const dispath = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem('item')
    try {
      if(token){
        const { data } = await api.get('/api/users/data',{headers:{
          Authorization:token
        }})
        if(data.user){
          dispath({token,user:data.user})
          dispath(setLoading(false))
        }   
      }else{
          dispath(setLoading(false))
        }
    } catch (error) {
        dispath(setLoading(false))
        console.log(error.message)
    }
  }

  useEffect(() => {
    getUserData()
  },[])



  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='app/' element={<Layout /> }>
           <Route index element={<Dashboard />} />
           <Route path='builder/:resumeId' element={<ResumeBuilder />} /> 
        </Route>


        <Route path='/view/:resumeId' element = {<Preview />}/>
      </Routes>
    </div>
  )
}

export default App
