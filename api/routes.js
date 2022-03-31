const express = require("express");
const router = express.Router();

const AdminRoute = require("./admin/routes/index");
const UserRoute = require("./User/Route/index");
const BrandRoute = require("./brand/routes/index");
const SubCategoryRoute = require("./SubCategory/Route/index");
const CategoryRoute =require("./category/routes/index")
const LeafCategoryRoute = require("./leafCategory/Route/index");
const ProductRoute = require("./product/Route/index");
const authorRouter = require("./author/Route/index");
const RoleRouter = require("./Role/Route/index");

router.use('/admin', AdminRoute);
router.use('/users', UserRoute);
router.use('/brand', BrandRoute);
router.use('/subCategory', SubCategoryRoute);
router.use('/Category', CategoryRoute);
router.use('/leafCategory', LeafCategoryRoute);
router.use('/product', ProductRoute);
router.use('/author', authorRouter);
router.use('/role', RoleRouter);

module.exports = router;
