const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    status: {
        type: String,
        trim: true,
        default: 'Offline',
        enum: ['Offline', 'Online']
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

const Admin = model("Admin", adminSchema)
module.exports = Admin;
