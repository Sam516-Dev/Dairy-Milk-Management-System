import React, { useState, useEffect } from 'react'
import './DeliveriesPage.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { Link } from 'react-router-dom'
// import { LocalUser } from UseadminContext();
import { UseadminContext } from '../../AdminContext'

const DeliveriesPage = () => {
  const { LocalUser } = UseadminContext()
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
    current.getDate()
  
  const handleAddFormChange = (event) => {
    const { name, value } = event.target
    setinitialData({ ...initialData, [name]: value })
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
  }

  //useEffect hook for rendering all deliveries
  useEffect(() => {
    Axios.get('http://localhost:3001/fetchalldeliveries').then((response) => {
      if (response.data) {
        setalldeliveries(response.data)
        // console.log(response.data)
      }
    })
  }, [])
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
      if (
        LocalUser[0].farmersid === val.farmersid &&
        LocalUser[0].Role == 'normal'
      ) {
        return (
          <tr>
            <td>{val.fullName}</td>
            <td>{val.quantity}</td>
            <td>{new Date(val.date).toLocaleDateString()}</td>
            <td>{val.farmersid}</td>
            <td> { val.Expenses }</td>
            <td class="button-wrap">
              {LocalUser[0].Role == 'Admin' ? (
                <Link to={`/deliveries/Update`} state={val}>
                  <button class="btn-update">Update</button>
                </Link>
              ) : (
                ''
              )}

              {LocalUser[0].Role == 'Admin' ? (
                <button
                  class="btn-delete"
                  onClick={() => {
                    deleteDelivery(val.id)
                  }}
                >
                  Delete
                </button>
              ) : (
                ''
              )}

              <div class="button-wrap">
                <Link to={`/deliveries/View`} state={val}>
                  <button class="btn-update">View</button>
                </Link>
              </div>

              {LocalUser[0].Role == 'Admin' ? (
                <div class="button-wrap">
                  <Link to={`/deliveries/Newdelivery`} state={val}>
                    <button class="btn-update">+ new </button>
                  </Link>
                </div>
              ) : (
                ''
              )}
            </td>
          </tr>
        )
      } else if(LocalUser[0].Role == 'Admin' ) {
        return (
          <tr>
            <td>{val.fullName}</td>
            <td>{val.quantity}</td>
            <td>{new Date(val.date).toLocaleDateString()}</td>
            <td>{val.farmersid}</td>
            <td> { val.Expenses }</td>


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
      }
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
              <th>Expenses</th>
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


