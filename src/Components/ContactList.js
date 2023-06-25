import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = ({ searchTerm }) => {
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
  
    const filteredContacts = contacts.filter((contact) => {
      const nameMatch = contact.name.toLowerCase().includes(searchTerm?.toLowerCase());
      const idMatch = contact.id.toString().includes(searchTerm?.toString());
      return nameMatch || idMatch;
    });
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phoneNumber} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
