import React from 'react'
import {
  Form,
  Input,
  Button,
  Label,
  Buttondiv,
} from '../styled-componets/loginpage.styled'

function Loginpage() {
  return (
    <div>
      <Form>
        <Label>
          UserName:
          <Input type="text" name="name" placeholder="username..." required />
        </Label>
      </Form>
      <Form>
        <Label>
          Email:
          <Input
            type="text"
            name="name"
            placeholder="email@gmail.com..."
            required
          />
        </Label>
      </Form>

      <Buttondiv>
        <Button> login </Button>
      </Buttondiv>
    </div>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />
