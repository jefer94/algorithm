const obj = (value, key) => {
  let obj = {}
  obj[key] = value
  return obj
}

const variables = (state = {}, action) =>
  action.type === 'VAR_ADD' ?
    Object.assign({}, state, obj(action.text, action.key)) :
    action.type === 'VAR_RESET' ?
      {} :
      state

export default variables
