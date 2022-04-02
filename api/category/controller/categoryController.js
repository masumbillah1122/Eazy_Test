const Category = require("../../models/Category");
const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require("validatorjs");


class category {
    async list(req, res, next){
        try {
            const existCategorys = await Category.find();
            if(!existCategorys.length){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT, {}));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, existCategorys));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async show(req, res, next){
        try{
            const validate = new Validator(req.query, {
                slug: req.query.slug,
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await Category.findOne({
                slug: req.query.slug,
            });
            if(!exist){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure("Category not found", {}));
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
        try{
            const validate = new Validator(req.body, {
                name: "string",
                bnName: "string",
                slug: "string"
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await Category.findOne({name: req.body.name, bnName: req.body.bnName, slug: req.body.slug});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.success("Category already exist", exist));
            }
            // if(req.file){
            //     req.body.image = req.file.path;
            //     req.body.banner = req.file.path;
            // }
            let create = new Category({
                ...req.body
            });
            create = await create.save();
            if(create){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Category created successfully", create));
            }
            return res
                .status(ERROR_LIST.HTTP_ACCEPTED)
                .send(ResponseStatus.failure("Category could not be created",{}));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async update(req, res, next){
        try{
            let existCategory = await Category.findById(req.params.id);
            if(!existCategory){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            existCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return  res.status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, existCategory));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async remove(req, res, next){
        try {
            const existCategory = await Category.findById(req.params.id);
            if(!existCategory){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure("Sub-Category is not found with this id.", {}));
            }
            await existCategory.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Category remove successfully", existCategory));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

}

module.exports = new category();