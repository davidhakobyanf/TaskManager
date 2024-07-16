import React from 'react';
import { Container, Typography, Paper, Grid, IconButton } from '@mui/material';
import { CheckCircle, Assignment, ContactMail } from '@mui/icons-material';

const Home = () => {
  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Paper elevation={3} style={{ padding: 30, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h3" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
          Welcome to Task Manager
        </Typography>
        <Typography variant="h5" gutterBottom style={{ color: '#757575' }}>
          A simple and efficient way to manage your tasks.
        </Typography>
      </Paper>
      
      <Grid container spacing={3} style={{ marginTop: 40, justifyContent: 'center' }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: 'center', backgroundColor: '#e8eaf6' }}>
            <IconButton style={{ color: '#3f51b5' }}>
              <Assignment style={{ fontSize: 40 }} />
            </IconButton>
            <Typography variant="h6" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
              Manage Your Tasks
            </Typography>
            <Typography variant="body2" style={{ color: '#757575' }}>
              Easily add, update, and delete tasks. Track your progress with visual indicators.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: 'center', backgroundColor: '#e8eaf6' }}>
            <IconButton style={{ color: '#3f51b5' }}>
              <CheckCircle style={{ fontSize: 40 }} />
            </IconButton>
            <Typography variant="h6" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
              Stay Organized
            </Typography>
            <Typography variant="body2" style={{ color: '#757575' }}>
              Prioritize your tasks to focus on what matters most. Stay on top of your workload.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: 'center', backgroundColor: '#e8eaf6' }}>
            <IconButton style={{ color: '#3f51b5' }}>
              <ContactMail style={{ fontSize: 40 }} />
            </IconButton>
            <Typography variant="h6" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
              Connect with Us
            </Typography>
            <Typography variant="body2" style={{ color: '#757575' }}>
              Have questions or feedback? Reach out through our Contact page. We're here to help!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
