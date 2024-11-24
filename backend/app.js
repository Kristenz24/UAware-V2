// app.js
const express = require('express');
const dotenv = require('dotenv');
const dbSetup = require('./utils/dbSetup');
const itemRoutes = require('./routes/itemRoutes')
const defaultRoute = require('./routes/defaultRoute')
const path = require('path');
const cors = require('cors')

const PORT = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use('/assets/images', express.static(path.join(__dirname, 'assets', 'images'))); // RESEARCH THIS
app.use('/public', express.static(path.join(__dirname, '..', 'frontend', 'public')))
app.use('/', defaultRoute);
app.use('/api', itemRoutes);


// Cors is responsible for blocking any website from accessing this
app.use(cors())




app.listen(PORT, async () => {
    try {
        await dbSetup.initializeDatabase();
        console.log(`Server is running on http://localhost:${PORT}`)

    } catch (error) {
        console.error(error.message);
    }
})