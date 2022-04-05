const express = require("express");
const router = express.Router();
const SubCategoryController = require("../Controller/SubCategoryController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/users')
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get("/", SubCategoryController.list);
router.get("/show/:id", SubCategoryController.show);
router.post("/create", upload.single('image'), SubCategoryController.create);
router.put("/update/:id", SubCategoryController.update);
router.delete("/remove/:id", SubCategoryController.remove);

module.exports = router;