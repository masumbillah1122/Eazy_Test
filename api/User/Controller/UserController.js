const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const User = require('../../models/User');
const fs = require("fs");




class UserController {
    async list(req, res, next){
        try {
            const users = await User.find();
            if(!users.length){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, users));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async show(req, res, next){
        try {
            const validate = new Validator(req.query, {
                username: "string|min:5|max:50"
            });
            if(!validate){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }

            const user = await User.findOne({
                name: req.query.username,
            });
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("User not found", {}));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("User found", user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
        //
    async create(req, res, next){
        try {
            const validator = new Validator(req.body, {
                name: "string|min:5|max:50",
                email: "email",
                phone: "required|alpha_num",
                gender: "alpha",
                maritalStatus: "alpha",
                dob: "date",
                addresses: "array",
                password: "required|min:6",
            });
            if(validator.fails()){
                // if(!req.file){
                //     validator.errors.errors.image = ["Image is required"];
                // }
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validator.errors.errors));
            }
            const exist = await User.findOne({phone: req.body.phone});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, {msg: "User already exist with this phone number."}));
            }
            if(req.file){
                req.body.image = req.file.path;
            }
            const newUser = new User({
                ...req.body
            });
            await newUser.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, newUser));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async update(req, res, next){
        try{
            let user = await User.findById(req.params.id);
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, user));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async remove(req, res, next){
        try {
            const user = await User.findOne({
                name: req.query.username,
            });
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("User not found", {}));
            }
            if(fs.existsSync(user.image)){
                fs.unlinkSync(user.image);
            }
            user.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Delete successfully", {}));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async changePassword(req, res, next){
        try {
            const { slug, oldPassword, newPassword, confirmPassword} = req.body;
            const validate = new Validator(req.body, {
                oldPassword: "string",
                newPassword: "string",
                confirmPassword: "string"
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send()
            }
            if(newPassword != confirmPassword){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, {}))
            }
            const exist = await User.findOne({
                slug: slug,
            });
            const checkPass = await bcrypt.compare(oldPassword, exist.password);
            if(!checkPass){
                return res
                    .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNAUTHORIZED, {}));
            }
            exist.password = newPassword;
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Password Changed successfully", {}));

        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
       //
    async blockUser(req, res, next){
        try {
            const user = await User.findOne({
                name: req.query.username,
            });
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("User not found", {}));
            }
            if(user.accountStatus === "Deactivate" ){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("User already blocked", user));
            }
            user.accountStatus = "Deactivate";
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("user blocked successfully", user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async unblockUser(req, res, next) {
        try {
            //
            const user = await User.findOne({
                name: req.query.username,
            });
            if (!user) {
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("User not found.", {}));
            }
            if (user.accountStatus === "Active") {
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("User already unblocked", user));
            }
            user.accountStatus = "Active";
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("User unblocked succssfully", user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new UserController();
