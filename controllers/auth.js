const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: " Aucun token fourni !" });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'c86d6055bd3897fdd410a9e521e6c07c3db06c72d2ac76ae1e9682ebd7568a96');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    }catch(error){ res.status(401).json({ error })}
};