// MinValues
const MIN_FLOAT_32 = -3.4e38;
const MIN_FLOAT_64 = Number.MIN_VALUE;

// MaxValues
const MAX_FLOAT_32 = 3.4e38;
const MAX_FLOAT_64 = Number.MAX_VALUE;

/**
 * Verify if float is valid
 * @param {number | string | bigint | Uint} value
 * @param {number | string | bigint} min
 * @param {number | string | bigint} max
 * @returns
 */
function verify(value, min, max) {
  if (value instanceof Float) {
    value = value.float;
  }

  [value, min, max] = [Number(value), Number(min), Number(max)];
  return value >= min && value <= max;
}

class InvalidFloat extends TypeError {
  constructor(code, message, base = "") {
    super(message);
    this.name = `InvalidFloat${base}[${code}]`;

    this[Symbol("code")] = code;
  }
}

class Float {
  constructor(float) {
    if (
      (typeof float !== "number" && typeof float !== "string") ||
      (Number.isInteger(float) && !Float.isFloat(float)) ||
      !Number.isFinite(float)
    ) {
      if (Number.isInteger(float))
        throw new InvalidFloat(
          "RECEIVED_INTEGER",
          "The value received is a integer not float"
        );

      throw new InvalidFloat(
        "NOT_A_FLOAT",
        "The value received is not a valid float"
      );
    }

    if (typeof float === "string") float = Number(float);

    /**
     * @type {number}
     */
    this.float = float;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  add(x) {
    this.float += Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    this.float -= Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  div(x) {
    this.float /= Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    this.float *= Number(x);
    return this;
  }

  trunc() {
    return Int.from(Math.trunc(this.float));
  }

  ceil() {
    return Int.from(Math.ceil(this.float));
  }

  fract() {
    return new Float(this.float - Math.floor(this.float));
  }

  toExponential() {
    return this.float.toExponential(...arguments);
  }

  toFixed() {
    return this.float.toFixed(...arguments);
  }

  toPrecision() {
    return this.float.toPrecision(...arguments);
  }

  toLocaleString() {
    return this.float.toLocaleString(...arguments);
  }

  toString() {
    return String(this.float);
  }

  parse() {
    return this.float;
  }

  static isFloat(float) {
    if (
      (typeof float === "number" || typeof float === "string") &&
      ((!Number.isInteger(float) && Number.isFinite(float)) ||
        Number(float) > Number.MAX_SAFE_INTEGER)
    ) {
      return true;
    }

    return false;
  }

  static from(float, base) {
    switch (base) {
      case "32": {
        return new Float32(float);
      }
      case "double":
      case "64": {
        return new Float64(float);
      }
      default: {
        return new Float(float);
      }
    }
  }
}

class Float32 extends Float {
  constructor(float) {
    super(float);

    if (!Float32.isFloat32(float)) {
      if (float < MIN_FLOAT_32)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_FLOAT_32} but it was received ${float}`,
          "32"
        );
      if (float > MAX_FLOAT_32)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_FLOAT_32} but it was received ${float}`,
          "32"
        );

      throw new InvalidFloat(
        "INVALID_FLOAT",
        "The value received is not a valid 32-bit float",
        "32"
      );
    }
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  add(x) {
    this.float += Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    this.float -= Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  div(x) {
    this.float /= Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    this.float *= Number(x);
    return this;
  }

  fract() {
    return new Float32(this.float - Math.floor(this.float));
  }

  static isFloat32(float) {
    return Float.isFloat(float) && verify(float, MIN_FLOAT_32, MAX_FLOAT_32);
  }

  static from(float) {
    return super.from(float, "32");
  }
}

class Float64 extends Float {
  constructor(float) {
    super(float);

    if (!Float64.isFloat64(float)) {
      if (Int.isInt(float)) {
        throw new InvalidFloat(
          "INT_RECEIVED",
          "The value received is a int and not a valid 32-bit float"
        );
      }

      if (float < MIN_FLOAT_64)
        throw new InvalidInt(
          "INVALID_MIN_VALUE",
          `The expected minimum value was ${MIN_FLOAT_64} but it was received ${float}`,
          "64"
        );
      if (float > MAX_FLOAT_64)
        throw new InvalidInt(
          "INVALID_MAX_VALUE",
          `The expected maximum value was ${MAX_FLOAT_64} but it was received ${float}`,
          "64"
        );

      throw new InvalidFloat(
        "INVALID_FLOAT",
        "The value received is not a valid 32-bit float",
        "32"
      );
    }
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  add(x) {
    this.float += Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  remove(x) {
    this.float -= Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  div(x) {
    this.float /= Number(x);
    return this;
  }

  /**
   * @param {Float | Int | number | bigint} x
   * @returns
   */
  multiply(x) {
    this.float *= Number(x);
    return this;
  }

  fract() {
    return new Float64(this.float - Math.floor(this.float));
  }

  static isFloat64(float) {
    return Float.isFloat(float) && verify(float, MIN_FLOAT_64, MAX_FLOAT_64);
  }

  static isDouble(float) {
    return this.isFloat64(float);
  }

  static from(float) {
    return super.from(float, "64");
  }
}

Float.Float = Float;
Float.Float32 = Float32;
Float.Float64 = Float64;
Float.Double = Float64;
Float.MIN_FLOAT_32 = MIN_FLOAT_32;
Float.MIN_FLOAT_64 = MIN_FLOAT_64;
Float.MAX_FLOAT_32 = MAX_FLOAT_32;
Float.MAX_FLOAT_64 = MAX_FLOAT_64;

module.exports = Float;
