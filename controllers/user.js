const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error}))
    })
    .catch(error => res.status(500).json({ error}));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
                }
                else{
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId : user._id},
                            'c86d6055bd3897fdd410a9e521e6c07c3db06c72d2ac76ae1e9682ebd7568a96',
                            { expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => res.status(400).json({ error}))
}; 
