const itemModel = require('../models/itemModel')
const fs = require('fs');
const path = require('path')


// GET: Retrieve data (6)
const getAllItems = async (req, res) => {
    try {
        const items = await itemModel.getAllItems();
        res.status(200).json({
            result: items
        });
    } catch (error) {
        res.status(500).json({
            error: "Error occurred while getting all items"
        })
    }
}

const findItemById = async (req, res) => {
    try {
        const { id } = req.params
        const item = await itemModel.findItemById(id);

        res.status(200).json({
            result: item
        })

    } catch (error) {
        res.status(500).json({
            error: "Error occurred while getting an item by id"
        })
    }
}

const findItemByItemName = async (req, res) => {
    try {
        const { itemName } = req.params
        const item = await itemModel.findItemByItemName(itemName);

        res.status(200).json({
            result: item
        })
    } catch (error) {
        res.status(500).json({
            error: "Error occured while getting a specific item by item name"
        })
    }
}

const getImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const imageName = await itemModel.getImageById(id);
        

        if (!imageName || imageName === ''){
            return res.status(404).json({ message: 'Image not found'})
        }


        const imagePath = path.join(__dirname, '..', 'uploads', imageName);
        return res.status(200).sendFile(imagePath)

    } catch (error) {
        res.status(500).json({
            error: "Error occurred while getting the image name by id"
        })
    }
}

const countMissingItems = async (req, res) => {
    try {
        const itemsMissingCount = await itemModel.countMissingItems();
        res.status(200).json(itemsMissingCount)
    } catch (error) {
        res.status(500).json({
            error: "Error occurred while getting the count of missing items "
        })
    }
}

const countItemsFound = async (req, res) => {
    try {
        const itemsFoundCount = await itemModel.countItemsFound();
        res.status(200).json(itemsFoundCount)
    } catch (error) {
        res.status(500).json({
            error: "Error occurred while getting the count of items found "
        })
    }
}

const getCategoryCount = async (req, res) => {
    try {
        const categoryCount = await itemModel.getCategoryCount();
        res.status(200).json(categoryCount);
    } catch (error) {
        res.status(500).json({
            error: "Error occurred while getting the count of categories "
        })
    }
}

// POST: Create data (1)
const addMissingItem = async (req, res) => {
    try {
        const { postFullName, postItemName, postItemDescription, postItemCategory} = req.body

        let postItemImage = req.file ? req.file.filename : `${ Date.now() }--placeholder.jpg`;

        if(!req.file) {
            const placeholderPath = path.join(__dirname, '..' ,'assets', 'images', 'placeholder-image.jpg');
            const uploadPath = path.join(__dirname, '..', 'uploads', postItemImage);

            fs.copyFileSync(placeholderPath, uploadPath);
        }

        await itemModel.addMissingItem(postFullName, postItemName, postItemDescription, postItemImage, 0, postItemCategory)

        res.status(200).json({
            message: "Item added successfully"
        })

    } catch (error) {
        res.status(500).json({
            error: "Error occurred while adding an item"
        })
    }
}

// PUT: Update data (1)
const updateItemDetails = async (req, res) => {
    try {
        const { id } = req.params
        let editItemImage;

        if(!req.file) {
            editItemImage = await itemModel.getImageById(id);
        } else {
            editItemImage = req.file.filename

            const imageName = await itemModel.getImageById(id)
            const imagePath = path.join(__dirname, '..','uploads', imageName)
            fs.unlink(imagePath, (err) => {
                if(err){
                    console.error(`Error occurred while deleting ${imageName}`)
                } else {
                    console.log(`${imageName} deleted`)
                }
            })
        }

        const { editFullName, editItemName, editItemDescription, editToggleButton} = req.body;
        const editItemId = id

        let editItemStatus = 0;
        if(editToggleButton === 'on') {
            editItemStatus = 1;
        } else if (editToggleButton === undefined) {
            editItemStatus = 0;
        } else {
            throw new Error ("Unexpected value for the checkbox")
        }

        await itemModel.updateItemDetails(
            editFullName,
            editItemName,
            editItemDescription,
            editItemImage,
            editItemStatus,
            editItemId
        )

        res.status(200).json({
            message: "Item updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            error: "Error occurred while updating an item"
        })
    }
}

// DELETE: Remove data (1)
const removeMissingItem = async(req, res) => {
    try {
        const { id } = req.params;
        const imageName = await itemModel.getImageById(id)

        if (!imageName || imageName === '') {
            return res.status(404).json({
                message: "Image not found"
            })
        }

        const imagePath = path.join(__dirname, '..', 'uploads', imageName)

        await itemModel.removeMissingItem(id);

        fs.unlink(imagePath, (err)=>  {
            if(err){
                console.error(`Error occurred while deleting ${imageName}`)
            } else {
                console.log(`${imageName} deleted`)
            }
        })

        res.status(200).json({
            message: "Item deleted successfully"
        })


    } catch (error) {
        res.status(500).json({
            error: "Error occurred while deleting an item"
        })
    }
}

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