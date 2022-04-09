const express = require("express");
const router = express.Router();
const BrandController = require('../controller/BrandController');
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/users')
    },
    filename: (req, file, next) => {
        next(null, 'featuredImage_'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/',BrandController.index);
router.get('/show/:id',BrandController.show);
router.post('/create', upload.fields([
    {
        name: 'icon', maxCount: 1}, 
        {
            name: 'featuredImage', maxCount: 1}
        ]),  BrandController.create);
router.put('/update/:id',BrandController.update);
router.delete('/remove/:id',BrandController.remove);

module.exports = router;


