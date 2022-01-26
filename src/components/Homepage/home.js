import React from 'react'

import {
  Title,
  Hometitle,
  Hometable,
  Tablerow,
} from '../styled-componets/styles'

function Homepage() {
  return (
    <div>
      <Hometable>
        <thead>
          <tr>
            <Tablerow> home </Tablerow>
            <Tablerow>farmers </Tablerow>
            <Tablerow> Deliveries</Tablerow>
            <Tablerow> milk price</Tablerow>
          </tr>
        </thead>
      </Hometable>

      <img
        src="/homeimages/dairy cows.jpg"
        alt="cow image"
        width="100%"
        height="600px"
      />
    </div>
  )
}
export default Homepage
