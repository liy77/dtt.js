export type BigMathExpression = string | bigint | number;

export interface bigmath {
  /** Equal to Math.pow but for bigint values
   */
  pow(base: BigMathExpression, exp: BigMathExpression): bigint;
  /**
   * Equal to Math.abs but for bigint values
   */
  abs(x: BigMathExpression): bigint;
  /**
   *
   * Equal to Math.sign but for bigint values
   */
  sign(x: BigMathExpression): bigint;
  /**
   * Equal to Math.min but for bigint values
   */
  min(...values: BigMathExpression[]): bigint;
  /**
   * Equal to Math.max but for bigint values
   */
  max(...values: BigMathExpression[]): bigint;
}

export const BigMath: bigmath;

export type Bases = "8" | "16" | "32" | "64" | "128";
export type FloatBase = Exclude<Bases, "8" | "16" | "128"> | "double";
export type IntBase = Bases;
export type UintBase = Bases;
export type strfy<T> = T | string;
export type IntOrBigInt = Int | Uint | number | bigint;

export abstract class MathExpressions<T, X> {
  add(x: X): T;
  remove(x: X): T;
  div(x: X): T;
  multiply(x: X): T;
}

export class Float<T = Float64> extends MathExpressions<
  T,
  strfy<T | IntOrBigInt>
> {
  float: number;
  constructor(float: strfy<float>);
  fract(float: strfy<Float>): T;
  parse(): number;

  static isFloat(float: strfy<float>): boolean;

  static from(float: strfy<float>): Float;
  static from(float: strfy<float>, base: "32"): Float32;
  static from(float: strfy<float>, base: "64"): Float64;
  static from(float: strfy<float>, base: "double"): Double;
  static from(float: strfy<float>, base?: FloatBase): Float | Float32 | Float64;

  static MIN_FLOAT_32: number;
  static MIN_FLOAT_64: number;

  static MAX_FLOAT_32: number;
  static MAX_FLOAT_64: number;
}

export class Float32 extends Float<Float32> {
  static isFloat32(float: strfy<float>): boolean;
  static from(float: strfy<float>): Float32;
}

export class Float64 extends Float<Float64> {
  static isFloat64(float: strfy<float>): boolean;
  static isDouble(float: strfy<float>): boolean;
  static from(float: strfy<float>): Float64;
}

export class Double extends Float64 {}

export class Int<T = Int128> extends MathExpressions<
  T,
  strfy<T | number | bigint>
> {
  int: number;
  constructor(int: strfy<int>);

  parse(): number;

  static isInt(int: strfy<int>): boolean;

  static from(int: strfy<int>): Int;
  static from(int: strfy<int>, base: "8"): Int8;
  static from(int: strfy<int>, base: "16"): Int16;
  static from(int: strfy<int>, base: "32"): Int32;
  static from(int: strfy<int>, base: "64"): Int64;
  static from(int: strfy<int>, base: "128"): Int128;
  static from(int: strfy<int>, base?: IntBase): Int;

  static biggest(x: strfy<Bigger | Biggest | IntOrBigInt>): Biggest;
  static biggest(
    high: strfy<Bigger | Biggest | IntOrBigInt>,
    low: strfy<Bigger | Biggest | IntOrBigInt>
  ): Biggest;
  static biggest(
    high: strfy<Bigger | Biggest | IntOrBigInt>,
    low: strfy<Bigger | Biggest | IntOrBigInt>,
    bitsSize: number
  ): Biggest;
  static biggest(...args: strfy<Bigger | Biggest | IntOrBigInt>[]): Biggest;
  static MIN_INT_8: number;
  static MIN_INT_16: number;
  static MIN_INT_32: number;
  static MIN_INT_64: number;
  static MIN_INT_128: number;

  static MAX_INT_8: number;
  static MAX_INT_16: number;
  static MAX_INT_32: number;
  static MAX_INT_64: number;
  static MAX_INT_128: number;
}

export class Int8 extends Int<Int8> {
  static isInt8(int: int): boolean;
  static from(int: strfy<int>): Int8;
}
export class Int16 extends Int<Int16> {
  static isInt16(int: int): boolean;
  static from(int: strfy<int>): Int16;
}
export class Int32 extends Int<Int32> {
  constructor(int: strfy<IntOrBigInt>);
  constructor(high: strfy<IntOrBigInt>, low: strfy<IntOrBigInt>);
  constructor(...args: strfy<IntOrBigInt>[]);

  static isInt32(int: int): boolean;
  static isLong(int: int): boolean;
  static from(int: strfy<int>): Int32;
}
export class Int64 extends Int<Int64> {
  declare int: bigint;
  constructor(int: strfy<IntOrBigInt>);
  constructor(high: strfy<IntOrBigInt>, low: strfy<IntOrBigInt>);
  constructor(...args: strfy<IntOrBigInt>[]);

