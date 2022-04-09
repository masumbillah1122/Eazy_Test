const CategoryController = require("../controller/categoryController");
const express = require("express");
const router = express.Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/category')
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get("/", CategoryController.list);
router.get("/show/:id", CategoryController.show);
router.post("/create", upload.fields([
    {
        name: 'image', maxCount: 1}, 
        {
            name: 'banner', maxCount: 1}
        ]),  CategoryController.create);
router.put("/update/:id", CategoryController.update);
router.delete("/remove/:id", CategoryController.remove);

module.exports = router;