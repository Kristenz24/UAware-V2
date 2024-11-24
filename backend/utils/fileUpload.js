const fs = require('fs');
const multer = require('multer');

const uploadsDirectory = 'uploads/'
if (!fs.existsSync(uploadsDirectory)) { 
    fs.mkdirSync(uploadsDirectory, { recursive: true }) 
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,  'uploads/')
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "--" + file.originalname); // 
    }
})

const upload = multer({ storage })

module.exports = upload;
