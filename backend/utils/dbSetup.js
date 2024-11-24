const db = require('../config/db')
const dotenv = require('dotenv');

dotenv.config();

const createDatabase = async () => {
    try {
        await db.tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`);
        console.log(`The database has been created`);

    } catch (error) {
        console.error(error.message);

    } finally {
        await db.tempConnection.end();
    }
}

const createTable = async () => {
    try {
        await db.pool.query(`USE ${process.env.MYSQL_DATABASE}`);
        console.log(`Successfully connected to the database`);

        await db.pool.query(`
            CREATE TABLE IF NOT EXISTS missing_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                full_name VARCHAR(100) NOT NULL,
                item_name VARCHAR(100) NOT NULL,
                item_description VARCHAR(200) NOT NULL,
                item_image_name VARCHAR(200) NOT NULL,
                is_found BOOLEAN NOT NULL,
                item_category VARCHAR(100) NOT NULL,
                created TIMESTAMP NOT NULL DEFAULT NOW()
            )
        `);
        console.log(`The table has been created`);

    } catch (error) {
        console.error(error.message);
    }
}

const initializeDatabase = async () => {
    try {
        await createDatabase();
        await createTable();
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = { initializeDatabase };