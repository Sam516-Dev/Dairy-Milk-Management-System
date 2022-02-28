import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import './farmerspage.css'
function FarmersRoute() {
  const [contacts, setContacts] = useState('')

  // const [initialData, setinitialData] = useState({
  //   fullName: '',
  //   quantity: '',
  //   date: '',
  //   farmersID: '',
  // })
  const [alldata, setalldata] = useState([])

  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  // const [date, setdate] = useState('')
  const [farmersID, setfarmersID] = useState('')

  const current = new Date()
  const todaysdate =
    current.getFullYear() +
    '/' +
    current.getDate() +
    1 +
    '/' +
    current.getMonth()

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
      toast.error('please input all the fields')
      return console.log('no details entered !!')
    } else {
      Axios.post('http://localhost:3001/adddelivery', {
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
      toast.success('a new delivery added successifully')
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

  return (
    <div>
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
