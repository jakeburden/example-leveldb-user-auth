module.exports = {
  home () {
    return window.location.pathname === '/'
  },
  signup () {
    return window.location.pathname === '/signup'
  },
  login () {
    return window.location.pathname === '/login'
  }
}
