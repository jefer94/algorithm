export const addVarAction = (text, key) => ({
  type: 'VAR_ADD',
  text,
  key
})

export const resetVarAction = () => ({
  type: 'VAR_RESET'
})
