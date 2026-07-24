import { verifyAccessToken } from '../services/token.service.js'

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export default function authenticate(req, res, next) {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Missing access token'})
    }

    const token = header.slice(7)
    try{
        req.user = verifyAccessToken(token)
        next()
    } catch {
        return res.status(401).json({error: 'Invalid or expired access token', code: 'TOKEN_EXPIRED'})
    }
}