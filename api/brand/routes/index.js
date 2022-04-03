const express = require("express");
const router = express.Router();
const BrandController = require('../controller/BrandController')

router.get('/',BrandController.index);
router.get('/show/:id',BrandController.show);
router.post('/create',BrandController.create);
router.put('/update/:id',BrandController.update);
router.delete('/remove/:id',BrandController.remove);

module.exports = router;
