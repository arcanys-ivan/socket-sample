
module.exports = function(req, res, next) {

  if (!req.body.eventName) {
    res.status(400).json({error: 'No event name specified'});

    return;
  }

  next();
}
