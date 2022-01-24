import React from 'react'
import GlobalStyles from './components/styled-componets/Global.styled'
import Loginpage from './components/login page/logins'

import { Title, Wrapper } from './components/styled-componets/loginpage.styled'

function App() {
  //hello world just adding some testing comments to my code

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