  parse(): bigint;
  static isInt64(int: int): boolean;
  static isLongLong(int: int): boolean;
  static from(int: strfy<int>): Int64;
}
export class Int128 extends Int<Int128> {
  declare int: bigint;
  constructor(int: strfy<IntOrBigInt>);
  constructor(high: strfy<IntOrBigInt>, low: strfy<IntOrBigInt>);
  constructor(...args: strfy<IntOrBigInt>[]);

  parse(): bigint;
  static isInt128(int: int): boolean;
  static isBigger(int: int): boolean;
  static from(int: strfy<int>): Int128;
}

export class Long extends MathExpressions<
  Long,
  strfy<Int32 | Int64 | Int128 | IntOrBigInt>
> {
  parse(): bigint;
  int: bigint;
  is32Bits(): boolean;
  is64Bits(): boolean;
  static isLong(x: strfy<IntOrBigInt>): boolean;
  static from(x: strfy<IntOrBigInt>): Long;
}
export class LongLong extends Int64 {}
export class Bigger extends Int128 {}

export class Biggest extends MathExpressions<
  Long,
  strfy<Int32 | Int64 | Bigger | Biggest | IntOrBigInt>
> {
  constructor(
    high: strfy<Bigger | Biggest | IntOrBigInt>,
    low: strfy<Bigger | Biggest | IntOrBigInt>,
    bitsSize: number
  );
  constructor(
    high: strfy<Bigger | Biggest | IntOrBigInt>,
    low: strfy<Bigger | Biggest | IntOrBigInt>
  );
  constructor(x: strfy<Bigger | Biggest | IntOrBigInt>);
  constructor(...args: strfy<Bigger | Biggest | IntOrBigInt>[]);

  int: bigint;
  parse(): bigint;
  isReallyBiggest(): boolean;
  static isBigger(x: strfy<Bigger | Biggest | IntOrBigInt>): boolean;
  static isBiggest(x: strfy<Bigger | Biggest | IntOrBigInt>): boolean;

  static from(x: strfy<Bigger | Biggest | IntOrBigInt>): Biggest;
}

export class Uint<T = Uint128> extends MathExpressions<
  T,
  strfy<T | IntOrBigInt>
> {
  int: bigint;
  parse(): bigint;
  static isUint(int: strfy<uint>): boolean;

  static from(int: strfy<uint>): Uint;
  static from(int: strfy<uint>, base: "8"): Uint8;
  static from(int: strfy<uint>, base: "16"): Uint16;
  static from(int: strfy<uint>, base: "32"): Uint32;
  static from(int: strfy<uint>, base: "64"): Uint64;
  static from(int: strfy<uint>, base: "128"): Uint128;
  static from(int: strfy<uint>, base?: IntBase): Uint;

  static MIN_UINT: bigint;

  static MAX_UINT_8: bigint;
  static MAX_UINT_16: bigint;
  static MAX_UINT_32: bigint;
  static MAX_UINT_64: bigint;
  static MAX_UINT_128: bigint;
}

export class Uint8 extends Uint {
  static isUint8(int: strfy<uint>): boolean;
  static from(int: strfy<uint>): Uint8;
}

export class Uint16 extends Uint {
  static isUint16(int: strfy<uint>): boolean;
  static from(int: strfy<uint>): Uint16;
}

export class Uint32 extends Uint {
  static isUint32(int: strfy<uint>): boolean;
  static from(int: strfy<uint>): Uint32;
}

export class Uint64 extends Uint {
  static isUint64(int: strfy<uint>): boolean;
  static from(int: strfy<uint>): Uint64;
}

export class Uint128 extends Uint {
  static isUint128(int: strfy<uint>): boolean;
  static from(int: strfy<uint>): Uint128;
}

type U<T> = T | number;

export type int = U<Int>;
export type int8 = U<Int8>;
export type int16 = U<Int16>;
export type int32 = U<Int32>;
export type int64 = U<Int64>;
export type int128 = U<Int128>;

export type long = int64;
export type longlong = Int128;

export type uint = U<Uint>;
export type uint8 = U<Uint8>;
export type uint16 = U<Uint16>;
export type uint32 = U<Uint32>;
export type uint64 = U<Uint64>;
export type uint128 = U<Uint128>;

export type float = U<Float>;
export type float32 = U<Float32>;
export type float64 = U<Float64>;

export default {
  BigMath,

  Int,
  Int8,
  Int16,
  Int32,
  Int64,
  Int128,

  Uint,
  Uint8,
  Uint16,
  Uint32,
  Uint64,
  Uint128,

  Float,
  Float32,
  Float64,
};
