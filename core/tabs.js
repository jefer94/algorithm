function tab (n) {
  /*
  var tab1 = document.querySelector("#tab1");
  var tab2 = document.querySelector("#tab2");
  var tab3 = document.querySelector("#tab3");
  */
  var i = 0;
  var tabs = document.querySelectorAll('#tabs ul li');
  do {
    i++;
    if (i === n) {
      // show tap
      var tab = document.querySelector('#tab' + i);
      var content = document.querySelector('#content' + i);
      tab.className = 'tab-active';
      content.className = 'show-content';
    }
    else {
      // hidden taps
      var tab = document.querySelector('#tab' + i);
      var content = document.querySelector('#content' + i);
      tab.className = 'tab';
      content.className = 'hidden-content';
    }
  } while (i < tabs.length - 1);
}
