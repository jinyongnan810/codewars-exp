# Goal

- Loosen the mind & have fun.

---

#### Day 97-117

- No.[81-94](https://github.com/jinyongnan810/codewars-exp/compare/789b22f923b6086f17186703b569665c0f5cf440...898c310923fcb4b9a7f530d9f9505d2733749e82)
- (typescript)check a map is different from the other

```ts
bool isEqual(Map<int,int> other) {
    if (other.keys.toSet().difference(mine.keys.toSet()).isNotEmpty) {
      return false;
    }
    for (int key in mine.keys) {
      if (mine[key] != other[key]) {
        return false;
      }
    }
    return true;
  }
```

- [example](https://github.com/jinyongnan810/codewars-exp/blob/898c310923fcb4b9a7f530d9f9505d2733749e82/85.get-x-for-limit-m.dart) of solving math equations
- a [mind-binding project](https://github.com/jinyongnan810/codewars-exp/blob/898c310923fcb4b9a7f530d9f9505d2733749e82/89.bubbly-programming-lang.ts)(still not a clue)
- calculate gcd & lcm

```dart
// my way
int getLeaseCommonMultiple(int a, int b) {
  final decomposedA = primeDecomposition(a);
  final decomposedB = primeDecomposition(b);
  final keysSet = decomposedA.keys.toSet();
  Map<int, int> maxDecomposed = {};
  keysSet.addAll(decomposedB.keys.toSet());
  keysSet.forEach((key) {
    int aCount = decomposedA[key] ?? 0;
    int bCount = decomposedB[key] ?? 0;
    int m = max(aCount, bCount);
    maxDecomposed[key] = m;
  });
  int lcm = maxDecomposed.entries
      .fold<int>(1, (prev, cur) => prev * (pow(cur.key, cur.value).toInt()));
  return lcm;
}

int getGreatestCommonDivisor(List<int> list) {
  final max = list.fold<int>(0, (previousValue, element) {
    int s = element;
    return previousValue < s ? s : previousValue;
  });
  List<int> cd = [];
  for (int i = 2; i <= max; i++) {
    if (!checkIsPrime(i)) continue;
    while (list.every((element) => element % i == 0)) {
      cd.add(i);
      list = list.map((e) => (e / i).floor()).toList();
    }
  }
  return cd.fold(1, (previousValue, element) => previousValue * element);
}

// the other people's way
int getLcm(int a, int b) {
  return a * b ~/ getGcd(a, b);
}

int getGcd(int a, int b) {
  while (b > 0) {
    var temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
```

- (typescript)create 0~n-1 array

```ts
Array.from({ length: 5 }, (_, i) => i);
```

- (dart)create 0~n-1 array

```dart
Iterable.generate(5, (i) => i).toList();
```

---

#### Day 75-96

- No.[64-80](https://github.com/jinyongnan810/codewars-exp/compare/bda823595a5b0464595e87c7ecef87ba6bf04c1b...056e2941257d97c20531b91b13718b6e4f8f6dda)
- Make a tuple in dart

```dart
class Pair<T1, T2> {
  final T1 a;
  final T2 b;

  Pair(this.a, this.b);
  @override
  String toString() {
    return '[$a,$b]';
  }
}
```

- ultimate version of prime decomposition

```dart
Map<int, int> primeDecomposition(int n) {
  if (checkIsPrime(n)) {
    return {n: 1};
  }
  // get decompositions
  int nTmp = n;
  int s = sqrt(n).toInt();
  Map<int, int> res = {};
  for (int i = 2; i <= s; i++) {
    if (!checkIsPrime(i)) continue;
    int prime = i;
    if (prime > nTmp) break;
    while (nTmp % prime == 0) {
      nTmp ~/= prime;
      if (res[prime] != null)
        res[prime] = (res[prime] ?? 0) + 1;
      else
        res[prime] = 1;
    }
    if (nTmp > 1 && checkIsPrime(nTmp)) {
      res[nTmp] = 1;
      break;
    }
  }
  return res;
}

Map<int, bool> primes = {2: true, 3: true, 4: false};
bool checkIsPrime(int n) {
  if (primes.containsKey(n)) return primes[n] ?? false;
  int s = sqrt(n).floor();
  for (int i = 2; i <= s; i++) {
    if (n % i == 0) {
      primes[n] = false;
      return false;
    }
  }
  primes[n] = true;
  return true;
}
```

---

#### Day 64-74

- No. [58-63](https://github.com/jinyongnan810/codewars-exp/compare/d374e3faefd9ed735ed91428b0bd260a978ad8c4...456f21fbefc672576da16b3134d381f43af30c87)
- dart divide&get floor

```dart
a~/b
a~/=b
```

---

#### Day 55-63

- No. [52-57](https://github.com/jinyongnan810/codewars-exp/compare/b012a4e19af37dc07060664d53c27d8cbc3c7681...d1d37fd54b2125c2daf401727e335e4d3d242d15)
- Pick k items form list

```ts
const pickKItems = (k: number, list: number[]): number[][] => {
  if (k == list.length) return [list];
  if (k == 1) return list.map((x) => [x]);
  let res: number[][] = [];
  list.forEach((item, i) => {
    const restOfList = list.slice(i + 1, list.length);
    const pickKMinus1FromRest = pickKItems(k - 1, restOfList);
    pickKMinus1FromRest.forEach((l) => res.push([...l, item]));
  });
  return res;
};

// faster than above
const pickKItems_binary = (k: number, list: number[]): number[][] => {
  const res: number[][] = [];
  const max = 1 << list.length;
  for (let i = 1; i < max; i++) {
    res.push(list.filter((_, index) => (i >> index) & 1));
  }
  return res.filter((x) => x.length == k);
};
```

---

#### Day 45-54

- No. [41-51](https://github.com/jinyongnan810/codewars-exp/compare/6d92bb6e642ba51aa37c54c739796feb2d44dec8...1c3364a8065494c676b87de2ab1050dcfda88852)
- Multiply large numbers

```ts
const multiply = (x: string, y: string): string => {
  let res = "0";
  for (let i = y.length - 1; i >= 0; i--) {
    const m = multiply1Digit(x, y[i]);
    const zeros = y.length - 1 - i;
    res = sum(res, m + (zeros > 0 ? "0".repeat(zeros) : ""));
  }
  return res;
};
const multiply1Digit = (x: string, y: string): string => {
  const yNum = +y;
  const stack: number[] = [];
  let prevOverflow = 0;
  for (let i = x.length - 1; i >= 0; i--) {
    const m = +x[i] * yNum + prevOverflow;
    stack.push(m % 10);
    prevOverflow = Math.floor(m / 10);
  }
  if (prevOverflow != 0) stack.push(prevOverflow);
  return stack.reverse().join("");
};
const sum = (a: string, b: string): string => {
  if (a.length > b.length) b = b.padStart(a.length, "0");
  else a = a.padStart(b.length, "0");
  let plus1 = 0;
  const stack = [];
  for (let i = a.length - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + plus1;
    if (sum > 9) plus1 = 1;
    else plus1 = 0;
    stack.push((sum % 10).toString());
  }
  if (plus1 == 1) stack.push("1");
  return stack.reverse().join("");
};
```

---

#### Day 32-44

- No [38-43](https://github.com/jinyongnan810/codewars-exp/compare/e7a13f5a5e9c5cd5c29aa1d58fcc4d5122f25758...e283c11fda9dc0a0a04c1c62866cfc482f26f0b5)
- create a huffman-tree
  ![huffman-tree](https://user-images.githubusercontent.com/29720903/150036931-0e36753a-f4e4-4448-89fd-bbbf5b38de65.png)

- mix and match

```ts
const getAllPairs = (arr: string[][]): string[] => {
  if (arr.length > 1) {
    const rest = getAllPairs(arr.slice(1));
    const cur = arr[0];
    const res: string[] = [];
    for (let i = 0; i < cur.length; i++) {
      rest.forEach((r) => res.push(cur[i] + r));
    }
    return res;
  }
  return arr[0];
};
```

---

#### Day 32-33

- [Binary divide by 5](https://github.com/jinyongnan810/codewars-exp/blob/master/37.divide-by-5.ts)
- convert nfa to regex
  ![nfa-to-regex](https://user-images.githubusercontent.com/29720903/149097813-28831afb-9578-4f1a-80a3-6bea4ff47d2a.png)

#### Day 24-31

- No [29-36](https://github.com/jinyongnan810/codewars-exp/compare/38095907341c16f98523a1ceee2d46e5cb9387b7...6cbce97cfdb497bb72669960be8265b9c84be2e6)
- Whiteboard drawing really helps.
- When compare string

```ts
// use > / < is probably better idea
mixCounts.sort((a, b) => {
  if (a.length > b.length) return -1;
  if (a.length < b.length) return 1;
  if (a > b) return 1;
  else if (a < b) return -1;
  return 0;
});
// and using localeCompare may give unexpected results.
a.localeCompare(b);
```

---

#### Day 18-23

- No [22-28](https://github.com/jinyongnan810/codewars-exp/compare/16f2446ba5c6fd02908de5937976271f44983fe1...550707142dea809ff21371396d3ed6ca2858a164)
- Check a number is xxxxx

```ts
/^(\d)\1{2,}$/.test(n.toString());
```

- Make O((n+1)\*n/2) to O(n) [sample](https://github.com/jinyongnan810/codewars-exp/blob/550707142dea809ff21371396d3ed6ca2858a164/23.sum-pairs.ts)
- Trunk `1.23456789` to `1.234567`

```ts
Math.trunc(res * 1e6) / 1e6;
```

- Trim a char at each end

```ts
bits = bits.replace(/(^0+|0+$)/g, "");
```

- Find base unit in morse code

```ts
var sets: string[] = bits.match(/(1+|0+)/g);
var unit: number = sets[0].length;
for (let i: number = 0; i < sets.length - 1; i++) {
  if (sets[i].length > sets[i + 1].length) {
    unit = sets[i + 1].length;
    break;
  }
}
```

- Decode the morse code

```ts
morseCode
  .replace(/\s{3}/g, " | ")
  .split(" ")
  .map((v) => (v === "|" ? " " : MORSE_CODE[v]))
  .join("");
```

- Shuffle the string

```ts
const shuffle = (first: string, rest: string): string[] => {
  if (rest.length === 1) return [first + rest];
  let res: string[] = [];
  for (let i = 0; i < rest.length; i++) {
    const shufflesOfTheRest = shuffle(
      rest.charAt(i),
      rest.slice(0, i) + rest.slice(i + 1)
    );
    res = [
      ...res,
      ...shufflesOfTheRest.map((shuffleOfTheRest) => first + shuffleOfTheRest),
    ];
  }
  return res;
};
```

---

#### Day 12-17

- No [16-21](https://github.com/jinyongnan810/codewars-exp/compare/a1c988456145e72de5972a4a7136fb3fb401b265...a8abc5d058ac3b4e68060f98052cd91275d76a75)
- To make something like `sum(1)(2)...(n)`
  - If the length is fixed, we can consider using the [currying](https://javascript.info/currying-partials)
  - Else we can use `valueOf` of the function

```ts
export function add(x: number): any {
  const fn = (y: number) => add(x + y);
  fn.valueOf = () => x;
  return fn;
}
```

---

#### Day 5-11

- No [7-15](https://github.com/jinyongnan810/codewars-exp/compare/e90f59fbb72bd6e20c099696c4bd8f37fd571dec...b170724ba4d949cad5efc2586ca65a8fea846cfa)
- Regex replace

```ts
// replace with a function
string.replace(/\w{5,}/g, function (w) {
  return w.split("").reverse().join("");
});
// replace with position switched
a.replace(/(\w)(\w+)*/g, "$2$1ay");
```

- Remove duplicates in array

```ts
[...new Set(array.filter((e, i) => array.indexOf(e) !== i))].length;
```

---

#### Day 1-4

- No [1~6](https://github.com/jinyongnan810/codewars-exp/compare/e8ce074fb2b0b071af9b2e1ee3987688fda2e675...0d5761b3f9549fe72bde9f800807b8d20dd2951a)
- Get the list of the numbers below specified

```ts
[...Array(number)].map((_, i) => i); // by the way Array(number).map((_,i) => i) didn't work.
```

- (Python)Get repeated string & get last 4 chars

```py
"#"*(len(cc)-4) + cc[-4:]
```

- (Python)Make a set from string & compare the sets

```py
set(string.ascii_lowercase) <= set(s.lower())
```
