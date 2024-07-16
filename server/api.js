const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db.js');
const tasks = require('./route/taskRoute.js');
const dotenv = require('dotenv');
const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(tasks);

connectToDb((error) => {
    if (!error) {
        app.listen(PORT, (error) => {
            error ? console.log(error) : console.log(`The server is listening on port ${PORT}`);
        });
    }
});
