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

function Registerpage() {
  //states of the application ...
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  //post request
  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response)
    })
  }

  // const register = () => {
  //     console.log(username + password)
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
        <Button onClick={register}> Register here </Button>
      </Buttondiv>
    </Wrapper>
  )
}

export default Registerpage

//<Input type="submit" value="Submit" />
