var http = require('http')

var patterns = require('patterns')()
var ecstatic = require('ecstatic')
var st = ecstatic({
  root: 'public',
  gzip: true
})

var routesIndex = require('./routes/index.js')

patterns.add('GET /', routesIndex)

http.createServer(function (req, res) {
  var m = patterns.match(req.method + ' ' + req.url)
  if (!m) {
    st(req, res)
    return
  }
  m.value(req, res)
}).listen(9090, function () {
  console.log('server is listening on http://0.0.0.0:9090')
})
