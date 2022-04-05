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
router.get('/show/:id', VendorController.show);
router.post('/create', VendorController.create);
router.put('/update/:id', VendorController.update);
router.delete('/remove/:id', VendorController.remove);
router.post('/change-password', VendorController.changePassword);


module.exports = router;