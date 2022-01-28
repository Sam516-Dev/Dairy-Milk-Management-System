import React from 'react'

import './farmerspage.css'
function FarmersRoute() {
  return (
    <div className="app-container">
      <form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>

              <th>Email</th>
              <th>Expenses</th>
            </tr>
          </thead>
          <tbody>
            <td> sam</td>
            <td> 0791274109</td>
            <td> samuelnjoroge3455@gmail.com</td>
            <td> 500</td>
          </tbody>
        </table>
      </form>
      <h2> Add Farmer </h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="enter name..."
          required="required"
        />
        <input
          type="text"
          name="phone number"
          placeholder="enter phone number..."
          required="required"
        />
        <input
          type="email"
          name="email"
          placeholder="enter a email..."
          required="required"
        />
        <input
          type="text"
          name="expenses"
          placeholder="enter expenses"
          required="required"
        />
        <button type="submit"> Add</button>
      </form>
    </div>
  )
}

export default FarmersRoute
