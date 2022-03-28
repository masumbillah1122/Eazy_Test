const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");

router.get('/', ProductController.index);
router.get('/show/:id', ProductController.show);
router.post('/create', ProductController.create);
router.put('/update/:id', ProductController.update);
router.delete('/remove/:id', ProductController.remove);

module.exports = router;