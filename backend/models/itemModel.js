const db = require('../config/db')

// GET: Retrieve data (7)
const getAllItems = async () => {
    try {
        const [ result ] = await db.pool.query(`SELECT * FROM missing_items`)
        return result

    } catch (error) {
        console.error(`ERROR: Cannot get all missing items`)
    }
};

const findItemById = async (id) => {
    try {
        if(!id) {
            throw new Error('Please specify an id');
        }

        const [ result ] = await db.pool.query(`SELECT * FROM missing_items WHERE id = ?`, [id]);
        return result[0];

    } catch (error) {
        console.error(`ERROR: ${error.message}`)
    }
};

const findItemByItemName = async (item_name) => {
    try {
        if(!item_name) {
            throw new Error('Please specify an item name');
        }

        const itemNameQuery = `%${item_name}%`
        const [ result ] = await db.pool.query('SELECT * FROM missing_items WHERE item_name LIKE ?', [ itemNameQuery ]);
        return result

    } catch (error) {
        console.error(`ERROR ${error.message}`);
    }
};

const getImageById = async (id) => {
    try {
        if(!id) {
            throw new Error('Please specify an id');
        }

        const [ result ] = await db.pool.query(`SELECT item_image_name FROM missing_items WHERE id = ?`, [ id ]);
        return result[0].item_image_name

    } catch (error) {
        console.error(`ERROR ${error.message}`)
    }
};

const countMissingItems = async () => {
    try {
        const  [ result ]  = await db.pool.query(`SELECT COUNT(is_found) as items_missing FROM missing_items WHERE is_found = 0`)
        return result[0];
    } catch (error) {
        console.error('ERROR: Cannot get the number of missing items')
    }
};

const countItemsFound = async () => {
    try {
        const [ result ] = await db.pool.query(`SELECT COUNT(is_found) as items_found FROM missing_items WHERE is_found = 1`)
        return result[0];
    } catch (error) {
        console.error('ERROR: Cannot get the number of items found')
    }
};

const getCategoryCount = async () => {
    try {
        const [ result ] = await db.pool.query(`
            SELECT item_category, COUNT(*) AS category_count
            FROM missing_items
            WHERE is_found = 0
            GROUP BY item_category
        `)
        return result
    } catch (error) {
        
    }
}


// POST: Create data (1)
const addMissingItem = async (fullName, itemName, itemDescription, itemImage, isFound, itemCategory) => {
    try {
        const [ result ] = await db.pool.query(`
            INSERT INTO missing_items (full_name, item_name, item_description, item_image_name, is_found, item_category)
            VALUES (?, ?, ?, ?, ?, ?)`, [fullName, itemName, itemDescription, itemImage, isFound, itemCategory])
        
        console.log('Item added to the database')

    } catch (error) {
        console.error(`ERROR: Cannot add item to the database`);
    }
};

// PUT: Update data (1)
const updateItemDetails = async (fullName, itemName, itemDescription, itemImage, isFound, id) => {
    try {
        if (!fullName || !itemName || !itemDescription || !itemImage || isFound === undefined || !id) {
            throw new Error('All parameters (fullName, itemName, itemDescription, itemImage, isFound, id) must be provided');
        }

        const [ result ] = await db.pool.query(`
            UPDATE missing_items
            SET full_name = ?, item_name = ?, item_description = ?, item_image_name = ?, is_found = ?
            WHERE id = ?`, [ fullName, itemName, itemDescription, itemImage, isFound, id ])

    } catch (error) {
        console.error(`ERROR: ${error.message}`)
    }
};

// DELETE: Remove data (1)
const removeMissingItem = async (id) => {
    try {
        if(!id) {
            throw new Error('Please specify an id');
        }
        const [ result ] = await db.pool.query(`DELETE FROM missing_items WHERE id = ?`, [ id ])

    } catch (error) {
        console.error(`ERROR ${error.message}`)
    }
};

module.exports = {
    getAllItems,
    findItemById,
    findItemByItemName,
    getImageById,
    countMissingItems,
    countItemsFound,
    getCategoryCount,
    addMissingItem,
    updateItemDetails,
    removeMissingItem
};

