import React, { useState, useEffect } from 'react'
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
  const [role, setRole] = useState('')

  const [loginStatus, setLoginStatus] = useState('')
  Axios.defaults.withCredentials = true

  //post request
  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        return setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
    })
  }

  //keeps the user logged in
  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username)
     
      }
    })
  }, [])

  // const login = () => {
  //   Axios.post('http://localhost:3001/login', {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //     console.log(response.data)
  //   })
  // }

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
      <h1> {loginStatus}</h1>
    </Wrapper>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />
