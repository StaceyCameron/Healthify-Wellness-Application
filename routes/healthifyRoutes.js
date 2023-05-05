const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthifyControllers.js');
const {login} = require('../auth/auth.js')
const {verify} = require('../auth/auth.js')

router.get('/', controller.show_landing_page);
router.get('/home', controller.show_landing_page);
router.get('/about', controller.show_about_page);
router.get('/info', verify, controller.show_info_page);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);

router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);
router.get("/logout", controller.logout);

router.get('/goals', verify, controller.show_goals_page);
router.get('/complete', controller.show_complete_page);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})

module.exports = router;