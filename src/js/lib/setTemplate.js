const pushState = require('./pushState')
const templates = require('../templates')
const preventDefault = require('./preventDefault')
const pages = require('../pages')
const signup = require('../users/signup')
const login = require('../users/login')
const ui = require('../ui')

module.exports = (container, path) => {
  if (templates[path]) {
    pushState(path)
    container.innerHTML = templates[path]
    const btn = ui.button()
    preventDefault(btn)
    btn.addEventListener('click', e => {
      if (pages.signup()) signup(ui)
      if (pages.login()) login(ui)
    })
  } else {
    pushState('/')
    container.innerHTML = ''
  }
}
