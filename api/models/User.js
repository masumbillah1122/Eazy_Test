const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
    if (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    return true
}

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Please provide a valid email address"],
        default: null
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    gender: {
        type: String,
        trim: true,
        default: null,
        enum: [null, "Male", "Female", "Other"]
    },
    maritalStatus: {
        type: String,
        trim: true,
        default: null,
        enum: [null, "Single", "Married", "Separated", "Divorced", "Widowed"]
    },
    dob: {
        type: Date,
        trim: true,
        default: null
    },
    addresses: [{
        title: {
            type: String,
            trim: true,
            required: true
        },
        addressLine: {
            type: String,
            trim: true,
            required: true
        },
        upzila: {
            type: String,
            trim: true,
            required: false
        },
        district: {
            type: String,
            trim: true,
            required: false
        },
        division: {
            type: String,
            trim: true,
            required: false
        },
        postCode: {
            type: String,
            trim: true,
            //required: false
        },
        postOffice: {
            type: String,
            trim: true,
            //required: false
        }
    }],
    password: {
        type: String,
        trim: true,
        required: true
    },
    phoneVerified: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    otp: {
        type: Number,
        trim: true,
        default: null
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
    accountStatus: {
        type: String,
        trim: true,
        default: 'Active',
        enum: ['Active', 'Deactivate']
    }
},{
    timestamps: true
});

const User = model("User", userSchema)
module.exports = User;
