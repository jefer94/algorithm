function $ (name) {
  return new Promise((load, err) => {
    try {
      var node = document.querySelector(name);
    }
    catch (e) {
      console.error(name);
      err(e);
    }
    var interval = setInterval(() => {
      console.log('a');
      if (node) {
        clearInterval(interval);
        load(node);
      }
    }, 100);
  });
}
