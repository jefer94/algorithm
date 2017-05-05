const tabs = (state = [], action) => {
  switch (action.type) {
    case 'DEFAULTS_TABS':
      return state.concat(
        defaults_tabs()
      );
    case 'ADD_TAB':
      return state.map(t =>
        add_tab(t, action)
      )
    default:
      return state
  }
}

export default todos
