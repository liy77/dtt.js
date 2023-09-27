/** Transforms a int to bigint */
const big = (x) => {
  if (typeof x === "object") {
    if (x.int) x = x.int;
    if (x.float) x = x.float;

    if (x.parse !== undefined) x = x.parse();
  }

  return BigInt(x);
};

const BigMath = require("./bigmath");

/**
 * @param {number | bigint} base
 * @returns {bigint}
 */
function getMaxValue(base) {
  return BigMath.pow(2, base) - big(1);
}

/**
 * @param {number | bigint} base
 * @returns {number}
 */
function getMinValue(base) {
  if (base === 0) return base;
  return -Math.abs(Number(BigMath.pow(2, base)));
}

module.exports = {
  big,
  getMaxValue,
  getMinValue,
};
