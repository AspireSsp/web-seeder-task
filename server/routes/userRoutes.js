const express = require('express');
const { register, login, getUser } = require('../controller/user');
const authenticate = require('../middlewares/auth');
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/get").get(authenticate, getUser);


module.exports = router; 