import React from 'react'
import GlobalStyles from './components/styled-componets/Global.styled'

import Loginpage from './components/login page/logins'
import Homepage from './components/Homepage/home'
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Title, Wrapper } from './components/styled-componets/styles'

function App() {
  //added this comment to test something

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Title> DAIRY MILK MANAGEMENT SYSTEM </Title>
        <Loginpage />
      </Wrapper>
    </>
  )
}

export default App

// the login stuff
