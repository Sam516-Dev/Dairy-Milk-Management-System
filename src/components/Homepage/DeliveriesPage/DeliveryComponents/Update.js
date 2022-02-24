import React, { useState, useEffect } from 'react'
import { Milktitle } from '../../../styled-componets/styles'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Axios from 'axios'
import './Update.css'
import { ToastContainer, toast } from 'react-toastify'

function Update() {
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')

  const [date, setdate] = useState('')
  const [farmersID, setfarmersID] = useState('')



  const [alldata, setalldata] = useState({
    fullName: '',
    quantity: '',
    date: '',
    farmersID: '',
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  // const Handledesubmit = (e) => {
  //   e.preventDefault()
  // }

  // this fuction hundles deafault
  const handlechange = (e) => {
    e.preventDefault()
    //let { name, value } = e.target
    //setState({ ...State, [name]: value })
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

  console.log(`this is the firstname ${fullName}`)




  const UpdateDelivery = (id) => {
    Axios.put(`http://localhost:3001/Update/${id}`).then((response) => {
      if (response.data) {
        setalldata(response.data)
        console.log(response.data)
      }
     // console.log('the record was successifully deleted !!')
      //toast.success('record was successifully deleted')
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
          onChange={(e) => setfullName(e.target.value)}
          value={fullName}
        />

        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Enter the quantity..."
          onChange={(e) => setquantity(e.target.value)}
          value={quantity}
        />

        <input
          type="text"
          id="date"
          name="date"
          placeholder="Enter the date..."
          onChange={(e) => setdate(e.target.value)}
          value={date}
        />

        <input
          type="farmersID"
          id="farmersID"
          name="farmersID"
          placeholder="Enter the farmersID..."
          onChange={(e) => setfarmersID(e.target.value)}
          value={farmersID}
        />
        <button type="submit" value={val.id ? "Update" : "Add"} onSubmit={UpdateDelivery}>
          update
        </button>
      </form>
    </div>
  )
}

export default Update
