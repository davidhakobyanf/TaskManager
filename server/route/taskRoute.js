const express = require('express');
const Task = require('../models/tasks.js');
const taskRoute = express.Router();
const task = new Task();

taskRoute
    .route('/')
    .post(task.createTask)
    .put(task.updateTask)
    .get(task.getAllTasks)

module.exports = taskRoute;
