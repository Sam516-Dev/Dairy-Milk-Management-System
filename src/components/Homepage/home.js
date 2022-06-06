import React from 'react'

import {
  Title,
  Hometitle,
  Homediv,
  Tablerow,
  NavbarLink,
} from '../styled-componets/styles'
import { UseadminContext } from '../AdminContext'




function Homepage() {
  const { LocalUser } = UseadminContext()

  return (
    
    <Homediv>
    
      <NavbarLink to="/"> Home</NavbarLink>
      <NavbarLink to="/farmers"> add farmers </NavbarLink>
      <NavbarLink to="/deliveries"> Deliveries </NavbarLink>
      <NavbarLink to="/milkprice"> milk price</NavbarLink>
      <NavbarLink to="/ViewAllDeliveries">All Deliveries </NavbarLink>


      <img
        src="/homeimages/dairy cows.jpg"
        alt="cow image"
        width="100%"
        height="600px"
      />
    </Homediv>
  )
}
export default Homepage
