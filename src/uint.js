const { getMaxValue, big, getMinValue } = require("./utils");
const Int = require("./int");
const BigMath = require("./bigmath");
const { Float } = require("./float");

// Min values
const MIN_UINT = big(getMinValue(0));

// Max values
const MAX_UINT_8 = getMaxValue(8);
const MAX_UINT_16 = getMaxValue(16);
const MAX_UINT_32 = getMaxValue(32);
const MAX_UINT_64 = getMaxValue(64);
const MAX_UINT_128 = getMaxValue(128);

/**
 * Verify if uint is valid
 * @param {number | string | bigint | Uint} value
 * @param {number | string | bigint} min
 * @param {number | string | bigint} max
 * @returns
 */
function verify(value, min, max) {
  if (value instanceof Int) {
    value = value.int;
  }

  [value, min, max] = [big(value), big(min), big(max)];
  return value >= min && value <= max;
}

class InvalidUnsignedInt extends TypeError {
  constructor(code, message, base = "") {
    super(message);
    this.name = `InvalidUnsignedInt${base}[${code}]`;

    this[Symbol("code")] = code;
  }
}

const cache = new Map();

class Uint {
  constructor(int) {
    let high, low;
    if (arguments.length > 1) {
      [high, low] = arguments;
    }

    if (high && low) {
      if (cache.has(`${high},${low}`)) {
        int = cache.get(`${high},${low}`);
      } else if (Int.Bigger.isBigger(high) || Int.Bigger.isBigger(low)) {
        int = new Int.Bigger(high, low);
      } else if (
        Int.LongLong.isLongLong(high) ||
        Int.LongLong.isLongLong(low)
      ) {
        int = new Int.LongLong(high, low);
      } else {
        int = new Int.Long(high, low).int;
      }
    }

    if (typeof int === "number") {
      if (Float.isFloat(int)) {
        throw new InvalidUnsignedInt(
          "NOT_A_UINT",
          "The value received is a float and not a valid unsigned integer"
        );
      }
    }

    if (
      typeof int !== "bigint" &&
      typeof int !== "string" &&
      typeof int !== "number" &&
      !(int instanceof Uint)
    ) {
      throw new InvalidUnsignedInt(
        "NOT_A_UINT",
        "The value received is not a valid unsigned integer"
      );
    }

    if (int instanceof Uint) int = int.int;

    this.int = big(int);

    if (this.int < MIN_UINT) {
      throw new InvalidUnsignedInt(
        "NEGATIVE_NUMBER",
        "The received number is negative"
      );
    }
  }

  toLocaleString(locales, options) {
    return this.int.toLocaleString(locales, options);
  }

  valueOf() {
    return this.int.valueOf();
  }

