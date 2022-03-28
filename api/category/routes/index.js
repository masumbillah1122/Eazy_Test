const CategoryController = require("../controller/categoryController");
const express = require("express");
const SubCategoryController = require("../../SubCategory/Controller/SubCategoryController");
const router = express.Router();

router.get("/", CategoryController.list);
router.get("/show/:id", CategoryController.show);
router.post("/create", CategoryController.create);
router.put("/update/:id", CategoryController.update);
router.delete("/remove/:id", CategoryController.remove);

module.exports = router;