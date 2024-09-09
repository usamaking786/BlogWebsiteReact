import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import './App.css'
import {useDispatch} from 'react-redux';
import {useState, useEffect} from 'react'
import authService from './appwrite/config.js'

import {login, logout} from './store/authSlice'


function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)
const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {
      dispatch(login({userData}))
    } else {
      dispatch(logout())
    }
  })
  .finally(() => setLoading(false))
}, [])

  return !loading ? (
    <>
     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
    <Header/>
     
    <Outlet/>
    <Footer/>
    </div>
    </div>
    </>
  ): null
}

export default App
