const jwt = require('jsonwebtoken')
const User = require('../models/user');

const auth = async(req, res, next) => {
    if (req.header) {
        const token = req.header('Authorization').replace('Bearer ', '');
        try {
            const data = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        
            if (!user) {
                throw new Error();
            }
            req.user = user;
            req.token = token;
            next();
        } catch (err) {
            res.status(401).send({ error: 'Not authorized to access'});
        }    
    }
}

module.exports = auth;