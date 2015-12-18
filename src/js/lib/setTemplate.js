const pushState = require('./pushState')
const templates = require('../templates')
const preventDefault = require('./preventDefault')

module.exports = (container, path) => {
  if (templates[path]) {
    pushState(path)
    container.innerHTML = templates[path]
    preventDefault(container.querySelector('button'))
  } else {
    pushState('/')
    container.innerHTML = ''
  }
}
