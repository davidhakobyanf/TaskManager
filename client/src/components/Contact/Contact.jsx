import React, { useEffect, useReducer, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { message } from 'antd';
import DataApi from '../../api/api';

const initialState = {
  contacts: [],
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    default:
      return state;
  }
};

const Contact = () => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const fetchContacts = async () => {
    try {
      const { data } = await DataApi.fetchContacts();
      dispatch({ type: 'SET_CONTACTS', payload: data });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      errorMessage('An error occurred while fetching contacts.');
    }
  };

  const successMessage = (content) => {
    message.success(content);
  };

  const errorMessage = (content) => {
    message.error(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const newContact = { name, email, message };

    try {
      const existingContact = state.contacts.find((contact) => contact.email === email);
      if (existingContact) {
        errorMessage('There is already an account with this email.');
        return;
      }

      const res = await DataApi.addContact(newContact);
      if (res && res.status === 201) {
        dispatch({ type: 'ADD_CONTACT', payload: newContact });
        successMessage('Contact added successfully!');
      } else {
        errorMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error(error);
      errorMessage('An error occurred. Please try again.');
    } finally {
      setFormData({ name: '', email: '', message: '' });
    }
  };


  return (
      <Container maxWidth="md" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
          Contact Us
        </Typography>
        <Paper elevation={3} style={{ padding: 40, width: '100%', borderRadius: 12 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom align="center" style={{ color: '#3f51b5' }}>
                  Get in Touch
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#3f51b5' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#3f51b5' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ style: { color: '#3f51b5' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Button type="submit" variant="contained" color="primary" style={{ borderRadius: 8 }}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
  );
};

export default Contact;
