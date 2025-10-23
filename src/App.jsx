import React from 'react';
import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='absolute z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
      <Manager
      />
      </div>
      <Footer/>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        style={{ zIndex: 999999 }}
      />
    </>
  )
}

export default App
