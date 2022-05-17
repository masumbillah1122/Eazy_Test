const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Validator = require("validatorjs");
const jwt_decode = require("jwt-decode");

class AuthController{
    async login(req, res, next){
        try{
            //Write code for login
                const validate = new Validator(req.body, {
                    email: "email|required",
                    password: "string|required"
                });
                if(validate.fails()){
                    return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
                }
                const account = await User.findOne({
                    email: req.body.email,
                });

                if(!account){
                    return res
                    .status(ERROR_LIST.HTTP_ACCEPTED)
                    .send(ResponseStatus.failure("Invalid e-mail or password", {}));
                }
                if(account.accountStatus === "Deactivate"){
                    return res
                        .status(ERROR_LIST.HTTP_ACCEPTED)
                        .send(ResponseStatus.failure("Account blocked by admin, Contact with admin"));
                }
                const checkPass = await bcrypt.compare(req.body.password, account.password);
                if(!checkPass){
                    return res
                    .status(ERROR_LIST.HTTP_UNAUTHORIZED)
                    .send(ResponseStatus.failure("Invalid e-mail or password", {}));
                }
                const token = await jwt.sign({
                   id: account.id,
                }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5000' });

                account.token = token;
                await account.save();

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
    async auth(req, res, next){
        const temp = req.headers.authorization;
        const token = temp.split(" ");
        const decode = jwt_decode(token[1]);
        console.log(decode.id);
        const tempUser = await User.findById(decode.id);
        if(tempUser.token === token[1])
        {
            console.log("jamal");
            next();
        }
        else{
            console.log("err");
            return res.status(200).send({});
        }

    }

}

module.exports = new AuthController();
