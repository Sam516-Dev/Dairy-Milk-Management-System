import React, { useState } from 'react'
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
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const submit = () => {}

  return (
    <Wrapper>
      <Form>
        <Label>UserName:</Label>
        <Input type="text" name="username" placeholder="username..." required />
      </Form>
      <Form>
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="password..."
          required
        />
      </Form>

      <Buttondiv>
        <Button onClick={submit}> Login </Button>
      </Buttondiv>
    </Wrapper>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />
