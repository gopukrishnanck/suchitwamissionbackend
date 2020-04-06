const User = require('../models/wms');
const jwt = require('jsonwebtoken');
const config = require('../../config/params.config');

module.exports = {
    authenticate: (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.send({ success: false, msg: 'user not found' });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.development.jwt.secret, {
                        expiresIn: 500000 //4 hours
                    });

                    res.send({
                        success: true,
                        token: token,
                        expiresIn: 14400
                    });
                } else {
                    return res.send({ success: false, msg: 'Wrong Password' });
                }
            });
        });
    }

};

