import React from 'react'
import GlobalStyles from './components/styled-componets/Global.styled'
import MilkPerLitreApp from './components/MilkPerLitre/MilkPerLitre'
import Loginpage from './components/login page/logins'
import Homepage from './components/Homepage/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Title, Wrapper } from './components/styled-componets/styles'

function App() {
  //added this comment to test something

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/milkprice" element={<MilkPerLitreApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

// the login stuff

// <GlobalStyles />
//       <Wrapper>
//         <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
//         <Loginpage />
//       </Wrapper>

//
//<MilkPerLitreApp/> </MilkPerLitreApp>
