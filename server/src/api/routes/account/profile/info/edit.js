const router = require('express').Router();
const jwt = require('../../../../controllers/auth/jwtAuth');
const displayName = require('../../../../controllers/account/profile/edit/displayName');

router
    .put('/display_name', jwt.requireAuth, async (req, res) => {
        res.json(await displayName.editDisplayName(req));
    });

module.exports = router;