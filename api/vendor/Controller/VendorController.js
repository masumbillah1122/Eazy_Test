const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const Vendor = require("../../models/Vendor");
const fs = require("fs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const isMongooseId = require("mongoose");

class VendorController{
    async list(req, res, next){
        try {
            const vendors = await Vendor.find();
            if(!vendors.length){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT))
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, vendors));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async show(req, res, next){
        try {
            const validate = new Validator(req.query, {
                slug: "string | required",
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const Vendor = await vendor.findOne({
                slug: req.query.slug,
            });
            if(Vendor){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Vendor found", Vendor));
            }
            return res
                .status(ERROR_LIST.HTTP_ACCEPTED)
                .send(ResponseStatus.failure("Vendor not found", {}))
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, err));
        }
    }

    async create(req, res, next){
        try {
            const validator = new Validator(req.body, {
                bnName: "string | required",
                slug: "string | required",
                tradeLicence: "string | required",
                pickupLocation: "string | required",
                paymentSystem: "string",
                payPeriod: "string",
                keyAccountManager: "string | required",
                secondaryKeyAccountManager: "string | required",
                role: "string",
            });
            /*
            const validatorBank = new Validator(req.body, {

            })

             */

            if(validator.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY, validator.errors.errors));
            }
            const exist = await Vendor.findOne({slug: req.body.slug});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("vendor already exist with this slug", exist));
            }
            const newVendor = new Vendor({
                ...req.body
            });
            
            await newVendor.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, newVendor));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async update(req, res, next){
        try {
            //
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async remove(req, res, next){
        try{
            const vendor = await Vendor.findOne({
                slug: req.query.slug
            });
            if(!vendor){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("Vendor not found.", 
                    {}));
            }
            // if(fs.existsSync(vendor.image)){
            //     fs.unlinkSync(vendor.image);
            // }
            vendor.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Delete sucessfully.", {}))
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, 
                    err));
        }
    }
    async changePassword(req, res, next){
        try {
            const { slug, oldPassword, newPassword, confirmPassword} = req.body;
            const validate = new Validator(req.body, {
                oldPassword: "string",
                newPassword: "string",
                confirmPassword: "string"
            });
            if(validate.fails()){
                return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send()
            }
            if(newPassword != confirmPassword){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, {}))
            }
            const exist = await Vendor.findOne({
                slug: slug,
            });
            const checkPass = await bcrypt.compare(password, exist.pass);
            if(!checkPass){
                return res
                    .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNAUTHORIZED, {}));
            }
            exist.p

        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new VendorController();