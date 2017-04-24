var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signin');
});

router.post('/', checkNotLogin, (req, res, next) => {
    var name = req.fields.userName; //name inputed in form
    var password = req.fields.password;

    UserModel.getUserByName(name)
        .then((user) => {
            if (!user) {
                req.flash('error', 'User not existes');
                return res.redirect("back");
            } else {
                if (sha1(password) !== user.password) {
                    req.flash('error', "Incorrect password");
                    return res.redirect("back");
                } else {
                    req.flash('success', "Log in success");
                    delete user.password; //?
                    req.session.user = user;
                    res.redirect('/posts');
                }
            }
        })
        .catch(next);
});

module.exports = router;