module.exports = url => {
  if (url !== window.location.pathname) {
    window.history.pushState({}, '', url)
  }
}
