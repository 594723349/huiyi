const express = require('express');
const router = express.Router();
router.post('/testApi', function (req, res) {
    console.log(req.body.a);
    res.json('这是返回值');
});
module.exports = router;