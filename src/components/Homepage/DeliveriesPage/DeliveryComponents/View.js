import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Axios from 'axios'
import { Buttondiv } from '../../../styled-componets/styles'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { UseadminContext } from '../../../AdminContext'
//import './farmerspage.css'

function View() {
  const { LocalUser } = UseadminContext()

  const [alldata, setalldata] = useState([])
  const [IspriceUpdated, setIspriceUpdated] = useState(false)
  const [price, setprice] = useState([])
  const [comingprice, setcomingprice] = useState([])
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  const [farmersID, setfarmersID] = useState('')
  const [date, setdate] = useState('')
  const [searchName, setsearchName] = useState('')
  const [total, settotal] = useState(0)
  const [Expenses, setExpenses ] = useState('')

  const location = useLocation()
  const val = location?.state

  //useEffect hook for rendering all deliveries
  //runs when the page loads
  useEffect(() => {
    if (val) {
      setfullName(val.fullName)
      setquantity(val.quantity)
      //setdate(new Date(val.date).toLocaleDateString())
      setExpenses(val.Expenses)
      setfarmersID(val.farmersid)
    }
  }, [val])
  console.log(`this is farmersID ${farmersID}`)
  console.log(`this is val.Expenses ${val.Expenses}`)
  const id = val.id


  useEffect(() => {
    Axios.get(`http://localhost:3001/View/${val.farmersid}`).then(
      (response) => {
        //farmersID=farmersID
        if (response.data) {
          setalldata(response.data)
          console.log(response.data)
        }
      },
    )
  }, [])

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
  }

  const navigate = useNavigate()
  function handleClick() {
    navigate('/deliveries')
  }

  //pulling price from the database
  useEffect(() => {
    Axios.get('http://localhost:3001/getMilkPrice').then((response) => {
      if (response.data) {
        console.log('price here', response.data[0])
        setIspriceUpdated(true)
        setprice(response.data[0])
        console.log('setnewprice bv;jhvjv', price)
      }
    })
  }, [])

  // const renderPrice = () => {
  //   return comingprice.map((val) => {
  //     return (
  //         <h1>{val.price}</h1>
  //     )
  //   })
  // }

  const renderPrice = () => {
    return price.map((item) => {
      return item.dbprice
    })
  }
  console.log('price ya hapa ', price.dbprice)

  // useEffect(() => {
  //   renderPrice()
  //   console.log("val.dbprice", val.price);
  //   console.log("price ya hapa ", price);

  // }, []);

  //this is function is called when the delete button is clicked
  const deleteDelivery = (id) => {
    Axios.delete(`http://localhost:3001/deleteuser/${farmersID}`).then(
      (response) => {
        setalldata(
          alldata.filter((val) => {
            return val.farmersid != val.farmersid
          }),
        )
        console.log('the record was successifully deleted !!')
        console.log(farmersID)
        toast.success('record deleted successifully')
      },
    )
  }

  useEffect(() => {
    totalAmount()
    console.log('val.dbprice', val.price)
    console.log('price ya hapa ', price)
  }, [price])

  const totalAmount = () => {
    settotal(price.dbprice * totalQuanity)
    console.log('sjkfsdfsdf price.dbprice', price.dbprice)
    //console.log('sjkfsdfsdf totalQuantity', totalQuanity)
  }
  console.log('total amount generated ', total)
  console.log('above this line ')

  const renderTable = () => {
    return alldata.map((val) => {
      return (
        <tr>
          <td>{val.quantity}</td>
          <td>{new Date(val.date).toLocaleDateString()}</td>
        </tr>
      )
    })
  }
  let totalQuanity = alldata
    .map((item) => item.quantity)
    .reduce((p, c) => p + c, 0)
  console.log('totalQuanity', totalQuanity)

  const Loan = (total * 1) / 4
  const Min = 4000
  console.log(' loan available ', Loan)
  const Money = total - val.Expenses

  if (LocalUser[0].Role == 'normal') {
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
            color: 'black',
          }}
        >
          Welcome {LocalUser.map((item) => item.fullName)} total milk:{' '}
          {totalQuanity} litres
        </h2>

        <h2
          style={{
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '25px',
            marginTop: '10px',
            marginBottom: '10px',
            color: '#2fbd82',
          }}
        >
          total Amount is KSH:{Money}
        </h2>

        {Loan >= Min ? (
          <h2
            style={{
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '1100px',
              fontSize: '15px',
              marginTop: '-10px',
              marginBottom: '10px',
              color: 'grey',
            }}
          >
            {' '}
            <em>Login Status</em> Available Ksh: {Math.round(Loan)}
          </h2>
        ) : (
          <h2
            style={{
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '1100px',
              fontSize: '15px',
              marginTop: '-10px',
              marginBottom: '10px',
              color: 'red',
            }}
          >
            <em>Loan status: Not Available </em>
          </h2>
        )}

        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </form>
        <Buttondiv style={{ background: 'white' }}>
          <button
            style={{
              background: '#009999',
              marginTop: '50px',
              width: '100px',
              height: '50px',
              fontSize: '20px',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            onClick={handleClick}
          >
            back
          </button>
        </Buttondiv>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            fontSize: '25px',
            marginLeft: '400px',
            color: '#FFFFFF',
            marginTop: '-50px',
          }}
        >
          <Link to={`/deliveries/View/Barchart`} state={val}>
            <button
              style={{
                background: '#009999',
                width: '130px',
                height: '50px',
                fontSize: '20px',
                marginRight: '100px',
                borderRadius: '8px',
                color: '#FFFFFF',
              }}
            >
              Milk Graph{' '}
            </button>
          </Link>
        </div>
      </div>
    )
  } else {
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
            color: 'black',
          }}
        >
          Welcome {LocalUser.map((item) => item.fullName)} total milk:{' '}
          {totalQuanity} litres
        </h2>

        <h2
          style={{
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '25px',
            marginTop: '10px',
            marginBottom: '10px',
            color: '#2fbd82',
          }}
        >
          total Amount is KSH:{Money}
        </h2>

        {Loan >= Min ? (
          <h2
            style={{
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '1100px',
              fontSize: '15px',
              marginTop: '-10px',
              marginBottom: '10px',
              color: 'red',
            }}
          >
            {' '}
            <em>Loan Status Available Ksh</em>: {Math.round(Loan)}
          </h2>
        ) : (
          <h2
            style={{
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '1100px',
              fontSize: '15px',
              marginTop: '-10px',
              marginBottom: '10px',
              color: 'red',
            }}
          >
            <em>Loan status: Not Available </em>
          </h2>
        )}

        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </form>
        <Buttondiv style={{ background: 'white' }}>
          <button
            style={{
              background: '#009999',
              marginTop: '50px',
              width: '100px',
              height: '50px',
              fontSize: '20px',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            onClick={handleClick}
          >
            back
          </button>
        </Buttondiv>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            fontSize: '25px',
            marginLeft: '400px',
            color: '#FFFFFF',
            marginTop: '-55px',
          }}
        >
          <Link to={`/deliveries/View/Barchart`} state={val}>
            <button
              style={{
                background: '#009999',
                width: '130px',
                height: '50px',
                fontSize: '20px',
                marginRight: '100px',
                borderRadius: '8px',
                color: '#FFFFFF',
              }}
            >
              Milk Graph{' '}
            </button>
          </Link>

          <button
            style={{
              background: 'red',
              marginTop: '-5px',
              width: '120px',
              height: '50px',
              fontSize: '20px',
              borderRadius: '8px',
              color: '#FFFFFF',
            }}
            onClick={() => {
              deleteDelivery(val.farmersid)
            }}
          >
            Delete All
          </button>
        </div>
      </div>
    )
  }
}

