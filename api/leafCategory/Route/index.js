const express = require("express");
const router = express.Router();
const LeafCategoryController = require("../controller/LeafCategoryController");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/leafCategories')
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', LeafCategoryController.index);
router.get('/show/:id', LeafCategoryController.show);
router.post('/create', upload.fields([
    {
        name: 'image', maxCount: 1}, 
        {
            name: 'banner', maxCount: 1}
        ]), 
        LeafCategoryController.create);
router.put('/update/:id', LeafCategoryController.update);
router.delete('/remove/:id', LeafCategoryController.remove);

module.exports = router;