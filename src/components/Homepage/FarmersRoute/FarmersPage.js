import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'

import './farmerspage.css'


//this component Add farmers
function FarmersRoute() {
  const [alldata, setalldata] = useState([])

  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  const [farmersID, setfarmersID] = useState('')

  const current = new Date()
  const todaysdate =
    current.getFullYear() +
    '/' +
    current.getDate() +
    '/' +
    (current.getMonth()+ 1)

  //useEffect hook for rendering all deliveries
  useEffect(() => {
    Axios.get('http://localhost:3001/fetchalldeliveries').then((response) => {
      if (response.data) {
        setalldata(response.data)
        // console.log(response.data)
      }
    })
  }, [])

  const handleAdd = (event) => {
    event.preventDefault()
    const newContact = {
      fullName: fullName,
      quantity: quantity,
      date: todaysdate,
      farmersID: farmersID,
    }
    console.log(`this is the newContact ${newContact}`)

    if (!fullName || !quantity || !farmersID) {
      toast.error('please input all farmer details')
      return console.log('no details entered !!')
    } else {
      Axios.post('http://localhost:3001/addfarmer', {
        //newContact: newContact,
        fullName: newContact.fullName,
        quantity: newContact.quantity,
        date: todaysdate,
        farmersID: newContact.farmersID,
      }).then(() => {
        setalldata([
          ...alldata,
          {
            fullName: fullName,
            quantity: quantity,
            date: todaysdate,
            farmersID: farmersID,
          },
        ])
      })
      toast.success('a new farmer added successifully')
    }
  }

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
//add farmers component
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
    Add a new farmers here
  </h2>
      <ToastContainer position="top-center" />
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
      <h2> Add Farmer </h2>
      <form>
        <input
          type="text"
          name="fullName"
          placeholder="enter fullName..."
          required="required"
          onChange={(e) => setfullName(e.target.value)}
        />
        <input
          type="text"
          name="quantity"
          placeholder="enter quantity..."
          required="required"
          onChange={(e) => setquantity(e.target.value)}
        />
        <input type="text" value={todaysdate} readOnly="true" />
        <input
          type="text"
          name="id"
          placeholder="enter ID..."
          required="required"
          onChange={(e) => setfarmersID(e.target.value)}
        />

        <button onClick={handleAdd}> Add</button>
      </form>
    </div>
  )
}

export default FarmersRoute
