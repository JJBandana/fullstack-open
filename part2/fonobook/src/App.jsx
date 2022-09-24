import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import service from './services/contacts'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('a new contact name...')
  const [ newNum, setNewNum ] = useState('a new contact number...')
  const [ searchTerm, setSearchTerm] = useState('')
  const [ msg, setMsg ] = useState('You are doing great!')
  const [ errMsg, setErrMsg] = useState(null)

  useEffect(()=>{
    service.getAll()
    .then(init => setPersons(init))
  }, [])

  const addContact = event => {
    event.preventDefault()
    const contactObject = { name: newName, number: newNum };
    if (!newName || !newNum){
      alert("Please fill the fields")
      return
    } 

    const repeatPerson = persons.find(contact => contact.name.toLowerCase() === newName.toLowerCase())

    if(repeatPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        service.update(repeatPerson.id, contactObject)
        .then(res =>{
          setMsg(`Updated ${contactObject.name}`)
          setTimeout(()=>setMsg(null), 5000)
          contactObject.id = res.id
          setPersons(persons.map(p => p.name !== contactObject.name? p : contactObject))
        })
        .catch((error)=>{
          console.log(error)
          setErrMsg(`Information from ${contactObject.name} has already been removed from server`)
          setTimeout(()=>setErrMsg(null), 5000)
        })
      }
    } else {
    service.create(contactObject)
    .then(returned => {
      setMsg(`Added ${contactObject.name}`)
      setTimeout(()=>setMsg(null), 5000)
      setPersons(persons.concat(returned))
      setNewName('')
      setNewNum('')
    })
    .catch(error => {
      console.log(error.response.data)
      setErrMsg(error.response.data.error)
      setTimeout(()=>setErrMsg(null), 5000)
    })
  }
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumChange = event => setNewNum(event.target.value)

  const handleFilter = event => setSearchTerm(event.target.value.toLowerCase())

  const deletePerson = event => {
    if(window.confirm(`delete ${event.target.name}?`)){
      service.remove(event.target.id).then(() => {    
        setPersons(persons.filter(per => per.id.toString() !== event.target.id))
      })
      .catch(error =>{
        console.log(error)
        setErrMsg('Contact was already removed from phonebook')
        setTimeout(()=> setMsg(null), 5000)
      }
      )
    }
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={msg} />
      <Error message={errMsg} />
      <Filter handleFilter={handleFilter} />
      <Form onSubmit={addContact} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <Persons persons={persons} searchTerm={searchTerm} deletePerson={deletePerson} />
    </div>
  )
}

export default App