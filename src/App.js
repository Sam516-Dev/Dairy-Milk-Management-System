import React from 'react'

import GlobalStyles from './components/styled-componets/Global.styled'
import MilkPerLitreApp from './components/MilkPerLitre/MilkPerLitre'
import Loginpage from './components/login page/logins'
import Homepage from './components/Homepage/home'
import { Routes, Route } from 'react-router-dom'
import FarmersRoute from './components/Homepage/FarmersRoute/FarmersPage'
import DeliveriesPage from './components/Homepage/DeliveriesPage/DeliveriesPage'
import GobackHomeApp from './components/Homepage/FarmersRoute/GobackHomePage'
import ViewAllDeliveries from './components/ViewAllDeliveries/ViewAllDeliveries'
import Registerpage from './components/register/register'
import Update from './components/Homepage/DeliveriesPage/DeliveryComponents/Update'
import { HomeIcon, Title, Wrapper } from './components/styled-componets/styles'
import View from './components/Homepage/DeliveriesPage/DeliveryComponents/View'
import Newdelivery from './components/Homepage/DeliveriesPage/DeliveryComponents/NewDelivery'
import Analysis from './components/Homepage/DeliveriesPage/DeliveryComponents/Analysis'
import BarChart from './components/Barchart/Barchart'
import {AdminContextProvider} from './components/AdminContext'


function App() {
  //added this comment to test something

  return (
    <>
      <GlobalStyles />
     
      <GobackHomeApp />
      <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
      <AdminContextProvider>
      
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/milkprice" element={<MilkPerLitreApp />} />
        <Route path="/farmers" element={<FarmersRoute />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
        <Route path="/ViewAllDeliveries" element={<ViewAllDeliveries />} />
        <Route path="deliveries/Update" element={<Update />} />
        <Route path="/deliveries/View" element={<View />} />
        <Route path="/deliveries/Newdelivery" element={<Newdelivery />} />
        <Route path="/deliveries/View/Analysis" element={<Analysis />} />
        <Route path="/deliveries/View/Barchart" element={<BarChart />} />
        

      </Routes>
      </AdminContextProvider>
    </>
  )
}

export default App
