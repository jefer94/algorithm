/**
 * Functional store that mutate state of variables.
 *
 * @param {object.<string, string>} state - Data store in reducer.
 * @param {object} action - Action dispathed.
 * @returns {object.<string, string>} - Data store in reducer.
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
