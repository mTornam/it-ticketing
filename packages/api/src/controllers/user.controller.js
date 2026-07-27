import bcrypt from 'bcryptjs'
import User from '../models/User.js'

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function createUser(req, res) {
    try {
        // Check if user exists
        const existingUser = await User.findOne({ username: req.body.username })
        if (existingUser) { return res.send('Username not availabe').status(400) }
        // Create new user
        const newUser = new User({ ...req.body })
        await newUser.save()

        res.send('User created successfully').status(201)
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' })
    }
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export async function changeRole(req, res) {
    try {
        const newRole = req.body.role
        const user = await User.findByIdAndUpdate(req.params.id, {role: newRole})
        if (!user) return res.status(404).json({message: 'User not found'})
        return res.status(200).json({message: 'Role updated'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}