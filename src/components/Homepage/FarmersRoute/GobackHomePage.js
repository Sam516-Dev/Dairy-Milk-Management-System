import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon, UserIcon } from '../../styled-componets/styles'
import { AdminContextProvider } from '../../AdminContext'

import { UseadminContext } from '../../AdminContext'

function GobackHomeApp() {
  let location = useLocation()
  // const { EmptyUser } = UseadminContext()

  // const { LocalUser } = UseadminContext();

  const navigate = useNavigate()
  return (
    <div>
      <HomeIcon onClick={() => navigate('/')} />

      <UserIcon />
      <p
        style={{
          color: 'black',
          fontSize: '15px',
          marginLeft: '1223px',
          marginTop: '-5px',
        }}
      >
        {' '}
        logout{' '}
      </p>
    </div>
  )
}

export default GobackHomeApp
