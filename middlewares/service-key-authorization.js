
module.exports = function(req, res, next) {
  if (!process.env.SERVICE_HEADER) {
    res.status(500).json({ error: 'service header not present in config' });
    return;
  }

  if (!req.headers['x-service'] || req.headers['x-service'] != process.env.SERVICE_HEADER) {
    res.status(401).json({ error: 'not authorized' });
    return;
  }

  next();
}
