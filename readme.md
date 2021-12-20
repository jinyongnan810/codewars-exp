### My Codewars Experiences

#### Goal

- Loosen the mind & have fun.

---

#### Day 12-17

- From [16-21](https://github.com/jinyongnan810/codewars-exp/compare/a1c988456145e72de5972a4a7136fb3fb401b265...a8abc5d058ac3b4e68060f98052cd91275d76a75)
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

- From [7-15](https://github.com/jinyongnan810/codewars-exp/compare/e90f59fbb72bd6e20c099696c4bd8f37fd571dec...b170724ba4d949cad5efc2586ca65a8fea846cfa)
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

- From [1~6](https://github.com/jinyongnan810/codewars-exp/compare/e8ce074fb2b0b071af9b2e1ee3987688fda2e675...0d5761b3f9549fe72bde9f800807b8d20dd2951a)
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
