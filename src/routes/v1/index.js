const express = require('express');

const UserController = require('../../controllers/user-controller');
const UserService = require('../../services/user-service');
const {AuthRequestValidators} = require('../../middlewares/index');
const router = express.Router();

router.get(
    '/get/:id', UserController.get
);
router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
    );

router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,    
    UserController.signIn
    );

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

router.get(
    '/isAdmin',
    AuthRequestValidators.validateIsAdminRequest,
    UserController.isAdmin
);

module.exports = router;