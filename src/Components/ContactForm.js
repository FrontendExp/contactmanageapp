import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = ({ searchTerm }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.phoneNumber} - {contact.email}
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
