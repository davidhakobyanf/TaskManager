const express = require('express');
const Contact = require('../models/contacts.js');
const contactRoute = express.Router();
const contact = new Contact();

contactRoute
    .route('/contact')
    .post(contact.createContact)

module.exports = contactRoute;
