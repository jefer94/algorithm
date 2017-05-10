var id = 1;

export const DEFAULTS_TABS = 'DEFAULTS_TABS';
export const ADD_TAB = 'ADD_TAB';

export const defaults_tabs = () => {
  tabs: [{
    type: DEFAULS_TABS,
    id: id++,
    onclick: tab(this.id),
    name: 'Editor',
    active: true
  },{
    id: id++,
    onclick: () => {
      tab(this.id);
      algorithm.to_js();
    },
    name: 'Consola',
    active: false
  }]
}
export const add_tab = (action) => [
  {
    type: ADD_TAB,
    id: id++,
    onclick: tab(this.id),
    name: action.name,
    active: false
  }
]
