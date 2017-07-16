function tab (n) {
  var tab, content;
  if (this.now === n)
    return;
  var prev = this.now ? this.now : 1;
  this.now = n;

  // current tab active
  tab = document.querySelector('#tab' + this.now);
  content = document.querySelector('#content' + this.now);
  tab.className = 'tab-active';
  content.className = 'show-content';

  // last tab active
  tab = document.querySelector('#tab' + prev);
  content = document.querySelector('#content' + prev);
  tab.className = 'tab';
  content.className = 'hidden-content';
}

function tutorial (n) {
  var tab, content;
  if (this.now === n)
    return;
  var prev = this.now ? this.now : 0;
  this.now = n;

  // current tab active
  tab = document.querySelector('#tab' + this.now);
  content = document.querySelector('#content' + this.now);
  tab.className = 'tab-active';
  content.className = 'show-content';

  // last tab active
  tab = document.querySelector('#tab' + prev);
  content = document.querySelector('#content' + prev);
  tab.className = 'tab';
  content.className = 'hidden-content';
}

function new_tab() {
  var tabs = document
    .getElementById('tabs')
    .innerHTML;
  var index = 1 + document
    .getElementsByClassName('tabs')
    .length;
  var tab = `<li class="tab tabs" id="tab${index}" onclick="tab(${index});">nombre</li><!-- here-->`;
  document
    .getElementById('tabs')
    .innerHTML = tabs
      .replace(/\<!-- here--\>/, tab);
  var module = `funcion nombre()` +
    `  numero, i, tabla[10]: entero` +
    `  inicio` +
    `  fin`;
  global.tabs.push(module);
}
