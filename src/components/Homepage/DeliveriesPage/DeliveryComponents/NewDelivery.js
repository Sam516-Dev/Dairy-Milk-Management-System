import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Axios from 'axios'
import './Update.css'
import { ToastContainer, toast } from 'react-toastify'
import { Buttondiv } from '../../../styled-componets/styles'

function Newdelivery() {
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')

  const [date, setdate] = useState('')
  const [farmersID, setfarmersID] = useState('')
  const [alldeliveries, setalldeliveries] = useState([])

  const [contacts, setContacts] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const location = useLocation()
  const val = location?.state

  const current = new Date()
  const todaysdate =
    current.getFullYear() +
    '/' +
    current.getDate() +
    '/' +
    (current.getMonth() + 1)

  //this replaced useHistory on the previous version of react-router
  const navigate = useNavigate()
  function handleClick() {
    navigate('/deliveries')
  }
  //runs when the page loads
  useEffect(() => {
    if (val) {
      setfullName(val.fullName)
      //setquantity(val.quantity)
      //setdate(new Date(val.date).toLocaleDateString())
      setfarmersID(val.farmersid)
    }
  }, [val])
  console.log(date)
  console.log(val.id)
  const id = val.id

  const handleAdd = (event) => {
    event.preventDefault()
    if (!quantity) {
      toast.error('please input the new milk delivered')
      console.log('no quantity entered !!')
    } else {
      Axios.post('http://localhost:3001/adddairymilk', {
        //newContact: newContact,
        fullName: fullName,
        quantity: quantity,
        date: todaysdate,
        farmersID: farmersID,
      }).then(() => {
        console.log('new delivery added successifully !')
        navigate('/deliveries')
      })
      toast.success('a new delivery added successifully')
    }
  }
  console.log(fullName + quantity + date + farmersID)

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
        Add new delivery{' '}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          value={fullName}
          readOnly="true"
          onChange={(e) => setfullName(e.target.value)}
        />
        <input
          type="number"
          name="quantity"
          required="required"
          placeholder="Enter new delivery ..."
          onChange={(e) => setquantity(e.target.value)}
          //   value={quantity}
        />
        <input type="text" value={todaysdate} readOnly="true" />
        <input
          type="number"
          name="farmersID"
          required="required"
          placeholder="famers no..."
          readOnly="true"
          onChange={(e) => setfarmersID(e.target.value)}
          value={farmersID}
        />
        <button
          style={{
            background: '#009999',
            // marginTop: '50px',
            width: '100px',
            height: '50px',
            fontSize: '20px',
            borderRadius: '4px',
            color: '#FFFFFF',
          }}
          type="submit"
          onClick={handleAdd}
        >
          +ADD
        </button>
      </form>

      <Buttondiv style={{ background: 'white' }}>
        <button
          style={{
            background: '#009999',
            marginTop: '50px',
            width: '100px',
            height: '50px',
            fontSize: '25px',
            borderRadius: '8px',
            color: '#FFFFFF',
          }}
          onClick={handleClick}
        >
          back
        </button>
      </Buttondiv>
    </div>
  )
}

export default Newdelivery
