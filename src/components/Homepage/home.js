import React from 'react'

import {
  Title,
  Hometitle,
  Homediv,
  Tablerow,
  NavbarLink,
} from '../styled-componets/styles'

function Homepage() {
  return (
    <Homediv>
      <NavbarLink to="/"> Home</NavbarLink>
      <NavbarLink to="/farmers"> farmers </NavbarLink>
      <NavbarLink to="/deliveries"> Deliveries </NavbarLink>
      <NavbarLink to="/milkprice"> milk price</NavbarLink>
      <NavbarLink to="/analytics"> Analytics </NavbarLink>


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

// <Hometable>
// <thead>
//   <tr>
//     <Tablerow> home </Tablerow>
//     <Tablerow>farmers </Tablerow>
//     <Tablerow> Deliveries</Tablerow>
//     <Tablerow> milk price</Tablerow>
//   </tr>
// </thead>
// </Hometable>
