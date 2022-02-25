import React, { useState, useEffect } from 'react'
import { Milktitle } from '../../../styled-componets/styles'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Axios from 'axios'
import './Update.css'
import { ToastContainer, toast } from 'react-toastify'
import { Buttondiv } from '../../../styled-componets/styles'
//import * as moment from 'Moment'
// import Moment from 'moment';

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

  //this replaced useHistory on the previous version of react-router
  const navigate = useNavigate();
  function handleClick() {
    navigate("/deliveries")
  }


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
  console.log(val.id)

  //console.log(`this is the firstname ${fullName}`)
  // const UpdateDelivery = () => {
  // Axios.put(`http://localhost:3001/Update`).then((response) => {
  //newContact: newContact,
  //     fullName: fullName,
  //     quantity: quantity,
  //     date: date,
  // farmersID: farmersID,

  //   if (response.data) {
  //     setalldata(response.data)
  //     console.log(response.data)
  //   }
  // console.log('the record was successifully deleted !!')
  // toast.success('record was successifully deleted')
  // })
  // console.log(setalldata);
  // }
  const id = val.id;
  //console.log(`THIS IS THE CONVERTED id will it work ${id}`)

  const UpdateDelivery = () => {
    Axios.put("http://localhost:3001/Update", {
      // const newContact={
      fullName: fullName,
      quantity: quantity,
      date: new Date(val.date).toLocaleDateString(),
      farmersID: farmersID,
      id : id,
      
      // }
    }).then(() => {
      console.log(fullName + quantity + date + farmersID)
    })
    toast.success('data updated successifully')
    //setinitialData(initialData)
    //})
  }
  //moment(date).format('YYYY-MM-DD')
  // moment(yourDate).format("YYYY/MM/DD kk:mm:ss");


  // console.log(fullName + quantity + date + farmersID);

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
          type="date"
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
        <button
          type="submit"
          value={val.id ? 'Update' : 'Add'}
          onClick={UpdateDelivery}
        >
          update
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
                  color: '#FFFFFF'
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
