const http = require('http')
const pass = require('pwd')
const body = require('body/any')

const st = require('st')
const serve = st({
  path: 'public'
})

const level = require('level')
const db = level('db', {
  keyEncoding: require('bytewise'),
  valueEncoding: 'json'
})

const userAction = require('./lib/userAction')(body, db, pass)
const userSignUp = require('./routes/users/signup')
const userLogin = require('./routes/users/login')

const routes = require('patterns')()
routes.add('POST /signup', userAction(userSignUp))
routes.add('POST /login', userAction(userLogin))

http.createServer((req, res) => {
  const m = routes.match(req.method + ' ' + req.url)
  if (!m) {
    serve(req, res)
    return
  }
  m.value(req, res)
}).listen(9090, () => {
  console.log('server is listening on http://0.0.0.0:9090')
})
