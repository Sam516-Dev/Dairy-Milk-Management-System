import React, { useState, useEffect } from 'react'
import { Milktitle } from '../../../styled-componets/styles'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Axios from 'axios'
import './Update.css'

const initialData = {
  fullName: '',
  quantity: '',
  date: '',
  farmersID: '',
}

function Update() {
  const [State, setState] = useState(initialData)

  const { fullName, quantity, date, farmersID } = initialData

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const Handledefault = (e) => {
    e.preventDefault()
  }

  const handlechange = (e) => {
    e.preventDefault()
    let { name, value } = e.target
    setState({ ...State, [name]: value })
  }

  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    if (id) {
      Singleuser(id)
    }
  }, [id])

  const Singleuser = (id) => {
    Axios.get(`http://localhost:3001/delete/${id}`).then((response) => {
      if (response===200) {
        setState({ ...response.data[0] })
        console.log(`this is the response ${response}`)
      }
    })
  }

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
          required
        />

        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Enter the quantity..."
          onChange={handlechange}
          value={quantity}
          required
        />

        <input
          type="date"
          id="date"
          name="date"
          placeholder="Enter the date..."
          onChange={handlechange}
          value={date}
          required
        />

        <input
          type="farmersID"
          id="farmersID"
          name="farmersID"
          placeholder="Enter the farmersID..."
          onChange={handlechange}
          value={farmersID}
          required
        />
        <button type="submit" value="Add" onSubmit={Handledefault}>
          update
        </button>
      </form>
    </div>
  )
}

export default Update
