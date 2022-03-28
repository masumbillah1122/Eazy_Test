const express = require("express");
const router = express.Router();
const VendorController = require('../Controller/VendorController');

// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, next) => {
//         next(null, 'public/upload/vendors')
//     },
//     filename: (req, res, next) => {
//         next(null, 'image_'+Date.now()+path.extname(file.originalname));
//     }
// })
// const upload = multer({storage});

router.get('/list', VendorController.list);
router.get('/show/:slug', VendorController.show);
router.post('/create', VendorController.create);
router.put('/update/:slug', VendorController.update);
router.delete('/remove/:slug', VendorController.remove);
router.post('/change-password/:slug', VendorController.changePassword);


module.exports = router;