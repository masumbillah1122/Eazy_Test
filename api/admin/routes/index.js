const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");

router.get("/", AdminController.Index);
router.get("/show/:id", AdminController.Show);
router.post("/create", AdminController.AddNewAdmin);
router.put("/update/:id", AdminController.UpdateAccount);
router.post("/password-changes/:id", AdminController.UpdatePassword)


module.exports = router;