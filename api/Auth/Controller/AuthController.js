const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Validator = require("validatorjs");

class AuthController{
    async login(req, res, next){
        try{
            //Write code for login
                var email = req.body.email;
                const validate = new Validator(req.body, {
                    email: "email",
                    password: "string"
                });
                if(validate.fails()){
                    return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
                }
                const account = await User.findOne({
                    email: req.body.email,
                });

                // console.log(req.body);
                // console.log(email);
                // console.log(account);
                if(!account){
                    return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Account not found", {}));
                }
                const checkPass = await bcrypt.compare(req.body.password, account.password);
                if(!checkPass){
                    return res
                    .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNAUTHORIZED, {}));
                }

                const token = await jwt.sign({
                    name: account.name,
                    phone: account.phone,
                    email: account.email,
                    gender: account.gender,
                    maritalStatus: account.maritalStatus,
                    dob: account.dob,
                    addresses: account.addresses,
                    image: account.image
                }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '50000d' });
                return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, token));
        } catch (err) {
            console.log(err);
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }

    // async registration(req, res, next){
    //     try{
    //         //Write code for registration
    //     } catch (err) {
    //         return res
    //             .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
    //             .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
    //     }
    // }
}

module.exports = new AuthController();
