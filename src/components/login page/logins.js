import React from 'react'
import {
  Form,
  Input,
  Button,
  Label,
  Buttondiv,
} from '../styled-componets/loginpage.styled'

//this is just a comment
// this is the second comment
function Loginpage() {
  return (
    <div>
      <Form>
        <Label>
          UserName:
          <Input type="text" name="name" placeholder="username" />
        </Label>
      </Form>
      <Form>
        <Label>
          Email:
          <Input type="text" name="name" placeholder="email@gmail.com" />
        </Label>
      </Form>

      <Buttondiv>
        <Button> login </Button>
      </Buttondiv>
      <button> hey there </button>
    </div>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />
