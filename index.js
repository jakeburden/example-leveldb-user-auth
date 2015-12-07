const http = require('http')
const fs = require('fs')

const pass = require('pwd')
const body = require('body/any')
const hyperstream = require('hyperstream')
const oppressor = require('oppressor')

const st = require('st')
const serve = st({
  path: 'public'
})

const level = require('level')
const db = level('db', {
  keyEncoding: require('bytewise'),
  valueEncoding: 'json'
})

const render = require('./lib/render')(oppressor, fs, hyperstream)
const userAction = require('./lib/userAction')(body, db, pass)

const renderSignUp = render('signup')
const userSignUp = require('./routes/users/signup')

const renderLogin = render('login')
const userLogin = require('./routes/users/login')

const routes = require('patterns')()

routes.add('GET /', (req, res) => {
  fs.createReadStream('./static/index.html').pipe(res)
})

routes.add('GET /signup', renderSignUp)
routes.add('POST /signup', userAction(userSignUp))

routes.add('GET /login', renderLogin)
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
