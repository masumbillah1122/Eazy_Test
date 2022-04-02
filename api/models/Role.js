const {Schema, model} = require("mongoose")

const roleSchema = new Schema({
    role: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    permissions: [{
        type: String,
        required: true,
        trim: true
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    }
}, {
    timestamps: true
})

const Role = model('Role', roleSchema)
module.exports = Role;

{
 permissions:
    [
        "all",
        "admin",
        "profile",
        "shipping",
        "report",
        "deactivated",
        "product",
        "brand",
        "category",
        "banner",
        "dashboard",
        "order",
        "addsense",
        "subscriber",
        "customer",
        "rating-review",
        "university",
        "vendor",
        "coupon",
        "campaign",
        "refund",
        "options",
        "role"
    ]
}
