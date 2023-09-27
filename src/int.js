const { Float } = require("./float");
const { getMaxValue, getMinValue, big } = require("./utils");

// MinValues
const MIN_INT_8 = getMinValue(7);
const MIN_INT_16 = getMinValue(15);
const MIN_INT_32 = getMinValue(31);
const MIN_INT_64 = big(getMinValue(63));
const MIN_INT_128 = big(getMinValue(127));

// MaxValues
const MAX_INT_8 = Number(getMaxValue(7));
const MAX_INT_16 = Number(getMaxValue(15));
const MAX_INT_32 = Number(getMaxValue(31));
const MAX_INT_64 = getMaxValue(63);
const MAX_INT_128 = getMaxValue(127);

/**
 * Verify if int is valid
 * @param {number | string | bigint | Int} value
 * @param {number | string | bigint} min
 * @param {number | string | bigint} max
 * @returns
 */
function verify(value, min, max) {
  if (value instanceof Int) {
    value = value.int;
  }

  [value, min, max] = [Number(value), Number(min), Number(max)];
  return value >= min && value <= max;
}

/**
 * Verify if bigint is valid
 * @param {number | string | bigint | Uint} value
 * @param {number | string | bigint} min
 * @param {number | string | bigint} max
 * @returns
 */
function verifyBig(value, min, max) {
  if (value instanceof Int) {
    value = value.int;
  }

  [value, min, max] = [big(value), big(min), big(max)];
  return value >= min && value <= max;
}

class InvalidInt extends TypeError {
  constructor(code, message, base = "") {
    super(message);
    this.name = `InvalidInt${base}[${code}]`;

    this[Symbol("code")] = code;
  }
}

class Int extends Number {
  constructor(int) {
    if (
      (typeof int !== "number" &&
        typeof int !== "string" &&
        typeof int !== "bigint" &&
        !(int instanceof Int)) ||
      !Number.isInteger(Number(int))
    ) {
      throw new InvalidInt(
        "NOT_A_INTEGER",
        "The value received is not a valid integer"
      );
    }

    if (int instanceof Int) int = int.int;

    super(int);

    this.int = Number(int);
  }

  /**
   *
   * @param {number} exp
   * @returns
   */
  pow(exp) {
    return Math.pow(this.int, exp);
  }

  abs() {
    return Math.abs(this.int);
  }

