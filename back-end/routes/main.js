const express = require('express')
const router = express.Router()
const auth = require('../middlewares/verify.middleware').auth

router.get('/test', (req, res) => {
    console.log('Test path');
    console.log(req.headers);
    console.log(req.body);

    res.json({key: "test"})
})

module.exports = router