  toString() {
    return String(this.int);
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Uint(this.int + big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Uint(this.int - big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Uint(this.int / big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Uint(this.int * x);
  }

  abs() {
    return BigMath.abs(this.int);
  }

  sign() {
    return BigMath.sign(this.int);
  }

  /**
   * @param {bigint | string | number} exp
   * @returns {bigint}
   */
  pow(exp) {
    return BigMath.pow(this.int, exp);
  }

  parse() {
    return this.int;
  }

  static isUint(int) {
    if (int instanceof Int) {
      int = int.int;
    }

    return (
      Uint8.isUint8(int) ||
      Uint16.isUint16(int) ||
      Uint32.isUint32(int) ||
      Uint64.isUint64(int) ||
      Uint128.isUint128(int)
    );
  }

  /**
   * @param {string | number | bigint} int
   * @param {"8" | "16" | "32" | "64" | "128"} base
   * @returns {Uint8 | Uint16 | Uint32 | Uint64 | Uint}
   */
  static from(int, base) {
    switch (base) {
      case "8": {
        return new Uint8(int);
      }
      case "16": {
        return new Uint16(int);
      }
      case "32": {
        return new Uint32(int);
      }
      case "64": {
        return new Uint64(int);
      }
      case "128": {
        return new Uint128(int);
      }
      default: {
        return new Uint(int);
      }
    }
  }
}

class Uint8 extends Uint {
  constructor() {
    super(...arguments);

    if (!Uint8.isUint8(this.int)) {
      if (this.int < MIN_UINT)
        throw new InvalidUnsignedInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_UINT} but it was received ${this.int}`,
          "8"
        );
      if (this.int > MAX_UINT_8)
        throw new InvalidUnsignedInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_UINT_8} but it was received ${this.int}`,
          "8"
        );

      throw new InvalidUnsignedInt(
        "INVALID_UINT",
        "The value received is not a valid 8-bit unsigned integer",
        "8"
      );
    }
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Uint8(this.int + big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Uint8(this.int - big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Uint8(this.int / big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Uint8(this.int * x);
  }

  static from(int) {
    return super.from(int, "8");
  }

  static isUint8(int) {
    if (Number.isInteger(int) || typeof int === "bigint") {
      return verify(int, MIN_UINT, MAX_UINT_8);
    }

    return false;
  }
}

class Uint16 extends Uint {
  constructor() {
    super(...arguments);

    if (!Uint16.isUint16(this.int)) {
      if (this.int < MIN_UINT)
        throw new InvalidUnsignedInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_UINT} but it was received ${this.int}`,
          "16"
        );
      if (this.int < MAX_UINT_16)
        throw new InvalidUnsignedInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_UINT_16} but it was received ${this.int}`,
          "16"
        );

      throw new InvalidUnsignedInt(
        "INVALID_UINT",
        "The value received is not a valid 16-bit unsigned integer",
        "16"
      );
    }
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Uint16(this.int + big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Uint16(this.int - big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Uint16(this.int / big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Uint16(this.int * x);
  }

  static from(int) {
    return super.from(int, "16");
  }

  static isUint16(int) {
    if (Number.isInteger(int) || typeof int === "bigint") {
      return verify(int, MIN_UINT, MAX_UINT_16);
    }

    return false;
  }
}

class Uint32 extends Uint {
  constructor() {
    super(...arguments);

    if (!Uint32.isUint32(this.int)) {
      if (this.int < MIN_UINT)
        throw new InvalidUnsignedInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_UINT} but it was received ${this.int}`,
          "32"
        );
      if (this.int < MAX_UINT_32)
        throw new InvalidUnsignedInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_UINT_32} but it was received ${this.int}`,
          "32"
        );

      throw new InvalidUnsignedInt(
        "INVALID_UINT",
        "The value received is not a valid 32-bit unsigned integer",
        "32"
      );
    }
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Uint32(this.int + big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Uint32(this.int - big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Uint32(this.int / big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Uint32(this.int * x);
  }

  static from(int) {
    return super.from(int, "32");
  }

  static isUint32(int) {
    if (
      typeof int === "bigint" ||
      typeof int === "string" ||
      typeof int === "number"
    ) {
      return verify(int, MIN_UINT, MAX_UINT_32);
    }

    return false;
  }
}

class Uint64 extends Uint {
  constructor() {
    super(...arguments);

    if (!Uint64.isUint64(this.int)) {
      if (this.int < MIN_UINT)
        throw new InvalidUnsignedInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_UINT} but it was received ${this.int}`,
          "64"
        );
      if (this.int < MAX_UINT_64)
        throw new InvalidUnsignedInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_UINT_64} but it was received ${this.int}`,
          "64"
        );

      throw new InvalidUnsignedInt(
        "INVALID_UINT",
        "The value received is not a valid 8-bit unsigned integer",
        "64"
      );
    }
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Uint64(this.int + big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Uint64(this.int - big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Uint64(this.int / big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Uint64(this.int * x);
  }

  static from(int) {
    return super.from(int, "64");
  }

  static isUint64(int) {
    if (
      typeof int === "bigint" ||
      typeof int === "string" ||
      typeof int === "number"
    ) {
      return verify(int, MIN_UINT, MAX_UINT_64);
    }

    return false;
  }
}

class Uint128 extends Uint {
  constructor() {
    super(...arguments);

    if (!Uint128.isUint128(this.int)) {
      if (this.int < MIN_UINT)
        throw new InvalidUnsignedInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_UINT} but it was received ${this.int}`,
          "128"
        );
      if (this.int < MAX_UINT_128)
        throw new InvalidUnsignedInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_UINT_12} but it was received ${this.int}`,
          "128"
        );

      throw new InvalidUnsignedInt(
        "INVALID_UINT",
        "The value received is not a valid 8-bit unsigned integer",
        "128"
      );
    }
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  add(x) {
    return new Uint128(this.int + big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    return new Uint128(this.int - big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  div(x) {
    return new Uint128(this.int / big(x));
  }

  /**
   * @param {Uint | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    return new Uint128(this.int * x);
  }

  static from(int) {
    return super.from(int, "128");
  }

  /**
   *
   * @param {number | bigint | string} int
   * @returns
   */
  static isUint128(int) {
    if (
      typeof int === "bigint" ||
      typeof int === "string" ||
      typeof int === "number"
    ) {
      return verify(int, MIN_UINT, MAX_UINT_128);
    }

    return false;
  }
}

Uint.Uint = Uint;
Uint.Uint8 = Uint8;
Uint.Uint16 = Uint16;
Uint.Uint32 = Uint32;
Uint.Uint64 = Uint64;
Uint.Uint128 = Uint128;
Uint.MAX_UINT_8 = MAX_UINT_8;
Uint.MAX_UINT_16 = MAX_UINT_16;
Uint.MAX_UINT_32 = MAX_UINT_32;
Uint.MAX_UINT_64 = MAX_UINT_64;
Uint.MAX_UINT_128 = MAX_UINT_128;
Uint.MIN_UINT = MIN_UINT;
Uint.Invalid = InvalidUnsignedInt;

module.exports = Uint;
