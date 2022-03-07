import { FaEdit } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { Milktitle, MilkLabel, Milkp } from '../styled-componets/styles'
import Axios from 'axios'
import reactDom from 'react-dom'
function MilkPerLitreApp() {
  const [price, setprice] = useState([])
  const [priceUpdated, setpriceUpdated] = useState("")
  const [IspriceUpdated, setIspriceUpdated] = useState(false)




  const UpdatePrice = (event) => {
    event.preventDefault()
    console.log('clicked !')
  }
  //fetch on loading


  //pulling price from the database
  useEffect(() => {
    Axios.get('http://localhost:3001/getMilkPrice').then((response) => {
      if (response.data) {
        console.log('price here', response.data)
        setIspriceUpdated(true)
        setprice(response.data)
        // console.log('setnewprice', setprice );
      }
    })
  }, [])


  //post inputs
  const Update = (event) => {
    event.preventDefault()
    Axios.put(`http://localhost:3001/UpdateMilkPrice/${priceUpdated}`, {
      price: priceUpdated,
    }).then(() => {
      let tempPrice = []
      let te ={dbprice :priceUpdated }
      tempPrice.push(te);

      setIspriceUpdated(true)
      setprice(tempPrice)
      console.log('price updated successifully !',priceUpdated )
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
          color: 'blue',
        }}
      >
        
        {price.map(item => {
          return item.dbprice
        })}
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
          type="number"
          placeholder="Update milk Price..."
          onChange={(e) => setpriceUpdated(e.target.value)}
        />

        <button
          style={{
            background: '#009999',
            width: '100px',
            fontSize: '18px',
            borderRadius: '8px',
            color: '#FFFFFF',
          }}
          onClick={Update}
        >
          Update Price
        </button>
      </form>
    </>
  )
}

export default MilkPerLitreApp
