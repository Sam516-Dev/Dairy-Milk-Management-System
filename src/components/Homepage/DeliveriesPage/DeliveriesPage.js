import React, { useState, useEffect } from 'react'
import './DeliveriesPage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios'

const DeliveriesPage = () => {
  const [alldeliveries, setalldeliveries] = useState([])
  // const [fullName, setfullName] = useState('')
  // const [quantity, setquantity] = useState(0)
  // const [data, setdate] = useState('')
  // const[farmersID, setfarmersID ] = useState(0)


  const [contacts, setContacts] = useState('')

  const [addFormData, setAddFormData] = useState({
    fullName: '',
    quantity: '',
    date: '',
    farmersID: '',
  })


 

  //this function runs when we try a new delivery in the deliveries list
  //newFormData is the current entered element in the input field through spread (...)
  const handleAddFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }
  

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
    }
 
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
        setalldeliveries(response.data)
        console.log(response.data)
      }
    })
  }, [])
  //this is function is called when the delete button is clicked
  const deleteDelivery = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setalldeliveries(
        alldeliveries.filter((val) => {
          return val.id != id;
        })
      );
      console.log("the record was successifully deleted !!")
      toast.success('record was successifully deleted')
    });
  };

  //here we're rendering the table through maping all the data in the database
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
