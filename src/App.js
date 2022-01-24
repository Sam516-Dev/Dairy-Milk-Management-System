import React from 'react'
import GlobalStyles from './components/styled-componets/Global.styled'

import Loginpage from './components/login page/logins'
//import { Routes, Route, Link } from 'react-router-dom'

import { Title, Wrapper } from './components/styled-componets/loginpage.styled'

function App() {
  //added this comment to test something

  return (
    <div>
      <GlobalStyles />

      <Wrapper>
        <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
        <Loginpage />
      </Wrapper>
    </div>
  )
}

export default App

// the login stuff

//
