import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {
  Form,
  Input,
  Button,
  Label,
  Buttondiv,
  Wrapper,
} from '../styled-componets/styles'
import { UseadminContext } from '../AdminContext'

function Loginpage() {
  const navigate = useNavigate()
  //states of the application ...
  const [FullName, setFullName] = useState('')
  const [Password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')

  const { setNewUser, LocalUser } = UseadminContext()

  //post request

  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data[0].fullName)
        console.log('response.data.loggedIn', response.data.loggedIn)
      }
    })
  }, [])

  const login = () => {
    if (!FullName || !Password) {
      toast.error('please input FullName and Password')
      return console.log('no details entered !!')
      // console.log(typeof(FullName))
    } else if (typeof FullName === 'number') {
      toast.error('username cannot be a number, characters only ')
    } else {
      Axios.post('http://localhost:3001/login', {
        FullName: FullName,
        Password: Password,
      }).then((response) => {
        // console.log('response', response.data)
        if (response.data.message) {
          setLoginStatus(response.data.message)
        } else {
          setNewUser(response.data)
          // setLoginStatus(response.data[0].fullName)
          if (response?.data[0].Role == 'normal') {
            navigate('/deliveries')
          } else if (response?.data[0].Role == 'Admin') {
            navigate('/')
          }
        }
        // <h1> {loginStatus}</h1>
      })
    }
  }

  // const register = () => {
  //     console.log(username + password)
  // }

  return (
    <Wrapper>
      <ToastContainer position="top-center" />
      <Form>
        <Label>FullName:</Label>
        <Input
          type="text"
          name="FullName"
          placeholder="FullName..."
          required
          onChange={(e) => setFullName(e.target.value)}
        />
        <Label>Password:</Label>
        <Input
          type="Password"
          name="Password"
          placeholder="ID No..."
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form>

      <Buttondiv>
        <Button onClick={login}> Login </Button>
      </Buttondiv>
      <h3
        style={{
          backgroundColor: 'white',
          color: 'red',
          marginLeft: '10px',
        }}
      >
        {loginStatus}{' '}
      </h3>
    </Wrapper>
  )
}

export default Loginpage