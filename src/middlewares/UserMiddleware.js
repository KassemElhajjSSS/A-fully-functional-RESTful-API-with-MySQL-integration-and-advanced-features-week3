const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {

    const token = req.cookies.jwt

    if(!token)
        return res.json({status: 'failed', message: 'token is invalid!'})

    jwtSecretKey = process.env.jwtSecretKey

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if(err)
            return res.json({status: 'failed', message: err.message})
    
        req.user = decoded
        next()
    })

}

module.exports = {
    authenticateUser
}