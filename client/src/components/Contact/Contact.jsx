import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    // Clear the form
    setFormData({ name: '', email: '', message: '' });
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
