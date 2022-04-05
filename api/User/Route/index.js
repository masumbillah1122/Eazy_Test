const express = require("express");
const router = express.Router();
const UserController = require('../Controller/UserController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/users')
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/list', UserController.list);
router.get('/show', UserController.show);
router.post('/create', upload.single('image'), UserController.create);
router.put('/update/:username', UserController.update);
router.delete('/remove', UserController.remove);
router.post('/change-password', UserController.changePassword);
router.put('/block-user', UserController.blockUser);
router.put('/unblock-user', UserController.unblockUser);

module.exports = router;