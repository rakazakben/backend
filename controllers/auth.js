const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET

module.exports = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: " Aucun token fourni !" });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtKey);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }catch(error){ res.status(401).json({ error })}
};