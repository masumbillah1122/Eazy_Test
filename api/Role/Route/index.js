const express = require("express");
const router = express.Router();
const roleController = require("../Controller/roleController")

router.get("/", roleController.list);
router.post("/create", roleController.create);
router.put("/update/:id",roleController.update);
router.delete("/remove/:id", roleController.remove);

module.exports = router;