export default View

// import React, { useState, useEffect } from 'react'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Axios from 'axios'
// import { useNavigate, useLocation, useParams } from 'react-router-dom'

// //import './farmerspage.css'
// function View() {
//   const [alldata, setalldata] = useState([])

//   const [fullName, setfullName] = useState('')
//   const [quantity, setquantity] = useState('')
//   const [farmersID, setfarmersID] = useState('')

//   const [searchName, setsearchName] = useState('')

//   // const current = new Date()
//   // const todaysdate =
//   //   current.getFullYear() +
//   //   '/' +
//   //   current.getDate() +
//   //   1 +
//   //   '/' +
//   //   current.getMonth()

//   const location = useLocation()
//   const val = location?.state
//   //when the page loads this gets executed

//   //when the page loads this gets executed
//   useEffect(() => {
//     if (val) {
//       setfullName(val.fullName)
//       setquantity(val.quantity)
//       //setdate(new Date(val.date).toLocaleDateString())
//       setfarmersID(val.farmersid)

//       console.log(fullName + quantity + farmersID)
//     }
//   }, [val])

//   console.log(farmersID)

//   //Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
//   //useEffect hook for rendering all deliveries
//   useEffect(() => {
//     Axios.get(`http://localhost:3001/view/${farmersID}`).then(
//       (response) => {
//         if (response.data) {
//           setalldata(response.data)
//           console.log(response.data)
//         }
//       },
//     )
//   }, [])

