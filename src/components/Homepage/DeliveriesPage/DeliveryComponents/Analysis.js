import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Buttondiv } from '../../../styled-componets/styles'


function Analysis() {
    const location = useLocation()
    const val = location?.state

    const [alldata, setalldata] = useState([])

    const [fullName, setfullName] = useState('')
    const [quantity, setquantity] = useState('')
    const [farmersID, setfarmersID] = useState('')


 
 useEffect(() => {
     if (val) {
      setfullName(val.fullName)
      setquantity(val.quantity)
      //setdate(new Date(val.date).toLocaleDateString())
      setfarmersID(val.farmersid)
}
  }, [val])
  console.log(`this is farmersID ${farmersID}`)
  console.log(`this is val.farmersid ${val.farmersid}`)



  let totalQuanity = alldata
  .map((item) => item.quantity)
  .reduce((p, c) => p + c, 0)
console.log('totalQuanity', totalQuanity)



const navigate = useNavigate()
  function handleClick() {
    navigate('/deliveries/View')
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
        {fullName}'s Analysis
      </h2>
            <p> hey there {totalQuanity}</p>

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
        
    );
}

export default Analysis;