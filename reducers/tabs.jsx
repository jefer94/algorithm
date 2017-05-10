import {ADD_TAB, defaults_tabs, add_tab} from '../actions/index.jsx';

const tabs = (state = defaults_tabs, action) => {
  switch (action.type) {
    case ADD_TAB:
      return state.tabs.concat(add_tab(action));

    default:
      return state;
  }
}

export default tabs;
