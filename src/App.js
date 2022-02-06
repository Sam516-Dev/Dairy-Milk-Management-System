import React from 'react'
import Axios from 'axios';

import GlobalStyles from './components/styled-componets/Global.styled'
import MilkPerLitreApp from './components/MilkPerLitre/MilkPerLitre'
import Loginpage from './components/login page/logins'
import Homepage from './components/Homepage/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FarmersRoute from './components/Homepage/FarmersRoute/FarmersPage'
import DeliveriesPage from './components/Homepage/DeliveriesPage/DeliveriesPage'
import GobackHomeApp from './components/Homepage/FarmersRoute/GobackHomePage'
import AnalyticsApp from './components/Analytics/Analytics'
import Registerpage from './components/register/register'

import { HomeIcon, Title, Wrapper } from './components/styled-componets/styles'

function App() {
  //added this comment to test something

  return (
    <>
      <GlobalStyles />
      <GobackHomeApp />
      <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/milkprice" element={<MilkPerLitreApp />} />
        <Route path="/farmers" element={<FarmersRoute />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/analytics" element={<AnalyticsApp />} />
      </Routes>
    </>
  )
}

export default App
