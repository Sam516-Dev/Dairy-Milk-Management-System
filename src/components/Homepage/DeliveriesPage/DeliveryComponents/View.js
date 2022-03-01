import { useNavigate, useLocation, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Buttondiv, Button } from '../../../styled-componets/styles'

function View() {
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')

  const [date, setdate] = useState('')
  const [farmersID, setfarmersID] = useState('')

  const location = useLocation()
  const val = location?.state

  //this replaced useHistory on the previous version of react-router
  const navigate = useNavigate()
  function handleClick() {
    navigate('/deliveries')
  }

  //when the page loads this gets executed
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
  console.log(val.id)
  console.log(fullName + quantity + date + farmersID)
  return (
    <>
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
        Welcome {fullName}
      </h2>
      <form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity (kg) </th>
              <th>Date</th>
              <th>farmersID</th>
            </tr>
          </thead>
          <tr>
            <td> {fullName} </td>
            <td> {quantity} </td>
            <td> {date} </td>
            <td> {farmersID} </td>
          </tr>
        </table>
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
    </>
  )
}

export default View
