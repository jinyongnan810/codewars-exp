// https://www.codewars.com/kata/5264603df227072e6500006d/train/javascript
function Jar() {
  this.portions = {};
}

Jar.prototype.toString = function () {
  let res = "{";
  const types = Object.keys(this.portions);
  res += types.map((type) => `${type}: ${this.portions[type]}`).join(", ");
  return res + "}";
};

Jar.prototype.add = function (amount, type) {
  console.log(this.toString());
  console.log(`add: ${amount} of ${type}`);
  if (this.portions[type]) {
    this.portions[type] += amount;
  } else {
    this.portions[type] = amount;
  }
  console.log(this.toString());
};

Jar.prototype.pourOut = function (amount) {
  console.log(this.toString());
  console.log(`pour out: ${amount}`);
  const total = this.getTotalAmount();
  if (amount >= total) {
    this.portions = {};
  } else {
    const types = Object.keys(this.portions);
    types.forEach((type) => {
      const remaining = Math.floor(
        (this.portions[type] * (total - amount)) / total
      );
      this.portions[type] = remaining;
    });
  }
  console.log(this.toString());
};

Jar.prototype.getTotalAmount = function () {
  return Object.values(this.portions).reduce((prev, cur) => prev + cur, 0);
};

Jar.prototype.getConcentration = function (type) {
  if (this.portions[type]) {
    return this.portions[type] / this.getTotalAmount();
  } else {
    return 0;
  }
};
