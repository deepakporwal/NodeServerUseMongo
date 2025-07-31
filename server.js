const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'testdb';
const COLLECTION_NAME = 'items';

app.get('/items', async (req, res) => {
    let client;
    try {
        client = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true });
        const db = client.db(DB_NAME);
        const items = await db.collection(COLLECTION_NAME).find({}).toArray();
        res.json(items);
    } catch (err) {
        res.status(500).send('Error connecting to database');
    } finally {
        if (client) client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/items`);
});