const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const Author = require("../../models/Author");
const fs = require("fs");


class authorController {
    async list(req, res, next){
        try{
            const author = await Author.find();
            if(!author.length){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, author));
        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async show(req, res, next){
        try {
            const validate = new Validator(req.query, {
                slug: "string",
            });
            if (validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const author = await Author.findOne({slug: req.query.slug});
            if (!author){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Author not found", {}));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Author found", author));


        }catch (err) {
            return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async create(req, res, next){
        try {
            const validate = new Validator(req.body, {
                name: "string|required",
                bnName: "string",
                slug: "string|required",
            });
            if (validate.fails()) {
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
            const exist = await Author.findOne({slug: req.body.slug});
            if (exist) {
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
                    .send(ResponseStatus.failure("Author already exist", exist));
            }

            if(req.files){
                if(req.files["image"]){
                    req.body.image = req.files["image"][0].path;
                }
                if(req.files["banner"]){
                    req.body.banner = req.files["banner"][0].path;
                }
            }
            let newAuthor = new Author({
                ...req.body
            });
            newAuthor = await newAuthor.save();
            if(newAuthor)
            {
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("Author created successfully", newAuthor));
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
                .send(ResponseStatus.failure("Author dose not created successfully", {}));
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
    async update(req, res, next){
        try{
            let author = await Author.findById(req.params.id);
            if(!author){
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
                    .send(ResponseStatus.failure("Author not found", {}));
            }

            if(req.files){
                if(req.files["image"]){
                    if(fs.existsSync(author.image)){
                        fs.unlinkSync(author.image);
                    }
                    req.body.image = req.files["image"][0].path;
                }
                if(req.files["banner"]){
                    if(fs.existsSync(author.banner)){
                        fs.unlinkSync(author.banner);
                    }
                    req.body.banner = req.files["banner"][0].path;
                }
            }
            author = await Author.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, author));
        } catch(err){
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
            const author = await Author.findOne({
                slug: req.query.slug,
            });
            if(!author){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User not found", {}));
            }
            if(fs.existsSync(author.image)){
                fs.unlinkSync(author.image);
            }
            if(fs.existsSync(author.banner)){
                fs.unlinkSync(author.banner);
            }
            author.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Delete successfully", {}));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new authorController();