const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const vendor = require("../../models/Vendor");
const fs = require("fs");

class VendorController{
    async list(req, res, next){
        try {
            const vendors = await vendor.find();
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
            const exist = await Vendor.findOne({phone: req.body.phone});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_ACCEPTED, {msg: "vendor already exist with this slug"}));
            }
            const newVendor = new vendor({
                ...req.body
            });
            await newVendor.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, newUser));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    //user -----> website <------- vendor

}