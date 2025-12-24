import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllProducts from './pages/AllProducts';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext';
import DashboardLayout from './pages/dashboard/dashboardLayout';
import Profile from './pages/profile';
import AddClothes from './components/dashboardComponent/giver/addClothes';
import PurchasedClothes from './components/dashboardComponent/taker/PurchasedClothes';
import Workflow from './components/dashboardComponent/giver/Workflow';
import Selected from './components/dashboardComponent/taker/Selected';
// import AddClothes from './components/dashboardComponent/giver/addClothes';

const App = () => {
  const {user} = useAppContext()
  const location = useLocation()
  console.log('location => ',location)
  const isDashboard = location.pathname.includes("dashboard");
  return (
    <>
    <Toaster/>
 {!isDashboard &&  <Navbar/>}
      <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={user ? <Profile/> : <Signin/>}/>
        <Route path='/dashboard' element={user ? <DashboardLayout/> : <Signin/>}>
           <Route index element={user?.role === "sharer" ? <AddClothes/> : <Selected/>}/>
            <Route path='workflow' element={<Workflow/>}/>
            <Route path='purchasing' element={<PurchasedClothes/>}/>

        </Route>
      </Routes>
    </div>
  {!isDashboard &&  <Footer/>}
    </>
  )
}

export default App ;