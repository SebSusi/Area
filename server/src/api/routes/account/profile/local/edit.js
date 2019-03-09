const router = require('express').Router({mergeParams: true});
const jwt = require('../../../../controllers/auth/jwtAuth');
const local = require('../../../../controllers/auth/local/edit');

router
    .put('/email', jwt.requireAuth, async (req, res) => {
        res.json(await local.editMail(req));
    });

router
    .put('/password', jwt.requireAuth, async (req, res) => {
        res.json(await local.editPassword(req));
    });

module.exports = router;