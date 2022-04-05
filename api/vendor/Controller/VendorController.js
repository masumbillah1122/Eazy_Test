const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const Vendor = require("../../models/Vendor");
const fs = require("fs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");

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
            // const { id } = req.params;
            const vendor = await Vendor.findById(req.params.id)
                // .populate('')
                // .exec();
            if(vendor){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, vendor));
            }
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, err));
        }
    }

    async create(req, res, next){
        try {
            const validator = new Validator(req.body, {
                bnName: "string|required",
                slug: "string|required",
                tradeLicence: "string|required",
                pickupLocation: "string|required",
                paymentSystem: "string",
                payPeriod: "string",
                keyAccountManager: "string|required",
                secondaryKeyAccountManager: "string|required",
                role: "string",
            });
            
            // const validatorBank = new Validator(req.body, {

            // })


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
            // const { id } = req.params;
            let vendor = await Vendor.findById(req.params.id);
            if(!vendor){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT, {}));
            }
            vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, vendor));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async remove(req, res, next){
        try{
            const vendor = await Vendor.findOne({
                id: req.query.id
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
            const validate = new Validator(req.body, {
                email: "string",
                oldPassword: "string",
                newPassword: "string",
                confirmPassword: "string"
            });
            if(validate.fails()){
                return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            if(req.body.newPassword != req.body.confirmPassword){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure("new password and confirm password dose not match", {}))
            }

            let exist = await Vendor.findOne({email: req.body.email});
            if(!exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Vendor not exist", {}));
            }
            const checkPass = await bcrypt.compare(req.body.oldPassword, exist.password);
            if(!checkPass){
                return res
                    .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNAUTHORIZED, {}));
            }

            exist.password = await bcrypt.hash(req.body.newPassword, 12);
            await exist.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Password Changed successfully", exist));

        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new VendorController();