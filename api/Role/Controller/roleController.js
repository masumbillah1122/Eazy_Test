const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Role = require("../../models/Role");
const Validator = require('validatorjs');
const Product = require("../../models/Product");

const permissions = [
        "all",
        "admin",
        "profile",
        "shipping",
        "report",
        "deactivated",
        "product",
        "brand",
        "category",
        "banner",
        "dashboard",
        "order",
        "addsense",
        "subscriber",
        "customer",
        "rating-review",
        "university",
        "vendor",
        "coupon",
        "campaign",
        "refund",
        "options",
        "role"
    ]

class roleController {
    async list(req, res, next){
        try{
            const role = await Role.find();
            if(!role.length){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, role));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async create(req, res, next){
        try {
            const validate = new Validator(req.body, {
                role: "string",
                permissions: "array"
            });

            const tempPermissions  = [];
            req.body.permissions.map((item)=>{
                if(permissions.indexOf(item)>-1){
                    tempPermissions.push(item);
                }
            });

            if(tempPermissions.length == 0){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY,{}));
            }

            req.body.permissions = tempPermissions;

            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await Role.findOne({role: req.body.type});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Role already exist", exist));
            }
            let create = new Role({
                ...req.body
            });
            create =await create.save();
            if (!create){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Role dose not created successfully", {}));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Role created successfully", create));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async update(req, res, next){
        try{
            const validate = new Validator(req.body, {
                role: "string",
                permissions: "array"
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }

            let role = await Role.findById(req.params.id);
            if(!role){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Role not found", {}));
            }
            role = await Role.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Role update successfully", role));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async remove(req, res, next){
        try{
            const role = await Role.findById(req.params.id);
            if(!role){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Role not  found", {}));
            }
            await role.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Role Remove successfully", role));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new roleController();