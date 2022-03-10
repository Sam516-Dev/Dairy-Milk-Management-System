import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
//import './farmerspage.css'

function BarChart() {
  const [alldata, setalldata] = useState([])
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  const [farmersID, setfarmersID] = useState('')

  const location = useLocation()
  const val = location?.state

  //useEffect hook for rendering all deliveries
  //runs when the page loads
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

  const renderLine = () => {
    return alldata.map((val) => {
      return (
        <tr>
          <td>{val.quantity}</td>
          <td>{new Date(val.date).toLocaleDateString()}</td>         
        </tr>
      )
    })
  }

  return (
    <div>
  
      <form >
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Date</th>          
            </tr>
          </thead>
          <tbody>{renderLine()}</tbody>
        </table>
      </form>
 
      
          </div>
        )
      }

      export default BarChart







// import { Pie, defaults } from 'react-chartjs-2'
// import { Bar } from 'react-chartjs-2'
// import React, { useState, useEffect } from 'react'
// import Axios from 'axios'


// const BarChart = () => {

//     const [alldeliveries, setalldeliveries] = useState([])
//     const [chartData, setChartData] = useState({})

//     const [initialData, setinitialData] = useState({
//         fullName: '',
//         quantity: '',
//          date: '',
//         farmersID: '',
//     })

//     // useEffect(() => {
//     //     Axios.get('http://localhost:3001/fetchalldeliveries').then((response) => {
//     //         if (response.data) {
//     //             setalldeliveries(response.data)
//     //             // console.log(response.data)   
//     //             setChartData({
//     //               labels: alldeliveries.map((val) => val.date),
                  
//     //               datasets: [
//     //                   {
//     //                     label: "litres",
//     //                     quantity: alldeliveries.map((val) => val.quantity),
//     //                     backgroundColor: [
//     //                       "#ffbb11",
//     //                       "#ecf0f1",
//     //                       "#50AF95",
//     //                       "#f3ba2f",
//     //                       "#2a71d0"
//     //                     ]
//     //                   }
//     //                 ]
//     //               });       
//     //         }
//     //         // labels: data.data.map((crypto) => crypto.name),
           
//     //     }, [])
    
    
    

//     //})
    
//   return <h2> line Graph preparation </h2>
// }

// export default BarChart
