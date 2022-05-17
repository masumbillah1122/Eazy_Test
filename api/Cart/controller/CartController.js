const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Validator = require('validatorjs');
const Cart = require("../../models/Cart");

class cartController{
    async addToCart(req, res, next){
        try {
            console.log(req.body.userId);
            const find = await Cart.findOne({userId: req.body.userId});
            if(find != null){
                async function add(req, res, next){
                    const validate = new Validator(req.body, {
                        quantity: "numeric",
                        checkBox: "boolean"
                    });
                    if(validate.fails()){
                        return res
                            .status(ERROR_LIST.HTTP_ACCEPTED)
                            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
                    }
                    //let length = find.products.length();
                    let quantity = req.body.quantity;
                    let product = req.body.product;
                    let checkBox = req.body.checkBox;
                    find.products.push({ quantity, product, checkBox });

                }
            }
            else if(find == null){
                async function create(req, res, next){
                    try{
                        console.log("hhh");
                        let newCart = new Cart({
                            ...req.body
                        });
                        newCart = await newCart.save();
                        if(newCart){
                            return res
                                .status(ERROR_LIST.HTTP_OK)
                                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, {}));
                        }
                        return res
                            .status(ERROR_LIST.HTTP_ACCEPTED)
                            .send(ResponseStatus.failure("Cart not Created", {}));
                    }catch (err) {
                        console.log(err);
                        return res
                            .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                            .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
                    }
                }

            }
            return res
                .status(ERROR_LIST.HTTP_ACCEPTED)
                .send(ResponseStatus.failure("error"));
        }catch (err) {
            console.log(err);
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }


    }

}

module.exports = new cartController();