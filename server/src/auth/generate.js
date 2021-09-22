const jwt = require('jsonwebtoken');

export default (username) => {
    if (!username) {
        return null
    }
    return jwt.sign({ name: username }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};
