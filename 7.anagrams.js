function anagrams_mine(word, words) {
  const wordSplits = JSON.stringify(word.split("").sort());
  return words.filter((w) => JSON.stringify(w.split("").sort()) == wordSplits);
}

String.prototype.sort = function () {
  return this.split("").sort().join("");
};

function anagrams_others(word, words) {
  return words.filter(function (x) {
    return x.sort() === word.sort();
  });
}
