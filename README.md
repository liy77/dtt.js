# Dtt.js

## Installation

```bash
pnpm add https://github.com/JustAWaifuHunter/dtt.js
```

## Example

```js
const { Biggest, BigMath } = require("dtt.js");

function fibonacci(size) {
  let a = new Biggest(0),
    b = new Biggest(1);

  for (let i = BigInt(1); i < size; i++) {
    [a, b] = [b, a.add(b)];
  }

  return a;
}

console.log(fibonacci(BigInt(10)).isReallyBiggest()); // false

console.log(fibonacci(BigMath.pow(10, 4)).isReallyBiggest()); // true
```
