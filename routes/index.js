var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const io = req.app.get('io');

  // res.render('index', { title: 'Express' });
  Object.keys(io.sockets.connected).forEach(id => {
    const socket = io.sockets.connected[id];

    socket.emit('test-socket', {test: true});
  });

  res.status(200).send({
    success: true
  })
});

module.exports = router;
