const express = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const router = express.Router();

router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe se ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ], 
    createUser);

router.post(
    '/', 
    [ 
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe se ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ], 
    loginUser);
    
router.get('/renew', jwtValidator, renewToken);

module.exports = router;