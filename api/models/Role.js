const { Schema, model } = require("mongoose")

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

const Role = model('Role', roleSchema)
module.exports = Role;
