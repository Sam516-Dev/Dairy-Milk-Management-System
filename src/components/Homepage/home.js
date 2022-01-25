import React from 'react'

import { Title, Hometitle, Hometable } from '../styled-componets/styles'

function Homepage() {
  return (
    <div>
      <Hometitle> hello </Hometitle>

      <Hometable>
        <thead>
          <tr>
            <th> home </th>
            <th>farmers </th>
            <th> Deliveries</th>
            <th> milk price</th>
          </tr>
        </thead>
      </Hometable>
    </div>
  )
}
export default Homepage
