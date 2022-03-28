const express = require("express");
const router = express.Router();
const LeafCategoryController = require("../controller/LeafCategoryController");

router.get('/', LeafCategoryController.index);
router.get('/show/:id', LeafCategoryController.show);
router.post('/create', LeafCategoryController.create);
router.put('/update/:id', LeafCategoryController.update);
router.delete('/remove/:id', LeafCategoryController.remove);

module.exports = router;