//   const handleEditFormSubmit = (event) => {
//     event.preventDefault()
//   }

//   const renderTable = () => {
//     return alldata.map((val) => {
//       return (
//         <tr>
//           <td>{val.fullName}</td>
//           <td>{val.quantity}</td>
//           <td>{new Date(val.date).toLocaleDateString()}</td>
//           <td>{val.farmersid}</td>
//         </tr>
//       )
//     })
//   }
//   // console.log(`this is the farmersID${farmersID}`)
//   return (
//     <div>
//       <h2
//         style={{
//           background: '#2fbd82',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: '25px',
//           marginTop: '20px',
//           marginBottom: '15px',
//           color: '#ffffff',
//         }}
//       >
//         All deliveries
//       </h2>
//       <input
//         style={{
//           marginTop: '5px',
//           marginBottom: '10px',
//           marginLeft: '175px',
//           height: '35px',
//           color: 'black',
//         }}
//         type="text"
//         placeholder="search by name..."
//         onChange={(e) => setsearchName(e.target.value)}
//       />

//       <form onSubmit={handleEditFormSubmit}>
//         <table>
//           <thead>
//             <tr>
//               <th>FullName</th>
//               <th>Quantity</th>
//               <th>Date</th>
//               <th>ID</th>
//             </tr>
//           </thead>
//           <tbody>{renderTable()}</tbody>
//         </table>
//       </form>
//     </div>
//   )
// }
//export default View

// import { useNavigate, useLocation, useParams } from 'react-router-dom'
// import React, { useState, useEffect } from 'react'
// import { Buttondiv, Button } from '../../../styled-componets/styles'

// function View() {
//   const [fullName, setfullName] = useState('')
//   const [quantity, setquantity] = useState('')

//   const [date, setdate] = useState('')
//   const [farmersID, setfarmersID] = useState('')

// const location = useLocation()
//   const val = location?.state

//   //this replaced useHistory on the previous version of react-router
//   const navigate = useNavigate()
//   function handleClick() {
//     navigate('/deliveries')
//   }

//   //when the page loads this gets executed
//   // useEffect(() => {
//   //   if (val) {
//   //     setfullName(val.fullName)
//   //     setquantity(val.quantity)
//   //     setdate(new Date(val.date).toLocaleDateString())
//   //     setfarmersID(val.farmersid)

//   //     // console.log(fullName + quantity + date + farmersID)
//   //   }
//   // }, [val])

//   useEffect(() => {
//     Axios.get('http://localhost:3001/ViewAllDeliveries').then((response) => {
//       if (response.data) {
//         setalldata(response.data)
//         // console.log(response.data)
//       }
//     })
//   }, [])

//   //console.log(date)
//   //console.log(val.id)
//   console.log(fullName + quantity + date + farmersID)
//   return (
//     <>
//       <h2
//         style={{
//           background: '#2fbd82',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           fontSize: '25px',
//           marginTop: '20px',
//           marginBottom: '15px',
//           color: '#ffffff',
//         }}
//       >
//         Welcome {fullName}
//       </h2>
//       <form>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Quantity (kg) </th>
//               <th>Date</th>
//               <th>farmersID</th>
//             </tr>
//           </thead>
//           <tr>
//             <td> {fullName} </td>
//             <td> {quantity} </td>
//             <td> {date} </td>
//             <td> {farmersID} </td>
//           </tr>
//         </table>
//       </form>

//       <Buttondiv style={{ background: 'white' }}>
//         <button
//           style={{
//             background: '#009999',
//             marginTop: '50px',
//             width: '100px',
//             height: '50px',
//             fontSize: '25px',
//             borderRadius: '8px',
//             color: '#FFFFFF',
//           }}
//           onClick={handleClick}
//         >
//           back
//         </button>
//       </Buttondiv>
//     </>
//   )
// }

// export default View
