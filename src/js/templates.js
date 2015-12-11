const fs = require('fs')

module.exports = {
  login: fs.readFileSync('templates/login.html', 'utf8'),
  signup: fs.readFileSync('templates/signup.html', 'utf8')
}
