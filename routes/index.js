module.exports = (app) => {
    app.get('/', (req, res) => {
        if (req.session.user) {
            res.redirect('/posts');
        } else {
            res.redirect('/signin');
        }
    });
    app.use('/posts', require('./posts'));
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use((req, res) => {
        if (!res.headersSent) {
            res.status(404).render('404');
        }
    });
};