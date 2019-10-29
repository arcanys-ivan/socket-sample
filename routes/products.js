const express = require('express');
const router = express.Router();

const serviceKeyAuthorization = require('../middlewares/service-key-authorization');
const eventCheker = require('../middlewares/event-checker');

router.use(serviceKeyAuthorization);
router.use(eventCheker);

/* GET home page. */
router.post('/', function(req, res, next) {
  const io = req.app.get('io');

  const { eventName, data, user } = req.body;

  io.emit('products', {
    eventName,
    data,
    user
  });

  res.status(200).send({
    success: true
  })
});

module.exports = router;
