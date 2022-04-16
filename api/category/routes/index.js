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
//const upload = multer({storage});
maxSize = 100000000;
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


router.get("/list", CategoryController.list);
router.get("/show", CategoryController.show);
router.post("/create",upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), CategoryController.create);
router.put("/update/:id",upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), CategoryController.update);
router.delete("/remove", CategoryController.remove);

module.exports = router;