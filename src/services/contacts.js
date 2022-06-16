import axios from "axios";

const DB = "/api/persons"

const getContacts = () => {
    const request = axios.get(DB)
    return request.then(response => response.data)
}

const dltContact = (id) => {
    const request = axios.delete(`${DB}/${id}`)
    
    return request.then((response) => {
        console.log(response.data)
        return response.data
    })
}

const updContact = (id, contact) => {
    const request = axios.put(`${DB}/${id}`, contact)
    return request.then(response => response.data)
}

const addContact = contact => {
    console.log(contact)
    const request = axios.post(DB, contact)
    console.log(request)
    return request.then(response => response.data)
}

const contactService = {
    getAll: getContacts,
    dlt: dltContact,
    upd: updContact,
    add: addContact
}

export default contactService