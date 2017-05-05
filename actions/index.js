var id = 1;
export const defaults_tabs = () => {
  return [{
    id: id++,
    onclick: tab(this.id),
    name: 'Editor'
  },{
    id: id++,
    onclick: () => {
      tab(this.id);
      algorithm.to_js();
    },
    name: 'Consola'
  }]

}
export const add_tab = (obj) => {
  return [{
    id: id++,
    onclick: tab(this.id),
    name: obj.name
  }
}
