import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
//import './farmerspage.css'
function View() {
  const [alldata, setalldata] = useState([])

  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  const [farmersID, setfarmersID] = useState('')
  const [date, setdate] = useState('')

  const [searchName, setsearchName] = useState('')

  const location = useLocation()
  const val = location?.state

  //   const current = new Date()
  //   const todaysdate =
  //     current.getFullYear() +
  //     '/' +
  //     current.getDate() +
  //     1 +
  //     '/' +
  //     current.getMonth()

  //useEffect hook for rendering all deliveries

  //runs when the page loads
  useEffect(() => {
    if (val) {
      setfullName(val.fullName)
      setquantity(val.quantity)
      //setdate(new Date(val.date).toLocaleDateString())
      setfarmersID(val.farmersid)
    }
  }, [val])
  console.log(`this is farmersID ${farmersID}`)
  console.log(`this is val.farmersid ${val.farmersid}`)
  const id = val.id

  useEffect(() => {
    Axios.get(`http://localhost:3001/View/${val.farmersid}`).then((response) => {
      //farmersID=farmersID
      if (response.data) {
        setalldata(response.data)
         console.log(response.data)
      }
    })
  }, [])

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
  }

  const renderTable = () => {
    return alldata.map((val) => {
      return (
        <tr>
          <td>{val.fullName}</td>
          <td>{val.quantity}</td>
          <td>{new Date(val.date).toLocaleDateString()}</td>
          <td>{val.farmersid}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <h2
        style={{
          background: '#2fbd82',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '25px',
          marginTop: '20px',
          marginBottom: '15px',
          color: '#ffffff',
        }}
      >
        All Your delivery {fullName}
      </h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>FullName</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </form>
    </div>
  )
}

export default View

// import React, { useState, useEffect } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Axios from 'axios'
// import { useNavigate, useLocation, useParams } from 'react-router-dom'

// //import './farmerspage.css'
// function View() {
//   const [alldata, setalldata] = useState([])

//   const [fullName, setfullName] = useState('')
//   const [quantity, setquantity] = useState('')
//   const [farmersID, setfarmersID] = useState('')

//   const [searchName, setsearchName] = useState('')

//   // const current = new Date()
//   // const todaysdate =
//   //   current.getFullYear() +
//   //   '/' +
//   //   current.getDate() +
//   //   1 +
//   //   '/' +
//   //   current.getMonth()

//   const location = useLocation()
//   const val = location?.state
//   //when the page loads this gets executed

//   //when the page loads this gets executed
//   useEffect(() => {
//     if (val) {
//       setfullName(val.fullName)
//       setquantity(val.quantity)
//       //setdate(new Date(val.date).toLocaleDateString())
//       setfarmersID(val.farmersid)

//       console.log(fullName + quantity + farmersID)
//     }
//   }, [val])

//   console.log(farmersID)

//   //Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
//   //useEffect hook for rendering all deliveries
//   useEffect(() => {
//     Axios.get(`http://localhost:3001/view/${farmersID}`).then(
//       (response) => {
//         if (response.data) {
//           setalldata(response.data)
//           console.log(response.data)
//         }
//       },
//     )
//   }, [])

//   const handleEditFormSubmit = (event) => {
//     event.preventDefault()
//   }

//   const renderTable = () => {
//     return alldata.map((val) => {
//       return (
//         <tr>
//           <td>{val.fullName}</td>
//           <td>{val.quantity}</td>
//           <td>{new Date(val.date).toLocaleDateString()}</td>
//           <td>{val.farmersid}</td>
//         </tr>
//       )
//     })
//   }
//   // console.log(`this is the farmersID${farmersID}`)
//   return (
//     <div>
//       <h2
//         style={{
//           background: '#2fbd82',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: '25px',
//           marginTop: '20px',
//           marginBottom: '15px',
//           color: '#ffffff',
//         }}
//       >
//         All deliveries
//       </h2>
//       <input
//         style={{
//           marginTop: '5px',
//           marginBottom: '10px',
//           marginLeft: '175px',
//           height: '35px',
//           color: 'black',
//         }}
//         type="text"
//         placeholder="search by name..."
//         onChange={(e) => setsearchName(e.target.value)}
//       />

//       <form onSubmit={handleEditFormSubmit}>
//         <table>
//           <thead>
//             <tr>
//               <th>FullName</th>
//               <th>Quantity</th>
//               <th>Date</th>
//               <th>ID</th>
//             </tr>
//           </thead>
//           <tbody>{renderTable()}</tbody>
//         </table>
//       </form>
//     </div>
//   )
// }
//export default View

// import { useNavigate, useLocation, useParams } from 'react-router-dom'
// import React, { useState, useEffect } from 'react'
// import { Buttondiv, Button } from '../../../styled-componets/styles'

// function View() {
//   const [fullName, setfullName] = useState('')
//   const [quantity, setquantity] = useState('')

//   const [date, setdate] = useState('')
//   const [farmersID, setfarmersID] = useState('')

// const location = useLocation()
//   const val = location?.state

//   //this replaced useHistory on the previous version of react-router
//   const navigate = useNavigate()
//   function handleClick() {
//     navigate('/deliveries')
//   }

//   //when the page loads this gets executed
//   // useEffect(() => {
//   //   if (val) {
//   //     setfullName(val.fullName)
//   //     setquantity(val.quantity)
//   //     setdate(new Date(val.date).toLocaleDateString())
//   //     setfarmersID(val.farmersid)

//   //     // console.log(fullName + quantity + date + farmersID)
//   //   }
//   // }, [val])

//   useEffect(() => {
//     Axios.get('http://localhost:3001/ViewAllDeliveries').then((response) => {
//       if (response.data) {
//         setalldata(response.data)
//         // console.log(response.data)
//       }
//     })
//   }, [])

//   //console.log(date)
//   //console.log(val.id)
//   console.log(fullName + quantity + date + farmersID)
//   return (
//     <>
//       <h2
//         style={{
//           background: '#2fbd82',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: '25px',
//           marginTop: '20px',
//           marginBottom: '15px',
//           color: '#ffffff',
//         }}
//       >
//         Welcome {fullName}
//       </h2>
//       <form>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Quantity (kg) </th>
//               <th>Date</th>
//               <th>farmersID</th>
//             </tr>
//           </thead>
//           <tr>
//             <td> {fullName} </td>
//             <td> {quantity} </td>
//             <td> {date} </td>
//             <td> {farmersID} </td>
//           </tr>
//         </table>
//       </form>

//       <Buttondiv style={{ background: 'white' }}>
//         <button
//           style={{
//             background: '#009999',
//             marginTop: '50px',
//             width: '100px',
//             height: '50px',
//             fontSize: '25px',
//             borderRadius: '8px',
//             color: '#FFFFFF',
//           }}
//           onClick={handleClick}
//         >
//           back
//         </button>
//       </Buttondiv>
//     </>
//   )
// }

// export default View
