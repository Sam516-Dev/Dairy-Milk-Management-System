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
  const [password, setpassword] = useState('')

  //event 
  const onChange = (e) => {
    setInputOne(e.target.value);



  const submit = () => {}

  return (
    <Wrapper>
      <Form>
        <Label>UserName:</Label>
        <Input type="text" name="username" placeholder="username..." required onChange={onChange}/>
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="password..."
          required
          onChange={onChange}
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
