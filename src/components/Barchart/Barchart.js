import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import Axios from 'axios'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement)

function BarChart() {
  const [fullName, setfullName] = useState('')
  const [quantity, setquantity] = useState('')
  const [farmersID, setfarmersID] = useState('')

  const [chart, setChart] = useState([])

  const location = useLocation()
  const val = location?.state

  //useEffect hook for rendering all deliveries
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
          setChart(response.data)
          console.log(response.data)
        }
      },
    )
  }, [])

  var data = {
    labels: chart?.map((x) => (x.date = new Date(x.date).toLocaleDateString())),
    // (x) => (x.date = new Date(val.date).toLocaleDateString()),
    datasets: [
      {
        data: chart?.map((x) => x.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar data={data} height={500} width={700} options={options} />
    </div>
  )
}

export default BarChart