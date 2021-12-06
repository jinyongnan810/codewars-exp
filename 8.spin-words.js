function spinWords(string) {
  return string
    .split(" ")
    .map((s) => (s.length >= 5 ? s.split("").reverse().join("") : s))
    .join(" ");
}

function spinWords_others(string) {
  return string.replace(/\w{5,}/g, function (w) {
    return w.split("").reverse().join("");
  });
}
