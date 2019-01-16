const queryString = require('query-string')

export function getToken () {
}

export function getQueryString () {
   return queryString.parse(window.location.search)
}