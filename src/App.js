import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './Components/ContactList';
import ContactForm from './Components/ContactForm';
import SearchBar from './Components/SearchBar';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  

  // const handleAddContact = async (newContact) => {
  //   try {
  //     await axios.post('http://localhost:3001/api/contacts', newContact);
  //     fetchContacts();
  //   } catch (error) {
  //     console.error('Error adding contact:', error);
  //   }
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

const handleSearchButton = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/contacts?search=${searchTerm}`);
    const filteredContacts = response.data;
    console.log(filteredContacts);
    setContacts(filteredContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
};

  
  
  

  return (
    <div className="App">
      <h1>Contact Management App</h1>
      {/* <ContactForm onAddContact={handleAddContact} /> */}
      <SearchBar onSearchChange={handleSearchChange} />
      <button onClick={handleSearchButton}>Search</button>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
