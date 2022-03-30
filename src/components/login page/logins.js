import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
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
  //states of the application ...
  const [FullName, setFullName] = useState('')
  const [Password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState("");

  const { setNewUser,LocalUser } = UseadminContext();


  //post request
  
  const login = () => {
    // if (!FullName || !Password) {
    //   toast.error('please input FullName and Password')
    //   return console.log('no details entered !!')
    // } else {
      Axios.post('http://localhost:3001/login', {
        FullName: FullName,
        Password: Password,
      }).then((response) => {
        setNewUser(response.data);
        console.log("response", response.data)
        if (response.data.message) {
          
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].fullName);
        }

      })
    //}
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data[0].fullName);
        console.log("this user logged in", response.data[0].fullName)
      }
    });
  }, []);

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
      <h1>{loginStatus} </h1>
    </Wrapper>
  )
}

export default Loginpage

//<Input type="submit" value="Submit" />











// import React, { useState, useEffect } from 'react'
// import Axios from 'axios'
// import LocalStorage from '../LocalStorage'
// import {
//   Form,
//   Input,
//   Button,
//   Label,
//   Buttondiv,
//   Wrapper,
// } from '../styled-componets/styles'

// function Loginpage() {
//   const [user, setUser, removeUser] = LocalStorage('LocalUser', [])
//   //states of the application
//   const [FullName, setFullName] = useState('')
//   const [Password, setPassword] = useState('')
//   //const [role, setRole] = useState('')

//   const [loginStatus, setLoginStatus] = useState('')
//   Axios.defaults.withCredentials = true

//   //post request
//   const login = () => {
//     Axios.post('http://localhost:3001/login', {
//       FullName: FullName,
//       Password: Password,
//     }).then((response) => {
//       if (response) {
//         console.log('response', response.data)
//         // setUser()
//         //return setLoginStatus(response.data.message)
//       } else {
//         setLoginStatus(response.data[0].username)
//       }
//     })
//   }

//   // const handlesubmit = (e) => {
//   //   e.preventDefault()
//   //   console.log(username, password)
//   //   console.log('expect field cleared !!')
//   //   // clearing the values
//   //   password.value = "";
//   //   username.value = "";
//   // }

//   //keeps the user logged in
//   useEffect(() => {
//     Axios.get('http://localhost:3001/login').then((response) => {
//       if (response.data.loggedIn == true) {
//         setLoginStatus(response.data.user[0].username)
//       }
//     })
//   }, [])

//   // const login = () => {
//   //   Axios.post('http://localhost:3001/login', {
//   //     username: username,
//   //     password: password,
//   //   }).then((response) => {
//   //     console.log(response.data)
//   //   })
//   // }

//   return (
//     <Wrapper>
//       <Form>
//         <Label>UserName:</Label>
//         <Input
//           type="text"
//           name="username"
//           placeholder="username..."
//           required
//           onChange={(e) => setFullName(e.target.value)}
//         />
//         <Label>Password:</Label>
//         <Input
//           type="password"
//           name="password"
//           placeholder="password..."
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form>

//       <Buttondiv>
//         <Button onClick={login}> Login </Button>
//       </Buttondiv>
//       <h1> {loginStatus}</h1>
//     </Wrapper>
//   )
// }

// export default Loginpage
