import toRegex from 'path-to-regexp'

function matchURI(path, uri) {
  const keys = []
  const pattern = toRegex(path, keys)
  const match = pattern.exec(uri)
  if (!match) {
    return null
  }

  const params = Object.create(null)
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined
  }

  return params
}

export function resolve(routes, location) {
  return new Promise((resolve, reject) => {
    for (const route of routes) {
      const params = matchURI(route.path, location.pathname)
      if (!params) {
        continue
      }

      const result = route.action({ ...location, params })
      if (result) {
        resolve(result)
      }
    }

    // TODO: Better error system
    const error = new Error('Not found')
    error.status = 404
    reject(error)
  })
}
