import React, { useState, useEffect } from 'react'
import './DeliveriesPage.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const DeliveriesPage = () => {
  const [alldeliveries, setalldeliveries] = useState([])

  const [contacts, setContacts] = useState('')

  const [initialData, setinitialData] = useState({
    fullName: '',
    quantity: '',
    // date: '',
    farmersID: '',
  })

  const current = new Date()
  const todaysdate =
    current.getFullYear() +
    '/' +
    (current.getMonth() + 1) +
    '/' +
    current.getDate();
  //this function runs when we try a new delivery in the deliveries list
  //newFormData is the current entered element in the input field through spread (...)
  const handleAddFormChange = (event) => {
    const { name, value } = event.target
    setinitialData({ ...initialData, [name]: value })
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
  }

  //this function runs whenever the add button is clicked

  //useEffect hook for rendering all deliveries
  useEffect(() => {
    Axios.get('http://localhost:3001/fetchalldeliveries').then((response) => {
      if (response.data) {
        setalldeliveries(response.data)
        // console.log(response.data)
      }
    })
  }, [])
  //this is function is called when the delete button is clicked
  const deleteDelivery = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setalldeliveries(
        alldeliveries.filter((val) => {
          return val.id != id
        }),
      )
      console.log('the record was successifully deleted !!')
      toast.success('record deleted successifully')
    })
  }

  //here we're rendering the table through maping all the data in the database
  const renderTable = () => {
    return alldeliveries.map((val) => {
      return (
        <tr>
          <td>{val.fullName}</td>
          <td>{val.quantity}</td>
          <td>{new Date(val.date).toLocaleDateString()}</td>
          <td>{val.farmersid}</td>

          <td class="button-wrap">
            <Link to={`/deliveries/Update`} state={val}>
              <button class="btn-update">Update</button>
            </Link>

            <button
              class="btn-delete"
              onClick={() => {
                deleteDelivery(val.id)
              }}
            >
              Delete
            </button>

            <div class="button-wrap">
              <Link to={`/deliveries/View`} state={val}>
                <button class="btn-update">View</button>
              </Link>
            </div>
          
            <div class="button-wrap">
              <Link to={`/deliveries/Newdelivery`} state={val}>
                <button class="btn-update">+ new </button>
              </Link>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="app-container">
      <ToastContainer position="top-center" />
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity (kg) </th>
              <th>Date</th>
              <th>farmersID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </form>
    </div>
  )
}

export default DeliveriesPage

// <input
//   type="date"
//   name="date"
//   required="required"
//   placeholder="Enter the date..."
//   onChange={handleAddFormChange}
// />
