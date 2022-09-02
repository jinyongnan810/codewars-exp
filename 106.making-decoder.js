console.log(device.encode("What is this ?"));
const map = [];
const alphabets = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+- ,.";
device.decode = function (w) {
  const l = w.length;
  const res = [];
  for (let i = 0; i < l; i++) {
    const char = w[i];
    if (map[i]) {
      const map = map[i];
      res.push(map[char]);
    } else {
      const m = {};
      alphabets.split("").forEach(function (a) {
        const decoded = device.encode(`${"_".repeat(i)}${a}`);
        m[decoded[i]] = a;
      });
      alphabets
        .toUpperCase()
        .split("")
        .forEach(function (a) {
          const decoded = device.encode(`${"_".repeat(i)}${a}`);
          m[decoded[i]] = a;
        });
      map.push(m);
      res.push(m[char]);
    }
  }
  return res.join("");
};
