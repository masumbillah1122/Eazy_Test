const SubCategory = require("../../models/SubCategory");
const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require("validatorjs");

class SubCategoryController{
    async list(req, res, next){
        try {
            const Category = await SubCategory.find();
            if(!Category.length){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure(ERROR_LIST.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, Category));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async show(req, res, next){
        try{
            const exist = await SubCategory.findOne({
                slug: req.query.slug,
            });
            if(!exist){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure("SubCategory not found", {}));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, exist));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async create(req, res, next){
        try {
            //req.files
            const validate = new Validator(req.body, {
                name: "string",
                bnName: "string",
                slug: "string",
                image: "string",
                banner: "string",
                //leafCategories array from another object
                //products array from another object
                isActive: "boolean",
                indexId: "numeric",
                //discount object
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await SubCategory.findOne({name: req.body.name, bnName: req.body.bnName});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("SubCategory already exist", exist));
            }
            let create = new SubCategory({
                ...req.body
            });
            create = await create.save();
            if(create){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("SubCategory created successfully", create));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure("SubCategory could not be created",{}));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async update(req, res, next){
        try{
            const validate = new Validator(req.body, {
                name: "string",
                bnName: "string",
                slug: "string",
                image: "string",
                banner: "string",
                //leafCategories array from another object
                //products array from another object
                isActive: "boolean",
                indexId: "numeric",
                //discount object
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            let subCategory = await SubCategory.findById(req.params.id);
            if(!subCategory){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return  res.status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Subcategory update successfully", subCategory));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async remove(req, res, next){
        try {
            const subCategory = await SubCategory.findById(req.params.id);
            if(!subCategory){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure("Sub-Category is not found with this id.", {}));
            }
            await subCategory.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, subCategory));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new SubCategoryController();