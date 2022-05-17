const Category = require("../../models/Category");
const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require("validatorjs");
const fs = require("fs");


class categoryController {
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
                slug: "string"
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
                    .status(ERROR_LIST.HTTP_ACCEPTED)
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
                name: "string|required",
                bnName: "string",
                slug: "string|required"
            });
            if(validate.fails()){
                if(req.files){
                    if(req.files["image"]){
                        fs.unlinkSync(req.files["image"][0].path);
                    }
                    if(req.files["banner"]){
                        fs.unlinkSync(req.files["banner"][0].path);
                    }
                }
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await Category.findOne({ $or: [{slug: req.body.slug}, {name: req.body.name}]});
            if(exist){
                if(req.files){
                    if(req.files["image"]){
                        fs.unlinkSync(req.files["image"][0].path);
                    }
                    if(req.files["banner"]){
                        fs.unlinkSync(req.files["banner"][0].path);
                    }
                }
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.success("Category already exist", exist));
            }
            if(req.files){
                if(req.files["image"]){
                    req.body.image = req.files["image"][0].path;
                }
                if(req.files["banner"]){
                    req.body.banner = req.files["banner"][0].path;
                }
            }
            let create = new Category({
                ...req.body
            });
            create = await create.save();
            if(create){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Category created successfully", create));
            }
            if(req.files){
                if(req.files["image"]){
                    fs.unlinkSync(req.files["image"][0].path);
                }
                if(req.files["banner"]){
                    fs.unlinkSync(req.files["banner"][0].path);
                }
            }
            return res
                .status(ERROR_LIST.HTTP_ACCEPTED)
                .send(ResponseStatus.failure("Category could not be created",{}));
        }catch (err) {
            if(req.files){
                if(req.files["image"]){
                    fs.unlinkSync(req.files["image"][0].path);
                }
                if(req.files["banner"]){
                    fs.unlinkSync(req.files["banner"][0].path);
                }
            }
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async update(req, res, next){
        try{
            let existCategory = await Category.findById(req.params.id);
            if(!existCategory){
                if(req.files){
                    if(req.files["image"]){
                        fs.unlinkSync(req.files["image"][0].path);
                    }
                    if(req.files["banner"]){
                        fs.unlinkSync(req.files["banner"][0].path);
                    }
                }
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Category dose not  exist", {}));
            }
            if(req.files){
                if(req.files["image"]){
                    if(fs.existsSync(existCategory.image)){
                        fs.unlinkSync(existCategory.image);
                    }
                    req.body.image = req.files["image"][0].path;
                }
                if(req.files["banner"]){
                    if(fs.existsSync(existCategory.banner)){
                        fs.unlinkSync(existCategory.banner);
                    }
                    req.body.banner = req.files["banner"][0].path;
                }
            }
            existCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return  res.status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, existCategory));
        } catch (err) {
            if(req.files){
                if(req.files["image"]){
                    fs.unlinkSync(req.files["image"][0].path);
                }
                if(req.files["banner"]){
                    fs.unlinkSync(req.files["banner"][0].path);
                }
            }
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async remove(req, res, next){
        try {
            const existCategory = await Category.findOne({slug: req.query.slug});
            if(!existCategory){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Category is not found with this id.", {}));
            }
            if(fs.existsSync(existCategory.image)){
                fs.unlinkSync(existCategory.image);
            }
            if(fs.existsSync(existCategory.banner)){
                fs.unlinkSync(existCategory.banner);
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

module.exports = new categoryController();