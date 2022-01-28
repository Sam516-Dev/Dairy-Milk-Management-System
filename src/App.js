import React from 'react'
import GlobalStyles from './components/styled-componets/Global.styled'
import MilkPerLitreApp from './components/MilkPerLitre/MilkPerLitre'
import Loginpage from './components/login page/logins'
import Homepage from './components/Homepage/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FarmersRoute from './components/Homepage/FarmersRoute/FarmersPage'

import { Title, Wrapper } from './components/styled-componets/styles'

function App() {
  //added this comment to test something

  return (
    <>
      <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/milkprice" element={<MilkPerLitreApp />} />
          <Route path="/farmers" element={<FarmersRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

// <GlobalStyles />
//       <Wrapper>
//         <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
//         <Loginpage />
//       </Wrapper>

//
//<MilkPerLitreApp/> </MilkPerLitreApp>
