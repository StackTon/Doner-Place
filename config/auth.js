module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    },
    isAdmin: (role) => (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.isAdmin) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}