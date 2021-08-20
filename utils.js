const options = require('./req-options')
const request = require('request')
const _ = require('lodash')

const getQuery = req => q => req.query[q]

const returnError = (res, msg, code=404) => res.status(code).json({ err: true, msg })

const setPagination = (req, $) => {
  const paginate = $('.centerPagination').has('.paginacao'),
        current = getQuery(req)('page') || 1

  if (paginate.length) {
    const pagination = {}

    if (paginate.has('.prev').length > 0 && current > 1) {
      pagination['previous'] = parseInt(current) - 1
      pagination['current'] = current
    }

    if (paginate.has('.next').length > 0) {
      const next = parseInt(current) + 1,
            last = paginate.children('.paginacao').children('.page-numbers').eq(-2).text();

      Object.assign(pagination, { next, last })
    }
    return {pagination}
  }

  return {}
}

const paginate = req => {
  const q = getQuery(req)
  return q('page') ? 'page/' + q('page') + '/' : ''
}

const getNumbers = str => str.match(/([0-9]+)/g)[0]

const parseJSON = (json, ...positions) => {
  if (json[0] != '{' && json[-1] != '}') {
    json = `{${json}}`
  }

  let str = json.replace(/(\w+)\:/gm, (_, p1) => /http/.test(p1) ? p1+':' : `"${p1}":`).replace(/\'/mg, '"')

  const newObj = eval(`(() => (${str}))()`)

  if (_.isEmpty(positions)) {
    return newObj
  }

  return _.at(newObj, )
}

module.exports = {
  getQuery,
  paginate,
  returnError,
  setPagination,
  getNumbers,
  parseJSON
}