import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeIcon } from '../../styled-componets/styles'

function GobackHomeApp() {
  const navigate = useNavigate()
  return <HomeIcon onClick={() => navigate('/')} />
}

export default GobackHomeApp
