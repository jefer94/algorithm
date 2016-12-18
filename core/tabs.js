function tab(n) {
  /*
  var tab1 = document.querySelector("#tab1");
  var tab2 = document.querySelector("#tab2");
  var tab3 = document.querySelector("#tab3");
  */
  var i = 0;
  do {
    i++;
    if (i == n) {
      // show tap
      var tab = document.querySelector("#tab" + i);
      var content = document.querySelector("#content" + i);
      tab.className = "tab-active";
      content.className = "show-content";

    }
    else {
      // hidden taps
      var tab = document.querySelector("#tab" + i);
      var content = document.querySelector("#content" + i);
      tab.className = "tab";
      content.className = "hidden-content";
    }
  } while (i < 3);
}
function hamburger_over() {
  // is important know is, a node when it is deleted(for rename a class), this
  // Disappears from the array, for this ever you do use the node 0
  var hamburger = document.getElementsByClassName("line");
  hamburger[0].className = "line_over";
  hamburger[0].className = "line_over";
  hamburger[0].className = "line_over";
}
function hamburger_out() {
  // is important know is, a node when it is deleted(for rename a class), this
  // Disappears from the array, for this ever you do use the node 0
  var hamburger = document.getElementsByClassName("line_over");
  hamburger[0].className = "line";
  hamburger[0].className = "line";
  hamburger[0].className = "line";
}
