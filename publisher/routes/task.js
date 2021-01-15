const express = require('express');
const router = express.Router();
const publisher = require('../service/MQService');

router.post('/task', async(req, res, next)=>{
    const id = Math.random().toString(32).slice(2, 6);
    const text = Math.floor(Math.random() * Math.floor(10));
    await publisher({ id, text });
    res.send({ id, text });
})

module.exports = router;