const templates = require('./templates')
const ui = require('./ui')
const pushState = require('./lib/pushState')
const router = require('./lib/router')
const preventDefault = require('./lib/preventDefault')
const signup = require('./users/signup')
const login = require('./users/login')
const pages = require('./pages')

if (!pages.home()) {
  const btn = ui.button()
  preventDefault(btn)

  btn.addEventListener('click', e => {
    if (pages.signup()) signup(ui)
    if (pages.signup()) login(ui)
  })
}
router(ui.nav(), ui.app())

window.addEventListener('popstate', () => {
  const pathname = window.location.pathname.slice(1)
  const main = ui.app()
  if (templates[pathname]) {
    const btn = ui.button()
    main.innerHTML = templates[pathname]
    preventDefault(btn)
    btn.addEventListener('click', e => {
      if (pages.signup()) signup(ui)
      if (pages.login()) login(ui)
    })
  } else {
    pushState('/')
    main.innerHTML = ''
  }
})
