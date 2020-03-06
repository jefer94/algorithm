export const addVar = (value, key) => ({
  type: 'VAR_ADD',
  text: value,
  key
})

export const resetVar = () => ({
  type: 'VAR_RESET'
})
