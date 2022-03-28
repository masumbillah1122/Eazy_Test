const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
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
    image: {
        type: String,
        required: false
    },
    banner: {
        type: String,
        required: false
    },
    subCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: null
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    }],
    isActive: {
        type: Boolean,
        trim: true,
        default: true,
        enum: [true, false]
    },
    indexId: {
        type: Number,
        trim: true,
        default: 0
    },
    discount: {
        type: {
            type: String,
            trim: true,
            default: null,
            enum: [null, 'flat', 'percentage']
        },
        amount: {
            type: Number,
            trim: true,
            default: 0
        },
        createdAt: {
            type: Date,
            trim: true,
            default: null
        }
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
    }
}, {
    timestamps: true
});

const Category = model('Category', categorySchema)
module.exports = Category;
