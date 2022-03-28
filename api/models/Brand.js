const {Schema, model} = require('mongoose');

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bnName: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    featuredImage: {
        type: String,
        trim: true
    },
    published: {
        type: Boolean,
        default: true
    }
    // categories: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Category"
    // }]
});

module.exports = model("Brand", BrandSchema, "Brand");
