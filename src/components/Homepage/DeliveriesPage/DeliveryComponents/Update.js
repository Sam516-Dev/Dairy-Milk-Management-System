import React, { useState, useEffect } from 'react'
import { Milktitle } from '../../../styled-componets/styles'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Axios from 'axios'
import './Update.css'

function Update() {
  // const initialData = {
  //   fullName: '',
  //   quantity: '',
  //   date: '',
  //   farmersID: '',
  // }

  // const [State, setState] = useState(initialData)

  // const { fullName, quantity, date, farmersID } = initialData

  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')

  const [date, setdate] = useState('')
  const [farmersID, setfarmersID] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const Handledefault = (e) => {
    e.preventDefault()
  }

  // this fuction hundles deafault
  const handlechange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    // setState({ ...State, [name]: value })
  }

  const location = useLocation()
  const val = location?.state

  //console.log('test', val)

  useEffect(() => {
    if (val) {
      setfullName(val.fullName)
      setquantity(val.quantity)
      setdate(new Date(val.date).toLocaleDateString())
      setfarmersID(val.farmersid)

      // console.log(fullName + quantity + date + farmersID)
    }
  }, [val])
  console.log(date)
  console.log(val.id);
  // const renderTable = () => {
  //   setState.map((val) => {
  //     <tr>
  //       <td>{val.fullName}</td>
  //       <td>{val.quantity}</td>
  //       <td>{new Date(val.date).toLocaleDateString()}</td>
  //       <td>{val.farmersid}</td>
  //     </tr>
  //   })
  // }

  console.log(`this is the firstname ${fullName}`)

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="fullName"
          name="FullName"
          placeholder="Enter a fullname..."
          onChange={handlechange}
          value={fullName}
        />

        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Enter the quantity..."
          onChange={handlechange}
          value={quantity}
        />

        <input
          type="text"
          id="date"
          name="date"
          placeholder="Enter the date..."
          onChange={handlechange}
          value={date}
        />

        <input
          type="farmersID"
          id="farmersID"
          name="farmersID"
          placeholder="Enter the farmersID..."
          onChange={handlechange}
          value={farmersID}
        />
        <button type="submit" value="Add" onSubmit={Handledefault}>
          update
        </button>
      </form>
    </div>
  )
}

export default Update
