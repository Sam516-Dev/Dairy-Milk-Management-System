import React, { useState, Fragment, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './DeliveriesPage.css'
import data from '../DeliveriesPage/DeliveryComponents/mock-data.json'

import ReadOnlyRow from './DeliveryComponents/ReadOnlyRaw'
import EditableRow from './DeliveryComponents/EditableRow'
import Axios from 'axios'

const DeliveriesPage = () => {
  const [alldeliveries, setdeliveries] = useState([])

  const [contacts, setContacts] = useState(data)
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    quantity: '',
    date: '',
    farmersID: '',
  })

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    quantity: '',
    date: '',
    farmersID: '',
  })

  const [editContactId, setEditContactId] = useState(null)

  const handleAddFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData)
  }

  //this handles the editted data
  const handleEditFormChange = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault()

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      quantity: addFormData.quantity,
      date: addFormData.date,
      farmersID: addFormData.farmersID,
    }

    const newContacts = [...contacts, newContact]
    setContacts(newContacts)

    console.log('this is the newContact Mr.Sam!')
    console.log(newContact.fullName)

    // Axios.post('http://localhost:3001/adddelivery', {
    //   contacts: contacts,
    // }).then((response) => {
    //   console.log(response)
    //   console.log('sam here we go data testing ....')
    // })

    // here
    // setContacts = useState({
    //   fullName: '',
    //   quantity: '',
    //   date: '',
    //   farmersID: '',
    // })
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      quantity: editFormData.quantity,
      date: editFormData.date,
      farmersID: editFormData.farmersID,
    }

    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === editContactId)

    newContacts[index] = editedContact

    setContacts(newContacts)
    setEditContactId(null)
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault()
    setEditContactId(contact.id)

    const formValues = {
      fullName: contact.fullName,
      quantity: contact.quantity,
      date: contact.date,
      farmersID: contact.farmersID,
    }

    setEditFormData(formValues)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === contactId)

    newContacts.splice(index, 1)

    setContacts(newContacts)
  }

  const handleAdd = () => {
    const newContact = {
      fullName: addFormData.fullName,
      quantity: addFormData.quantity,
      date: addFormData.date,
      farmersID: addFormData.farmersID,
    }

    const newContacts = [...contacts, newContact]
    setContacts(newContacts)

    const addedfarmer = {
      fullName: newContact.fullName,
      quantity: newContact.quantity,
      date: newContact.date,
      farmersID: newContact.farmersID,
    }

    console.log('Hey boy, lala sasa ')

    Axios.post('http://localhost:3001/adddelivery', {
      newContact: newContact,
      fullName: newContact.fullName,
      quantity: newContact.quantity,
      date: newContact.date,
      farmersID: newContact.farmersID,
    }).then((response) => {
      console.log(response)
    })
  }

  //useEffect hook for rendering all deliveries
  useEffect(() => {
    Axios.get('http://localhost:3001/fetchalldeliveries').then((response) => {
      if (response.data) {
        setdeliveries(response.data)
      }
    })
  }, [])

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>

              <th>Quantity (kg) </th>
              <th>Date</th>
              <th>farmersID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alldeliveries.map((val) => {
        
              return (<h1> {val.fullName}  </h1>)
              
         
            })}
          </tbody>
        </table>
      </form>

      <h2>Add a new delivery </h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="quantity"
          required="required"
          placeholder="Enter quantity..."
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="date"
          required="required"
          placeholder="Enter the date..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="farmersID"
          required="required"
          placeholder="famers no..."
          onChange={handleAddFormChange}
        />
        <button onClick={handleAdd} type="submit">
          Add
        </button>
      </form>
    </div>
  )
}

export default DeliveriesPage

//mock JSON data here
/*
{
    "id": 2,
    "fullName": "Jessica warren",
    "quantity": "4",
    "date": "28/01/2022",
    "farmersID": "45"
  },
  {
    "id": 3,
    "fullName": "Tony Frank",
    "quantity": "11 ",
    "date": "28/01/2022",
    "farmersID": "5"
  },
  {
    "id": 4,
    "fullName": "Jeremy Clark",
    "quantity": "33",
    "date": "28/01/2022",
    "farmersID": "3"
  },
  {
    "id": 5,
    "fullName": "Raymond Edwards",
    "quantity": "9",
    "date": "28/01/2022",
    "farmersID": "44"
  }


*/

//return this in the tbody section -- quite important
// {contacts.map((contact) => (
//   <Fragment>
//     {editContactId === contact.id ? (
//       <EditableRow
//         editFormData={editFormData}
//         handleEditFormChange={handleEditFormChange}
//         handleCancelClick={handleCancelClick}
//       />
//     ) : (
//       <ReadOnlyRow
//         contact={contact}
//         handleEditClick={handleEditClick}
//         handleDeleteClick={handleDeleteClick}
//       />
//     )}
//   </Fragment>
// ))}
