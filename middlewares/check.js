module.exports = {
    checkLogin:function checkLogin(req, res, next) {
        if(!req.session.user) {
            req.flash('error', 'You have not loged in');
            return res.redirect('/signin');
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if(req.session.user) {
            req.flash('error', 'You have loged in');
            return res.redirect('back');
        }
        next();
    }
};