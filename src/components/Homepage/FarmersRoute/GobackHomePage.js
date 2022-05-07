import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeIcon, UserIcon } from '../../styled-componets/styles'
import { AdminContextProvider } from '../../AdminContext'
import { ToastContainer, toast } from 'react-toastify'

import { UseadminContext } from '../../AdminContext'

function GobackHomeApp() {
  let location = useLocation()
  const { EmptyUser, LocalUser } = UseadminContext()

  // const { LocalUser } = UseadminContext();

  const navigate = useNavigate()
  return (
    <React.Fragment>
      <ToastContainer position="top-center" />

      <HomeIcon onClick={() => navigate('/')} />

      {LocalUser != '' ? (
        <React.Fragment>
          <UserIcon
            onClick={() =>
              EmptyUser(toast.success('logged out successifully '))
            }
          />
          <p
            style={{
              color: 'red',
              fontSize: '15px',
              marginLeft: '1322px',
              fontWeight: 'bold',
              marginTop: '-5px',
            }}
          >
            logout
          </p>
          )
        </React.Fragment>
      ) : (
        ' '
      )}

 

    </React.Fragment>
  )
}

export default GobackHomeApp
