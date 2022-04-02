const express = require("express");
const router = express.Router();
const UserRoute = require("./User/Route/index");
const VendorRoute = require("./vendor/Route/index");
const BrandRoute = require("./brand/routes/index");
const ProductRoute = require("./product/Route/index");
const LeafCategoryRoute = require("./leafCategory/Route/index");
const RoleRoute = require("./Role/Route/index");

router.use('/users', UserRoute);
router.use('/vendor', VendorRoute);
router.use('/brand', BrandRoute);
router.use('/product', ProductRoute);
router.use('/leafCategory', LeafCategoryRoute);
router.use("/role", RoleRoute);

module.exports = router;
