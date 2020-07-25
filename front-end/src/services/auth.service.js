export default {
  login: function (token) {
    window.localStorage.setItem(
      'auth',
      JSON.stringify({
        isLoggedIn: true,
        token,
      })
    )
  },
  parse: function () {
    return JSON.parse(window.localStorage.getItem('auth'))
  },
  getToken: function () {
    if (!this.isLoggedIn()) {
      throw new Error('Accessing token without logged in user')
    }

    return this.parse().token
  },
  getUserIdFromToken: function () {
    if (!this.isLoggedIn()) {
      throw new Error('Accessing token without logged in user')
    }

    return parseJwt(this.parse().token)['userId']
  },
  isLoggedIn: function () {
    const parsed = this.parse()
    return parsed ? parsed.isLoggedIn : false
  },
  logout: function () {
    window.localStorage.removeItem('auth')
  },
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
