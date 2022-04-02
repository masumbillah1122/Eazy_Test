const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Product = require("../../models/Product");
const Validator = require('validatorjs');


class ProductController{
    async index(req, res, next){
        try{
            const products = await Product.find();
            if(!products.length){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, products));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async show(req, res, next){
        try{
            const product = await Product.findById(req.params.id);
            if(product){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, product));
            }
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async create(req, res, next){
        try {
            //req.files
            const validate = new Validator(req.body, {
                name: "required|min:2|max:200|alpha",
                bnName: "min:2|max:200"
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await Product.findOne({name: req.body.name, bnName: req.body.bnName});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure({
                        msg: "Product already exist."
                    }));
            }
            let create = new Product({
                ...req.body
            });
             await create.save();
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, create));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }
    async update(req, res, next){
        try{
            let product = await Product.findById(req.params.id);
            if(!product){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, product));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async remove(req, res, next){
        try{
            const product = await Product.findById(req.params.id);
            if(!product){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure({ msg: "Product is not found with this id" }));
            }
            await product.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, product));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new ProductController();