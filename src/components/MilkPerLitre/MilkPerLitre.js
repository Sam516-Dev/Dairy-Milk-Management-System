import { FaEdit } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { Milktitle, MilkLabel, Milkp } from '../styled-componets/styles'
import Axios from 'axios'
import reactDom from 'react-dom'
function MilkPerLitreApp() {
  const [price, setprice] = useState('')

  const UpdatePrice = (event) => {
    event.preventDefault()
    console.log('clicked !')
  }
  //fetch on loading
  useEffect(() => {
    Axios.get('http://localhost:3001/MilkPrice').then((response) => {
      if (response.data) {
        setprice(response.data)
        console.log(setprice)
      }
    })
  }, [])

  //post inputs
  const AddPrice = (event) => {
    event.preventDefault()
    Axios.post('http://localhost:3001/InputPrice', {
      price: price,
    }).then(() => {
      console.log('new delivery added successifully !')
      //navigate('/deliveries')
    })
  }

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
    Price Per Litre
  </h2>
      
      
      <h1
        style={{
          //background: '#2fbd82',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '30px',
          marginTop: '20px',
          // marginBottom: '5px',
          color: '#ffffff',
        }}
      >
        sam
      </h1>
      <form
        style={{
          // background: '#009999',
          marginTop: '30px',
          width: '50%',
          height: '60px',
          fontSize: '25px',
          borderRadius: '8px',
          color: '#FFFFFF',
          marginLeft: '520px',
        }}
      >
        <input
          style={{
            color: 'black',
            width: '40%',
            borderRadius: '8px',
          }}
          type="text"
          placeholder="insert milk Price..."
          onChange={(e) => setprice(e.target.value)}
        />

        <button
          style={{
            background: '#009999',
            width: '100px',
            fontSize: '18px',
            borderRadius: '8px',
            color: '#FFFFFF',
          }}
          onClick={AddPrice}
        >
          Insert Price
        </button>
      </form>

      <form
        style={{
          // background: '#009999',
          marginTop: '70px',
          width: '50%',
          height: '60px',
          fontSize: '18px',
          borderRadius: '8px',
          color: '#FFFFFF',
          marginLeft: '520px',
        }}
      >
        <input
          style={{
            color: 'black',
            width: '40%',
            borderRadius: '8px',
          }}
          type="text"
          placeholder=" insert price to update..."
          onChange={(e) => setprice(e.target.value)}
        />
        <button
          style={{
            background: '#009999',
            width: '100px',
            fontSize: '18px',
            borderRadius: '8px',
            color: '#FFFFFF',
          }}
          onClick={UpdatePrice}
        >
          Update Price
        </button>
      </form>
    </>
  )
}

export default MilkPerLitreApp
