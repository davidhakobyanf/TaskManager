const { connectToDb, getDb } = require("../db.js");

let db;
connectToDb((error) => {
    if (!error) {
        db = getDb();
    }
});
module.exports = class Contact {
    async createContact(req, res) {
        const { name, email, message } = req.body;
        const contact = { name, email, message };
        try {
            const existingContact = await db.collection('Contacts').findOne({ email });
            if (existingContact) {
                return res.status(400).json({ error: 'Contact with this email already exists' });
            }
            await db.collection('Contacts').insertOne(contact);
            res.status(201).json({ message: 'Contact created successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error creating task' });
        }
    }
}