import React from 'react'
import Navabr from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBooking from './pages/MyBooking';
import HotelReg from './components/HotelReg';
import Layout from './pages/HotelOwner/Layout';
import Dashboard from './pages/HotelOwner/Dashboard';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';
import {Toaster } from "react-hot-toast"
import { useAppContext } from './context/AppContext';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext();
  
  return (
    <>
    <Toaster/>
    {!isOwnerPath && <Navabr/>}
    {showHotelReg && <HotelReg/>}
    <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/rooms' element= {<AllRooms/>}/>
        <Route path='/rooms/:id' element = {<RoomDetails/>} />
        <Route path='/my-bookings' element = {<MyBooking/>} />

        <Route path='/owner' element={<Layout/>}>
        <Route index element={<Dashboard/>}></Route>
        <Route path="add-room" element={<AddRoom/>}></Route>
        <Route path="list-room" element={<ListRoom/>}></Route>
        </Route>

        
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App