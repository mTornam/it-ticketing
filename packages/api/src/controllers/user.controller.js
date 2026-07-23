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
        res.status(400).json({error: error.message})
    }
}

// export async function getUser(req, res) {
//     res
// }