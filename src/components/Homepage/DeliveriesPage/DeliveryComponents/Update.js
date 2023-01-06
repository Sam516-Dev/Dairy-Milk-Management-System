import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Axios from 'axios'
import './Update.css'
import { ToastContainer, toast } from 'react-toastify'
import { Buttondiv } from '../../../styled-componets/styles'
import Select from 'react-select'

const Choose = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Farmer', value: 'normal' },
]
const Choose2 = [
  { label: 'Dairy Meal', value: 2000 },
  { label: 'Salt', value: 500 },
]

function Update() {
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  const [Role, setRole] = useState('')
  const [Expenses, setExpenses ] = useState('')
  const [farmersID, setfarmersID] = useState('')

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


  const navigate = useNavigate()
  function handleClick() {
    navigate('/deliveries')
  }
  //runs when the page loads
  useEffect(() => {
    if (val) {
      setfullName(val.fullName)
      setquantity(val.quantity)
      setfarmersID(val.farmersid)
    }
  }, [val])
  console.log(val.id)
  const id = val.id

  const UpdateDelivery = () => {
    if (!fullName || !quantity ||quantity==0 || !farmersID || !Role || !Expenses) {
      toast.error('please enter all the fields correctly ')
      return console.log('no details entered !!')
    } else {
      Axios.put('http://localhost:3001/Update', {
        fullName: fullName,
        quantity: quantity,
        Expenses: Expenses,
        farmersID: farmersID,
        id: id,
        Role: Role,
      })
        .then(() => {
          console.log(fullName + quantity + farmersID + Role + Expenses)
        })
        .then(() => {
          toast.success('data updated successifully')
         
        }).then(() => {
          setTimeout(() => {
          navigate('/deliveries')
          }, 3000);
        })
    }
  }

  return (
    <div>
      <ToastContainer position="top-center" />

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
        Update Farmer delivery
      </h2>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="fullName"
            required
            name="FullName"
            placeholder="Enter a fullname..."
            onChange={(e) => setfullName(e.target.value)}
            value={fullName}
          />

          <input
            type="number"
            id="quantity"
            name="quantity"
            required
            placeholder="Enter the quantity..."
            onChange={(e) => setquantity(e.target.value)}
            value={`${quantity}`}
          />

          <input
            type="number"
            id="farmersID"
            name="farmersID"
            required
            placeholder="Enter the farmersID..."
            onChange={(e) => setfarmersID(e.target.value)}
            readOnly="true"
            value={farmersID}
          />

          <button
            style={{
              background: '#009999',
              width: '100px',
              height: '50px',
              fontSize: '20px',
              borderRadius: '4px',
              color: '#FFFFFF',
            }}
            type="submit"
            value={val.id ? 'Update' : 'Add'}
            onClick={UpdateDelivery}
          >
            update
          </button>
        </form>
        <div
          style={{
            width: '320px',
            fontSize: '20px',
            background: '#009999',
            color: 'black',
            marginLeft: '1110px',
            borderRadius: '12px',
            marginTop: '10px',
            padding: '2px 5px',
          }}
        >
          <Select
            options={Choose}          
            onChange={(opt) => setRole(opt.value)}
          />
        </div>
        <div
          style={{
            width: '320px',
            fontSize: '20px',
            background: '#009999',
            color: 'black',
            marginLeft: '1110px',
            borderRadius: '12px',
            marginTop: '10px',
            padding: '2px 5px',
          }}
        >
          <Select
            options={Choose2}
            // defaultValue={Choose[1]}            
            onChange={(exp) => setExpenses(exp.value)}
          />
        </div>
      </div>
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

export default Update

