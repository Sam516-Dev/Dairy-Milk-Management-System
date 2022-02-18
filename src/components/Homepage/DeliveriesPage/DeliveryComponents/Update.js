import React, { useState, useEffect } from 'react'
import { Milktitle } from '../../../styled-componets/styles'
import { useHistory, useLocation } from 'react-router-dom'
import Axios from 'axios'

const initialData = {
  fullName: '',
  quantity: '',
  date: '',
  farmersID: '',
}

function Update() {
  const [State, setState] = useState(initialData)

    const { fullName, quantity, date, farmersID } = initialData
    

    const handleEditFormSubmit = (event) => {
        event.preventDefault()
    }
    

    const handlechange = (e) => {
        let { name, value } = e.target;
        setState({...State, [name]: value})
    }
    

  return (
    <div>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
          >
          <label htmlFor="date"> fullName </label>
              <input
          type="text"
          id="fullName"
          name="FullName"
          placeholder="Enter a fullname..."
          onChange={handlechange}
          value={fullName}
              />
              <label htmlFor="quantity"> quantity </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Enter the quantity..."
          onChange={handlechange}
          value={quantity}
              />
              <label htmlFor="date"> date </label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="Enter the date..."
                onChange={handlechange}
                value={date}
              />
              
              <label htmlFor="farmersID"> farmersID </label>
              <input
                type="farmersID"
                id="farmersID"
                name="farmersID"
                placeholder="Enter the farmersID..."
                onChange={handlechange}
                value={farmersID}
                    />
      
      
      </form>
    </div>
  )
}

export default Update
