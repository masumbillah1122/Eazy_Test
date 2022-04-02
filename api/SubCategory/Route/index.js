const express = require("express");
const router = express.Router();
const SubCategoryController = require("../Controller/SubCategoryController");

router.get("/", SubCategoryController.list);
router.get("/show/:id", SubCategoryController.show);
router.post("/create", SubCategoryController.create);
router.put("/update/:id", SubCategoryController.update);
router.delete("/remove/:id", SubCategoryController.remove);

module.exports = router;