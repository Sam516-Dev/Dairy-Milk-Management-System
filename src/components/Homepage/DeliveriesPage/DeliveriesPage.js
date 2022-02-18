import React, { useState, Fragment, setState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './DeliveriesPage.css'
import data from '../DeliveriesPage/DeliveryComponents/mock-data.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  //this function runs when we try a new delivery in the deliveries list
  const handleAddFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }

  //this handles the editted data
  // const handleEditFormChange = (event) => {
  //   event.preventDefault()

  //   const fieldName = event.target.getAttribute('name')
  //   const fieldValue = event.target.value

  //   const newFormData = { ...editFormData }
  //   newFormData[fieldName] = fieldValue

  //   setEditFormData(newFormData)
  // }

  // const handleAddFormSubmit = (event) => {
  //   event.preventDefault()

  //   const newContact = {
  //     id: nanoid(),
  //     fullName: addFormData.fullName,
  //     quantity: addFormData.quantity,
  //     date: addFormData.date,
  //     farmersID: addFormData.farmersID,
  //   }

  //   const newContacts = [...contacts, newContact]
  //   setContacts(newContacts)

  //   console.log('this is the newContact Mr.Sam!')
  //   console.log(newContact.fullName)


//tried to clear the input field
    // setState = ({
    //   fullName: '',
    //   quantity: '',
    //   date: '',
    //   farmersID: ''
    // })
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
  //}

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
  // const handleEditClick = (event, contact) => {
  //   event.preventDefault()
  //   setEditContactId(contact.id)

  //   const formValues = {
  //     fullName: contact.fullName,
  //     quantity: contact.quantity,
  //     date: contact.date,
  //     farmersID: contact.farmersID,
  //   }

  //   setEditFormData(formValues)
  // }

  // const handleCancelClick = () => {
  //   setEditContactId(null)
  // }

  // const handleDeleteClick = (contactId) => {
  //   const newContacts = [...contacts]

  //   const index = contacts.findIndex((contact) => contact.id === contactId)

  //   newContacts.splice(index, 1)

  //   setContacts(newContacts)
  // }

  const handleAdd = () => {
    const newContact = {
      fullName: addFormData.fullName,
      quantity: addFormData.quantity,
      date: addFormData.date,
      farmersID: addFormData.farmersID,
    }
    if (!addFormData.fullName || !addFormData.quantity || !addFormData.date || !addFormData.farmersID) {
      toast.error("please input all the fields");
      console.log("no details entered !!")
    } else {

      const newContacts = [...contacts, newContact]
      setContacts(newContacts)

      // const addedfarmer = {
      //   fullName: newContact.fullName,
      //   quantity: newContact.quantity,
      //   date: newContact.date,
      //   farmersID: newContact.farmersID,
      // }
      toast.success("a new delivery added successifully");


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
  }
  //useEffect hook for rendering all deliveries
  useEffect(() => {
    Axios.get('http://localhost:3001/fetchalldeliveries').then((response) => {
      if (response.data) {
        setdeliveries(response.data)
        console.log(response.data)
      }
    })
  }, [])


  //this is function is called when the delete button is clicked
  const deleteDelivery = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      // setEmployeeList(
      //   employeeList.filter((val) => {
      //     return val.id != id;
      //   })
      // );
      console.log("user deleted successifully !")
      toast.success('record was successifully deleted')
    });
  };


  const renderTable = () => {
    return alldeliveries.map((val) => {
      return (
        
        <tr>
          <td>{val.fullName}</td>
          <td>{val.quantity}</td>
          <td>{new Date(val.date).toLocaleDateString()}</td>
          <td>{val.farmersid}</td>
          <button class='btn-update'> Update </button>
          <button class='btn-delete'  onClick={() => {
            deleteDelivery(val.id);
          }}> Delete </button>
          
        </tr>
      )
    })
  }



  return (
    
    <div className="app-container">
    <ToastContainer position='top-center' />
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
          <tbody>{renderTable()}</tbody>
        </table>
      </form>

      <h2>Add a new delivery </h2>
      <form >
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
