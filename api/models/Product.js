const { Schema, model } = require("mongoose");
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },
    bnName: {
        type: String,
        default: null,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        default: null
    }],
    translator: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        default: null
    }],
    editor: [{
        type: Schema.Types.ObjectId,
        ref: 'Author',
        default: null
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }],
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: null
    }],
    leafCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'LeafCategory',
        default: null
    }],
    orderType:{
        type: String,
        trim: true,
        default: "Buy Now",
        enum: ['Buy Now', 'Pre Order']
    },
    language:{
        type: String,
        trim: true,
        default: "Bengali"
    },
    bindings:{
        type: String,
        trim: true
    },
    listingPrice: {
        type: Number,
        default: 0,
        trim: true
    },
    productNumber: {
        type: String,
        required: true,
        trim: true
    },
    manageStock: {
        type: Boolean,
        default: false,
        trim: true
    },
    stockAmount: {
        type: Number,
        default: 0,
        trim: true
    },
    alertAmount: {
        type: Number,
        default: 0,
        trim: true
    },
    numberOfPages: {
        type: Number,
        default: 0,
        trim: true
    },
    isbn: {
        type: String,
        required: false,
        trim: true
    },
    weight: {
        type: Number,
        required: false,
        trim: true
    },
    details: {
        type: String,
        required: false,
        trim: true
    },
    coverImage: {
        type: String,
        required: true,
        trim: true
    },
    lookInside: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    auditBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    }
},{
    timestamps: true
});

const Product = model('Product', productSchema);

module.exports = Product;