  sign() {
    return Math.sign(this.sign);
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Int(this.int + Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Int(this.int - Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Int(this.int / x);
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Int(this.int * x);
  }

  parse() {
    return this.int;
  }

  static isInt(int) {
    return Number.isInteger(int) && Number.isFinite(int) && !Float.isFloat(int);
  }

  /**
   * @param {string | number | bigint} int
   * @param {"8" | "16" | "32" | "64" | "128"} base
   * @returns {Int8 | Int16 | Int32 | Int64 | Int}
   */
  static from(int, base) {
    switch (base) {
      case "8": {
        return new Int8(int);
      }
      case "16": {
        return new Int16(int);
      }
      case "32": {
        return new Int32(int);
      }
      case "64": {
        return new Int64(int);
      }
      case "128": {
        return new Int128(int);
      }
      default: {
        return new Int(int);
      }
    }
  }

  static biggest() {
    return new Biggest(...arguments);
  }
}

class Int8 extends Int {
  constructor(int) {
    super(int);

    if (!Int8.isInt8(int)) {
      if (this.int < MIN_INT_8)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_INT_8} but it was received ${int}`,
          "8"
        );
      if (this.int > MAX_INT_8)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_INT_8} but it was received ${int}`,
          "8"
        );

      throw new InvalidInt(
        "INVALID_INT",
        "The value received is not a valid 8-bit integer",
        "8"
      );
    }
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Int8(this.int + Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Int8(this.int - Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Int8(this.int / x);
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Int8(this.int * x);
  }

  static isInt8(int) {
    return verify(int, MIN_INT_8, MAX_INT_8);
  }

  static from(int) {
    return super.from(int, "8");
  }
}

class Int16 extends Int {
  constructor(int) {
    super(int);

    if (!Int16.isInt16(int)) {
      if (this.int < MIN_INT_16)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_INT_16} but it was received ${int}`,
          "16"
        );
      if (this.int > MAX_INT_16)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_INT_16} but it was received ${int}`,
          "16"
        );

      throw new InvalidInt(
        "INVALID_INT",
        "The value received is not a valid 16-bit integer",
        "16"
      );
    }
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Int16(this.int + Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Int16(this.int - Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Int16(this.int / x);
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Int16(this.int * x);
  }

  static isInt16(int) {
    return verify(int, MIN_INT_16, MAX_INT_16);
  }

  static from(int) {
    return super.from(int, "16");
  }
}

function resolveBit(bit) {
  if (bit instanceof Int) {
    bit = bit.int;
  }

  if (typeof bit === "string") {
    return big(Number.parseInt(bit.replace(/^#/, ""), 16));
  } else if (typeof bit === "number") {
    return big(bit);
  }

  return bit;
}

// The long class to be extended
class _Long {
  constructor(int) {
    let high, low;
    if (arguments.length > 1) {
      [high, low] = [resolveBit(arguments[0]), resolveBit(arguments[1])];

      if (high && low) {
        int = (high << big(32)) + low;
      }
    }

    if (
      typeof int !== "number" &&
      typeof int !== "string" &&
      typeof int !== "bigint" &&
      !(int instanceof Int)
    ) {
      throw new InvalidInt(
        "NOT_A_INTEGER",
        "The value received is not a valid integer"
      );
    }

    if (int instanceof Int) int = int.int;

    this.int = Number(int);
  }

  parse() {
    return this.int;
  }
}

// The Long Long class to be extended
class LongLong {
  constructor(int) {
    let high, low;
    if (arguments.length > 1) {
      [high, low] = [resolveBit(arguments[0]), resolveBit(arguments[1])];

      if (high && low) {
        int = (high << big(64)) + low;
      }
    }

    if (
      typeof int !== "number" &&
      typeof int !== "string" &&
      typeof int !== "bigint" &&
      !(int instanceof Int)
    ) {
      throw new InvalidInt(
        "NOT_A_INTEGER",
        "The value received is not a valid integer"
      );
    }

    if (int instanceof Int) int = int.int;

    this.int = big(int);
  }

  parse() {
    return this.int;
  }
}

// Long
class Int32 extends _Long {
  constructor() {
    super(...arguments);

    if (!Int32.isInt32(this.int)) {
      if (this.int < MIN_INT_32)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_INT_32} but it was received ${this.int}`,
          "32"
        );
      if (this.int > MAX_INT_32)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_INT_32} but it was received ${this.int}`,
          "32"
        );

      throw new InvalidInt(
        "INVALID_INT",
        "The value received is not a valid 32-bit integer",
        "32"
      );
    }
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Int32(this.int + Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Int32(this.int - Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Int32(this.int / Number(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Int32(this.int * Number(x));
  }

  static isInt32(int) {
    return verify(int, MIN_INT_32, MAX_INT_32);
  }

  static isLong(int) {
    return this.isInt32(int);
  }

  static from(int) {
    return super.from(int, "32");
  }
}

// Long Long
class Int64 extends LongLong {
  constructor() {
    super(...arguments);

    if (!Int64.isInt64(this.int)) {
      if (this.int < MIN_INT_64)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_INT_64} but it was received ${this.int}`,
          "64"
        );
      if (this.int > MAX_INT_64)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_INT_64} but it was received ${this.int}`,
          "64"
        );

      throw new InvalidInt(
        "INVALID_INT",
        "The value received is not a valid 64-bit integer",
        "64"
      );
    }
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    this.int += big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    this.int -= big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    this.int /= big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    this.int *= big(x);
    return this;
  }

  static isInt64(int) {
    return verifyBig(int, MIN_INT_64, MAX_INT_64);
  }

  /**
   * @param {*} int
   * @returns
   */
  static isLongLong(int) {
    return this.isInt64(int);
  }

  static from(int) {
    return super.from(int, "64");
  }
}

// Bigger
class Int128 extends LongLong {
  constructor() {
    super(...arguments);

    if (!Int128.isInt128(this.int)) {
      if (this.int < MIN_INT_128)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_INT_128} but it was received ${this.int}`,
          "128"
        );
      if (this.int > MAX_INT_128)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_INT_128} but it was received ${this.int}`,
          "128"
        );

      throw new InvalidInt(
        "INVALID_INT",
        "The value received is not a valid 128-bit integer",
        "128"
      );
    }
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    this.int += big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    this.int -= big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    this.int /= big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    this.int *= big(x);
    return this;
  }

  static isInt128(int) {
    return verifyBig(int, MIN_INT_128, MAX_INT_128);
  }

  static isBigger(int) {
    return this.isInt128(int);
  }

  static from(int) {
    return super.from(int, "128");
  }
}

class Biggest {
  constructor(int) {
    let high, low;
    if (arguments.length > 1) {
      [high, low] = [resolveBit(arguments[0]), resolveBit(arguments[1])];

      if (high && low) {
        int =
          (high << big(typeof arguments[2] === "number" ? arguments[2] : 128)) +
          low;
      }
    }

    if (
      typeof int !== "number" &&
      typeof int !== "string" &&
      typeof int !== "bigint" &&
      !(int instanceof Int)
    ) {
      throw new InvalidInt(
        "NOT_A_INTEGER",
        "The value received is not a valid integer"
      );
    }

    if (int instanceof Int) int = int.int;

    this.int = big(int);
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    this.int += big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    this.int -= big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    this.int /= big(x);
    return this;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    this.int *= big(x);
    return this;
  }

  parse() {
    return this.int;
  }

  isReallyBiggest() {
    return Biggest.isBiggest(this.int);
  }

  static isBiggest(x) {
    return x > MAX_INT_128;
  }

  static isBigger(x) {
    return Int128.isBigger(x);
  }

  static from(x) {
    return Int.biggest(x);
  }
}

class Long {
  #value;
  constructor() {
    let value;
    try {
      value = new Int32(...arguments);
    } catch {
      try {
        value = new Int64(...arguments);
      } catch {
        throw new TypeError("Invalid long value, use Biggest instead");
      }
    }

    this.#value = value;
    this.int = big(this.#value.int);
  }

  parse() {
    return this.int;
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Int128(this.int + big(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Int128(this.int - big(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Int128(this.int / big(x));
  }

  /**
   * @param {Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Int128(this.int * big(x));
  }

  is64Bits() {
    return this.#value instanceof Int64;
  }

  is32Bits() {
    return this.#value instanceof Int32;
  }

  static isLong(int) {
    return Int32.isInt32(int) || Int64.isInt64(int);
  }

  static from(int) {
    return new Long(int);
  }
}

Int.Int = Int;
Int.Int8 = Int8;
Int.Int16 = Int16;
Int.Int32 = Int32;
Int.Int64 = Int64;
Int.Int128 = Int128;
Int.Long = Long;
Int.Biggest = Biggest;

Int.MAX_INT_8 = MAX_INT_8;
Int.MAX_INT_16 = MAX_INT_16;
Int.MAX_INT_32 = MAX_INT_32;
Int.MAX_INT_64 = MAX_INT_64;
Int.MAX_INT_128 = MAX_INT_128;
Int.MIN_INT_8 = MIN_INT_8;
Int.MIN_INT_16 = MIN_INT_16;
Int.MIN_INT_32 = MIN_INT_32;
Int.MIN_INT_64 = MIN_INT_64;
Int.MIN_INT_128 = MIN_INT_128;

Int.Invalid = InvalidInt;

// alias
Int.LongLong = Int64;
Int.Bigger = Int128;

module.exports = Int;
