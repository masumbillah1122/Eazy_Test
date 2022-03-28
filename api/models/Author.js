const { Schema, model } = require("mongoose")

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bnName: {
        type: String,
        default: null,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    banner: {
        type: String,
        required: false,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    isActive: {
        type: Boolean,
        trim: true,
        default: true,
        enum: [true, false]
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
})

const Author = model('Brand', authorSchema)

module.exports = Author;
