import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('a new contact name...')
  const [ newNum, setNewNum ] = useState('a new contact number...')
  const [ searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(res => {
      console.log("promise fulfilled")
      setPersons(res.data)
    })
  }, [])

  const addContact = event => {
    event.preventDefault()
    const contactObject = { name: newName, number: newNum };

    if (!newName || !newNum){
      alert("Please fill the fields")
      return
    } 

    const repeatPerson = persons.find(contact => contact.name.toLowerCase() === newName.toLowerCase())
    const repeatNum = persons.find(contact => contact.number === contact.number)

    if(repeatPerson){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(contactObject))
    setNewName('')
    setNewNum('')
    
  }

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumChange = event => setNewNum(event.target.value)

  const handleFilter = event => setSearchTerm(event.target.value.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Form onSubmit={addContact} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchTerm={searchTerm}/>
    </div>
  )
}

export default App