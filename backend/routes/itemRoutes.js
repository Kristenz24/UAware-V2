const express = require('express')
const router = express.Router();
const itemController  = require('../controllers/itemController')
const upload = require('../utils//fileUpload');

// GET: Retrieve data (6)
router.get('/items', itemController.getAllItems);

router.get('/items/:id', itemController.findItemById);

router.get('/items/search/:itemName', itemController.findItemByItemName);

router.get('/items/image/:id', itemController.getImageById);

router.get('/items/count/missing', itemController.countMissingItems);

router.get('/items/count/found', itemController.countItemsFound)

router.get('/items/count/category', itemController.getCategoryCount)

// POST: Create data (1)
router.post('/items', upload.single('postItemImage'), itemController.addMissingItem);

// PUT: Update data (1)
router.put('/items/:id', upload.single('editItemImage'), itemController.updateItemDetails);

// DELETE: Remove data (1)
router.delete('/items/:id', itemController.removeMissingItem);

module.exports = router;