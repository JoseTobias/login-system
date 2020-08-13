const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, process.env.SECRET, err => {
    if(err) {
      return res.status(401).json({
        error: 'Autenticação falha'
      })
    }
    else {
      next();
    }
  })
}