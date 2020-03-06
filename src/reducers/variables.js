function obj(value, key) {
  const cache = {}
  cache[key] = value
  return cache
}

export default function (state = {}, action) {
  switch (action.type) {
    case 'VAR_ADD':
      return ({ ...state, ...obj(action.text, action.key) })

    case 'VAR_RESET':
      return {}

    default:
      return state
  }
}
