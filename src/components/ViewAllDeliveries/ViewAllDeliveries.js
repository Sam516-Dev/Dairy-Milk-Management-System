import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'

//import './farmerspage.css'
function ViewAllDeliveries() {
  const [alldata, setalldata] = useState([])

  //   const [fullName, setfullName] = useState('')


  const [searchName, setsearchName] = useState('')

//   const current = new Date()
//   const todaysdate =
//     current.getFullYear() +
//     '/' +
//     current.getDate() +
//     1 +
//     '/' +
//     current.getMonth()

  useEffect(() => {
    Axios.get('http://localhost:3001/ViewAllDeliveries').then((response) => {
      if (response.data) {
        setalldata(response.data)
      }
    })
  }, [])

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
  }

  const renderTable = () => {
    return alldata
      .filter((Search) => {
        if (searchName === '') {
          return Search
        } else if (
          Search.fullName.toLowerCase().includes(searchName.toLowerCase())
        ) {
          return Search
        }
      })
      .map((val) => {
        return (
          <tr>
            <td>{val.fullName}</td>
            <td>{val.quantity}</td>
            <td>{new Date(val.date).toLocaleDateString()}</td>
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
          color: 'black',
        }}
      >
        All deliveries
      </h2>
      <input
        style={{
          marginTop: '5px',
          marginBottom: '10px',
          marginLeft: '175px',
          height: '35px',
          color: 'black',
        }}
        type="text"
        placeholder="search by name..."
        onChange={(e) => setsearchName(e.target.value)}
      />

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>FullName</th>
              <th>Quantity</th>
              <th>Date</th>
            
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </form>
    </div>
  )
}

export default ViewAllDeliveries
