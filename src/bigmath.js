/** Equal to Math.pow but for bigint values
 * @param {number | string | bigint} base
 * @param {number | string | bigint} exp
 * @returns {bigint}
 */
function pow(base, exp) {
  [base, exp] = [BigInt(base), BigInt(exp)];
  return base ** exp;
}

/**
 * Equal to Math.abs but for bigint values
 * @param {bigint | number | string} x
 * @returns {bigint}
 */
function abs(x) {
  x = BigInt(x);
  return x < 0n ? -x : x;
}

/**
 * Equal to Math.sign but for bigint values
 * @param {bigint | number | string} x
 * @returns {bigint}
 */
function sign(x) {
  x = BigInt(x);
  if (x === 0n) return 0n;
  return x < 0n ? -1n : 1n;
}

/**
 * Equal to Math.min but for bigint values
 * @param  {...(number | bigint | string)} values
 * @returns {bigint}
 */
function min(...values) {
  if (!values) return BigInt(0);

  return values.reduce((min, current) => {
    [min, current] = [BigInt(min), BigInt(current)];
    return current < min ? current : min;
  }, BigInt(values[0]));
}

/**
 * Equal to Math.max but for bigint values
 * @param  {...(number | bigint | string)} values
 * @returns {bigint}
 */
function max(...values) {
  if (!values) return BigInt(0);

  return values.reduce((max, current) => {
    [max, current] = [BigInt(max), BigInt(current)];
    return current > max ? current : max;
  }, BigInt(values[0]));
}

const BigMath = {
  pow,
  abs,
  sign,
  min,
  max,
};

module.exports = BigMath;
