const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");

class UsersController{
    async createUser(req, res, next){
        try{
            //Write code for creating user
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async getUsers(req, res, next){
        try{
            //Write code for get all user
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async getUser(req, res, next){
        try{
            //Write code for get single user
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async updateUser(req, res, next){
        try{
            //Write code for get single user
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async changeUserStatus(req, res, next){
        try{
            //Write code for changeUserStatus
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async changePassword(req, res, next){
        try{
            //Write code for changePassword
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async adminChangeUserPassword(req, res, next){
        try{
            //Write code for changePassword
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async sendOTPToUser(req, res, next){
        try{
            //Write code for sendOTPToUser
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async matchOTPAndChangeUser(req, res, next){
        try{
            //Write code for sendOTPToUser
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(
                    ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
                    err
                ));
        }
    }

    async matchOTPAndChangeStatusAlsoLogUserIn(req, res, next){
        try{
            //Write code for sendOTPToUser
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

module.exports = new UsersController();
