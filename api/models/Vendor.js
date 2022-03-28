const { Schema, model } = require("mongoose");

const vendorSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bnName: {
        type: String,
        default: null,
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    bank: {
        accountName: {
            type: String,
            trim: true,
            require: true
        },
        accountNumber: {
            type: String,
            trim: true,
            require: true
        },
        branchName: {
            type: String,
            trim: true,
            require: true
        },
        routingNumber: {
            type: String,
            trim: true,
            require: true
        }
    },
    tradeLicence: {
        type: String,
        trim: true,
        require: true
    },
    pickupLocation: {
        type: String,
        trim: true,
        require: true
    },
    paymentSystem: {
        type: String,
        trim: true,
        default: 'Cash',
        enum: ['Cash', 'Credit']
    },
    payPeriod: {
        type: String,
        trim: true,
        default: null
    },
    contact: {
        personOne: {
            name: {
                type: String,
                trim: true,
                require: true
            },
            phone: {
                type: String,
                trim: true,
                require: true
            },
            email: {
                type: String,
                trim: true,
                require: true
            }
        },
        personTwo: {
            name: {
                type: String,
                trim: true,
                require: true
            },
            phone: {
                type: String,
                trim: true,
                require: true
            },
            email: {
                type: String,
                trim: true,
                require: true
            }
        }
    },
    keyAccountManager: {
        type: String,
        trim: true,
        require: true
    },
    secondaryKeyAccountManager: {
        type: String,
        trim: true,
        require: true
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
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    }],
    role: {
        type: String,
        trim: true,
        default: 'Vendor',
        enum: ['Vendor']
    },
    profit: {
        type: {
            type: String,
            default: "Percentage",
            enum: ["Percentage","Flat"]
        },
        amount: {
            type: Number,
            default: 0,
            trim: true
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

const Vendor = model("Vendor", vendorSchema)
module.exports = Vendor;
