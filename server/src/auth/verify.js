import logger from '../logger';
import jwt from 'jsonwebtoken'


const unAuthorizedMsg = 'Unable to validate token'

export default (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('>>>> token', token)
    if (token == null) {
        const status = 401
        logger({ message: unAuthorizedMsg, status, token });
        return res.status(401).json({ message: unAuthorizedMsg, status, token })
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            logger({ error: err, message: unAuthorizedMsg, status, token });
            return res.status(403).json({ error: err, message: unAuthorizedMsg, status, token })
        }
        logger(`token validated - ${token}`);
        req.user = user;
        next();
    });
};
