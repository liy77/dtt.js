"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const Int = require("./src/int");
const Float = require("./src/float");
const Uint = require("./src/uint");

const Exports = (module.exports.default = {
  BigMath: require("./src/bigmath"),
  Utils: require("./src/utils"),
  ...Uint,
  ...Int,
  ...Float,
  
  // Alias
  Long: Int.Long,
  LongLong: Int.Int64,
  Bigger: Int.Int128,

  Double: Float.Float64,
});

function exportStar(mod) {
  for (const key of Object.keys(mod)) {
    exports[key] = mod[key];
  }
}

exportStar(Exports);