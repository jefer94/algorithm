/**
 * Functional store that mutate state of variables.
 *
 * @param {Object.<string, string>} state - Data store in reducer.
 * @param {Object} action - Action dispathed.
 */
export default function (state = {}, action) {
  switch (action.type) {
    case 'VAR_ADD':
      return ({ ...state, ...{ [action.key]: action.text } })

    case 'VAR_RESET':
      return {}

    default:
      return state
  }
}
