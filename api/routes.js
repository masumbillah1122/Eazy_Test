const express = require("express");
const router = express.Router();
const UserRoute = require("./User/Route/index");
const BrandRoute = require("./brand/routes/index");
const SubCategoryRoute = require("./SubCategory/Route/index");
const CategoryRoute =require("./category/routes/index")
const LeafCategoryRoute = require("./leafCategory/Route/index");
const ProductRoute = require("./product/Route/index");


router.use('/users', UserRoute);
router.use('/brand', BrandRoute);
router.use('/subCategory', SubCategoryRoute);
router.use('/Category', CategoryRoute);
router.use('/leafCategory', LeafCategoryRoute);
router.use('/product', ProductRoute);


module.exports = router;
