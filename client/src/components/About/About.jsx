import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: 40 }}>
      <Typography variant="h2" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
        About
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
              Task Management Application
            </Typography>
            <Typography variant="body1" paragraph style={{ color: '#616161' }}>
              This application helps you manage tasks efficiently. It allows adding, editing, and deleting tasks, setting priorities, and tracking progress. Whether for personal projects or team management, it provides tools for organization and productivity.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20, backgroundColor: '#e8eaf6' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
              Key Features
            </Typography>
            <Typography variant="body1" paragraph style={{ color: '#616161' }}>
              - Add, edit, and delete tasks<br />
              - Set task priorities (Low, Normal, High)<br />
              - Track progress with a progress bar<br />
              - Search tasks by title<br />
              - Mark tasks as complete or incomplete<br />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20, backgroundColor: '#e8eaf6' }}>
            <Typography variant="h5" gutterBottom style={{ color: '#3f51b5', fontWeight: 'bold' }}>
              Technologies Used
            </Typography>
            <Typography variant="body1" paragraph style={{ color: '#616161' }}>
              - React for the frontend<br />
              - Material-UI for UI components<br />
              - CSS Grid for layout<br />
              - JavaScript for interactivity<br />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
