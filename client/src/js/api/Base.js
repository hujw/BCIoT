import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import urlJoin from 'url-join'
import qs from 'query-string'
import urlTool from 'url'
import { HOST, VERSION } from './Config'

export function PromiseWrapper (x) {
  return new Promise((resolve, reject) => {
    resolve(x)
  })
}

export default async (_url, _options = {}) => {
  let url = urlJoin(HOST, VERSION, _url)
  let options = {..._options, credentials: 'include'}
  const {body} = options
  if (!options.method || options.method.toLowerCase() === 'get') {
    const urlObject = urlTool.parse(url)
    urlObject.query = {...qs.parse(urlObject.query), ...body}
    url = urlTool.format(urlObject)
    delete options.body
  }
  if (options.body && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body)
  }

  const res = await fetch(url, options)
  const resJson = await res.json()
  const ret = {
    ...resJson,
    body
  }
  if (res.status >= 200 && res.status < 300) {
    return ret
  } else {
    throw ret
  }
}
