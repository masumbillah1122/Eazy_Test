const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const LeafCategory = require("../../models/LeafCategory");
const Validator = require("validatorjs");
const mongoose = require("mongoose"); 


class LeafCategoryController{
    async index(req, res, next){
        try{
            const leafCategories = await LeafCategory.find() 
                .populate('products')
                .exec();
            if(!leafCategories.length){
                return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, leafCategories));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async show(req, res, next){
        try{
            const leafCategory = await LeafCategory.findById({_id: mongoose.Types.ObjectId(req.params.id)}) 
                .populate('products')
                .exec();
            if(leafCategory){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, leafCategory));
            }
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async create(req, res, next){
        try{
            const validate = new Validator(req.body, {
                name: "required|min:2|max:200|alpha",
                bnName: "min:2|max:200"
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await LeafCategory.findOne({name: req.body.name, bnName: req.body.bnName});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, {
                        msg: "Leaf Category already exist."
                    }));
            }
            let create = new LeafCategory({
                ...req.body
            });
             await create.save();
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, create));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async update(req, res, next){
        try{
            let leafCategory = await LeafCategory.findById(req.params.id);
            if(!leafCategory){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            leafCategory = await LeafCategory.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, leafCategory));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async remove(req, res, next){
        try{
            const leafCategory = await LeafCategory.findById(req.params.id);
            if(!leafCategory){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure({
                        msg: "Leaf Category is not found with this id."
                    }));
            }
            await leafCategory.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, leafCategory));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new LeafCategoryController();