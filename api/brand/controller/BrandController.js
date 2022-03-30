const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Brand = require('../../models/Brand');
const Validator = require('validatorjs');

class BrandController{
    async index(req, res, next){
        try {
            const brands = await Brand.find();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Index function", {}));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async show(req, res, next){
        try {
            const { id } = req.params;
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send({msg: "Show function", id});
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
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
            const exist = await Brand.findOne({name: req.body.name, bnName: req.body.bnName});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Brand already exist", exist));
            }
            // if(req.file){
            //     req.body.image = req.file.path;
            //     req.body.banner = req.file.path;
            // }
            let create = new Brand({
                ...req.body
            });
            create = await create.save();
            if(create){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Brand created successfully", create));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.failure("Brand could not be created",{}));
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
        try {
            const { id } = req.params;
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send({msg: "Update function", id});
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }
    async remove(req, res, next){
        try {
            const { id } = req.params;
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send({msg: "Remove function", id});
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }
}

module.exports = new BrandController();
