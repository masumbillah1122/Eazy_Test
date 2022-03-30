const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Admin = require("../../models/Admin");
const Validator = require("validatorjs");
const mongoose = require("mongoose");

class AdminController{
    async Index(req, res, next){
        try{
            const admins = await Admin.find()
                // .populate()
                // .exec();
            if(!admins.length){
                return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, admins));
        }catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, 
                    err));
        }
    }
    async Show(req, res, next){
        try{
            const admin = await Admin.findById({_id: mongoose.Types.ObjectId(req.params.id)}) 
                // .populate()
                // .exec();
            if(admin){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, admin));
            }
        }catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, 
                    err));
        }
    }
    async AddNewAdmin(req, res, next){
        try{
            
            const validate = new Validator(req.body, {
                //userId: "required|min:8|max:200",
                //role: "min:10|max:1000",
                status: "min:2|max:100"
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors. errors));
            }
            const exist = await Admin.findOne({
                //userId: req.body.userId,
                //role: req.body.role,
                status: req.body.status
            });
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Admin already exist"));
            }
            let create = new Admin({
                ...req.body
            });
            create = await create.save();
            if(create){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Admin created successfully", create));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure("Admin could not be created", {}));
        }catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, 
                    err));
        }
    }
    async UpdateAccount(req, res, next){
        try{
            let admin = await Admin.findById(req.params.id);
            if(!admin){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, admin));
        }catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, 
                    err));
        }
    }
    async UpdatePassword(req, res, next){
        try{
            // write for coding...
        }catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, 
                    err));
        }
    }
}

module.exports = new AdminController();