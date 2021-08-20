const { base_api } = require('./constants')

const pathResolve = str => {
  str = str.split(':')

  const path = `${str[0] == 'anime' ? 'a/' : str[0] == 'episode' ? 'episodio/' : ''}${str[1]}`

  return base_api + path

  // if (str[0] == 'anime') {
  //   return `/a/${path}`
  // }

  // if (str[0] == 'episode') {
  //   return `/episodio/${path}`
  // }
}

module.exports = {
  pathResolve,
}