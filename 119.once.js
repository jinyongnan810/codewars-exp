// https://www.codewars.com/kata/5307ff5b588fe6d7000000a5/train/javascript
function once(fn) {
  console.log("creating fn");
  console.log(fn.toString());
  let called = false;
  return (...args) => {
    console.log(`calling with args (called=${called})`);
    console.log(...args);
    if (called) return;
    called = true;
    return fn(...args);
  };
}

function once_others(fn) {
  var call = true;
  return function () {
    if (call) {
      call = false;
      return fn.apply(this, arguments);
    }
  };
}
