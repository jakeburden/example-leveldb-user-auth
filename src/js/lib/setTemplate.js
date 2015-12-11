const pushState = require('./pushState')
const templates = require('../templates')

module.exports = (container, path) => {
  if (templates[path]) {
    pushState(path)
    container.innerHTML = templates[path]
  } else {
    pushState('/')
    container.innerHTML = ''
  }
}
