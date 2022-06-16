import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import contactService from "./services/contacts";


const App = () => {
  const [persons, setPersons] = useState([])
  const [addPerson, setAddPerson] = useState({name:"", number: ""})
  const [searchPerson, setSearching] = useState({name:""})
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.find( x => x.name === addPerson.name) !== undefined){
      if(window.confirm(`${addPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const updatedContact = persons.find((el) => el.name === addPerson.name)
        return contactService
          .upd(updatedContact.id,{...updatedContact, number: addPerson.number})
          .then(response => {
              const indUpd = persons.indexOf(updatedContact)
              const newContacts = [...persons]
              newContacts[indUpd] = response
              setPersons(newContacts)
            }
          )
      }
    }

    const newPerson = {
      name: addPerson.name,
      number: addPerson.number,
      id: persons[persons.length-1].id + 1
    }
    return contactService
      .add(newPerson)
      .then(response => {
        setPersons([...persons].concat(response))
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setMessage("error")
        setTimeout(
          setMessage(null)
          ,5000)
      })
      
    }
    
  const handleInputChange = (event) => {
    setAddPerson({...addPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setAddPerson({...addPerson, number: event.target.value})
  }

  const handleSearchChange = (event) => {
    setSearching({name: event.target.value})
  }

  const handleDelete = (event) => {
    if(window.confirm(`Borrar ${event.target.value}`)){
      const fetchContact = persons.find(el => el.name === event.target.value)
      contactService
        .dlt(fetchContact.id)
        .then(
          response => {
            console.log(fetchContact, persons)
            const newPhonebook = persons.filter(el => el !== fetchContact)
            setPersons(newPhonebook)
          }
        )
        .catch((error) => {
          console.log(10)
          setMessage(`Information of ${event.target.value} has already been removed from server`)
          setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
      }
        }
  

  const filterPersons = searchPerson.name === "" ? persons.map(x => <li key={x.name}>{x.name} {x.number}<button onClick={handleDelete} value={x.name}>delete</button></li>) : persons.filter(el => el.name.toLocaleLowerCase().includes(searchPerson.name.toLocaleLowerCase())).map(x => <li key={x.name}>{x.name} {x.number}<button onClick={handleDelete} value={x.name}>delete</button></li>)
  
  const color = message === `Added ${addPerson.name}` ? "green" : "red";

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification color={color} message={message}/>
      <Filter handleSearchChange={handleSearchChange} searchPerson={searchPerson}/>
      <h2> Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons}/>
    </div>
  )
}
export default App;
