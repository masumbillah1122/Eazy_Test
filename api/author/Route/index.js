const express = require("express");
const router = express.Router();
const authorController = require("../Controller/authorController");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/author')
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});
maxSize = 10000000;
const upload = multer({
    storage : storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        console.log(file.mimetype);
        if (file.mimetype !== 'image/png' && file.mimetype !== "image/jpeg") {
            return cb(null, false, new Error('I don\'t have a clue!'));
        }
        cb(null, true);
    }

});

router.get('/list', authorController.list);
router.get('/show', authorController.show);
router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), authorController.create);
router.put('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), authorController.update);
router.delete('/remove', authorController.remove);

module.exports = router;



