(() => {
  // node_modules/bs-platform/lib/es6/caml_array.js
  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while (j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }
    ;
    return result;
  }

  // node_modules/bs-platform/lib/es6/curry.js
  function app(_f, _args) {
    while (true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      }
      if (d >= 0) {
        return function(f2, args2) {
          return function(x) {
            return app(f2, args2.concat([x]));
          };
        }(f, args);
      }
      _args = caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity));
      continue;
    }
    ;
  }
  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1:
          return o(a0);
        case 2:
          return function(param) {
            return o(a0, param);
          };
        case 3:
          return function(param, param$1) {
            return o(a0, param, param$1);
          };
        case 4:
          return function(param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
        case 5:
          return function(param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
        case 6:
          return function(param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
        default:
          return app(o, [a0]);
      }
    }
  }
  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [a1]);
        case 2:
          return o(a0, a1);
        case 3:
          return function(param) {
            return o(a0, a1, param);
          };
        case 4:
          return function(param, param$1) {
            return o(a0, a1, param, param$1);
          };
        case 5:
          return function(param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
        case 6:
          return function(param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          };
        default:
          return app(o, [
            a0,
            a1
          ]);
      }
    }
  }

  // node_modules/bs-platform/lib/es6/caml_bytes.js
  function set(s, i, ch) {
    if (i < 0 || i >= s.length) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "index out of bounds",
        Error: new Error()
      };
    }
    s[i] = ch;
  }
  function caml_fill_bytes(s, i, l, c) {
    if (l <= 0) {
      return;
    }
    for (var k = i, k_finish = l + i | 0; k < k_finish; ++k) {
      s[k] = c;
    }
  }
  function caml_create_bytes(len) {
    if (len < 0) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "String.create",
        Error: new Error()
      };
    }
    var result = new Array(len);
    for (var i = 0; i < len; ++i) {
      result[i] = 0;
    }
    return result;
  }
  function caml_blit_bytes(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return;
    }
    if (s1 === s2) {
      if (i1 < i2) {
        var range_a = (s1.length - i2 | 0) - 1 | 0;
        var range_b = len - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for (var j = range; j >= 0; --j) {
          s1[i2 + j | 0] = s1[i1 + j | 0];
        }
        return;
      }
      if (i1 <= i2) {
        return;
      }
      var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
      var range_b$1 = len - 1 | 0;
      var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
      for (var k = 0; k <= range$1; ++k) {
        s1[i2 + k | 0] = s1[i1 + k | 0];
      }
      return;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for (var i = 0; i < len; ++i) {
        s2[i2 + i | 0] = s1[i1 + i | 0];
      }
      return;
    }
    for (var i$1 = 0; i$1 < off1; ++i$1) {
      s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
    }
    for (var i$2 = off1; i$2 < len; ++i$2) {
      s2[i2 + i$2 | 0] = 0;
    }
  }
  function bytes_to_string(a) {
    var i = 0;
    var len = a.length;
    var s = "";
    var s_len = len;
    if (i === 0 && len <= 4096 && len === a.length) {
      return String.fromCharCode.apply(null, a);
    }
    var offset = 0;
    while (s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      for (var k = 0; k < next; ++k) {
        tmp_bytes[k] = a[k + offset | 0];
      }
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }
    ;
    return s;
  }
  function caml_blit_string(s1, i1, s2, i2, len) {
    if (len <= 0) {
      return;
    }
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for (var i = 0; i < len; ++i) {
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return;
    }
    for (var i$1 = 0; i$1 < off1; ++i$1) {
      s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
    }
    for (var i$2 = off1; i$2 < len; ++i$2) {
      s2[i2 + i$2 | 0] = 0;
    }
  }
  function bytes_of_string(s) {
    var len = s.length;
    var res = new Array(len);
    for (var i = 0; i < len; ++i) {
      res[i] = s.charCodeAt(i);
    }
    return res;
  }

  // node_modules/bs-platform/lib/es6/char.js
  function escaped(c) {
    var exit = 0;
    if (c >= 40) {
      if (c === 92) {
        return "\\\\";
      }
      exit = c >= 127 ? 1 : 2;
    } else if (c >= 32) {
      if (c >= 39) {
        return "\\'";
      }
      exit = 2;
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8:
          return "\\b";
        case 9:
          return "\\t";
        case 10:
          return "\\n";
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 11:
        case 12:
          exit = 1;
          break;
        case 13:
          return "\\r";
      }
    }
    switch (exit) {
      case 1:
        var s = [
          0,
          0,
          0,
          0
        ];
        s[0] = 92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return bytes_to_string(s);
      case 2:
        var s$1 = [0];
        s$1[0] = c;
        return bytes_to_string(s$1);
    }
  }
  function uppercase_ascii(c) {
    if (c >= 97 && c <= 122) {
      return c - 32 | 0;
    } else {
      return c;
    }
  }

  // node_modules/bs-platform/lib/es6/caml_primitive.js
  function caml_int_max(x, y) {
    if (x > y) {
      return x;
    } else {
      return y;
    }
  }

  // node_modules/bs-platform/lib/es6/caml_exceptions.js
  var id = {
    contents: 0
  };
  function create(str) {
    id.contents = id.contents + 1 | 0;
    return str + ("/" + id.contents);
  }

  // node_modules/bs-platform/lib/es6/bytes.js
  function make(n, c) {
    var s = caml_create_bytes(n);
    caml_fill_bytes(s, 0, n, c);
    return s;
  }
  function copy(s) {
    var len = s.length;
    var r = caml_create_bytes(len);
    caml_blit_bytes(s, 0, r, 0, len);
    return r;
  }
  function sub(s, ofs, len) {
    if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "String.sub / Bytes.sub",
        Error: new Error()
      };
    }
    var r = caml_create_bytes(len);
    caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }
  function sub_string(b, ofs, len) {
    return bytes_to_string(sub(b, ofs, len));
  }
  function blit(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Bytes.blit",
        Error: new Error()
      };
    }
    return caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }
  function blit_string(s1, ofs1, s2, ofs2, len) {
    if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "String.blit / Bytes.blit_string",
        Error: new Error()
      };
    }
    return caml_blit_string(s1, ofs1, s2, ofs2, len);
  }
  function escaped2(s) {
    var n = 0;
    for (var i = 0, i_finish = s.length; i < i_finish; ++i) {
      var match = s[i];
      n = n + (match >= 32 ? match > 92 || match < 34 ? match >= 127 ? 4 : 1 : match > 91 || match < 35 ? 2 : 1 : match >= 11 ? match !== 13 ? 4 : 2 : match >= 8 ? 2 : 4) | 0;
    }
    if (n === s.length) {
      return copy(s);
    }
    var s$prime = caml_create_bytes(n);
    n = 0;
    for (var i$1 = 0, i_finish$1 = s.length; i$1 < i_finish$1; ++i$1) {
      var c = s[i$1];
      var exit = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit = 1;
      } else {
        switch (c) {
          case 8:
            s$prime[n] = 92;
            n = n + 1 | 0;
            s$prime[n] = 98;
            break;
          case 9:
            s$prime[n] = 92;
            n = n + 1 | 0;
            s$prime[n] = 116;
            break;
          case 10:
            s$prime[n] = 92;
            n = n + 1 | 0;
            s$prime[n] = 110;
            break;
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 11:
          case 12:
            exit = 1;
            break;
          case 13:
            s$prime[n] = 92;
            n = n + 1 | 0;
            s$prime[n] = 114;
            break;
        }
      }
      switch (exit) {
        case 1:
          s$prime[n] = 92;
          n = n + 1 | 0;
          s$prime[n] = 48 + (c / 100 | 0) | 0;
          n = n + 1 | 0;
          s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
          n = n + 1 | 0;
          s$prime[n] = 48 + c % 10 | 0;
          break;
        case 2:
          s$prime[n] = 92;
          n = n + 1 | 0;
          s$prime[n] = c;
          break;
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }
  function map(f, s) {
    var l = s.length;
    if (l === 0) {
      return s;
    }
    var r = caml_create_bytes(l);
    for (var i = 0; i < l; ++i) {
      r[i] = _1(f, s[i]);
    }
    return r;
  }
  function uppercase_ascii2(s) {
    return map(uppercase_ascii, s);
  }

  // node_modules/bs-platform/lib/es6/caml_string.js
  function get(s, i) {
    if (i >= s.length || i < 0) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "index out of bounds",
        Error: new Error()
      };
    }
    return s.charCodeAt(i);
  }
  function make2(n, ch) {
    return String.fromCharCode(ch).repeat(n);
  }

  // node_modules/bs-platform/lib/es6/string.js
  function escaped3(s) {
    var needs_escape = function(_i) {
      while (true) {
        var i = _i;
        if (i >= s.length) {
          return false;
        }
        var match = s.charCodeAt(i);
        if (match < 32) {
          return true;
        }
        if (match > 92 || match < 34) {
          if (match >= 127) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        if (match > 91 || match < 35) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    };
    if (needs_escape(0)) {
      return bytes_to_string(escaped2(bytes_of_string(s)));
    } else {
      return s;
    }
  }
  var blit2 = blit_string;

  // node_modules/bs-platform/lib/es6/caml_int64.js
  function mk(lo, hi) {
    return [
      hi,
      lo >>> 0
    ];
  }
  var min_int = [
    -2147483648,
    0
  ];
  var max_int = [
    2147483647,
    4294967295
  ];
  var one = [
    0,
    1
  ];
  var zero = [
    0,
    0
  ];
  var neg_one = [
    -1,
    4294967295
  ];
  function neg_signed(x) {
    return (x & -2147483648) !== 0;
  }
  function non_neg_signed(x) {
    return (x & -2147483648) === 0;
  }
  function neg(param) {
    var other_lo = (param[1] ^ -1) + 1 | 0;
    return [
      (param[0] ^ -1) + (other_lo === 0 ? 1 : 0) | 0,
      other_lo >>> 0
    ];
  }
  function add_aux(param, y_lo, y_hi) {
    var x_lo = param[1];
    var lo = x_lo + y_lo | 0;
    var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
    return [
      param[0] + y_hi + overflow | 0,
      lo >>> 0
    ];
  }
  function add(self2, param) {
    return add_aux(self2, param[1], param[0]);
  }
  function eq(x, y) {
    if (x[0] === y[0]) {
      return x[1] === y[1];
    } else {
      return false;
    }
  }
  function sub_aux(x, lo, hi) {
    var y_lo = (lo ^ -1) + 1 >>> 0;
    var y_hi = (hi ^ -1) + (y_lo === 0 ? 1 : 0) | 0;
    return add_aux(x, y_lo, y_hi);
  }
  function sub2(self2, param) {
    return sub_aux(self2, param[1], param[0]);
  }
  function lsl_(x, numBits) {
    if (numBits === 0) {
      return x;
    }
    var lo = x[1];
    if (numBits >= 32) {
      return [
        lo << (numBits - 32 | 0),
        0
      ];
    } else {
      return [
        lo >>> (32 - numBits | 0) | x[0] << numBits,
        lo << numBits >>> 0
      ];
    }
  }
  function asr_(x, numBits) {
    if (numBits === 0) {
      return x;
    }
    var hi = x[0];
    if (numBits < 32) {
      return [
        hi >> numBits,
        (hi << (32 - numBits | 0) | x[1] >>> numBits) >>> 0
      ];
    } else {
      return [
        hi >= 0 ? 0 : -1,
        hi >> (numBits - 32 | 0) >>> 0
      ];
    }
  }
  function is_zero(param) {
    if (param[0] !== 0) {
      return false;
    } else {
      return param[1] === 0;
    }
  }
  function mul(_this, _other) {
    while (true) {
      var other = _other;
      var $$this = _this;
      var lo;
      var this_hi = $$this[0];
      var exit = 0;
      var exit$1 = 0;
      var exit$2 = 0;
      if (this_hi !== 0) {
        exit$2 = 4;
      } else {
        if ($$this[1] === 0) {
          return zero;
        }
        exit$2 = 4;
      }
      if (exit$2 === 4) {
        if (other[0] !== 0) {
          exit$1 = 3;
        } else {
          if (other[1] === 0) {
            return zero;
          }
          exit$1 = 3;
        }
      }
      if (exit$1 === 3) {
        if (this_hi !== -2147483648 || $$this[1] !== 0) {
          exit = 2;
        } else {
          lo = other[1];
        }
      }
      if (exit === 2) {
        var other_hi = other[0];
        var lo$1 = $$this[1];
        var exit$3 = 0;
        if (other_hi !== -2147483648 || other[1] !== 0) {
          exit$3 = 3;
        } else {
          lo = lo$1;
        }
        if (exit$3 === 3) {
          var other_lo = other[1];
          if (this_hi < 0) {
            if (other_hi >= 0) {
              return neg(mul(neg($$this), other));
            }
            _other = neg(other);
            _this = neg($$this);
            continue;
          }
          if (other_hi < 0) {
            return neg(mul($$this, neg(other)));
          }
          var a48 = this_hi >>> 16;
          var a32 = this_hi & 65535;
          var a16 = lo$1 >>> 16;
          var a00 = lo$1 & 65535;
          var b48 = other_hi >>> 16;
          var b32 = other_hi & 65535;
          var b16 = other_lo >>> 16;
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = c16 >>> 16;
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = c32 >>> 16;
          c32 = (c32 & 65535) + a16 * b16;
          c48 = c48 + (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 = c48 + (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          return [
            c32 | c48 << 16,
            (c00 & 65535 | (c16 & 65535) << 16) >>> 0
          ];
        }
      }
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int;
      }
    }
    ;
  }
  function ge(param, param$1) {
    var other_hi = param$1[0];
    var hi = param[0];
    if (hi > other_hi) {
      return true;
    } else if (hi < other_hi) {
      return false;
    } else {
      return param[1] >= param$1[1];
    }
  }
  function neq(x, y) {
    return !eq(x, y);
  }
  function lt(x, y) {
    return !ge(x, y);
  }
  function gt(x, y) {
    if (x[0] > y[0]) {
      return true;
    } else if (x[0] < y[0]) {
      return false;
    } else {
      return x[1] > y[1];
    }
  }
  function to_float(param) {
    return param[0] * 4294967296 + param[1];
  }
  function of_float(x) {
    if (isNaN(x) || !isFinite(x)) {
      return zero;
    }
    if (x <= -9223372036854776e3) {
      return min_int;
    }
    if (x + 1 >= 9223372036854776e3) {
      return max_int;
    }
    if (x < 0) {
      return neg(of_float(-x));
    }
    var hi = x / 4294967296 | 0;
    var lo = x % 4294967296 | 0;
    return [
      hi,
      lo >>> 0
    ];
  }
  function isSafeInteger(param) {
    var hi = param[0];
    var top11Bits = hi >> 21;
    if (top11Bits === 0) {
      return true;
    } else if (top11Bits === -1) {
      return !(param[1] === 0 && hi === -2097152);
    } else {
      return false;
    }
  }
  function to_string(self2) {
    if (isSafeInteger(self2)) {
      return String(to_float(self2));
    }
    if (self2[0] < 0) {
      if (eq(self2, min_int)) {
        return "-9223372036854775808";
      } else {
        return "-" + to_string(neg(self2));
      }
    }
    var approx_div1 = of_float(Math.floor(to_float(self2) / 10));
    var lo = approx_div1[1];
    var hi = approx_div1[0];
    var match = sub_aux(sub_aux(self2, lo << 3, lo >>> 29 | hi << 3), lo << 1, lo >>> 31 | hi << 1);
    var rem_lo = match[1];
    var rem_hi = match[0];
    if (rem_lo === 0 && rem_hi === 0) {
      return to_string(approx_div1) + "0";
    }
    if (rem_hi < 0) {
      var rem_lo$1 = (rem_lo ^ -1) + 1 >>> 0;
      var delta = Math.ceil(rem_lo$1 / 10);
      var remainder = 10 * delta - rem_lo$1;
      return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
    }
    var delta$1 = Math.floor(rem_lo / 10);
    var remainder$1 = rem_lo - 10 * delta$1;
    return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
  }
  function div(_self, _other) {
    while (true) {
      var other = _other;
      var self2 = _self;
      var self_hi = self2[0];
      var exit = 0;
      var exit$1 = 0;
      if (other[0] !== 0 || other[1] !== 0) {
        exit$1 = 2;
      } else {
        throw {
          RE_EXN_ID: "Division_by_zero",
          Error: new Error()
        };
      }
      if (exit$1 === 2) {
        if (self_hi !== -2147483648) {
          if (self_hi !== 0) {
            exit = 1;
          } else {
            if (self2[1] === 0) {
              return zero;
            }
            exit = 1;
          }
        } else if (self2[1] !== 0) {
          exit = 1;
        } else {
          if (eq(other, one) || eq(other, neg_one)) {
            return self2;
          }
          if (eq(other, min_int)) {
            return one;
          }
          var half_this = asr_(self2, 1);
          var approx = lsl_(div(half_this, other), 1);
          var exit$2 = 0;
          if (approx[0] !== 0) {
            exit$2 = 3;
          } else {
            if (approx[1] === 0) {
              if (other[0] < 0) {
                return one;
              } else {
                return neg(one);
              }
            }
            exit$2 = 3;
          }
          if (exit$2 === 3) {
            var rem = sub2(self2, mul(other, approx));
            return add(approx, div(rem, other));
          }
        }
      }
      if (exit === 1) {
        var other_hi = other[0];
        var exit$3 = 0;
        if (other_hi !== -2147483648) {
          exit$3 = 2;
        } else {
          if (other[1] === 0) {
            return zero;
          }
          exit$3 = 2;
        }
        if (exit$3 === 2) {
          if (self_hi < 0) {
            if (other_hi >= 0) {
              return neg(div(neg(self2), other));
            }
            _other = neg(other);
            _self = neg(self2);
            continue;
          }
          if (other_hi < 0) {
            return neg(div(self2, neg(other)));
          }
          var res = zero;
          var rem$1 = self2;
          while (ge(rem$1, other)) {
            var b = Math.floor(to_float(rem$1) / to_float(other));
            var approx$1 = 1 > b ? 1 : b;
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while (approxRem[0] < 0 || gt(approxRem, rem$1)) {
              approx$1 = approx$1 - delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            }
            ;
            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add(res, approxRes);
            rem$1 = sub2(rem$1, approxRem);
          }
          ;
          return res;
        }
      }
    }
    ;
  }
  function div_mod(self2, other) {
    var quotient = div(self2, other);
    return [
      quotient,
      sub2(self2, mul(quotient, other))
    ];
  }
  function to_int32(x) {
    return x[1] | 0;
  }
  function to_hex(x) {
    var x_lo = x[1];
    var x_hi = x[0];
    var aux = function(v) {
      return (v >>> 0).toString(16);
    };
    if (x_hi === 0 && x_lo === 0) {
      return "0";
    }
    if (x_lo === 0) {
      return aux(x_hi) + "00000000";
    }
    if (x_hi === 0) {
      return aux(x_lo);
    }
    var lo = aux(x_lo);
    var pad = 8 - lo.length | 0;
    if (pad <= 0) {
      return aux(x_hi) + lo;
    } else {
      return aux(x_hi) + ("0".repeat(pad) + lo);
    }
  }
  function discard_sign(x) {
    return [
      2147483647 & x[0],
      x[1]
    ];
  }

  // node_modules/bs-platform/lib/es6/caml_format.js
  function int_of_base(param) {
    switch (param) {
      case 0:
        return 8;
      case 1:
        return 16;
      case 2:
        return 10;
    }
  }
  function lowercase3(c) {
    if (c >= 65 && c <= 90 || c >= 192 && c <= 214 || c >= 216 && c <= 222) {
      return c + 32 | 0;
    } else {
      return c;
    }
  }
  function parse_format(fmt) {
    var len = fmt.length;
    if (len > 31) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "format_int: format too long",
        Error: new Error()
      };
    }
    var f = {
      justify: "+",
      signstyle: "-",
      filter: " ",
      alternate: false,
      base: 2,
      signedconv: false,
      width: 0,
      uppercase: false,
      sign: 1,
      prec: -1,
      conv: "f"
    };
    var _i = 0;
    while (true) {
      var i = _i;
      if (i >= len) {
        return f;
      }
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c) {
              case 88:
                f.base = 1;
                f.uppercase = true;
                _i = i + 1 | 0;
                continue;
              case 101:
              case 102:
              case 103:
                exit = 5;
                break;
              case 100:
              case 105:
                exit = 4;
                break;
              case 111:
                f.base = 0;
                _i = i + 1 | 0;
                continue;
              case 117:
                f.base = 2;
                _i = i + 1 | 0;
                continue;
              case 89:
              case 90:
              case 91:
              case 92:
              case 93:
              case 94:
              case 95:
              case 96:
              case 97:
              case 98:
              case 99:
              case 104:
              case 106:
              case 107:
              case 108:
              case 109:
              case 110:
              case 112:
              case 113:
              case 114:
              case 115:
              case 116:
              case 118:
              case 119:
                exit = 1;
                break;
              case 120:
                f.base = 1;
                _i = i + 1 | 0;
                continue;
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f.signedconv = true;
          f.uppercase = true;
          f.conv = String.fromCharCode(lowercase3(c));
          _i = i + 1 | 0;
          continue;
        }
      } else {
        switch (c) {
          case 35:
            f.alternate = true;
            _i = i + 1 | 0;
            continue;
          case 32:
          case 43:
            exit = 2;
            break;
          case 45:
            f.justify = "-";
            _i = i + 1 | 0;
            continue;
          case 46:
            f.prec = 0;
            var j = i + 1 | 0;
            while (function(j2) {
              return function() {
                var w = fmt.charCodeAt(j2) - 48 | 0;
                return w >= 0 && w <= 9;
              };
            }(j)()) {
              f.prec = (Math.imul(f.prec, 10) + fmt.charCodeAt(j) | 0) - 48 | 0;
              j = j + 1 | 0;
            }
            ;
            _i = j;
            continue;
          case 33:
          case 34:
          case 36:
          case 37:
          case 38:
          case 39:
          case 40:
          case 41:
          case 42:
          case 44:
          case 47:
            exit = 1;
            break;
          case 48:
            f.filter = "0";
            _i = i + 1 | 0;
            continue;
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            exit = 3;
            break;
          default:
            exit = 1;
        }
      }
      switch (exit) {
        case 1:
          _i = i + 1 | 0;
          continue;
        case 2:
          f.signstyle = String.fromCharCode(c);
          _i = i + 1 | 0;
          continue;
        case 3:
          f.width = 0;
          var j$1 = i;
          while (function(j$12) {
            return function() {
              var w = fmt.charCodeAt(j$12) - 48 | 0;
              return w >= 0 && w <= 9;
            };
          }(j$1)()) {
            f.width = (Math.imul(f.width, 10) + fmt.charCodeAt(j$1) | 0) - 48 | 0;
            j$1 = j$1 + 1 | 0;
          }
          ;
          _i = j$1;
          continue;
        case 4:
          f.signedconv = true;
          f.base = 2;
          _i = i + 1 | 0;
          continue;
        case 5:
          f.signedconv = true;
          f.conv = String.fromCharCode(c);
          _i = i + 1 | 0;
          continue;
      }
    }
    ;
  }
  function finish_formatting(config, rawbuffer) {
    var justify = config.justify;
    var signstyle = config.signstyle;
    var filter = config.filter;
    var alternate = config.alternate;
    var base = config.base;
    var signedconv = config.signedconv;
    var width = config.width;
    var uppercase3 = config.uppercase;
    var sign = config.sign;
    var len = rawbuffer.length;
    if (signedconv && (sign < 0 || signstyle !== "-")) {
      len = len + 1 | 0;
    }
    if (alternate) {
      if (base === 0) {
        len = len + 1 | 0;
      } else if (base === 1) {
        len = len + 2 | 0;
      }
    }
    var buffer = "";
    if (justify === "+" && filter === " ") {
      for (var _for = len; _for < width; ++_for) {
        buffer = buffer + filter;
      }
    }
    if (signedconv) {
      if (sign < 0) {
        buffer = buffer + "-";
      } else if (signstyle !== "-") {
        buffer = buffer + signstyle;
      }
    }
    if (alternate && base === 0) {
      buffer = buffer + "0";
    }
    if (alternate && base === 1) {
      buffer = buffer + "0x";
    }
    if (justify === "+" && filter === "0") {
      for (var _for$1 = len; _for$1 < width; ++_for$1) {
        buffer = buffer + filter;
      }
    }
    buffer = uppercase3 ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
    if (justify === "-") {
      for (var _for$2 = len; _for$2 < width; ++_for$2) {
        buffer = buffer + " ";
      }
    }
    return buffer;
  }
  function caml_format_int(fmt, i) {
    if (fmt === "%d") {
      return String(i);
    }
    var f = parse_format(fmt);
    var i$1 = i < 0 ? f.signedconv ? (f.sign = -1, -i >>> 0) : i >>> 0 : i;
    var s = i$1.toString(int_of_base(f.base));
    if (f.prec >= 0) {
      f.filter = " ";
      var n = f.prec - s.length | 0;
      if (n > 0) {
        s = "0".repeat(n) + s;
      }
    }
    return finish_formatting(f, s);
  }
  function dec_of_pos_int64(x) {
    if (!lt(x, zero)) {
      return to_string(x);
    }
    var wbase = /* @__PURE__ */ mk(10, 0);
    var y = discard_sign(x);
    var match = div_mod(y, wbase);
    var match$1 = div_mod(add(/* @__PURE__ */ mk(8, 0), match[1]), wbase);
    var quotient = add(add(/* @__PURE__ */ mk(-858993460, 214748364), match[0]), match$1[0]);
    return to_string(quotient) + "0123456789"[to_int32(match$1[1])];
  }
  function oct_of_int64(x) {
    var s = "";
    var wbase = /* @__PURE__ */ mk(8, 0);
    var cvtbl = "01234567";
    if (lt(x, zero)) {
      var y = discard_sign(x);
      var match = div_mod(y, wbase);
      var quotient = add(/* @__PURE__ */ mk(0, 268435456), match[0]);
      var modulus = match[1];
      s = cvtbl[to_int32(modulus)] + s;
      while (neq(quotient, zero)) {
        var match$1 = div_mod(quotient, wbase);
        quotient = match$1[0];
        modulus = match$1[1];
        s = cvtbl[to_int32(modulus)] + s;
      }
      ;
    } else {
      var match$2 = div_mod(x, wbase);
      var quotient$1 = match$2[0];
      var modulus$1 = match$2[1];
      s = cvtbl[to_int32(modulus$1)] + s;
      while (neq(quotient$1, zero)) {
        var match$3 = div_mod(quotient$1, wbase);
        quotient$1 = match$3[0];
        modulus$1 = match$3[1];
        s = cvtbl[to_int32(modulus$1)] + s;
      }
      ;
    }
    return s;
  }
  function caml_int64_format(fmt, x) {
    if (fmt === "%d") {
      return to_string(x);
    }
    var f = parse_format(fmt);
    var x$1 = f.signedconv && lt(x, zero) ? (f.sign = -1, neg(x)) : x;
    var match = f.base;
    var s;
    switch (match) {
      case 0:
        s = oct_of_int64(x$1);
        break;
      case 1:
        s = to_hex(x$1);
        break;
      case 2:
        s = dec_of_pos_int64(x$1);
        break;
    }
    var fill_s;
    if (f.prec >= 0) {
      f.filter = " ";
      var n = f.prec - s.length | 0;
      fill_s = n > 0 ? "0".repeat(n) + s : s;
    } else {
      fill_s = s;
    }
    return finish_formatting(f, fill_s);
  }
  function caml_format_float(fmt, x) {
    var f = parse_format(fmt);
    var prec = f.prec < 0 ? 6 : f.prec;
    var x$1 = x < 0 ? (f.sign = -1, -x) : x;
    var s = "";
    if (isNaN(x$1)) {
      s = "nan";
      f.filter = " ";
    } else if (isFinite(x$1)) {
      var match = f.conv;
      switch (match) {
        case "e":
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
        case "f":
          s = x$1.toFixed(prec);
          break;
        case "g":
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while (s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            }
            ;
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while (function() {
                s = x$1.toFixed(p);
                return s.length > (prec$1 + 1 | 0);
              }()) {
                p = p - 1 | 0;
              }
              ;
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while (s[k] === "0") {
                k = k - 1 | 0;
              }
              ;
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
          }
          break;
        default:
      }
    } else {
      s = "inf";
      f.filter = " ";
    }
    return finish_formatting(f, s);
  }
  var caml_hexstring_of_float = function(x, prec, style) {
    if (!isFinite(x)) {
      if (isNaN(x))
        return "nan";
      return x > 0 ? "infinity" : "-infinity";
    }
    var sign = x == 0 && 1 / x == -Infinity ? 1 : x >= 0 ? 0 : 1;
    if (sign)
      x = -x;
    var exp = 0;
    if (x == 0) {
    } else if (x < 1) {
      while (x < 1 && exp > -1022) {
        x *= 2;
        exp--;
      }
    } else {
      while (x >= 2) {
        x /= 2;
        exp++;
      }
    }
    var exp_sign = exp < 0 ? "" : "+";
    var sign_str = "";
    if (sign)
      sign_str = "-";
    else {
      switch (style) {
        case 43:
          sign_str = "+";
          break;
        case 32:
          sign_str = " ";
          break;
        default:
          break;
      }
    }
    if (prec >= 0 && prec < 13) {
      var cst = Math.pow(2, prec * 4);
      x = Math.round(x * cst) / cst;
    }
    var x_str = x.toString(16);
    if (prec >= 0) {
      var idx = x_str.indexOf(".");
      if (idx < 0) {
        x_str += "." + "0".repeat(prec);
      } else {
        var size = idx + 1 + prec;
        if (x_str.length < size)
          x_str += "0".repeat(size - x_str.length);
        else
          x_str = x_str.substr(0, size);
      }
    }
    return sign_str + "0x" + x_str + "p" + exp_sign + exp.toString(10);
  };
  var caml_nativeint_format = caml_format_int;
  var caml_int32_format = caml_format_int;

  // node_modules/bs-platform/lib/es6/pervasives.js
  function abs(x) {
    if (x >= 0) {
      return x;
    } else {
      return -x | 0;
    }
  }
  function classify_float(x) {
    if (isFinite(x)) {
      if (Math.abs(x) >= 22250738585072014e-324) {
        return 0;
      } else if (x !== 0) {
        return 1;
      } else {
        return 2;
      }
    } else if (isNaN(x)) {
      return 4;
    } else {
      return 3;
    }
  }
  function string_of_bool(b) {
    if (b) {
      return "true";
    } else {
      return "false";
    }
  }

  // node_modules/bs-platform/lib/es6/buffer.js
  function create2(n) {
    var n$1 = n < 1 ? 1 : n;
    var s = caml_create_bytes(n$1);
    return {
      buffer: s,
      position: 0,
      length: n$1,
      initial_buffer: s
    };
  }
  function contents(b) {
    return sub_string(b.buffer, 0, b.position);
  }
  function resize(b, more) {
    var len = b.length;
    var new_len = len;
    while ((b.position + more | 0) > new_len) {
      new_len = new_len << 1;
    }
    ;
    var new_buffer = caml_create_bytes(new_len);
    blit(b.buffer, 0, new_buffer, 0, b.position);
    b.buffer = new_buffer;
    b.length = new_len;
  }
  function add_char(b, c) {
    var pos = b.position;
    if (pos >= b.length) {
      resize(b, 1);
    }
    b.buffer[pos] = c;
    b.position = pos + 1 | 0;
  }
  function add_string(b, s) {
    var len = s.length;
    var new_position = b.position + len | 0;
    if (new_position > b.length) {
      resize(b, len);
    }
    blit_string(s, 0, b.buffer, b.position, len);
    b.position = new_position;
  }

  // node_modules/bs-platform/lib/es6/caml_obj.js
  var for_in = function(o, foo) {
    for (var x in o) {
      foo(x);
    }
  };
  function caml_equal(a, b) {
    if (a === b) {
      return true;
    }
    var a_type = typeof a;
    if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
      return false;
    }
    var b_type = typeof b;
    if (a_type === "function" || b_type === "function") {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "equal: functional value",
        Error: new Error()
      };
    }
    if (b_type === "number" || b_type === "undefined" || b === null) {
      return false;
    }
    var tag_a = a.TAG | 0;
    var tag_b = b.TAG | 0;
    if (tag_a === 248) {
      return a[1] === b[1];
    }
    if (tag_a === 251) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "equal: abstract value",
        Error: new Error()
      };
    }
    if (tag_a !== tag_b) {
      return false;
    }
    var len_a = a.length | 0;
    var len_b = b.length | 0;
    if (len_a === len_b) {
      if (Array.isArray(a)) {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === len_a) {
            return true;
          }
          if (!caml_equal(a[i], b[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      } else if (a instanceof Date && b instanceof Date) {
        return !(a > b || a < b);
      } else {
        var result = {
          contents: true
        };
        var do_key_a = function(key) {
          if (!b.hasOwnProperty(key)) {
            result.contents = false;
            return;
          }
        };
        var do_key_b = function(key) {
          if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
            result.contents = false;
            return;
          }
        };
        for_in(a, do_key_a);
        if (result.contents) {
          for_in(b, do_key_b);
        }
        return result.contents;
      }
    } else {
      return false;
    }
  }
  function caml_notequal(a, b) {
    return !caml_equal(a, b);
  }

  // node_modules/bs-platform/lib/es6/camlinternalFormatBasics.js
  function erase_rel(rest) {
    if (typeof rest === "number") {
      return 0;
    }
    switch (rest.TAG | 0) {
      case 0:
        return {
          TAG: 0,
          _0: erase_rel(rest._0)
        };
      case 1:
        return {
          TAG: 1,
          _0: erase_rel(rest._0)
        };
      case 2:
        return {
          TAG: 2,
          _0: erase_rel(rest._0)
        };
      case 3:
        return {
          TAG: 3,
          _0: erase_rel(rest._0)
        };
      case 4:
        return {
          TAG: 4,
          _0: erase_rel(rest._0)
        };
      case 5:
        return {
          TAG: 5,
          _0: erase_rel(rest._0)
        };
      case 6:
        return {
          TAG: 6,
          _0: erase_rel(rest._0)
        };
      case 7:
        return {
          TAG: 7,
          _0: erase_rel(rest._0)
        };
      case 8:
        return {
          TAG: 8,
          _0: rest._0,
          _1: erase_rel(rest._1)
        };
      case 9:
        var ty1 = rest._0;
        return {
          TAG: 9,
          _0: ty1,
          _1: ty1,
          _2: erase_rel(rest._2)
        };
      case 10:
        return {
          TAG: 10,
          _0: erase_rel(rest._0)
        };
      case 11:
        return {
          TAG: 11,
          _0: erase_rel(rest._0)
        };
      case 12:
        return {
          TAG: 12,
          _0: erase_rel(rest._0)
        };
      case 13:
        return {
          TAG: 13,
          _0: erase_rel(rest._0)
        };
      case 14:
        return {
          TAG: 14,
          _0: erase_rel(rest._0)
        };
    }
  }
  function concat_fmtty(fmtty1, fmtty2) {
    if (typeof fmtty1 === "number") {
      return fmtty2;
    }
    switch (fmtty1.TAG | 0) {
      case 0:
        return {
          TAG: 0,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 1:
        return {
          TAG: 1,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 2:
        return {
          TAG: 2,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 3:
        return {
          TAG: 3,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 4:
        return {
          TAG: 4,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 5:
        return {
          TAG: 5,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 6:
        return {
          TAG: 6,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 7:
        return {
          TAG: 7,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 8:
        return {
          TAG: 8,
          _0: fmtty1._0,
          _1: concat_fmtty(fmtty1._1, fmtty2)
        };
      case 9:
        return {
          TAG: 9,
          _0: fmtty1._0,
          _1: fmtty1._1,
          _2: concat_fmtty(fmtty1._2, fmtty2)
        };
      case 10:
        return {
          TAG: 10,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 11:
        return {
          TAG: 11,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 12:
        return {
          TAG: 12,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 13:
        return {
          TAG: 13,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
      case 14:
        return {
          TAG: 14,
          _0: concat_fmtty(fmtty1._0, fmtty2)
        };
    }
  }
  function concat_fmt(fmt1, fmt2) {
    if (typeof fmt1 === "number") {
      return fmt2;
    }
    switch (fmt1.TAG | 0) {
      case 0:
        return {
          TAG: 0,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 1:
        return {
          TAG: 1,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 2:
        return {
          TAG: 2,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 3:
        return {
          TAG: 3,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 4:
        return {
          TAG: 4,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: fmt1._2,
          _3: concat_fmt(fmt1._3, fmt2)
        };
      case 5:
        return {
          TAG: 5,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: fmt1._2,
          _3: concat_fmt(fmt1._3, fmt2)
        };
      case 6:
        return {
          TAG: 6,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: fmt1._2,
          _3: concat_fmt(fmt1._3, fmt2)
        };
      case 7:
        return {
          TAG: 7,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: fmt1._2,
          _3: concat_fmt(fmt1._3, fmt2)
        };
      case 8:
        return {
          TAG: 8,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: fmt1._2,
          _3: concat_fmt(fmt1._3, fmt2)
        };
      case 9:
        return {
          TAG: 9,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 10:
        return {
          TAG: 10,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 11:
        return {
          TAG: 11,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 12:
        return {
          TAG: 12,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 13:
        return {
          TAG: 13,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: concat_fmt(fmt1._2, fmt2)
        };
      case 14:
        return {
          TAG: 14,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: concat_fmt(fmt1._2, fmt2)
        };
      case 15:
        return {
          TAG: 15,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 16:
        return {
          TAG: 16,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 17:
        return {
          TAG: 17,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 18:
        return {
          TAG: 18,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 19:
        return {
          TAG: 19,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 20:
        return {
          TAG: 20,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: concat_fmt(fmt1._2, fmt2)
        };
      case 21:
        return {
          TAG: 21,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 22:
        return {
          TAG: 22,
          _0: concat_fmt(fmt1._0, fmt2)
        };
      case 23:
        return {
          TAG: 23,
          _0: fmt1._0,
          _1: concat_fmt(fmt1._1, fmt2)
        };
      case 24:
        return {
          TAG: 24,
          _0: fmt1._0,
          _1: fmt1._1,
          _2: concat_fmt(fmt1._2, fmt2)
        };
    }
  }

  // node_modules/bs-platform/lib/es6/camlinternalFormat.js
  function buffer_check_size(buf, overhead) {
    var len = buf.bytes.length;
    var min_len = buf.ind + overhead | 0;
    if (min_len <= len) {
      return;
    }
    var new_len = caml_int_max(len << 1, min_len);
    var new_str = caml_create_bytes(new_len);
    blit(buf.bytes, 0, new_str, 0, len);
    buf.bytes = new_str;
  }
  function buffer_add_char(buf, c) {
    buffer_check_size(buf, 1);
    set(buf.bytes, buf.ind, c);
    buf.ind = buf.ind + 1 | 0;
  }
  function buffer_add_string(buf, s) {
    var str_len = s.length;
    buffer_check_size(buf, str_len);
    blit2(s, 0, buf.bytes, buf.ind, str_len);
    buf.ind = buf.ind + str_len | 0;
  }
  function buffer_contents(buf) {
    return sub_string(buf.bytes, 0, buf.ind);
  }
  function char_of_fconv(fconv) {
    switch (fconv) {
      case 0:
      case 1:
      case 2:
        return 102;
      case 3:
      case 4:
      case 5:
        return 101;
      case 6:
      case 7:
      case 8:
        return 69;
      case 9:
      case 10:
      case 11:
        return 103;
      case 12:
      case 13:
      case 14:
        return 71;
      case 15:
        return 70;
      case 16:
      case 17:
      case 18:
        return 104;
      case 19:
      case 20:
      case 21:
        return 72;
    }
  }
  function bprint_fconv_flag(buf, fconv) {
    switch (fconv) {
      case 0:
      case 3:
      case 6:
      case 9:
      case 12:
      case 15:
      case 16:
      case 19:
        return;
      case 1:
      case 4:
      case 7:
      case 10:
      case 13:
      case 17:
      case 20:
        return buffer_add_char(buf, 43);
      case 2:
      case 5:
      case 8:
      case 11:
      case 14:
      case 18:
      case 21:
        return buffer_add_char(buf, 32);
    }
  }
  function string_of_formatting_lit(formatting_lit) {
    if (typeof formatting_lit === "number") {
      switch (formatting_lit) {
        case 0:
          return "@]";
        case 1:
          return "@}";
        case 2:
          return "@?";
        case 3:
          return "@\n";
        case 4:
          return "@.";
        case 5:
          return "@@";
        case 6:
          return "@%";
      }
    } else {
      switch (formatting_lit.TAG | 0) {
        case 0:
        case 1:
          return formatting_lit._0;
        case 2:
          return "@" + make2(1, formatting_lit._0);
      }
    }
  }
  function bprint_fmtty(buf, _fmtty) {
    while (true) {
      var fmtty = _fmtty;
      if (typeof fmtty === "number") {
        return;
      }
      switch (fmtty.TAG | 0) {
        case 0:
          buffer_add_string(buf, "%c");
          _fmtty = fmtty._0;
          continue;
        case 1:
          buffer_add_string(buf, "%s");
          _fmtty = fmtty._0;
          continue;
        case 2:
          buffer_add_string(buf, "%i");
          _fmtty = fmtty._0;
          continue;
        case 3:
          buffer_add_string(buf, "%li");
          _fmtty = fmtty._0;
          continue;
        case 4:
          buffer_add_string(buf, "%ni");
          _fmtty = fmtty._0;
          continue;
        case 5:
          buffer_add_string(buf, "%Li");
          _fmtty = fmtty._0;
          continue;
        case 6:
          buffer_add_string(buf, "%f");
          _fmtty = fmtty._0;
          continue;
        case 7:
          buffer_add_string(buf, "%B");
          _fmtty = fmtty._0;
          continue;
        case 8:
          buffer_add_string(buf, "%{");
          bprint_fmtty(buf, fmtty._0);
          buffer_add_string(buf, "%}");
          _fmtty = fmtty._1;
          continue;
        case 9:
          buffer_add_string(buf, "%(");
          bprint_fmtty(buf, fmtty._0);
          buffer_add_string(buf, "%)");
          _fmtty = fmtty._2;
          continue;
        case 10:
          buffer_add_string(buf, "%a");
          _fmtty = fmtty._0;
          continue;
        case 11:
          buffer_add_string(buf, "%t");
          _fmtty = fmtty._0;
          continue;
        case 12:
          buffer_add_string(buf, "%?");
          _fmtty = fmtty._0;
          continue;
        case 13:
          buffer_add_string(buf, "%r");
          _fmtty = fmtty._0;
          continue;
        case 14:
          buffer_add_string(buf, "%_r");
          _fmtty = fmtty._0;
          continue;
      }
    }
    ;
  }
  function symm(rest) {
    if (typeof rest === "number") {
      return 0;
    }
    switch (rest.TAG | 0) {
      case 0:
        return {
          TAG: 0,
          _0: symm(rest._0)
        };
      case 1:
        return {
          TAG: 1,
          _0: symm(rest._0)
        };
      case 2:
        return {
          TAG: 2,
          _0: symm(rest._0)
        };
      case 3:
        return {
          TAG: 3,
          _0: symm(rest._0)
        };
      case 4:
        return {
          TAG: 4,
          _0: symm(rest._0)
        };
      case 5:
        return {
          TAG: 5,
          _0: symm(rest._0)
        };
      case 6:
        return {
          TAG: 6,
          _0: symm(rest._0)
        };
      case 7:
        return {
          TAG: 7,
          _0: symm(rest._0)
        };
      case 8:
        return {
          TAG: 8,
          _0: rest._0,
          _1: symm(rest._1)
        };
      case 9:
        return {
          TAG: 9,
          _0: rest._1,
          _1: rest._0,
          _2: symm(rest._2)
        };
      case 10:
        return {
          TAG: 10,
          _0: symm(rest._0)
        };
      case 11:
        return {
          TAG: 11,
          _0: symm(rest._0)
        };
      case 12:
        return {
          TAG: 12,
          _0: symm(rest._0)
        };
      case 13:
        return {
          TAG: 13,
          _0: symm(rest._0)
        };
      case 14:
        return {
          TAG: 14,
          _0: symm(rest._0)
        };
    }
  }
  function fmtty_rel_det(rest) {
    if (typeof rest === "number") {
      return [
        function(param) {
          return 0;
        },
        function(param) {
          return 0;
        },
        function(param) {
          return 0;
        },
        function(param) {
          return 0;
        }
      ];
    }
    switch (rest.TAG | 0) {
      case 0:
        var match = fmtty_rel_det(rest._0);
        var af = match[1];
        var fa = match[0];
        return [
          function(param) {
            _1(fa, 0);
            return 0;
          },
          function(param) {
            _1(af, 0);
            return 0;
          },
          match[2],
          match[3]
        ];
      case 1:
        var match$1 = fmtty_rel_det(rest._0);
        var af$1 = match$1[1];
        var fa$1 = match$1[0];
        return [
          function(param) {
            _1(fa$1, 0);
            return 0;
          },
          function(param) {
            _1(af$1, 0);
            return 0;
          },
          match$1[2],
          match$1[3]
        ];
      case 2:
        var match$2 = fmtty_rel_det(rest._0);
        var af$2 = match$2[1];
        var fa$2 = match$2[0];
        return [
          function(param) {
            _1(fa$2, 0);
            return 0;
          },
          function(param) {
            _1(af$2, 0);
            return 0;
          },
          match$2[2],
          match$2[3]
        ];
      case 3:
        var match$3 = fmtty_rel_det(rest._0);
        var af$3 = match$3[1];
        var fa$3 = match$3[0];
        return [
          function(param) {
            _1(fa$3, 0);
            return 0;
          },
          function(param) {
            _1(af$3, 0);
            return 0;
          },
          match$3[2],
          match$3[3]
        ];
      case 4:
        var match$4 = fmtty_rel_det(rest._0);
        var af$4 = match$4[1];
        var fa$4 = match$4[0];
        return [
          function(param) {
            _1(fa$4, 0);
            return 0;
          },
          function(param) {
            _1(af$4, 0);
            return 0;
          },
          match$4[2],
          match$4[3]
        ];
      case 5:
        var match$5 = fmtty_rel_det(rest._0);
        var af$5 = match$5[1];
        var fa$5 = match$5[0];
        return [
          function(param) {
            _1(fa$5, 0);
            return 0;
          },
          function(param) {
            _1(af$5, 0);
            return 0;
          },
          match$5[2],
          match$5[3]
        ];
      case 6:
        var match$6 = fmtty_rel_det(rest._0);
        var af$6 = match$6[1];
        var fa$6 = match$6[0];
        return [
          function(param) {
            _1(fa$6, 0);
            return 0;
          },
          function(param) {
            _1(af$6, 0);
            return 0;
          },
          match$6[2],
          match$6[3]
        ];
      case 7:
        var match$7 = fmtty_rel_det(rest._0);
        var af$7 = match$7[1];
        var fa$7 = match$7[0];
        return [
          function(param) {
            _1(fa$7, 0);
            return 0;
          },
          function(param) {
            _1(af$7, 0);
            return 0;
          },
          match$7[2],
          match$7[3]
        ];
      case 8:
        var match$8 = fmtty_rel_det(rest._1);
        var af$8 = match$8[1];
        var fa$8 = match$8[0];
        return [
          function(param) {
            _1(fa$8, 0);
            return 0;
          },
          function(param) {
            _1(af$8, 0);
            return 0;
          },
          match$8[2],
          match$8[3]
        ];
      case 9:
        var match$9 = fmtty_rel_det(rest._2);
        var de = match$9[3];
        var ed = match$9[2];
        var af$9 = match$9[1];
        var fa$9 = match$9[0];
        var ty = trans(symm(rest._0), rest._1);
        var match$10 = fmtty_rel_det(ty);
        var jd = match$10[3];
        var dj = match$10[2];
        var ga = match$10[1];
        var ag = match$10[0];
        return [
          function(param) {
            _1(fa$9, 0);
            _1(ag, 0);
            return 0;
          },
          function(param) {
            _1(ga, 0);
            _1(af$9, 0);
            return 0;
          },
          function(param) {
            _1(ed, 0);
            _1(dj, 0);
            return 0;
          },
          function(param) {
            _1(jd, 0);
            _1(de, 0);
            return 0;
          }
        ];
      case 10:
        var match$11 = fmtty_rel_det(rest._0);
        var af$10 = match$11[1];
        var fa$10 = match$11[0];
        return [
          function(param) {
            _1(fa$10, 0);
            return 0;
          },
          function(param) {
            _1(af$10, 0);
            return 0;
          },
          match$11[2],
          match$11[3]
        ];
      case 11:
        var match$12 = fmtty_rel_det(rest._0);
        var af$11 = match$12[1];
        var fa$11 = match$12[0];
        return [
          function(param) {
            _1(fa$11, 0);
            return 0;
          },
          function(param) {
            _1(af$11, 0);
            return 0;
          },
          match$12[2],
          match$12[3]
        ];
      case 12:
        var match$13 = fmtty_rel_det(rest._0);
        var af$12 = match$13[1];
        var fa$12 = match$13[0];
        return [
          function(param) {
            _1(fa$12, 0);
            return 0;
          },
          function(param) {
            _1(af$12, 0);
            return 0;
          },
          match$13[2],
          match$13[3]
        ];
      case 13:
        var match$14 = fmtty_rel_det(rest._0);
        var de$1 = match$14[3];
        var ed$1 = match$14[2];
        var af$13 = match$14[1];
        var fa$13 = match$14[0];
        return [
          function(param) {
            _1(fa$13, 0);
            return 0;
          },
          function(param) {
            _1(af$13, 0);
            return 0;
          },
          function(param) {
            _1(ed$1, 0);
            return 0;
          },
          function(param) {
            _1(de$1, 0);
            return 0;
          }
        ];
      case 14:
        var match$15 = fmtty_rel_det(rest._0);
        var de$2 = match$15[3];
        var ed$2 = match$15[2];
        var af$14 = match$15[1];
        var fa$14 = match$15[0];
        return [
          function(param) {
            _1(fa$14, 0);
            return 0;
          },
          function(param) {
            _1(af$14, 0);
            return 0;
          },
          function(param) {
            _1(ed$2, 0);
            return 0;
          },
          function(param) {
            _1(de$2, 0);
            return 0;
          }
        ];
    }
  }
  function trans(ty1, ty2) {
    var exit = 0;
    if (typeof ty1 === "number") {
      if (typeof ty2 === "number") {
        return 0;
      }
      switch (ty2.TAG | 0) {
        case 8:
          exit = 6;
          break;
        case 9:
          exit = 7;
          break;
        case 10:
          exit = 1;
          break;
        case 11:
          exit = 2;
          break;
        case 12:
          exit = 3;
          break;
        case 13:
          exit = 4;
          break;
        case 14:
          exit = 5;
          break;
        default:
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "camlinternalFormat.ml",
              846,
              23
            ],
            Error: new Error()
          };
      }
    } else {
      switch (ty1.TAG | 0) {
        case 0:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 0:
                return {
                  TAG: 0,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 1:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 1:
                return {
                  TAG: 1,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 2:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 2:
                return {
                  TAG: 2,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 3:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 3:
                return {
                  TAG: 3,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 4:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 4:
                return {
                  TAG: 4,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 5:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 5:
                return {
                  TAG: 5,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 6:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 6:
                return {
                  TAG: 6,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 7:
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.TAG | 0) {
              case 7:
                return {
                  TAG: 7,
                  _0: trans(ty1._0, ty2._0)
                };
              case 8:
                exit = 6;
                break;
              case 9:
                exit = 7;
                break;
              case 10:
                exit = 1;
                break;
              case 11:
                exit = 2;
                break;
              case 12:
                exit = 3;
                break;
              case 13:
                exit = 4;
                break;
              case 14:
                exit = 5;
                break;
            }
          }
          break;
        case 8:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                832,
                26
              ],
              Error: new Error()
            };
          }
          switch (ty2.TAG | 0) {
            case 8:
              return {
                TAG: 8,
                _0: trans(ty1._0, ty2._0),
                _1: trans(ty1._1, ty2._1)
              };
            case 10:
              exit = 1;
              break;
            case 11:
              exit = 2;
              break;
            case 12:
              exit = 3;
              break;
            case 13:
              exit = 4;
              break;
            case 14:
              exit = 5;
              break;
            default:
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  832,
                  26
                ],
                Error: new Error()
              };
          }
          break;
        case 9:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                842,
                28
              ],
              Error: new Error()
            };
          }
          switch (ty2.TAG | 0) {
            case 8:
              exit = 6;
              break;
            case 9:
              var ty = trans(symm(ty1._1), ty2._0);
              var match = fmtty_rel_det(ty);
              _1(match[1], 0);
              _1(match[3], 0);
              return {
                TAG: 9,
                _0: ty1._0,
                _1: ty2._1,
                _2: trans(ty1._2, ty2._2)
              };
            case 10:
              exit = 1;
              break;
            case 11:
              exit = 2;
              break;
            case 12:
              exit = 3;
              break;
            case 13:
              exit = 4;
              break;
            case 14:
              exit = 5;
              break;
            default:
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  842,
                  28
                ],
                Error: new Error()
              };
          }
          break;
        case 10:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                810,
                21
              ],
              Error: new Error()
            };
          }
          if (ty2.TAG === 10) {
            return {
              TAG: 10,
              _0: trans(ty1._0, ty2._0)
            };
          }
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "camlinternalFormat.ml",
              810,
              21
            ],
            Error: new Error()
          };
        case 11:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                814,
                21
              ],
              Error: new Error()
            };
          }
          switch (ty2.TAG | 0) {
            case 10:
              exit = 1;
              break;
            case 11:
              return {
                TAG: 11,
                _0: trans(ty1._0, ty2._0)
              };
            default:
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  814,
                  21
                ],
                Error: new Error()
              };
          }
          break;
        case 12:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                818,
                19
              ],
              Error: new Error()
            };
          }
          switch (ty2.TAG | 0) {
            case 10:
              exit = 1;
              break;
            case 11:
              exit = 2;
              break;
            case 12:
              return {
                TAG: 12,
                _0: trans(ty1._0, ty2._0)
              };
            default:
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  818,
                  19
                ],
                Error: new Error()
              };
          }
          break;
        case 13:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                822,
                22
              ],
              Error: new Error()
            };
          }
          switch (ty2.TAG | 0) {
            case 10:
              exit = 1;
              break;
            case 11:
              exit = 2;
              break;
            case 12:
              exit = 3;
              break;
            case 13:
              return {
                TAG: 13,
                _0: trans(ty1._0, ty2._0)
              };
            default:
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  822,
                  22
                ],
                Error: new Error()
              };
          }
          break;
        case 14:
          if (typeof ty2 === "number") {
            throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "camlinternalFormat.ml",
                827,
                30
              ],
              Error: new Error()
            };
          }
          switch (ty2.TAG | 0) {
            case 10:
              exit = 1;
              break;
            case 11:
              exit = 2;
              break;
            case 12:
              exit = 3;
              break;
            case 13:
              exit = 4;
              break;
            case 14:
              return {
                TAG: 14,
                _0: trans(ty1._0, ty2._0)
              };
            default:
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "camlinternalFormat.ml",
                  827,
                  30
                ],
                Error: new Error()
              };
          }
          break;
      }
    }
    switch (exit) {
      case 1:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            811,
            21
          ],
          Error: new Error()
        };
      case 2:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            815,
            21
          ],
          Error: new Error()
        };
      case 3:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            819,
            19
          ],
          Error: new Error()
        };
      case 4:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            823,
            22
          ],
          Error: new Error()
        };
      case 5:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            828,
            30
          ],
          Error: new Error()
        };
      case 6:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            833,
            26
          ],
          Error: new Error()
        };
      case 7:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            843,
            28
          ],
          Error: new Error()
        };
      case 8:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            847,
            23
          ],
          Error: new Error()
        };
    }
  }
  var Type_mismatch = /* @__PURE__ */ create("CamlinternalFormat.Type_mismatch");
  function type_padding(pad, fmtty) {
    if (typeof pad === "number") {
      return {
        _0: 0,
        _1: fmtty
      };
    }
    if (pad.TAG === 0) {
      return {
        _0: {
          TAG: 0,
          _0: pad._0,
          _1: pad._1
        },
        _1: fmtty
      };
    }
    if (typeof fmtty === "number") {
      throw {
        RE_EXN_ID: Type_mismatch,
        Error: new Error()
      };
    }
    if (fmtty.TAG === 2) {
      return {
        _0: {
          TAG: 1,
          _0: pad._0
        },
        _1: fmtty._0
      };
    }
    throw {
      RE_EXN_ID: Type_mismatch,
      Error: new Error()
    };
  }
  function type_padprec(pad, prec, fmtty) {
    var match = type_padding(pad, fmtty);
    if (typeof prec !== "number") {
      return {
        _0: match._0,
        _1: {
          _0: prec._0
        },
        _2: match._1
      };
    }
    if (prec === 0) {
      return {
        _0: match._0,
        _1: 0,
        _2: match._1
      };
    }
    var rest = match._1;
    if (typeof rest === "number") {
      throw {
        RE_EXN_ID: Type_mismatch,
        Error: new Error()
      };
    }
    if (rest.TAG === 2) {
      return {
        _0: match._0,
        _1: 1,
        _2: rest._0
      };
    }
    throw {
      RE_EXN_ID: Type_mismatch,
      Error: new Error()
    };
  }
  function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
    if (typeof sub_fmtty === "number") {
      return {
        _0: 0,
        _1: type_format_gen(fmt, fmtty)
      };
    }
    switch (sub_fmtty.TAG | 0) {
      case 0:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 0) {
          var match = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 0,
              _0: match._0
            },
            _1: match._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 1:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 1) {
          var match$1 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 1,
              _0: match$1._0
            },
            _1: match$1._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 2:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 2) {
          var match$2 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 2,
              _0: match$2._0
            },
            _1: match$2._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 3:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 3) {
          var match$3 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 3,
              _0: match$3._0
            },
            _1: match$3._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 4:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 4) {
          var match$4 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 4,
              _0: match$4._0
            },
            _1: match$4._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 5:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 5) {
          var match$5 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 5,
              _0: match$5._0
            },
            _1: match$5._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 6:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 6) {
          var match$6 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 6,
              _0: match$6._0
            },
            _1: match$6._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 7:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 7) {
          var match$7 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 7,
              _0: match$7._0
            },
            _1: match$7._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 8:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 8) {
          var sub2_fmtty$prime = fmtty._0;
          if (caml_notequal({
            _0: sub_fmtty._0
          }, {
            _0: sub2_fmtty$prime
          })) {
            throw {
              RE_EXN_ID: Type_mismatch,
              Error: new Error()
            };
          }
          var match$8 = type_ignored_format_substitution(sub_fmtty._1, fmt, fmtty._1);
          return {
            _0: {
              TAG: 8,
              _0: sub2_fmtty$prime,
              _1: match$8._0
            },
            _1: match$8._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 9:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 9) {
          var sub2_fmtty$prime$1 = fmtty._1;
          var sub1_fmtty$prime = fmtty._0;
          if (caml_notequal({
            _0: erase_rel(sub_fmtty._0)
          }, {
            _0: erase_rel(sub1_fmtty$prime)
          })) {
            throw {
              RE_EXN_ID: Type_mismatch,
              Error: new Error()
            };
          }
          if (caml_notequal({
            _0: erase_rel(sub_fmtty._1)
          }, {
            _0: erase_rel(sub2_fmtty$prime$1)
          })) {
            throw {
              RE_EXN_ID: Type_mismatch,
              Error: new Error()
            };
          }
          var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
          var match$9 = fmtty_rel_det(sub_fmtty$prime);
          _1(match$9[1], 0);
          _1(match$9[3], 0);
          var match$10 = type_ignored_format_substitution(erase_rel(sub_fmtty._2), fmt, fmtty._2);
          return {
            _0: {
              TAG: 9,
              _0: sub1_fmtty$prime,
              _1: sub2_fmtty$prime$1,
              _2: symm(match$10._0)
            },
            _1: match$10._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 10:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 10) {
          var match$11 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 10,
              _0: match$11._0
            },
            _1: match$11._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 11:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 11) {
          var match$12 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 11,
              _0: match$12._0
            },
            _1: match$12._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 12:
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 13:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 13) {
          var match$13 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 13,
              _0: match$13._0
            },
            _1: match$13._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 14:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 14) {
          var match$14 = type_ignored_format_substitution(sub_fmtty._0, fmt, fmtty._0);
          return {
            _0: {
              TAG: 14,
              _0: match$14._0
            },
            _1: match$14._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
    }
  }
  function type_format_gen(fmt, fmtty) {
    if (typeof fmt === "number") {
      return {
        _0: 0,
        _1: fmtty
      };
    }
    switch (fmt.TAG | 0) {
      case 0:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 0) {
          var match = type_format_gen(fmt._0, fmtty._0);
          return {
            _0: {
              TAG: 0,
              _0: match._0
            },
            _1: match._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 1:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 0) {
          var match$1 = type_format_gen(fmt._0, fmtty._0);
          return {
            _0: {
              TAG: 1,
              _0: match$1._0
            },
            _1: match$1._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 2:
        var match$2 = type_padding(fmt._0, fmtty);
        var fmtty_rest = match$2._1;
        if (typeof fmtty_rest === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest.TAG === 1) {
          var match$3 = type_format_gen(fmt._1, fmtty_rest._0);
          return {
            _0: {
              TAG: 2,
              _0: match$2._0,
              _1: match$3._0
            },
            _1: match$3._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 3:
        var match$4 = type_padding(fmt._0, fmtty);
        var fmtty_rest$1 = match$4._1;
        if (typeof fmtty_rest$1 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$1.TAG === 1) {
          var match$5 = type_format_gen(fmt._1, fmtty_rest$1._0);
          return {
            _0: {
              TAG: 3,
              _0: match$4._0,
              _1: match$5._0
            },
            _1: match$5._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 4:
        var match$6 = type_padprec(fmt._1, fmt._2, fmtty);
        var fmtty_rest$2 = match$6._2;
        if (typeof fmtty_rest$2 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$2.TAG === 2) {
          var match$7 = type_format_gen(fmt._3, fmtty_rest$2._0);
          return {
            _0: {
              TAG: 4,
              _0: fmt._0,
              _1: match$6._0,
              _2: match$6._1,
              _3: match$7._0
            },
            _1: match$7._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 5:
        var match$8 = type_padprec(fmt._1, fmt._2, fmtty);
        var fmtty_rest$3 = match$8._2;
        if (typeof fmtty_rest$3 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$3.TAG === 3) {
          var match$9 = type_format_gen(fmt._3, fmtty_rest$3._0);
          return {
            _0: {
              TAG: 5,
              _0: fmt._0,
              _1: match$8._0,
              _2: match$8._1,
              _3: match$9._0
            },
            _1: match$9._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 6:
        var match$10 = type_padprec(fmt._1, fmt._2, fmtty);
        var fmtty_rest$4 = match$10._2;
        if (typeof fmtty_rest$4 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$4.TAG === 4) {
          var match$11 = type_format_gen(fmt._3, fmtty_rest$4._0);
          return {
            _0: {
              TAG: 6,
              _0: fmt._0,
              _1: match$10._0,
              _2: match$10._1,
              _3: match$11._0
            },
            _1: match$11._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 7:
        var match$12 = type_padprec(fmt._1, fmt._2, fmtty);
        var fmtty_rest$5 = match$12._2;
        if (typeof fmtty_rest$5 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$5.TAG === 5) {
          var match$13 = type_format_gen(fmt._3, fmtty_rest$5._0);
          return {
            _0: {
              TAG: 7,
              _0: fmt._0,
              _1: match$12._0,
              _2: match$12._1,
              _3: match$13._0
            },
            _1: match$13._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 8:
        var match$14 = type_padprec(fmt._1, fmt._2, fmtty);
        var fmtty_rest$6 = match$14._2;
        if (typeof fmtty_rest$6 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$6.TAG === 6) {
          var match$15 = type_format_gen(fmt._3, fmtty_rest$6._0);
          return {
            _0: {
              TAG: 8,
              _0: fmt._0,
              _1: match$14._0,
              _2: match$14._1,
              _3: match$15._0
            },
            _1: match$15._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 9:
        var match$16 = type_padding(fmt._0, fmtty);
        var fmtty_rest$7 = match$16._1;
        if (typeof fmtty_rest$7 === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty_rest$7.TAG === 7) {
          var match$17 = type_format_gen(fmt._1, fmtty_rest$7._0);
          return {
            _0: {
              TAG: 9,
              _0: match$16._0,
              _1: match$17._0
            },
            _1: match$17._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 10:
        var match$18 = type_format_gen(fmt._0, fmtty);
        return {
          _0: {
            TAG: 10,
            _0: match$18._0
          },
          _1: match$18._1
        };
      case 11:
        var match$19 = type_format_gen(fmt._1, fmtty);
        return {
          _0: {
            TAG: 11,
            _0: fmt._0,
            _1: match$19._0
          },
          _1: match$19._1
        };
      case 12:
        var match$20 = type_format_gen(fmt._1, fmtty);
        return {
          _0: {
            TAG: 12,
            _0: fmt._0,
            _1: match$20._0
          },
          _1: match$20._1
        };
      case 13:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 8) {
          var sub_fmtty$prime = fmtty._0;
          if (caml_notequal({
            _0: fmt._1
          }, {
            _0: sub_fmtty$prime
          })) {
            throw {
              RE_EXN_ID: Type_mismatch,
              Error: new Error()
            };
          }
          var match$21 = type_format_gen(fmt._2, fmtty._1);
          return {
            _0: {
              TAG: 13,
              _0: fmt._0,
              _1: sub_fmtty$prime,
              _2: match$21._0
            },
            _1: match$21._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 14:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 9) {
          var sub_fmtty1 = fmtty._0;
          if (caml_notequal({
            _0: erase_rel(fmt._1)
          }, {
            _0: erase_rel(sub_fmtty1)
          })) {
            throw {
              RE_EXN_ID: Type_mismatch,
              Error: new Error()
            };
          }
          var match$22 = type_format_gen(fmt._2, erase_rel(fmtty._2));
          return {
            _0: {
              TAG: 14,
              _0: fmt._0,
              _1: sub_fmtty1,
              _2: match$22._0
            },
            _1: match$22._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 15:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 10) {
          var match$23 = type_format_gen(fmt._0, fmtty._0);
          return {
            _0: {
              TAG: 15,
              _0: match$23._0
            },
            _1: match$23._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 16:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 11) {
          var match$24 = type_format_gen(fmt._0, fmtty._0);
          return {
            _0: {
              TAG: 16,
              _0: match$24._0
            },
            _1: match$24._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 17:
        var match$25 = type_format_gen(fmt._1, fmtty);
        return {
          _0: {
            TAG: 17,
            _0: fmt._0,
            _1: match$25._0
          },
          _1: match$25._1
        };
      case 18:
        var formatting_gen = fmt._0;
        var fmt0 = fmt._1;
        if (formatting_gen.TAG === 0) {
          var match$26 = formatting_gen._0;
          var match$27 = type_format_gen(match$26._0, fmtty);
          var match$28 = type_format_gen(fmt0, match$27._1);
          return {
            _0: {
              TAG: 18,
              _0: {
                TAG: 0,
                _0: {
                  _0: match$27._0,
                  _1: match$26._1
                }
              },
              _1: match$28._0
            },
            _1: match$28._1
          };
        }
        var match$29 = formatting_gen._0;
        var match$30 = type_format_gen(match$29._0, fmtty);
        var match$31 = type_format_gen(fmt0, match$30._1);
        return {
          _0: {
            TAG: 18,
            _0: {
              TAG: 1,
              _0: {
                _0: match$30._0,
                _1: match$29._1
              }
            },
            _1: match$31._0
          },
          _1: match$31._1
        };
      case 19:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 13) {
          var match$32 = type_format_gen(fmt._0, fmtty._0);
          return {
            _0: {
              TAG: 19,
              _0: match$32._0
            },
            _1: match$32._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 20:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 1) {
          var match$33 = type_format_gen(fmt._2, fmtty._0);
          return {
            _0: {
              TAG: 20,
              _0: fmt._0,
              _1: fmt._1,
              _2: match$33._0
            },
            _1: match$33._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 21:
        if (typeof fmtty === "number") {
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        }
        if (fmtty.TAG === 2) {
          var match$34 = type_format_gen(fmt._1, fmtty._0);
          return {
            _0: {
              TAG: 21,
              _0: fmt._0,
              _1: match$34._0
            },
            _1: match$34._1
          };
        }
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
      case 23:
        var ign = fmt._0;
        var fmt$1 = fmt._1;
        if (typeof ign === "number") {
          if (ign !== 2) {
            return type_ignored_param_one(ign, fmt$1, fmtty);
          }
          if (typeof fmtty === "number") {
            throw {
              RE_EXN_ID: Type_mismatch,
              Error: new Error()
            };
          }
          if (fmtty.TAG === 14) {
            var match$35 = type_format_gen(fmt$1, fmtty._0);
            return {
              _0: {
                TAG: 23,
                _0: 2,
                _1: match$35._0
              },
              _1: match$35._1
            };
          }
          throw {
            RE_EXN_ID: Type_mismatch,
            Error: new Error()
          };
        } else {
          switch (ign.TAG | 0) {
            case 8:
              return type_ignored_param_one({
                TAG: 8,
                _0: ign._0,
                _1: ign._1
              }, fmt$1, fmtty);
            case 9:
              var match$36 = type_ignored_format_substitution(ign._1, fmt$1, fmtty);
              var match$37 = match$36._1;
              return {
                _0: {
                  TAG: 23,
                  _0: {
                    TAG: 9,
                    _0: ign._0,
                    _1: match$36._0
                  },
                  _1: match$37._0
                },
                _1: match$37._1
              };
            default:
              return type_ignored_param_one(ign, fmt$1, fmtty);
          }
        }
      case 22:
      case 24:
        throw {
          RE_EXN_ID: Type_mismatch,
          Error: new Error()
        };
    }
  }
  function type_ignored_param_one(ign, fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    return {
      _0: {
        TAG: 23,
        _0: ign,
        _1: match._0
      },
      _1: match._1
    };
  }
  function type_format(fmt, fmtty) {
    var match = type_format_gen(fmt, fmtty);
    if (typeof match._1 === "number") {
      return match._0;
    }
    throw {
      RE_EXN_ID: Type_mismatch,
      Error: new Error()
    };
  }
  function recast(fmt, fmtty) {
    return type_format(fmt, erase_rel(symm(fmtty)));
  }
  function fix_padding(padty, width, str) {
    var len = str.length;
    var width$1 = abs(width);
    var padty$1 = width < 0 ? 0 : padty;
    if (width$1 <= len) {
      return str;
    }
    var res = make(width$1, padty$1 === 2 ? 48 : 32);
    switch (padty$1) {
      case 0:
        blit2(str, 0, res, 0, len);
        break;
      case 1:
        blit2(str, 0, res, width$1 - len | 0, len);
        break;
      case 2:
        if (len > 0 && (get(str, 0) === 43 || get(str, 0) === 45 || get(str, 0) === 32)) {
          set(res, 0, get(str, 0));
          blit2(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
        } else if (len > 1 && get(str, 0) === 48 && (get(str, 1) === 120 || get(str, 1) === 88)) {
          set(res, 1, get(str, 1));
          blit2(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
        } else {
          blit2(str, 0, res, width$1 - len | 0, len);
        }
        break;
    }
    return bytes_to_string(res);
  }
  function fix_int_precision(prec, str) {
    var prec$1 = abs(prec);
    var len = str.length;
    var c = get(str, 0);
    var exit = 0;
    if (c >= 58) {
      if (c >= 71) {
        if (c > 102 || c < 97) {
          return str;
        }
        exit = 2;
      } else {
        if (c < 65) {
          return str;
        }
        exit = 2;
      }
    } else if (c !== 32) {
      if (c < 43) {
        return str;
      }
      switch (c) {
        case 43:
        case 45:
          exit = 1;
          break;
        case 44:
        case 46:
        case 47:
          return str;
        case 48:
          if ((prec$1 + 2 | 0) > len && len > 1 && (get(str, 1) === 120 || get(str, 1) === 88)) {
            var res = make(prec$1 + 2 | 0, 48);
            set(res, 1, get(str, 1));
            blit2(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
            return bytes_to_string(res);
          }
          exit = 2;
          break;
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          exit = 2;
          break;
      }
    } else {
      exit = 1;
    }
    switch (exit) {
      case 1:
        if ((prec$1 + 1 | 0) <= len) {
          return str;
        }
        var res$1 = make(prec$1 + 1 | 0, 48);
        set(res$1, 0, c);
        blit2(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
        return bytes_to_string(res$1);
      case 2:
        if (prec$1 <= len) {
          return str;
        }
        var res$2 = make(prec$1, 48);
        blit2(str, 0, res$2, prec$1 - len | 0, len);
        return bytes_to_string(res$2);
    }
  }
  function string_to_caml_string(str) {
    var str$1 = escaped3(str);
    var l = str$1.length;
    var res = make(l + 2 | 0, 34);
    caml_blit_string(str$1, 0, res, 1, l);
    return bytes_to_string(res);
  }
  function format_of_iconv(param) {
    switch (param) {
      case 0:
        return "%d";
      case 1:
        return "%+d";
      case 2:
        return "% d";
      case 3:
        return "%i";
      case 4:
        return "%+i";
      case 5:
        return "% i";
      case 6:
        return "%x";
      case 7:
        return "%#x";
      case 8:
        return "%X";
      case 9:
        return "%#X";
      case 10:
        return "%o";
      case 11:
        return "%#o";
      case 12:
        return "%u";
    }
  }
  function format_of_iconvL(param) {
    switch (param) {
      case 0:
        return "%Ld";
      case 1:
        return "%+Ld";
      case 2:
        return "% Ld";
      case 3:
        return "%Li";
      case 4:
        return "%+Li";
      case 5:
        return "% Li";
      case 6:
        return "%Lx";
      case 7:
        return "%#Lx";
      case 8:
        return "%LX";
      case 9:
        return "%#LX";
      case 10:
        return "%Lo";
      case 11:
        return "%#Lo";
      case 12:
        return "%Lu";
    }
  }
  function format_of_iconvl(param) {
    switch (param) {
      case 0:
        return "%ld";
      case 1:
        return "%+ld";
      case 2:
        return "% ld";
      case 3:
        return "%li";
      case 4:
        return "%+li";
      case 5:
        return "% li";
      case 6:
        return "%lx";
      case 7:
        return "%#lx";
      case 8:
        return "%lX";
      case 9:
        return "%#lX";
      case 10:
        return "%lo";
      case 11:
        return "%#lo";
      case 12:
        return "%lu";
    }
  }
  function format_of_iconvn(param) {
    switch (param) {
      case 0:
        return "%nd";
      case 1:
        return "%+nd";
      case 2:
        return "% nd";
      case 3:
        return "%ni";
      case 4:
        return "%+ni";
      case 5:
        return "% ni";
      case 6:
        return "%nx";
      case 7:
        return "%#nx";
      case 8:
        return "%nX";
      case 9:
        return "%#nX";
      case 10:
        return "%no";
      case 11:
        return "%#no";
      case 12:
        return "%nu";
    }
  }
  function format_of_fconv(fconv, prec) {
    if (fconv === 15) {
      return "%.12g";
    }
    var prec$1 = abs(prec);
    var symb = char_of_fconv(fconv);
    var buf = {
      ind: 0,
      bytes: caml_create_bytes(16)
    };
    buffer_add_char(buf, 37);
    bprint_fconv_flag(buf, fconv);
    buffer_add_char(buf, 46);
    buffer_add_string(buf, String(prec$1));
    buffer_add_char(buf, symb);
    return buffer_contents(buf);
  }
  function convert_int(iconv, n) {
    return caml_format_int(format_of_iconv(iconv), n);
  }
  function convert_int32(iconv, n) {
    return caml_int32_format(format_of_iconvl(iconv), n);
  }
  function convert_nativeint(iconv, n) {
    return caml_nativeint_format(format_of_iconvn(iconv), n);
  }
  function convert_int64(iconv, n) {
    return caml_int64_format(format_of_iconvL(iconv), n);
  }
  function convert_float(fconv, prec, x) {
    if (fconv >= 16) {
      var sign;
      if (fconv >= 17) {
        switch (fconv) {
          case 19:
            sign = 45;
            break;
          case 17:
          case 20:
            sign = 43;
            break;
          case 18:
          case 21:
            sign = 32;
            break;
        }
      } else {
        sign = 45;
      }
      var str = caml_hexstring_of_float(x, prec, sign);
      if (fconv >= 19) {
        return bytes_to_string(uppercase_ascii2(bytes_of_string(str)));
      } else {
        return str;
      }
    }
    var str$1 = caml_format_float(format_of_fconv(fconv, prec), x);
    if (fconv !== 15) {
      return str$1;
    }
    var len = str$1.length;
    var is_valid = function(_i) {
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        var match2 = get(str$1, i);
        if (match2 > 69 || match2 < 46) {
          if (match2 === 101) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        if (match2 > 68 || match2 < 47) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    };
    var match = classify_float(x);
    if (match !== 3) {
      if (match >= 4) {
        return "nan";
      } else if (is_valid(0)) {
        return str$1;
      } else {
        return str$1 + ".";
      }
    } else if (x < 0) {
      return "neg_infinity";
    } else {
      return "infinity";
    }
  }
  function format_caml_char(c) {
    var str = escaped(c);
    var l = str.length;
    var res = make(l + 2 | 0, 39);
    caml_blit_string(str, 0, res, 1, l);
    return bytes_to_string(res);
  }
  function string_of_fmtty(fmtty) {
    var buf = {
      ind: 0,
      bytes: caml_create_bytes(16)
    };
    bprint_fmtty(buf, fmtty);
    return buffer_contents(buf);
  }
  function make_printf(_k, o, _acc, _fmt) {
    while (true) {
      var fmt = _fmt;
      var acc = _acc;
      var k = _k;
      if (typeof fmt === "number") {
        return _2(k, o, acc);
      }
      switch (fmt.TAG | 0) {
        case 0:
          var rest = fmt._0;
          return function(k2, acc2, rest2) {
            return function(c) {
              var new_acc2 = {
                TAG: 5,
                _0: acc2,
                _1: c
              };
              return make_printf(k2, o, new_acc2, rest2);
            };
          }(k, acc, rest);
        case 1:
          var rest$1 = fmt._0;
          return function(k2, acc2, rest$12) {
            return function(c) {
              var new_acc_1 = format_caml_char(c);
              var new_acc2 = {
                TAG: 4,
                _0: acc2,
                _1: new_acc_1
              };
              return make_printf(k2, o, new_acc2, rest$12);
            };
          }(k, acc, rest$1);
        case 2:
          return make_padding(k, o, acc, fmt._1, fmt._0, function(str) {
            return str;
          });
        case 3:
          return make_padding(k, o, acc, fmt._1, fmt._0, string_to_caml_string);
        case 4:
          return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_int, fmt._0);
        case 5:
          return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_int32, fmt._0);
        case 6:
          return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_nativeint, fmt._0);
        case 7:
          return make_int_padding_precision(k, o, acc, fmt._3, fmt._1, fmt._2, convert_int64, fmt._0);
        case 8:
          var fmt$1 = fmt._3;
          var pad = fmt._1;
          var prec = fmt._2;
          var fconv = fmt._0;
          if (typeof pad === "number") {
            if (typeof prec === "number") {
              if (prec !== 0) {
                return function(k2, acc2, fmt$12, fconv2) {
                  return function(p2, x) {
                    var str = convert_float(fconv2, p2, x);
                    return make_printf(k2, o, {
                      TAG: 4,
                      _0: acc2,
                      _1: str
                    }, fmt$12);
                  };
                }(k, acc, fmt$1, fconv);
              } else {
                return function(k2, acc2, fmt$12, fconv2) {
                  return function(x) {
                    var str = convert_float(fconv2, -6, x);
                    return make_printf(k2, o, {
                      TAG: 4,
                      _0: acc2,
                      _1: str
                    }, fmt$12);
                  };
                }(k, acc, fmt$1, fconv);
              }
            }
            var p = prec._0;
            return function(k2, acc2, fmt$12, fconv2, p2) {
              return function(x) {
                var str = convert_float(fconv2, p2, x);
                return make_printf(k2, o, {
                  TAG: 4,
                  _0: acc2,
                  _1: str
                }, fmt$12);
              };
            }(k, acc, fmt$1, fconv, p);
          }
          if (pad.TAG === 0) {
            var w = pad._1;
            var padty = pad._0;
            if (typeof prec === "number") {
              if (prec !== 0) {
                return function(k2, acc2, fmt$12, fconv2, padty2, w2) {
                  return function(p2, x) {
                    var str = fix_padding(padty2, w2, convert_float(fconv2, p2, x));
                    return make_printf(k2, o, {
                      TAG: 4,
                      _0: acc2,
                      _1: str
                    }, fmt$12);
                  };
                }(k, acc, fmt$1, fconv, padty, w);
              } else {
                return function(k2, acc2, fmt$12, fconv2, padty2, w2) {
                  return function(x) {
                    var str = convert_float(fconv2, -6, x);
                    var str$prime = fix_padding(padty2, w2, str);
                    return make_printf(k2, o, {
                      TAG: 4,
                      _0: acc2,
                      _1: str$prime
                    }, fmt$12);
                  };
                }(k, acc, fmt$1, fconv, padty, w);
              }
            }
            var p$1 = prec._0;
            return function(k2, acc2, fmt$12, fconv2, padty2, w2, p$12) {
              return function(x) {
                var str = fix_padding(padty2, w2, convert_float(fconv2, p$12, x));
                return make_printf(k2, o, {
                  TAG: 4,
                  _0: acc2,
                  _1: str
                }, fmt$12);
              };
            }(k, acc, fmt$1, fconv, padty, w, p$1);
          }
          var padty$1 = pad._0;
          if (typeof prec === "number") {
            if (prec !== 0) {
              return function(k2, acc2, fmt$12, fconv2, padty$12) {
                return function(w2, p2, x) {
                  var str = fix_padding(padty$12, w2, convert_float(fconv2, p2, x));
                  return make_printf(k2, o, {
                    TAG: 4,
                    _0: acc2,
                    _1: str
                  }, fmt$12);
                };
              }(k, acc, fmt$1, fconv, padty$1);
            } else {
              return function(k2, acc2, fmt$12, fconv2, padty$12) {
                return function(w2, x) {
                  var str = convert_float(fconv2, -6, x);
                  var str$prime = fix_padding(padty$12, w2, str);
                  return make_printf(k2, o, {
                    TAG: 4,
                    _0: acc2,
                    _1: str$prime
                  }, fmt$12);
                };
              }(k, acc, fmt$1, fconv, padty$1);
            }
          }
          var p$2 = prec._0;
          return function(k2, acc2, fmt$12, fconv2, padty$12, p$22) {
            return function(w2, x) {
              var str = fix_padding(padty$12, w2, convert_float(fconv2, p$22, x));
              return make_printf(k2, o, {
                TAG: 4,
                _0: acc2,
                _1: str
              }, fmt$12);
            };
          }(k, acc, fmt$1, fconv, padty$1, p$2);
        case 9:
          return make_padding(k, o, acc, fmt._1, fmt._0, string_of_bool);
        case 10:
          _fmt = fmt._0;
          _acc = {
            TAG: 7,
            _0: acc
          };
          continue;
        case 11:
          _fmt = fmt._1;
          _acc = {
            TAG: 2,
            _0: acc,
            _1: fmt._0
          };
          continue;
        case 12:
          _fmt = fmt._1;
          _acc = {
            TAG: 3,
            _0: acc,
            _1: fmt._0
          };
          continue;
        case 13:
          var rest$2 = fmt._2;
          var ty = string_of_fmtty(fmt._1);
          return function(k2, acc2, rest$22, ty2) {
            return function(str) {
              return make_printf(k2, o, {
                TAG: 4,
                _0: acc2,
                _1: ty2
              }, rest$22);
            };
          }(k, acc, rest$2, ty);
        case 14:
          var rest$3 = fmt._2;
          var fmtty = fmt._1;
          return function(k2, acc2, fmtty2, rest$32) {
            return function(param) {
              return make_printf(k2, o, acc2, concat_fmt(recast(param._0, fmtty2), rest$32));
            };
          }(k, acc, fmtty, rest$3);
        case 15:
          var rest$4 = fmt._0;
          return function(k2, acc2, rest$42) {
            return function(f, x) {
              return make_printf(k2, o, {
                TAG: 6,
                _0: acc2,
                _1: function(o2) {
                  return _2(f, o2, x);
                }
              }, rest$42);
            };
          }(k, acc, rest$4);
        case 16:
          var rest$5 = fmt._0;
          return function(k2, acc2, rest$52) {
            return function(f) {
              return make_printf(k2, o, {
                TAG: 6,
                _0: acc2,
                _1: f
              }, rest$52);
            };
          }(k, acc, rest$5);
        case 17:
          _fmt = fmt._1;
          _acc = {
            TAG: 0,
            _0: acc,
            _1: fmt._0
          };
          continue;
        case 18:
          var match = fmt._0;
          if (match.TAG === 0) {
            var rest$6 = fmt._1;
            var k$prime = function(k2, acc2, rest$62) {
              return function k$prime2(koc, kacc) {
                return make_printf(k2, koc, {
                  TAG: 1,
                  _0: acc2,
                  _1: {
                    TAG: 0,
                    _0: kacc
                  }
                }, rest$62);
              };
            }(k, acc, rest$6);
            _fmt = match._0._0;
            _acc = 0;
            _k = k$prime;
            continue;
          }
          var rest$7 = fmt._1;
          var k$prime$1 = function(k2, acc2, rest$72) {
            return function k$prime$12(koc, kacc) {
              return make_printf(k2, koc, {
                TAG: 1,
                _0: acc2,
                _1: {
                  TAG: 1,
                  _0: kacc
                }
              }, rest$72);
            };
          }(k, acc, rest$7);
          _fmt = match._0._0;
          _acc = 0;
          _k = k$prime$1;
          continue;
        case 19:
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "camlinternalFormat.ml",
              1525,
              4
            ],
            Error: new Error()
          };
        case 20:
          var rest$8 = fmt._2;
          var new_acc = {
            TAG: 8,
            _0: acc,
            _1: "Printf: bad conversion %["
          };
          return function(k2, rest$82, new_acc2) {
            return function(param) {
              return make_printf(k2, o, new_acc2, rest$82);
            };
          }(k, rest$8, new_acc);
        case 21:
          var rest$9 = fmt._1;
          return function(k2, acc2, rest$92) {
            return function(n) {
              var new_acc_1 = caml_format_int("%u", n);
              var new_acc2 = {
                TAG: 4,
                _0: acc2,
                _1: new_acc_1
              };
              return make_printf(k2, o, new_acc2, rest$92);
            };
          }(k, acc, rest$9);
        case 22:
          var rest$10 = fmt._0;
          return function(k2, acc2, rest$102) {
            return function(c) {
              var new_acc2 = {
                TAG: 5,
                _0: acc2,
                _1: c
              };
              return make_printf(k2, o, new_acc2, rest$102);
            };
          }(k, acc, rest$10);
        case 23:
          return make_ignored_param(k, o, acc, fmt._0, fmt._1);
        case 24:
          return make_custom(k, o, acc, fmt._2, fmt._0, _1(fmt._1, void 0));
      }
    }
    ;
  }
  function make_ignored_param(k, o, acc, ign, fmt) {
    if (typeof ign !== "number") {
      if (ign.TAG === 9) {
        return make_from_fmtty(k, o, acc, ign._1, fmt);
      } else {
        return make_invalid_arg(k, o, acc, fmt);
      }
    }
    if (ign !== 2) {
      return make_invalid_arg(k, o, acc, fmt);
    }
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: [
        "camlinternalFormat.ml",
        1593,
        39
      ],
      Error: new Error()
    };
  }
  function make_from_fmtty(k, o, acc, fmtty, fmt) {
    if (typeof fmtty === "number") {
      return make_invalid_arg(k, o, acc, fmt);
    }
    switch (fmtty.TAG | 0) {
      case 0:
        var rest = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest, fmt);
        };
      case 1:
        var rest$1 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$1, fmt);
        };
      case 2:
        var rest$2 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$2, fmt);
        };
      case 3:
        var rest$3 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$3, fmt);
        };
      case 4:
        var rest$4 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$4, fmt);
        };
      case 5:
        var rest$5 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$5, fmt);
        };
      case 6:
        var rest$6 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$6, fmt);
        };
      case 7:
        var rest$7 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$7, fmt);
        };
      case 8:
        var rest$8 = fmtty._1;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$8, fmt);
        };
      case 9:
        var rest$9 = fmtty._2;
        var ty = trans(symm(fmtty._0), fmtty._1);
        return function(param) {
          return make_from_fmtty(k, o, acc, concat_fmtty(ty, rest$9), fmt);
        };
      case 10:
        var rest$10 = fmtty._0;
        return function(param, param$1) {
          return make_from_fmtty(k, o, acc, rest$10, fmt);
        };
      case 11:
        var rest$11 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$11, fmt);
        };
      case 12:
        var rest$12 = fmtty._0;
        return function(param) {
          return make_from_fmtty(k, o, acc, rest$12, fmt);
        };
      case 13:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            1616,
            31
          ],
          Error: new Error()
        };
      case 14:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "camlinternalFormat.ml",
            1617,
            31
          ],
          Error: new Error()
        };
    }
  }
  function make_invalid_arg(k, o, acc, fmt) {
    return make_printf(k, o, {
      TAG: 8,
      _0: acc,
      _1: "Printf: bad conversion %_"
    }, fmt);
  }
  function make_padding(k, o, acc, fmt, pad, trans2) {
    if (typeof pad === "number") {
      return function(x) {
        var new_acc_1 = _1(trans2, x);
        var new_acc = {
          TAG: 4,
          _0: acc,
          _1: new_acc_1
        };
        return make_printf(k, o, new_acc, fmt);
      };
    }
    if (pad.TAG === 0) {
      var width = pad._1;
      var padty = pad._0;
      return function(x) {
        var new_acc_1 = fix_padding(padty, width, _1(trans2, x));
        var new_acc = {
          TAG: 4,
          _0: acc,
          _1: new_acc_1
        };
        return make_printf(k, o, new_acc, fmt);
      };
    }
    var padty$1 = pad._0;
    return function(w, x) {
      var new_acc_1 = fix_padding(padty$1, w, _1(trans2, x));
      var new_acc = {
        TAG: 4,
        _0: acc,
        _1: new_acc_1
      };
      return make_printf(k, o, new_acc, fmt);
    };
  }
  function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans2, iconv) {
    if (typeof pad === "number") {
      if (typeof prec === "number") {
        if (prec !== 0) {
          return function(p2, x) {
            var str = fix_int_precision(p2, _2(trans2, iconv, x));
            return make_printf(k, o, {
              TAG: 4,
              _0: acc,
              _1: str
            }, fmt);
          };
        } else {
          return function(x) {
            var str = _2(trans2, iconv, x);
            return make_printf(k, o, {
              TAG: 4,
              _0: acc,
              _1: str
            }, fmt);
          };
        }
      }
      var p = prec._0;
      return function(x) {
        var str = fix_int_precision(p, _2(trans2, iconv, x));
        return make_printf(k, o, {
          TAG: 4,
          _0: acc,
          _1: str
        }, fmt);
      };
    }
    if (pad.TAG === 0) {
      var w = pad._1;
      var padty = pad._0;
      if (typeof prec === "number") {
        if (prec !== 0) {
          return function(p2, x) {
            var str = fix_padding(padty, w, fix_int_precision(p2, _2(trans2, iconv, x)));
            return make_printf(k, o, {
              TAG: 4,
              _0: acc,
              _1: str
            }, fmt);
          };
        } else {
          return function(x) {
            var str = fix_padding(padty, w, _2(trans2, iconv, x));
            return make_printf(k, o, {
              TAG: 4,
              _0: acc,
              _1: str
            }, fmt);
          };
        }
      }
      var p$1 = prec._0;
      return function(x) {
        var str = fix_padding(padty, w, fix_int_precision(p$1, _2(trans2, iconv, x)));
        return make_printf(k, o, {
          TAG: 4,
          _0: acc,
          _1: str
        }, fmt);
      };
    }
    var padty$1 = pad._0;
    if (typeof prec === "number") {
      if (prec !== 0) {
        return function(w2, p2, x) {
          var str = fix_padding(padty$1, w2, fix_int_precision(p2, _2(trans2, iconv, x)));
          return make_printf(k, o, {
            TAG: 4,
            _0: acc,
            _1: str
          }, fmt);
        };
      } else {
        return function(w2, x) {
          var str = fix_padding(padty$1, w2, _2(trans2, iconv, x));
          return make_printf(k, o, {
            TAG: 4,
            _0: acc,
            _1: str
          }, fmt);
        };
      }
    }
    var p$2 = prec._0;
    return function(w2, x) {
      var str = fix_padding(padty$1, w2, fix_int_precision(p$2, _2(trans2, iconv, x)));
      return make_printf(k, o, {
        TAG: 4,
        _0: acc,
        _1: str
      }, fmt);
    };
  }
  function make_custom(k, o, acc, rest, arity, f) {
    if (!arity) {
      return make_printf(k, o, {
        TAG: 4,
        _0: acc,
        _1: f
      }, rest);
    }
    var arity$1 = arity._0;
    return function(x) {
      return make_custom(k, o, acc, rest, arity$1, _1(f, x));
    };
  }
  function strput_acc(b, _acc) {
    while (true) {
      var acc = _acc;
      var exit = 0;
      if (typeof acc === "number") {
        return;
      }
      switch (acc.TAG | 0) {
        case 0:
          var s = string_of_formatting_lit(acc._1);
          strput_acc(b, acc._0);
          return add_string(b, s);
        case 1:
          var acc$prime = acc._1;
          var p = acc._0;
          if (acc$prime.TAG === 0) {
            strput_acc(b, p);
            add_string(b, "@{");
            _acc = acc$prime._0;
            continue;
          }
          strput_acc(b, p);
          add_string(b, "@[");
          _acc = acc$prime._0;
          continue;
        case 2:
        case 4:
          exit = 1;
          break;
        case 3:
        case 5:
          exit = 2;
          break;
        case 6:
          strput_acc(b, acc._0);
          return add_string(b, _1(acc._1, void 0));
        case 7:
          _acc = acc._0;
          continue;
        case 8:
          strput_acc(b, acc._0);
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: acc._1,
            Error: new Error()
          };
      }
      switch (exit) {
        case 1:
          strput_acc(b, acc._0);
          return add_string(b, acc._1);
        case 2:
          strput_acc(b, acc._0);
          return add_char(b, acc._1);
      }
    }
    ;
  }

  // node_modules/bs-platform/lib/es6/printf.js
  function ksprintf(k, param) {
    var k$prime = function(param2, acc) {
      var buf = create2(64);
      strput_acc(buf, acc);
      return _1(k, contents(buf));
    };
    return make_printf(k$prime, void 0, 0, param._0);
  }
  function sprintf(fmt) {
    return ksprintf(function(s) {
      return s;
    }, fmt);
  }

  // src/demo.js
  console.log(sprintf({
    _0: {
      TAG: 11,
      _0: "hello world",
      _1: 0
    },
    _1: "hello world"
  }));
})();
