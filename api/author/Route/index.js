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
const upload = multer({storage});

router.get('/list', authorController.list);
router.get('/show/', authorController.show);
router.post('/create', upload.single('image'), authorController.create);
router.put('/update/', authorController.update);
router.delete('/remove/', authorController.remove);

module.exports = router;



