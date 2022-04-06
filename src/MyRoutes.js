import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom'
import GlobalStyles from './components/styled-componets/Global.styled'
import MilkPerLitreApp from './components/MilkPerLitre/MilkPerLitre'
import Loginpage from './components/login page/logins'
import Homepage from './components/Homepage/home'
// import { Routes, Route } from 'react-router-dom'
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
import { UseadminContext } from './components/AdminContext'

export default function MyRoutes() {
  const { LocalUser } = UseadminContext()
  // console.log("testing", Object.keys(LocalUser[0]).length);
  function RequireAuth({ children }) {
    let location = useLocation()
    if (LocalUser.length == 0) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
  }
  function RequireAuthAdmin({ children }) {
    // console.log("LocalUser", LocalUser.userRole);
    let location = useLocation()
    if (LocalUser.length == 0) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    if (LocalUser[0].Role != 'Admin') {
      return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
  }
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/" element={<Homepage />} />
        <Route
          path="/milkprice"
          element={
            <RequireAuth>
              <MilkPerLitreApp />
            </RequireAuth>
          }
        />
        <Route
          path="/farmers"
          element={
            <RequireAuthAdmin>
              <FarmersRoute />
            </RequireAuthAdmin>
          }
        />
        <Route
          path="/deliveries"
          element={
            <RequireAuth>
              <DeliveriesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/ViewAllDeliveries"
          element={
            <RequireAuth>
              <ViewAllDeliveries />
            </RequireAuth>
          }
        />
        <Route
          path="deliveries/Update"
          element={
            <RequireAuthAdmin>
              <Update />
            </RequireAuthAdmin>
          }
        />
        <Route
          path="/deliveries/View"
          element={
            <RequireAuth>
              <View />
            </RequireAuth>
          }
        />
        <Route
          path="/deliveries/Newdelivery"
          element={
            <RequireAuthAdmin>
              <Newdelivery />
            </RequireAuthAdmin>
          }
        />
        <Route
          path="/deliveries/View/Analysis"
          element={
            <RequireAuth>
              <Analysis />
            </RequireAuth>
          }
        />
        <Route path="/deliveries/View/Barchart" element={<BarChart />} />
      </Routes>
    </React.Fragment>
  )
}
