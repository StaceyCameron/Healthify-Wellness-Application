const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthifyControllers');

router.get('/', controller.show_landing_page);
router.get('/home', controller.show_landing_page);
router.get('/about', controller.show_about_page);
router.get('/register', controller.show_register_page);
router.get('/login', controller.show_login_page);
router.get('/info', controller.show_info_page);
router.get('/goals', controller.show_goals_page);
router.get('/achievements', controller.show_achievements_page);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

module.exports = router;