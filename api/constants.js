exports.base_url = 'https://www.anitube.site/'

exports.base_api = proccess.env.NODE_ENV == 'production' ? 'https://all-animes.herokuapp.com/v1/' : 'https://animes-api.natanapps.repl.co/v1/'
