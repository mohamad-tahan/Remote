const { Router } = require('express');
const {register } = require('./user/controller/user');
const router = Router();

router.post('/auth/register', register);

module.exports = router;
