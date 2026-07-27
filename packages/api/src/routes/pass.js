/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export default async function pass (req, res) {
    return res.json(`Testing route: ${req.originalUrl}`)
}