const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const User = require('../../models/User');
const fs = require("fs");
const bcrypt = require("bcryptjs");

class UserController {
    async list(req, res, next){
        try {
            const users = await User.find();
            if(!users.length){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("There are no user", {}));
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
                email: "string|required"
            });
            if(!validate){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }

            const user = await User.findOne({
                email: req.query.email,
            });
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("No user for this email", {}));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async create(req, res, next){
        try {

            const validator = new Validator(req.body, {
                name: "string|min:5|max:50",
                email: "email",
                phone: "required|alpha_num",
                gender: "alpha",
                maritalStatus: "alpha",
                dob: "date",
                password: "string|required|min:6",
            });

            if(validator.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validator.errors.errors));
            }
            const exist = await User.findOne({phone: req.body.phone});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User already exist with this phone number.", exist));
            }

            if(req.file){
                req.body.image = req.file.path;
            }
            req.body.password = await bcrypt.hash(req.body.password, 12);
            const newUser = new User({
                ...req.body
            });
            await newUser.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("User created Successfully", newUser));
       } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async update(req, res, next){
        try {
            const validator = new Validator(req.body, {
                name: "string|min:5|max:50",
                email: "email",
                phone: "alpha_num",
                gender: "alpha",
                maritalStatus: "alpha",
                dob: "date",
                addresses: "array",
                password: "min:6",
            });
            if(validator.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validator.errors.errors));
            }
            let user = await User.findById(req.params.id);
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("No user found", {}));
            }

            if(req.file) {
                if (fs.existsSync(user.image)){
                    fs.unlinkSync(user.image);
                }
                req.body.image = req.file.path;
            }
            user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("User update successfully", user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async remove(req, res, next){
        try {
            const user = await User.findOne({email: req.query.email});
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User is not found for this email", {}));
            }
            if(fs.existsSync(user.image)){
                fs.unlinkSync(user.image);
            }
            await user.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success({message: "User Deleted Successfully", user}));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async changePassword(req, res, next){
        try {
            const validate = new Validator(req.body, {
                email: "string",
                oldPassword: "string",
                newPassword: "string",
                confirmPassword: "string"
            });
            if(validate.fails()){
                return res
                .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            if(req.body.newPassword != req.body.confirmPassword){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure("new password and confirm password dose not match", {}))
            }

            let exist = await User.findOne({email: req.body.email});
            if(!exist){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("user not exist", {}));
            }
            const checkPass = await bcrypt.compare(req.body.oldPassword, exist.password);
            if(!checkPass){
                return res
                    .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNAUTHORIZED, {}));
            }

            exist.password = await bcrypt.hash(req.body.newPassword, 12);
            await exist.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("Password Changed successfully", exist));

        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    async blockUser(req, res, next){
        try {
            let user = await User.findOne({
                email: req.query.email,
            });
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User not found", {}));
            }
            if(user.accountStatus == "Deactivate"){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User already blocked", user));
            }
            user.accountStatus = "Deactivate";
            await user.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("user blocked successfully", user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async unblockUser(req, res, next){
        try {
            let user = await User.findOne({
                email: req.query.email,
            });
            if(!user){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User not found.", {} ));
            }
            if(user.accountStatus == "Active"){
                return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("User already unblocked", user));
            }
            user.accountStatus = "Active";
            await user.save();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("User unblocked successfully", user));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new UserController();
