import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllProducts from './pages/AllProducts';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster/>
   <Navbar/>
      <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App ;