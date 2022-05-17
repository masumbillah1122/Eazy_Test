const { Schema, model } = require("mongoose");
const cartSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[{
        quantity: Number,
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            default: null
        },
        checkBox:{
            type: Boolean,
            trim: true,
            default: true,
            enum: [true, false]
        }
    }],
});
const Cart = model('Cart', cartSchema);
module.exports = Cart;

// const mongoose = require("mongoose");
//
// const CartSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         products: [
//             {
//                 productId: {
//
//                 },
//                 quantity: Number,
//             }
//         ],
//         active: {
//             type: Boolean,
//             default: true
//         },
//         modifiedOn: {
//             type: Date,
//             default: Date.now
//         }
//     },
//     { timestamps: true }
// );
//
// module.exports = mongoose.model("Cart", CartSchema);