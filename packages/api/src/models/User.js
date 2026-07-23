import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs'

/**
 * @typedef {import('mongoose').HydratedDocument<User>} UserDocument
 */

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false }, // never persisted as-is
    passwordHash: { type: String, required: true, select: false },
    staffId: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['reporter', 'agent', 'manager', 'admin'], default: 'reporter' },
    designation: { type: String, required: true },
    active: { type: Boolean, default: true }
}, { timestamps: true })

// Hashpassword
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.passwordHash = await bcrypt.hash(this.password, 12)
    this.password = undefined // never persist the plaintext password
    next()
})

// Compare password
UserSchema.methods.comparePasswords = function (candidate) {
    return bcrypt.compare(candidate, this.passwordHash)
}

const User = model('User', UserSchema)

export default User