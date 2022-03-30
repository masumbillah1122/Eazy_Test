const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/product');
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', ProductController.index);
router.get('/show/:id', ProductController.show);
router.post('/create',upload.single('coverImage'), ProductController.create);
router.put('/update/:id', ProductController.update);
router.delete('/remove/:id', ProductController.remove);

module.exports = router;