import React, { useState } from 'react'
import Axios from 'axios'

import {
  Form,
  Input,
  Button,
  Label,
  Buttondiv,
  Wrapper,
} from '../styled-componets/styles'

function Loginpage() {
  //states of the application
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const [loginStatus, setLoginStatus] = useState('')

  //post request
  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].message)
      }
    })
  }

  return (
    <Wrapper>
      <Form>
        <Label>UserName:</Label>
        <Input
          type="text"
          name="username"
          placeholder="username..."
          required
          onChange={(e) => setusername(e.target.value)}
        />
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="password..."
          required
          onChange={(e) => setpassword(e.target.value)}
        />
      </Form>

      <Buttondiv>
        <Button onClick={login}> Login </Button>
      </Buttondiv>
    </Wrapper>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />
