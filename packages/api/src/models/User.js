import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    staffId: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['reporter', 'agent', 'manager', 'admin'], default: 'reporter' },
    designation: { tpye: String, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true })

const User = model('User', UserSchema)

export default User