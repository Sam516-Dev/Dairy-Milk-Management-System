import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Label,
  Buttondiv,
} from '../styled-componets/styles'

function Loginpage() {
  // const [username, setusername] = useState('')
  // const [email, setemail] = useState('')
  // const [password, setpassword] = useState('')

  return (
    <>
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
        <Button> Login </Button>
      </Buttondiv>
    </>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />
