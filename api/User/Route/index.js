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

router.get('/list', UserController.list);
router.get('/show', UserController.show);
router.post('/create', upload.single('image'), UserController.create);
router.put('/update/:id',upload.single('image'), UserController.update);
router.delete('/remove', UserController.remove);
router.post('/change-password', UserController.changePassword);
router.put('/block-user', UserController.blockUser);
router.put('/unblock-user', UserController.unblockUser);

module.exports = router;