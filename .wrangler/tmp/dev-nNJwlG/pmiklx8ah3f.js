var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value2) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value2);
  return value2;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value2) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value2);
};
var __privateSet = (obj, member, value2, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value2) : member.set(obj, value2);
  return value2;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// .wrangler/tmp/bundle-ruotjD/checked-fetch.js
function checkURL(request, init2) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init2) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-ruotjD/checked-fetch.js"() {
    "use strict";
    urls = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init2] = argArray;
        checkURL(request, init2);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/kleur_BcFxsYqz.mjs
function init(x, y2) {
  let rgx = new RegExp(`\\x1b\\[${y2}m`, "g");
  let open = `\x1B[${x}m`, close = `\x1B[${y2}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
  };
}
var FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY, $, bold, dim, red, yellow, blue;
var init_kleur_BcFxsYqz = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/kleur_BcFxsYqz.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    isTTY = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
      isTTY = process.stdout && process.stdout.isTTY;
    }
    $ = {
      enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
    };
    bold = init(1, 22);
    dim = init(2, 22);
    red = init(31, 39);
    yellow = init(33, 39);
    blue = init(34, 39);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/path-to-regexp_Xgx1vbKb.mjs
function lexer(str) {
  var tokens = [];
  var i3 = 0;
  while (i3 < str.length) {
    var char = str[i3];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i3, value: str[i3++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i3++, value: str[i3++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i3, value: str[i3++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i3, value: str[i3++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i3 + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i3));
      tokens.push({ type: "NAME", index: i3, value: name });
      i3 = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i3 + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i3));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i3));
      tokens.push({ type: "PATTERN", index: i3, value: pattern });
      i3 = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i3, value: str[i3++] });
  }
  tokens.push({ type: "END", index: i3, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a2 = options.prefixes, prefixes2 = _a2 === void 0 ? "./" : _a2;
  var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
  var result = [];
  var key = 0;
  var i3 = 0;
  var path = "";
  var tryConsume = function(type2) {
    if (i3 < tokens.length && tokens[i3].type === type2)
      return tokens[i3++].value;
  };
  var mustConsume = function(type2) {
    var value3 = tryConsume(type2);
    if (value3 !== void 0)
      return value3;
    var _a3 = tokens[i3], nextType = _a3.type, index = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type2));
  };
  var consumeText = function() {
    var result2 = "";
    var value3;
    while (value3 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value3;
    }
    return result2;
  };
  while (i3 < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes2.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value2 = char || tryConsume("ESCAPED_CHAR");
    if (value2) {
      path += value2;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a2 = options.encode, encode2 = _a2 === void 0 ? function(x) {
    return x;
  } : _a2, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path = "";
    for (var i3 = 0; i3 < tokens.length; i3++) {
      var token = tokens[i3];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value2 = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value2)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value2.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value2.length; j++) {
          var segment = encode2(value2[j], token);
          if (validate && !matches[i3].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value2 === "string" || typeof value2 === "number") {
        var segment = encode2(String(value2), token);
        if (validate && !matches[i3].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path;
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
var init_path_to_regexp_Xgx1vbKb = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/path-to-regexp_Xgx1vbKb.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/@vue_BQBbmbrb.mjs
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
function normalizeStyle(value2) {
  if (isArray(value2)) {
    const res = {};
    for (let i3 = 0; i3 < value2.length; i3++) {
      const item = value2[i3];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value2) || isObject(value2)) {
    return value2;
  }
}
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value2 = styles[key];
    if (isString(value2) || typeof value2 === "number") {
      const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
      ret += `${normalizedKey}:${value2};`;
    }
  }
  return ret;
}
function normalizeClass(value2) {
  let res = "";
  if (isString(value2)) {
    res = value2;
  } else if (isArray(value2)) {
    for (let i3 = 0; i3 < value2.length; i3++) {
      const normalized = normalizeClass(value2[i3]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value2)) {
    for (const name in value2) {
      if (value2[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function includeBooleanAttr(value2) {
  return !!value2 || value2 === "";
}
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
function isRenderableAttrValue(value2) {
  if (value2 == null) {
    return false;
  }
  const type2 = typeof value2;
  return type2 === "string" || type2 === "number" || type2 === "boolean";
}
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a2, b) {
  if (a2.length !== b.length)
    return false;
  let equal = true;
  for (let i3 = 0; equal && i3 < a2.length; i3++) {
    equal = looseEqual(a2[i3], b[i3]);
  }
  return equal;
}
function looseEqual(a2, b) {
  if (a2 === b)
    return true;
  let aValidType = isDate(a2);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a2.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a2);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a2 === b;
  }
  aValidType = isArray(a2);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a2, b) : false;
  }
  aValidType = isObject(a2);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a2).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a2) {
      const aHasKey = a2.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a2[key], b[key])) {
        return false;
      }
    }
  }
  return String(a2) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i3 = effect2._depsLength; i3 < effect2.deps.length; i3++) {
      cleanupDepEffect(effect2.deps[i3], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
  }
}
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
function track(target, type2, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep
    );
  }
}
function trigger(target, type2, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type2 === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type2) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4
      );
    }
  }
  resetScheduling();
}
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i3 = 0, l3 = this.length; i3 < l3; i3++) {
        track(arr, "get", i3 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  if (!isSymbol(key))
    key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value2) {
  value2 = toRaw(value2);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value2);
  if (!hadKey) {
    target.add(value2);
    trigger(target, "add", value2, value2);
  }
  return this;
}
function set(key, value2) {
  value2 = toRaw(value2);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value2);
  if (!hadKey) {
    trigger(target, "add", key, value2);
  } else if (hasChanged(value2, oldValue)) {
    trigger(target, "set", key, value2);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value2, key) => {
      return callback.call(thisArg, wrap(value2), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value: value2, done } = innerIterator.next();
        return done ? { value: value2, done } : {
          value: isPair ? [wrap(value2[0]), wrap(value2[1])] : wrap(value2),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type2) {
  return function(...args) {
    return type2 === "delete" ? false : type2 === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value2) {
  return value2["__v_skip"] || !Object.isExtensible(value2) ? 0 : targetTypeMap(toRawType(value2));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value2) {
  if (isReadonly(value2)) {
    return isReactive(value2["__v_raw"]);
  }
  return !!(value2 && value2["__v_isReactive"]);
}
function isReadonly(value2) {
  return !!(value2 && value2["__v_isReadonly"]);
}
function isShallow(value2) {
  return !!(value2 && value2["__v_isShallow"]);
}
function isProxy(value2) {
  return value2 ? !!value2["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value2) {
  if (Object.isExtensible(value2)) {
    def(value2, "__v_skip", true);
  }
  return value2;
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function trackRefValue(ref2) {
  var _a2;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a2 = ref2.dep) != null ? _a2 : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      )
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel
    );
  }
}
function isRef(r4) {
  return !!(r4 && r4.__v_isRef === true);
}
function ref(value2) {
  return createRef(value2, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function callWithErrorHandling(fn, instance, type2, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type2);
  }
}
function callWithAsyncErrorHandling(fn, instance, type2, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type2, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type2);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i3 = 0; i3 < fn.length; i3++) {
      values.push(callWithAsyncErrorHandling(fn[i3], instance, type2, args));
    }
    return values;
  }
}
function handleError(err, instance, type2, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type2}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i3 = 0; i3 < errorCapturedHooks.length; i3++) {
          if (errorCapturedHooks[i3](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      pauseTracking();
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      resetTracking();
      return;
    }
  }
  logError(err, type2, contextVNode, throwInDev);
}
function logError(err, type2, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
function nextTick(fn) {
  const p3 = currentFlushPromise || resolvedPromise;
  return fn ? p3.then(this ? fn.bind(this) : fn) : p3;
}
function findInsertionIndex(id) {
  let start2 = flushIndex + 1;
  let end = queue.length;
  while (start2 < end) {
    const middle = start2 + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start2 = middle + 1;
    } else {
      end = middle;
    }
  }
  return start2;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i3 = queue.indexOf(job);
  if (i3 > flushIndex) {
    queue.splice(i3, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i3 = isFlushing ? flushIndex + 1 : 0) {
  for (; i3 < queue.length; i3++) {
    const cb = queue[i3];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i3, 1);
      i3--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b) => getId(a2) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  queue.sort(comparator);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function setCurrentRenderingInstance$1(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance$1(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance$1(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function renderComponentRoot$1(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render2,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance$1(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode$1(
        render2.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (false)
        ;
      result = normalizeVNode$1(
        render22.length > 1 ? render22(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance$1(prev);
  return result;
}
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i3 = 0; i3 < dynamicProps.length; i3++) {
        const key = dynamicProps[i3];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i3 = 0; i3 < nextKeys.length; i3++) {
    const key = nextKeys[i3];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v3, i3) => hasChanged(v3, oldValue[i3])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value2, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value2)) {
    cb = value2;
  } else {
    cb = value2.handler;
    options = value2;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i3 = 0; i3 < segments.length && cur; i3++) {
      cur = cur[segments[i3]];
    }
    return cur;
  };
}
function traverse(value2, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value2) || value2["__v_skip"]) {
    return value2;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value2)) {
    return value2;
  }
  seen.add(value2);
  depth--;
  if (isRef(value2)) {
    traverse(value2.value, depth, seen);
  } else if (isArray(value2)) {
    for (let i3 = 0; i3 < value2.length; i3++) {
      traverse(value2[i3], depth, seen);
    }
  } else if (isSet(value2) || isMap(value2)) {
    value2.forEach((v3) => {
      traverse(v3, depth, seen);
    });
  } else if (isPlainObject(value2)) {
    for (const key in value2) {
      traverse(value2[key], depth, seen);
    }
  }
  return value2;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i3 = 0; i3 < bindings.length; i3++) {
    const binding = bindings[i3];
    if (oldBindings) {
      binding.oldValue = oldBindings[i3].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type2, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type2, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type2, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type2, target, keepAliveRoot) {
  const injected = injectHook(
    type2,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type2], injected);
  }, target);
}
function injectHook(type2, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type2] || (target[type2] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type2, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    return createVNode("slot", props, fallback);
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || [],
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p3) => (normalized[p3] = null, normalized),
    {}
  ) : props;
}
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods: methods2,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives: directives2,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods2) {
    for (const key in methods2) {
      const methodHandler = methods2[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v3) => c2.value = v3
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives2)
    instance.directives = directives2;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v3) => injected.value = v3
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type2) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h22) => h22.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type2
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r4) => createWatcher(r4, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m3) => mergeOptions(resolved, m3, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m3) => mergeOptions(to, m3, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i3 = 0; i3 < raw.length; i3++) {
      res[raw[i3]] = raw[i3];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v3) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value2) {
        context.provides[key] = value2;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
function provide(key, value2) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value2;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
        let key = propsToUpdate[i3];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value2 = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value2 !== attrs[key]) {
              attrs[key] = value2;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value2,
              instance,
              false
            );
          }
        } else {
          if (value2 !== attrs[key]) {
            attrs[key] = value2;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value2 = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value2;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value2;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value2 !== attrs[key]) {
          attrs[key] = value2;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i3 = 0; i3 < needCastKeys.length; i3++) {
      const key = needCastKeys[i3];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value2, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value2 === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value2 = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value2 = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value2 = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value2 = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value2 === "" || value2 === hyphenate(key))) {
        value2 = true;
      }
    }
  }
  return value2;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i3 = 0; i3 < raw.length; i3++) {
      const normalizedKey = camelize(raw[i3]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b) {
  return getType(a2) === getType(b);
}
function getTypeIndex(type2, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type2));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type2) ? 0 : -1;
  }
  return -1;
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r4, i3) => setRef(
        r4,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i3] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value2 = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref3) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value2, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (hasOwn(setupState, ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                ref3.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref3.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value2;
          if (hasOwn(setupState, ref3)) {
            setupState[ref3] = value2;
          }
        } else if (_isRef) {
          ref3.value = value2;
          if (rawRef.k)
            refs[rawRef.k] = value2;
        } else
          ;
      };
      if (value2) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp: patchProp2,
      createText,
      nextSibling,
      parentNode,
      remove: remove2,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const isFragmentStart = isComment$1(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type: type2, ref: ref3, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type2) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i3 = 0; i3 < vnode.staticCount; i3++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i3 === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment$1(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            getContainerType(container),
            optimized
          );
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            getContainerType(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else
          ;
    }
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type: type2, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type2 === "input" || type2 === "option";
    if (forcePatch || patchFlag !== -1) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(parentSuspense, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        while (next) {
          hasMismatch = true;
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          el.textContent = vnode.children;
        }
      }
      if (props) {
        if (forcePatch || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
            key[0] === ".") {
              patchProp2(
                el,
                key,
                null,
                props[key],
                void 0,
                void 0,
                parentComponent
              );
            }
          }
        } else if (props.onClick) {
          patchProp2(
            el,
            "onClick",
            null,
            props.onClick,
            void 0,
            void 0,
            parentComponent
          );
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l3 = children.length;
    for (let i3 = 0; i3 < l3; i3++) {
      const vnode = optimized ? children[i3] : children[i3] = normalizeVNode$1(children[i3]);
      if (node) {
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          getContainerType(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment$1(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      getContainerType(container),
      slotScopeIds
    );
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment$1(node)) {
        if (node.data === open)
          match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  const isTemplateNode = (node) => {
    return node.nodeType === 1 && node.tagName.toLowerCase() === "template";
  };
  return [hydrate, hydrateNode];
}
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type: type2, ref: ref3, shapeFlag } = n2;
    switch (type2) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type2.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type2.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i3 = 0; i3 < slotScopeIds.length; i3++) {
        hostSetScopeId(el, slotScopeIds[i3]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start2 = 0) => {
    for (let i3 = start2; i3 < children.length; i3++) {
      const child = children[i3] = optimized ? cloneIfMounted(children[i3]) : normalizeVNode$1(children[i3]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          namespace
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i3 = 0; i3 < propsToUpdate.length; i3++) {
            const key = propsToUpdate[i3];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                namespace,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        namespace
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i3 = 0; i3 < newChildren.length; i3++) {
      const oldVNode = oldChildren[i3];
      const newVNode = newChildren[i3];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance$1(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent$1(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.effect.dirty = true;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m3, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot$1(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot$1(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m3) {
          queuePostRenderEffect(m3, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u3, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot$1(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u3) {
          queuePostRenderEffect(u3, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      NOOP,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => {
      if (effect2.dirty) {
        effect2.run();
      }
    };
    update.id = instance.uid;
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i3;
    for (i3 = 0; i3 < commonLength; i3++) {
      const nextChild = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode$1(c2[i3]);
      patch(
        c1[i3],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i3 = 0;
    const l22 = c2.length;
    let e1 = c1.length - 1;
    let e22 = l22 - 1;
    while (i3 <= e1 && i3 <= e22) {
      const n1 = c1[i3];
      const n2 = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode$1(c2[i3]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i3++;
    }
    while (i3 <= e1 && i3 <= e22) {
      const n1 = c1[e1];
      const n2 = c2[e22] = optimized ? cloneIfMounted(c2[e22]) : normalizeVNode$1(c2[e22]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e22--;
    }
    if (i3 > e1) {
      if (i3 <= e22) {
        const nextPos = e22 + 1;
        const anchor = nextPos < l22 ? c2[nextPos].el : parentAnchor;
        while (i3 <= e22) {
          patch(
            null,
            c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode$1(c2[i3]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i3++;
        }
      }
    } else if (i3 > e22) {
      while (i3 <= e1) {
        unmount(c1[i3], parentComponent, parentSuspense, true);
        i3++;
      }
    } else {
      const s1 = i3;
      const s2 = i3;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i3 = s2; i3 <= e22; i3++) {
        const nextChild = c2[i3] = optimized ? cloneIfMounted(c2[i3]) : normalizeVNode$1(c2[i3]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i3);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e22 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i3 = 0; i3 < toBePatched; i3++)
        newIndexToOldIndexMap[i3] = 0;
      for (i3 = s1; i3 <= e1; i3++) {
        const prevChild = c1[i3];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e22; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i3 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i3 = toBePatched - 1; i3 >= 0; i3--) {
        const nextIndex = s2 + i3;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l22 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i3] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i3 !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type: type2, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type2.move(vnode, container, anchor, internals);
      return;
    }
    if (type2 === Fragment) {
      hostInsert(el, container, anchor);
      for (let i3 = 0; i3 < children.length; i3++) {
        move(children[i3], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type2 === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type: type2,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref3 != null) {
      setRef(ref3, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type2 !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type2 === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type: type2, el, anchor, transition } = vnode;
    if (type2 === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type2 === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start2 = 0) => {
    for (let i3 = start2; i3 < children.length; i3++) {
      unmount(children[i3], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  let isFlushing2 = false;
  const render2 = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    if (!isFlushing2) {
      isFlushing2 = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing2 = false;
    }
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function resolveChildrenNamespace({ type: type2, props }, currentNamespace) {
  return currentNamespace === "svg" && type2 === "foreignObject" || currentNamespace === "mathml" && type2 === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i3 = 0; i3 < ch1.length; i3++) {
      const c1 = ch1[i3];
      let c2 = ch2[i3];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i3] = cloneIfMounted(ch2[i3]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p3 = arr.slice();
  const result = [0];
  let i3, j, u3, v3, c2;
  const len = arr.length;
  for (i3 = 0; i3 < len; i3++) {
    const arrI = arr[i3];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p3[i3] = j;
        result.push(i3);
        continue;
      }
      u3 = 0;
      v3 = result.length - 1;
      while (u3 < v3) {
        c2 = u3 + v3 >> 1;
        if (arr[result[c2]] < arrI) {
          u3 = c2 + 1;
        } else {
          v3 = c2;
        }
      }
      if (arrI < arr[result[u3]]) {
        if (u3 > 0) {
          p3[i3] = result[u3 - 1];
        }
        result[u3] = i3;
      }
    }
  }
  u3 = result.length;
  v3 = result[u3 - 1];
  while (u3-- > 0) {
    result[u3] = v3;
    v3 = p3[v3];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
function setBlockTracking(value2) {
  isBlockTreeEnabled += value2;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createBlock(type2, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type2,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value2) {
  return value2 ? value2.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
function createBaseVNode(type2, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type2 === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type: type2,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type2.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function _createVNode(type2, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type2 || type2 === NULL_DYNAMIC_COMPONENT) {
    type2 = Comment;
  }
  if (isVNode(type2)) {
    const cloned = cloneVNode(
      type2,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type2)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type2)) {
    type2 = type2.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type2) ? 1 : isSuspense(type2) ? 128 : isTeleport(type2) ? 64 : isObject(type2) ? 4 : isFunction(type2) ? 2 : 0;
  return createBaseVNode(
    type2,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    cloned.transition = transition.clone(cloned);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode$1(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type2 = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type2 = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type2 = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type2 = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type2 = 16;
      children = [createTextVNode(children)];
    } else {
      type2 = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type2;
}
function mergeProps(...args) {
  const ret = {};
  for (let i3 = 0; i3 < args.length; i3++) {
    const toMerge = args[i3];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
function createComponentInstance$1(vnode, parent, suspense) {
  const type2 = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type: type2,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type2, appContext),
    emitsOptions: normalizeEmitsOptions(type2, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type2.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
function setupComponent$1(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup: setup3 } = Component;
  if (setup3) {
    const setupContext = instance.setupContext = setup3.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup3,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e3) => {
          handleError(e3, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile2 && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile2(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
function isClassComponent(value2) {
  return isFunction(value2) && "__vccOpts" in value2;
}
function h(type2, propsOrChildren, children) {
  const l3 = arguments.length;
  if (l3 === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type2, null, [propsOrChildren]);
      }
      return createVNode(type2, propsOrChildren);
    } else {
      return createVNode(type2, null, propsOrChildren);
    }
  } else {
    if (l3 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l3 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type2, propsOrChildren, children);
  }
}
function patchClass(el, value2, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value2 = (value2 ? [value2, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value2 == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value2);
  } else {
    el.className = value2;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v3) => setStyle(style, name, v3));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i3 = 0; i3 < prefixes.length; i3++) {
    const prefixed = prefixes[i3] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
function patchAttr(el, key, value2, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value2 == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value2);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value2 == null || isBoolean && !includeBooleanAttr(value2)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value2);
    }
  }
}
function patchDOMProp(el, key, value2, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value2 == null ? "" : value2;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value2 == null ? "" : value2;
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value2 == null) {
      el.removeAttribute(key);
    }
    el._value = value2;
    return;
  }
  let needRemove = false;
  if (value2 === "" || value2 == null) {
    const type2 = typeof el[key];
    if (type2 === "boolean") {
      value2 = includeBooleanAttr(value2);
    } else if (value2 == null && type2 === "string") {
      value2 = "";
      needRemove = true;
    } else if (type2 === "number") {
      value2 = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value2;
  } catch (e3) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m3;
    while (m3 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m3[0].length);
      options[m3[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e3) => {
    if (!e3._vts) {
      e3._vts = Date.now();
    } else if (e3._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e3, invoker.value),
      instance,
      5,
      [e3]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e3, value2) {
  if (isArray(value2)) {
    const originalStop = e3.stopImmediatePropagation;
    e3.stopImmediatePropagation = () => {
      originalStop.call(e3);
      e3._stopped = true;
    };
    return value2.map(
      (fn) => (e22) => !e22._stopped && fn && fn(e22)
    );
  } else {
    return value2;
  }
}
function shouldSetAsProp(el, key, value2, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value2)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value2)) {
    return false;
  }
  return key in el;
}
function onCompositionStart(e3) {
  e3.target.composing = true;
}
function onCompositionEnd(e3) {
  const target = e3.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
function setChecked(el, { value: value2, oldValue }, vnode) {
  el._modelValue = value2;
  if (isArray(value2)) {
    el.checked = looseIndexOf(value2, vnode.props.value) > -1;
  } else if (isSet(value2)) {
    el.checked = value2.has(vnode.props.value);
  } else if (value2 !== oldValue) {
    el.checked = looseEqual(value2, getCheckboxValue(el, true));
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value: value2 }) => ({ value: value2 });
  vModelRadio.getSSRProps = ({ value: value2 }, vnode) => {
    if (vnode.props && looseEqual(vnode.props.value, value2)) {
      return { checked: true };
    }
  };
  vModelCheckbox.getSSRProps = ({ value: value2 }, vnode) => {
    if (isArray(value2)) {
      if (vnode.props && looseIndexOf(value2, vnode.props.value) > -1) {
        return { checked: true };
      }
    } else if (isSet(value2)) {
      if (vnode.props && value2.has(vnode.props.value)) {
        return { checked: true };
      }
    } else if (value2) {
      return { checked: true };
    }
  };
}
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
function ssrRenderAttrs(props, tag) {
  let ret = "";
  for (const key in props) {
    if (shouldIgnoreProp(key) || isOn(key) || tag === "textarea" && key === "value") {
      continue;
    }
    const value2 = props[key];
    if (key === "class") {
      ret += ` class="${ssrRenderClass(value2)}"`;
    } else if (key === "style") {
      ret += ` style="${ssrRenderStyle(value2)}"`;
    } else {
      ret += ssrRenderDynamicAttr(key, value2, tag);
    }
  }
  return ret;
}
function ssrRenderDynamicAttr(key, value2, tag) {
  if (!isRenderableAttrValue(value2)) {
    return ``;
  }
  const attrKey = tag && (tag.indexOf("-") > 0 || isSVGTag(tag)) ? key : propsToAttrMap[key] || key.toLowerCase();
  if (isBooleanAttr(attrKey)) {
    return includeBooleanAttr(value2) ? ` ${attrKey}` : ``;
  } else if (isSSRSafeAttrName(attrKey)) {
    return value2 === "" ? ` ${attrKey}` : ` ${attrKey}="${escapeHtml(value2)}"`;
  } else {
    console.warn(
      `[@vue/server-renderer] Skipped rendering unsafe attribute name: ${attrKey}`
    );
    return ``;
  }
}
function ssrRenderClass(raw) {
  return escapeHtml(normalizeClass(raw));
}
function ssrRenderStyle(raw) {
  if (!raw) {
    return "";
  }
  if (isString(raw)) {
    return escapeHtml(raw);
  }
  const styles = normalizeStyle(raw);
  return escapeHtml(stringifyStyle(styles));
}
function ssrRenderComponent(comp, props = null, children = null, parentComponent = null, slotScopeId) {
  return renderComponentVNode(
    createVNode(comp, props, children),
    parentComponent,
    slotScopeId
  );
}
function ssrRenderSlot(slots, slotName, slotProps, fallbackRenderFn, push2, parentComponent, slotScopeId) {
  push2(`<!--[-->`);
  ssrRenderSlotInner(
    slots,
    slotName,
    slotProps,
    fallbackRenderFn,
    push2,
    parentComponent,
    slotScopeId
  );
  push2(`<!--]-->`);
}
function ssrRenderSlotInner(slots, slotName, slotProps, fallbackRenderFn, push2, parentComponent, slotScopeId, transition) {
  const slotFn = slots[slotName];
  if (slotFn) {
    const slotBuffer = [];
    const bufferedPush = (item) => {
      slotBuffer.push(item);
    };
    const ret = slotFn(
      slotProps,
      bufferedPush,
      parentComponent,
      slotScopeId ? " " + slotScopeId : ""
    );
    if (isArray(ret)) {
      renderVNodeChildren(push2, ret, parentComponent, slotScopeId);
    } else {
      let isEmptySlot = true;
      {
        for (let i3 = 0; i3 < slotBuffer.length; i3++) {
          if (!isComment(slotBuffer[i3])) {
            isEmptySlot = false;
            break;
          }
        }
      }
      if (isEmptySlot)
        ;
      else {
        let start2 = 0;
        let end = slotBuffer.length;
        for (let i3 = start2; i3 < end; i3++) {
          push2(slotBuffer[i3]);
        }
      }
    }
  }
}
function isComment(item) {
  if (typeof item !== "string" || !commentTestRE.test(item))
    return false;
  if (item.length <= 8)
    return true;
  return !item.replace(commentRE, "").trim();
}
function ssrRenderTeleport(parentPush, contentRenderFn, target, disabled, parentComponent) {
  parentPush("<!--teleport start-->");
  const context = parentComponent.appContext.provides[ssrContextKey];
  const teleportBuffers = context.__teleportBuffers || (context.__teleportBuffers = {});
  const targetBuffer = teleportBuffers[target] || (teleportBuffers[target] = []);
  const bufferIndex = targetBuffer.length;
  let teleportContent;
  if (disabled) {
    contentRenderFn(parentPush);
    teleportContent = `<!--teleport anchor-->`;
  } else {
    const { getBuffer, push: push2 } = createBuffer();
    contentRenderFn(push2);
    push2(`<!--teleport anchor-->`);
    teleportContent = getBuffer();
  }
  targetBuffer.splice(bufferIndex, 0, teleportContent);
  parentPush("<!--teleport end-->");
}
function ssrInterpolate(value2) {
  return escapeHtml(toDisplayString(value2));
}
function ssrRenderList(source, renderItem) {
  if (isArray(source) || isString(source)) {
    for (let i3 = 0, l3 = source.length; i3 < l3; i3++) {
      renderItem(source[i3], i3);
    }
  } else if (typeof source === "number") {
    for (let i3 = 0; i3 < source; i3++) {
      renderItem(i3 + 1, i3);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      const arr = Array.from(source);
      for (let i3 = 0, l3 = arr.length; i3 < l3; i3++) {
        renderItem(arr[i3], i3);
      }
    } else {
      const keys = Object.keys(source);
      for (let i3 = 0, l3 = keys.length; i3 < l3; i3++) {
        const key = keys[i3];
        renderItem(source[key], key, i3);
      }
    }
  }
}
function ssrCompile(template, instance) {
  {
    throw new Error(
      `On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.`
    );
  }
}
function createBuffer() {
  let appendable = false;
  const buffer2 = [];
  return {
    getBuffer() {
      return buffer2;
    },
    push(item) {
      const isStringItem = isString(item);
      if (appendable && isStringItem) {
        buffer2[buffer2.length - 1] += item;
      } else {
        buffer2.push(item);
      }
      appendable = isStringItem;
      if (isPromise(item) || isArray(item) && item.hasAsync) {
        buffer2.hasAsync = true;
      }
    }
  };
}
function renderComponentVNode(vnode, parentComponent = null, slotScopeId) {
  const instance = createComponentInstance(vnode, parentComponent, null);
  const res = setupComponent(
    instance,
    true
    /* isSSR */
  );
  const hasAsyncSetup = isPromise(res);
  const prefetches = instance.sp;
  if (hasAsyncSetup || prefetches) {
    let p3 = hasAsyncSetup ? res : Promise.resolve();
    if (prefetches) {
      p3 = p3.then(
        () => Promise.all(
          prefetches.map((prefetch) => prefetch.call(instance.proxy))
        )
      ).catch(NOOP);
    }
    return p3.then(() => renderComponentSubTree(instance, slotScopeId));
  } else {
    return renderComponentSubTree(instance, slotScopeId);
  }
}
function renderComponentSubTree(instance, slotScopeId) {
  const comp = instance.type;
  const { getBuffer, push: push2 } = createBuffer();
  if (isFunction(comp)) {
    let root = renderComponentRoot(instance);
    if (!comp.props) {
      for (const key in instance.attrs) {
        if (key.startsWith(`data-v-`)) {
          (root.props || (root.props = {}))[key] = ``;
        }
      }
    }
    renderVNode(push2, instance.subTree = root, instance, slotScopeId);
  } else {
    if ((!instance.render || instance.render === NOOP) && !instance.ssrRender && !comp.ssrRender && isString(comp.template)) {
      comp.ssrRender = ssrCompile(comp.template);
    }
    for (const e3 of instance.scope.effects) {
      if (e3.computed) {
        e3.computed._dirty = true;
        e3.computed._cacheable = true;
      }
    }
    const ssrRender = instance.ssrRender || comp.ssrRender;
    if (ssrRender) {
      let attrs = instance.inheritAttrs !== false ? instance.attrs : void 0;
      let hasCloned = false;
      let cur = instance;
      while (true) {
        const scopeId = cur.vnode.scopeId;
        if (scopeId) {
          if (!hasCloned) {
            attrs = { ...attrs };
            hasCloned = true;
          }
          attrs[scopeId] = "";
        }
        const parent = cur.parent;
        if (parent && parent.subTree && parent.subTree === cur.vnode) {
          cur = parent;
        } else {
          break;
        }
      }
      if (slotScopeId) {
        if (!hasCloned)
          attrs = { ...attrs };
        attrs[slotScopeId.trim()] = "";
      }
      const prev = setCurrentRenderingInstance(instance);
      try {
        ssrRender(
          instance.proxy,
          push2,
          instance,
          attrs,
          // compiler-optimized bindings
          instance.props,
          instance.setupState,
          instance.data,
          instance.ctx
        );
      } finally {
        setCurrentRenderingInstance(prev);
      }
    } else if (instance.render && instance.render !== NOOP) {
      renderVNode(
        push2,
        instance.subTree = renderComponentRoot(instance),
        instance,
        slotScopeId
      );
    } else {
      comp.name || comp.__file || `<Anonymous>`;
      push2(`<!---->`);
    }
  }
  return getBuffer();
}
function renderVNode(push2, vnode, parentComponent, slotScopeId) {
  const { type: type2, shapeFlag, children } = vnode;
  switch (type2) {
    case Text:
      push2(escapeHtml(children));
      break;
    case Comment:
      push2(
        children ? `<!--${escapeHtmlComment(children)}-->` : `<!---->`
      );
      break;
    case Static:
      push2(children);
      break;
    case Fragment:
      if (vnode.slotScopeIds) {
        slotScopeId = (slotScopeId ? slotScopeId + " " : "") + vnode.slotScopeIds.join(" ");
      }
      push2(`<!--[-->`);
      renderVNodeChildren(
        push2,
        children,
        parentComponent,
        slotScopeId
      );
      push2(`<!--]-->`);
      break;
    default:
      if (shapeFlag & 1) {
        renderElementVNode(push2, vnode, parentComponent, slotScopeId);
      } else if (shapeFlag & 6) {
        push2(renderComponentVNode(vnode, parentComponent, slotScopeId));
      } else if (shapeFlag & 64) {
        renderTeleportVNode(push2, vnode, parentComponent, slotScopeId);
      } else if (shapeFlag & 128) {
        renderVNode(push2, vnode.ssContent, parentComponent, slotScopeId);
      } else
        ;
  }
}
function renderVNodeChildren(push2, children, parentComponent, slotScopeId) {
  for (let i3 = 0; i3 < children.length; i3++) {
    renderVNode(push2, normalizeVNode(children[i3]), parentComponent, slotScopeId);
  }
}
function renderElementVNode(push2, vnode, parentComponent, slotScopeId) {
  const tag = vnode.type;
  let { props, children, shapeFlag, scopeId, dirs } = vnode;
  let openTag = `<${tag}`;
  if (dirs) {
    props = applySSRDirectives(vnode, props, dirs);
  }
  if (props) {
    openTag += ssrRenderAttrs(props, tag);
  }
  if (scopeId) {
    openTag += ` ${scopeId}`;
  }
  let curParent = parentComponent;
  let curVnode = vnode;
  while (curParent && curVnode === curParent.subTree) {
    curVnode = curParent.vnode;
    if (curVnode.scopeId) {
      openTag += ` ${curVnode.scopeId}`;
    }
    curParent = curParent.parent;
  }
  if (slotScopeId) {
    openTag += ` ${slotScopeId}`;
  }
  push2(openTag + `>`);
  if (!isVoidTag(tag)) {
    let hasChildrenOverride = false;
    if (props) {
      if (props.innerHTML) {
        hasChildrenOverride = true;
        push2(props.innerHTML);
      } else if (props.textContent) {
        hasChildrenOverride = true;
        push2(escapeHtml(props.textContent));
      } else if (tag === "textarea" && props.value) {
        hasChildrenOverride = true;
        push2(escapeHtml(props.value));
      }
    }
    if (!hasChildrenOverride) {
      if (shapeFlag & 8) {
        push2(escapeHtml(children));
      } else if (shapeFlag & 16) {
        renderVNodeChildren(
          push2,
          children,
          parentComponent,
          slotScopeId
        );
      }
    }
    push2(`</${tag}>`);
  }
}
function applySSRDirectives(vnode, rawProps, dirs) {
  const toMerge = [];
  for (let i3 = 0; i3 < dirs.length; i3++) {
    const binding = dirs[i3];
    const {
      dir: { getSSRProps }
    } = binding;
    if (getSSRProps) {
      const props = getSSRProps(binding, vnode);
      if (props)
        toMerge.push(props);
    }
  }
  return mergeProps(rawProps || {}, ...toMerge);
}
function renderTeleportVNode(push2, vnode, parentComponent, slotScopeId) {
  const target = vnode.props && vnode.props.to;
  const disabled = vnode.props && vnode.props.disabled;
  if (!target) {
    return [];
  }
  if (!isString(target)) {
    return [];
  }
  ssrRenderTeleport(
    push2,
    (push22) => {
      renderVNodeChildren(
        push22,
        vnode.children,
        parentComponent,
        slotScopeId
      );
    },
    target,
    disabled || disabled === "",
    parentComponent
  );
}
async function unrollBuffer$1(buffer2) {
  if (buffer2.hasAsync) {
    let ret = "";
    for (let i3 = 0; i3 < buffer2.length; i3++) {
      let item = buffer2[i3];
      if (isPromise(item)) {
        item = await item;
      }
      if (isString(item)) {
        ret += item;
      } else {
        ret += await unrollBuffer$1(item);
      }
    }
    return ret;
  } else {
    return unrollBufferSync$1(buffer2);
  }
}
function unrollBufferSync$1(buffer2) {
  let ret = "";
  for (let i3 = 0; i3 < buffer2.length; i3++) {
    let item = buffer2[i3];
    if (isString(item)) {
      ret += item;
    } else {
      ret += unrollBufferSync$1(item);
    }
  }
  return ret;
}
async function renderToString(input, context = {}) {
  if (isVNode$1(input)) {
    return renderToString(createApp({ render: () => input }), context);
  }
  const vnode = createVNode(input._component, input._props);
  vnode.appContext = input._context;
  input.provide(ssrContextKey, context);
  const buffer2 = await renderComponentVNode(vnode);
  const result = await unrollBuffer$1(buffer2);
  await resolveTeleports(context);
  if (context.__watcherHandles) {
    for (const unwatch of context.__watcherHandles) {
      unwatch();
    }
  }
  return result;
}
async function resolveTeleports(context) {
  if (context.__teleportBuffers) {
    context.teleports = context.teleports || {};
    for (const key in context.__teleportBuffers) {
      context.teleports[key] = await unrollBuffer$1(
        await Promise.all([context.__teleportBuffers[key]])
      );
    }
  }
}
var EMPTY_OBJ, EMPTY_ARR, NOOP, NO, isOn, isModelListener, extend, remove, hasOwnProperty$1, hasOwn, isArray, isMap, isSet, isDate, isFunction, isString, isSymbol, isObject, isPromise, objectToString, toTypeString, toRawType, isPlainObject, isIntegerKey, isReservedProp, cacheStringFunction, camelizeRE, camelize, hyphenateRE, hyphenate, capitalize, toHandlerKey, hasChanged, invokeArrayFns, def, looseToNumber, _globalThis, getGlobalThis, listDelimiterRE, propertyDelimiterRE, styleCommentRE, SVG_TAGS, VOID_TAGS, isSVGTag, isVoidTag, specialBooleanAttrs, isSpecialBooleanAttr, isBooleanAttr, unsafeAttrCharRE, attrValidationCache, propsToAttrMap, escapeRE, commentStripRE, toDisplayString, replacer, stringifySymbol, activeEffectScope, EffectScope, activeEffect, ReactiveEffect, shouldTrack, pauseScheduleStack, trackStack, queueEffectSchedulers, createDep, targetMap, ITERATE_KEY, MAP_KEY_ITERATE_KEY, isNonTrackableKeys, builtInSymbols, arrayInstrumentations, BaseReactiveHandler, MutableReactiveHandler, ReadonlyReactiveHandler, mutableHandlers, readonlyHandlers, shallowReactiveHandlers, toShallow, getProto, mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations, mutableCollectionHandlers, shallowCollectionHandlers, readonlyCollectionHandlers, reactiveMap, shallowReactiveMap, readonlyMap, shallowReadonlyMap, toReactive, toReadonly, ComputedRefImpl, RefImpl, shallowUnwrapHandlers, isFlushing, isFlushPending, queue, flushIndex, pendingPostFlushCbs, activePostFlushCbs, postFlushIndex, resolvedPromise, currentFlushPromise, getId, comparator, currentRenderingInstance, currentScopeId, getFunctionalFallthrough, filterModelListeners, NULL_DYNAMIC_COMPONENT, isSuspense, ssrContextKey, useSSRContext, INITIAL_WATCHER_VALUE, isAsyncWrapper, isKeepAlive, createHook, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onServerPrefetch, onRenderTriggered, onRenderTracked, getPublicInstance, publicPropertiesMap, hasSetupBinding, PublicInstanceProxyHandlers, shouldCacheAccess, internalOptionMergeStrats, uid$1, currentApp, internalObjectProto, createInternalObject, isInternalObject, isInternalKey, normalizeSlotValue, normalizeSlot, normalizeObjectSlots, normalizeVNodeSlots, initSlots, updateSlots, hasMismatch, isSVGContainer, isMathMLContainer, getContainerType, isComment$1, queuePostRenderEffect, isTeleport, Fragment, Text, Comment, Static, blockStack, currentBlock, isBlockTreeEnabled, normalizeKey, normalizeRef, createVNode, emptyAppContext, uid, currentInstance, internalSetCurrentInstance, setInSSRSetupState, setCurrentInstance, unsetCurrentInstance, isInSSRComponentSetup, compile2, attrsProxyHandlers, computed, version, _ssrUtils, ssrUtils, svgNS, mathmlNS, doc, templateContainer, nodeOps, vtcKey, vShowOriginalDisplay, vShowHidden, CSS_VAR_TEXT, displayRE, importantRE, prefixes, prefixCache, xlinkNS, veiKey, optionsModifierRE, cachedNow, p, getNow, isNativeOn, patchProp, getModelAssigner, assignKey, vModelText, vModelCheckbox, vModelRadio, rendererOptions, renderer, enabledHydration, createApp, createSSRApp, ssrDirectiveInitialized, initDirectivesForSSR, shouldIgnoreProp, commentTestRE, commentRE, createComponentInstance, setCurrentRenderingInstance, setupComponent, renderComponentRoot, normalizeVNode, isVNode$1;
var init_vue_BQBbmbrb = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/@vue_BQBbmbrb.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    EMPTY_OBJ = {};
    EMPTY_ARR = [];
    NOOP = () => {
    };
    NO = () => false;
    isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
    (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
    isModelListener = (key) => key.startsWith("onUpdate:");
    extend = Object.assign;
    remove = (arr, el) => {
      const i3 = arr.indexOf(el);
      if (i3 > -1) {
        arr.splice(i3, 1);
      }
    };
    hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
    isArray = Array.isArray;
    isMap = (val) => toTypeString(val) === "[object Map]";
    isSet = (val) => toTypeString(val) === "[object Set]";
    isDate = (val) => toTypeString(val) === "[object Date]";
    isFunction = (val) => typeof val === "function";
    isString = (val) => typeof val === "string";
    isSymbol = (val) => typeof val === "symbol";
    isObject = (val) => val !== null && typeof val === "object";
    isPromise = (val) => {
      return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
    };
    objectToString = Object.prototype.toString;
    toTypeString = (value2) => objectToString.call(value2);
    toRawType = (value2) => {
      return toTypeString(value2).slice(8, -1);
    };
    isPlainObject = (val) => toTypeString(val) === "[object Object]";
    isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    isReservedProp = /* @__PURE__ */ makeMap(
      // the leading comma is intentional so empty string "" is also included
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    );
    cacheStringFunction = (fn) => {
      const cache = /* @__PURE__ */ Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    camelizeRE = /-(\w)/g;
    camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c2) => c2 ? c2.toUpperCase() : "");
    });
    hyphenateRE = /\B([A-Z])/g;
    hyphenate = cacheStringFunction(
      (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
    );
    capitalize = cacheStringFunction((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    toHandlerKey = cacheStringFunction((str) => {
      const s2 = str ? `on${capitalize(str)}` : ``;
      return s2;
    });
    hasChanged = (value2, oldValue) => !Object.is(value2, oldValue);
    invokeArrayFns = (fns, arg) => {
      for (let i3 = 0; i3 < fns.length; i3++) {
        fns[i3](arg);
      }
    };
    def = (obj, key, value2, writable = false) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        writable,
        value: value2
      });
    };
    looseToNumber = (val) => {
      const n2 = parseFloat(val);
      return isNaN(n2) ? val : n2;
    };
    getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    listDelimiterRE = /;(?![^(]*\))/g;
    propertyDelimiterRE = /:([^]+)/;
    styleCommentRE = /\/\*[^]*?\*\//g;
    SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
    VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
    isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
    isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
    specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    isBooleanAttr = /* @__PURE__ */ makeMap(
      specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
    );
    unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
    attrValidationCache = {};
    propsToAttrMap = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv"
    };
    escapeRE = /["'&<>]/;
    commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
    toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce(
            (entries, [key, val2], i3) => {
              entries[stringifySymbol(key, i3) + " =>"] = val2;
              return entries;
            },
            {}
          )
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()].map((v3) => stringifySymbol(v3))
        };
      } else if (isSymbol(val)) {
        return stringifySymbol(val);
      } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    stringifySymbol = (v3, i3 = "") => {
      var _a2;
      return (
        // Symbol.description in es2019+ so we need to cast here to pass
        // the lib: es2016 check
        isSymbol(v3) ? `Symbol(${(_a2 = v3.description) != null ? _a2 : i3})` : v3
      );
    };
    EffectScope = class {
      constructor(detached = false) {
        this.detached = detached;
        this._active = true;
        this.effects = [];
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
            this
          ) - 1;
        }
      }
      get active() {
        return this._active;
      }
      run(fn) {
        if (this._active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        }
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      on() {
        activeEffectScope = this;
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this._active) {
          let i3, l3;
          for (i3 = 0, l3 = this.effects.length; i3 < l3; i3++) {
            this.effects[i3].stop();
          }
          for (i3 = 0, l3 = this.cleanups.length; i3 < l3; i3++) {
            this.cleanups[i3]();
          }
          if (this.scopes) {
            for (i3 = 0, l3 = this.scopes.length; i3 < l3; i3++) {
              this.scopes[i3].stop(true);
            }
          }
          if (!this.detached && this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = void 0;
          this._active = false;
        }
      }
    };
    ReactiveEffect = class {
      constructor(fn, trigger2, scheduler, scope) {
        this.fn = fn;
        this.trigger = trigger2;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        this._dirtyLevel = 4;
        this._trackId = 0;
        this._runnings = 0;
        this._shouldSchedule = false;
        this._depsLength = 0;
        recordEffectScope(this, scope);
      }
      get dirty() {
        if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
          this._dirtyLevel = 1;
          pauseTracking();
          for (let i3 = 0; i3 < this._depsLength; i3++) {
            const dep = this.deps[i3];
            if (dep.computed) {
              triggerComputed(dep.computed);
              if (this._dirtyLevel >= 4) {
                break;
              }
            }
          }
          if (this._dirtyLevel === 1) {
            this._dirtyLevel = 0;
          }
          resetTracking();
        }
        return this._dirtyLevel >= 4;
      }
      set dirty(v3) {
        this._dirtyLevel = v3 ? 4 : 0;
      }
      run() {
        this._dirtyLevel = 0;
        if (!this.active) {
          return this.fn();
        }
        let lastShouldTrack = shouldTrack;
        let lastEffect = activeEffect;
        try {
          shouldTrack = true;
          activeEffect = this;
          this._runnings++;
          preCleanupEffect(this);
          return this.fn();
        } finally {
          postCleanupEffect(this);
          this._runnings--;
          activeEffect = lastEffect;
          shouldTrack = lastShouldTrack;
        }
      }
      stop() {
        if (this.active) {
          preCleanupEffect(this);
          postCleanupEffect(this);
          this.onStop && this.onStop();
          this.active = false;
        }
      }
    };
    shouldTrack = true;
    pauseScheduleStack = 0;
    trackStack = [];
    queueEffectSchedulers = [];
    createDep = (cleanup, computed2) => {
      const dep = /* @__PURE__ */ new Map();
      dep.cleanup = cleanup;
      dep.computed = computed2;
      return dep;
    };
    targetMap = /* @__PURE__ */ new WeakMap();
    ITERATE_KEY = Symbol("");
    MAP_KEY_ITERATE_KEY = Symbol("");
    isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
    builtInSymbols = new Set(
      /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
    );
    arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    BaseReactiveHandler = class {
      constructor(_isReadonly = false, _isShallow = false) {
        this._isReadonly = _isReadonly;
        this._isShallow = _isShallow;
      }
      get(target, key, receiver) {
        const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return isShallow2;
        } else if (key === "__v_raw") {
          if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
          // this means the reciever is a user proxy of the reactive proxy
          Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
            return target;
          }
          return;
        }
        const targetIsArray = isArray(target);
        if (!isReadonly2) {
          if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
            return Reflect.get(arrayInstrumentations, key, receiver);
          }
          if (key === "hasOwnProperty") {
            return hasOwnProperty;
          }
        }
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track(target, "get", key);
        }
        if (isShallow2) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && isIntegerKey(key) ? res : res.value;
        }
        if (isObject(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      }
    };
    MutableReactiveHandler = class extends BaseReactiveHandler {
      constructor(isShallow2 = false) {
        super(false, isShallow2);
      }
      set(target, key, value2, receiver) {
        let oldValue = target[key];
        if (!this._isShallow) {
          const isOldValueReadonly = isReadonly(oldValue);
          if (!isShallow(value2) && !isReadonly(value2)) {
            oldValue = toRaw(oldValue);
            value2 = toRaw(value2);
          }
          if (!isArray(target) && isRef(oldValue) && !isRef(value2)) {
            if (isOldValueReadonly) {
              return false;
            } else {
              oldValue.value = value2;
              return true;
            }
          }
        }
        const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value2, receiver);
        if (target === toRaw(receiver)) {
          if (!hadKey) {
            trigger(target, "add", key, value2);
          } else if (hasChanged(value2, oldValue)) {
            trigger(target, "set", key, value2);
          }
        }
        return result;
      }
      deleteProperty(target, key) {
        const hadKey = hasOwn(target, key);
        target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      }
      has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
          track(target, "has", key);
        }
        return result;
      }
      ownKeys(target) {
        track(
          target,
          "iterate",
          isArray(target) ? "length" : ITERATE_KEY
        );
        return Reflect.ownKeys(target);
      }
    };
    ReadonlyReactiveHandler = class extends BaseReactiveHandler {
      constructor(isShallow2 = false) {
        super(true, isShallow2);
      }
      set(target, key) {
        return true;
      }
      deleteProperty(target, key) {
        return true;
      }
    };
    mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
    readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
    shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
      true
    );
    toShallow = (value2) => value2;
    getProto = (v3) => Reflect.getPrototypeOf(v3);
    [
      mutableInstrumentations,
      readonlyInstrumentations,
      shallowInstrumentations,
      shallowReadonlyInstrumentations
    ] = /* @__PURE__ */ createInstrumentations();
    mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    reactiveMap = /* @__PURE__ */ new WeakMap();
    shallowReactiveMap = /* @__PURE__ */ new WeakMap();
    readonlyMap = /* @__PURE__ */ new WeakMap();
    shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
    toReactive = (value2) => isObject(value2) ? reactive(value2) : value2;
    toReadonly = (value2) => isObject(value2) ? readonly(value2) : value2;
    ComputedRefImpl = class {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this.getter = getter;
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this["__v_isReadonly"] = false;
        this.effect = new ReactiveEffect(
          () => getter(this._value),
          () => triggerRefValue(
            this,
            this.effect._dirtyLevel === 2 ? 2 : 3
          )
        );
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"] = isReadonly2;
      }
      get value() {
        const self2 = toRaw(this);
        if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
          triggerRefValue(self2, 4);
        }
        trackRefValue(self2);
        if (self2.effect._dirtyLevel >= 2) {
          triggerRefValue(self2, 2);
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
      // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
      get _dirty() {
        return this.effect.dirty;
      }
      set _dirty(v3) {
        this.effect.dirty = v3;
      }
      // #endregion
    };
    RefImpl = class {
      constructor(value2, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value2 : toRaw(value2);
        this._value = __v_isShallow ? value2 : toReactive(value2);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw(newVal);
        if (hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this, 4);
        }
      }
    };
    shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value2, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value2)) {
          oldValue.value = value2;
          return true;
        } else {
          return Reflect.set(target, key, value2, receiver);
        }
      }
    };
    isFlushing = false;
    isFlushPending = false;
    queue = [];
    flushIndex = 0;
    pendingPostFlushCbs = [];
    activePostFlushCbs = null;
    postFlushIndex = 0;
    resolvedPromise = /* @__PURE__ */ Promise.resolve();
    currentFlushPromise = null;
    getId = (job) => job.id == null ? Infinity : job.id;
    comparator = (a2, b) => {
      const diff = getId(a2) - getId(b);
      if (diff === 0) {
        if (a2.pre && !b.pre)
          return -1;
        if (b.pre && !a2.pre)
          return 1;
      }
      return diff;
    };
    currentRenderingInstance = null;
    currentScopeId = null;
    getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key in attrs) {
        if (key === "class" || key === "style" || isOn(key)) {
          (res || (res = {}))[key] = attrs[key];
        }
      }
      return res;
    };
    filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) {
        if (!isModelListener(key) || !(key.slice(9) in props)) {
          res[key] = attrs[key];
        }
      }
      return res;
    };
    NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
    isSuspense = (type2) => type2.__isSuspense;
    ssrContextKey = Symbol.for("v-scx");
    useSSRContext = () => {
      {
        const ctx = inject(ssrContextKey);
        return ctx;
      }
    };
    INITIAL_WATCHER_VALUE = {};
    isAsyncWrapper = (i3) => !!i3.type.__asyncLoader;
    isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    createHook = (lifecycle) => (hook, target = currentInstance) => (
      // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
      (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
    );
    onBeforeMount = createHook("bm");
    onMounted = createHook("m");
    onBeforeUpdate = createHook("bu");
    onUpdated = createHook("u");
    onBeforeUnmount = createHook("bum");
    onUnmounted = createHook("um");
    onServerPrefetch = createHook("sp");
    onRenderTriggered = createHook(
      "rtg"
    );
    onRenderTracked = createHook(
      "rtc"
    );
    getPublicInstance = (i3) => {
      if (!i3)
        return null;
      if (isStatefulComponent(i3))
        return getExposeProxy(i3) || i3.proxy;
      return getPublicInstance(i3.parent);
    };
    publicPropertiesMap = // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
      $: (i3) => i3,
      $el: (i3) => i3.vnode.el,
      $data: (i3) => i3.data,
      $props: (i3) => i3.props,
      $attrs: (i3) => i3.attrs,
      $slots: (i3) => i3.slots,
      $refs: (i3) => i3.refs,
      $parent: (i3) => getPublicInstance(i3.parent),
      $root: (i3) => getPublicInstance(i3.root),
      $emit: (i3) => i3.emit,
      $options: (i3) => resolveMergedOptions(i3),
      $forceUpdate: (i3) => i3.f || (i3.f = () => {
        i3.effect.dirty = true;
        queueJob(i3.update);
      }),
      $nextTick: (i3) => i3.n || (i3.n = nextTick.bind(i3.proxy)),
      $watch: (i3) => instanceWatch.bind(i3)
    });
    hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
    PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
        if (key === "__v_skip") {
          return true;
        }
        const { ctx, setupState, data, props, accessCache, type: type2, appContext } = instance;
        let normalizedProps;
        if (key[0] !== "$") {
          const n2 = accessCache[key];
          if (n2 !== void 0) {
            switch (n2) {
              case 1:
                return setupState[key];
              case 2:
                return data[key];
              case 4:
                return ctx[key];
              case 3:
                return props[key];
            }
          } else if (hasSetupBinding(setupState, key)) {
            accessCache[key] = 1;
            return setupState[key];
          } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
            accessCache[key] = 2;
            return data[key];
          } else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
          ) {
            accessCache[key] = 3;
            return props[key];
          } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
            accessCache[key] = 4;
            return ctx[key];
          } else if (shouldCacheAccess) {
            accessCache[key] = 0;
          }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) {
          if (key === "$attrs") {
            track(instance.attrs, "get", "");
          }
          return publicGetter(instance);
        } else if (
          // css module (injected by vue-loader)
          (cssModule = type2.__cssModules) && (cssModule = cssModule[key])
        ) {
          return cssModule;
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (
          // global properties
          globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
        ) {
          {
            return globalProperties[key];
          }
        } else
          ;
      },
      set({ _: instance }, key, value2) {
        const { data, setupState, ctx } = instance;
        if (hasSetupBinding(setupState, key)) {
          setupState[key] = value2;
          return true;
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          data[key] = value2;
          return true;
        } else if (hasOwn(instance.props, key)) {
          return false;
        }
        if (key[0] === "$" && key.slice(1) in instance) {
          return false;
        } else {
          {
            ctx[key] = value2;
          }
        }
        return true;
      },
      has({
        _: { data, setupState, accessCache, ctx, appContext, propsOptions }
      }, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
      },
      defineProperty(target, key, descriptor) {
        if (descriptor.get != null) {
          target._.accessCache[key] = 0;
        } else if (hasOwn(descriptor, "value")) {
          this.set(target, key, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key, descriptor);
      }
    };
    shouldCacheAccess = true;
    internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeEmitsOrPropsOptions,
      emits: mergeEmitsOrPropsOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
    };
    uid$1 = 0;
    currentApp = null;
    internalObjectProto = {};
    createInternalObject = () => Object.create(internalObjectProto);
    isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
    isInternalKey = (key) => key[0] === "_" || key === "$stable";
    normalizeSlotValue = (value2) => isArray(value2) ? value2.map(normalizeVNode$1) : [normalizeVNode$1(value2)];
    normalizeSlot = (key, rawSlot, ctx) => {
      if (rawSlot._n) {
        return rawSlot;
      }
      const normalized = withCtx((...args) => {
        if (false)
          ;
        return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c = false;
      return normalized;
    };
    normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
        if (isInternalKey(key))
          continue;
        const value2 = rawSlots[key];
        if (isFunction(value2)) {
          slots[key] = normalizeSlot(key, value2, ctx);
        } else if (value2 != null) {
          const normalized = normalizeSlotValue(value2);
          slots[key] = () => normalized;
        }
      }
    };
    normalizeVNodeSlots = (instance, children) => {
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    };
    initSlots = (instance, children) => {
      const slots = instance.slots = createInternalObject();
      if (instance.vnode.shapeFlag & 32) {
        const type2 = children._;
        if (type2) {
          extend(slots, children);
          def(slots, "_", type2, true);
        } else {
          normalizeObjectSlots(children, slots);
        }
      } else if (children) {
        normalizeVNodeSlots(instance, children);
      }
    };
    updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type2 = children._;
        if (type2) {
          if (optimized && type2 === 1) {
            needDeletionCheck = false;
          } else {
            extend(slots, children);
            if (!optimized && type2 === 1) {
              delete slots._;
            }
          }
        } else {
          needDeletionCheck = !children.$stable;
          normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
      } else if (children) {
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
      }
      if (needDeletionCheck) {
        for (const key in slots) {
          if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
            delete slots[key];
          }
        }
      }
    };
    hasMismatch = false;
    isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
    isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
    getContainerType = (container) => {
      if (isSVGContainer(container))
        return "svg";
      if (isMathMLContainer(container))
        return "mathml";
      return void 0;
    };
    isComment$1 = (node) => node.nodeType === 8;
    queuePostRenderEffect = queueEffectWithSuspense;
    isTeleport = (type2) => type2.__isTeleport;
    Fragment = Symbol.for("v-fgt");
    Text = Symbol.for("v-txt");
    Comment = Symbol.for("v-cmt");
    Static = Symbol.for("v-stc");
    blockStack = [];
    currentBlock = null;
    isBlockTreeEnabled = 1;
    normalizeKey = ({ key }) => key != null ? key : null;
    normalizeRef = ({
      ref: ref3,
      ref_key,
      ref_for
    }) => {
      if (typeof ref3 === "number") {
        ref3 = "" + ref3;
      }
      return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
    };
    createVNode = _createVNode;
    emptyAppContext = createAppContext();
    uid = 0;
    currentInstance = null;
    {
      const g = getGlobalThis();
      const registerGlobalSetter = (key, setter) => {
        let setters;
        if (!(setters = g[key]))
          setters = g[key] = [];
        setters.push(setter);
        return (v3) => {
          if (setters.length > 1)
            setters.forEach((set2) => set2(v3));
          else
            setters[0](v3);
        };
      };
      internalSetCurrentInstance = registerGlobalSetter(
        `__VUE_INSTANCE_SETTERS__`,
        (v3) => currentInstance = v3
      );
      setInSSRSetupState = registerGlobalSetter(
        `__VUE_SSR_SETTERS__`,
        (v3) => isInSSRComponentSetup = v3
      );
    }
    setCurrentInstance = (instance) => {
      const prev = currentInstance;
      internalSetCurrentInstance(instance);
      instance.scope.on();
      return () => {
        instance.scope.off();
        internalSetCurrentInstance(prev);
      };
    };
    unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      internalSetCurrentInstance(null);
    };
    isInSSRComponentSetup = false;
    attrsProxyHandlers = {
      get(target, key) {
        track(target, "get", "");
        return target[key];
      }
    };
    computed = (getterOrOptions, debugOptions) => {
      const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
      return c2;
    };
    version = "3.4.27";
    _ssrUtils = {
      createComponentInstance: createComponentInstance$1,
      setupComponent: setupComponent$1,
      renderComponentRoot: renderComponentRoot$1,
      setCurrentRenderingInstance: setCurrentRenderingInstance$1,
      isVNode,
      normalizeVNode: normalizeVNode$1
    };
    ssrUtils = _ssrUtils;
    svgNS = "http://www.w3.org/2000/svg";
    mathmlNS = "http://www.w3.org/1998/Math/MathML";
    doc = typeof document !== "undefined" ? document : null;
    templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
    nodeOps = {
      insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
      },
      remove: (child) => {
        const parent = child.parentNode;
        if (parent) {
          parent.removeChild(child);
        }
      },
      createElement: (tag, namespace, is, props) => {
        const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
        if (tag === "select" && props && props.multiple != null) {
          el.setAttribute("multiple", props.multiple);
        }
        return el;
      },
      createText: (text) => doc.createTextNode(text),
      createComment: (text) => doc.createComment(text),
      setText: (node, text) => {
        node.nodeValue = text;
      },
      setElementText: (el, text) => {
        el.textContent = text;
      },
      parentNode: (node) => node.parentNode,
      nextSibling: (node) => node.nextSibling,
      querySelector: (selector) => doc.querySelector(selector),
      setScopeId(el, id) {
        el.setAttribute(id, "");
      },
      // __UNSAFE__
      // Reason: innerHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, namespace, start2, end) {
        const before = anchor ? anchor.previousSibling : parent.lastChild;
        if (start2 && (start2 === end || start2.nextSibling)) {
          while (true) {
            parent.insertBefore(start2.cloneNode(true), anchor);
            if (start2 === end || !(start2 = start2.nextSibling))
              break;
          }
        } else {
          templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
          const template = templateContainer.content;
          if (namespace === "svg" || namespace === "mathml") {
            const wrapper = template.firstChild;
            while (wrapper.firstChild) {
              template.appendChild(wrapper.firstChild);
            }
            template.removeChild(wrapper);
          }
          parent.insertBefore(template, anchor);
        }
        return [
          // first
          before ? before.nextSibling : parent.firstChild,
          // last
          anchor ? anchor.previousSibling : parent.lastChild
        ];
      }
    };
    vtcKey = Symbol("_vtc");
    vShowOriginalDisplay = Symbol("_vod");
    vShowHidden = Symbol("_vsh");
    CSS_VAR_TEXT = Symbol("");
    displayRE = /(^|;)\s*display\s*:/;
    importantRE = /\s*!important$/;
    prefixes = ["Webkit", "Moz", "ms"];
    prefixCache = {};
    xlinkNS = "http://www.w3.org/1999/xlink";
    veiKey = Symbol("_vei");
    optionsModifierRE = /(?:Once|Passive|Capture)$/;
    cachedNow = 0;
    p = /* @__PURE__ */ Promise.resolve();
    getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
    isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
    key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
    patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
      const isSVG = namespace === "svg";
      if (key === "class") {
        patchClass(el, nextValue, isSVG);
      } else if (key === "style") {
        patchStyle(el, prevValue, nextValue);
      } else if (isOn(key)) {
        if (!isModelListener(key)) {
          patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
      } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
        patchDOMProp(
          el,
          key,
          nextValue,
          prevChildren,
          parentComponent,
          parentSuspense,
          unmountChildren
        );
      } else {
        if (key === "true-value") {
          el._trueValue = nextValue;
        } else if (key === "false-value") {
          el._falseValue = nextValue;
        }
        patchAttr(el, key, nextValue, isSVG);
      }
    };
    getModelAssigner = (vnode) => {
      const fn = vnode.props["onUpdate:modelValue"] || false;
      return isArray(fn) ? (value2) => invokeArrayFns(fn, value2) : fn;
    };
    assignKey = Symbol("_assign");
    vModelText = {
      created(el, { modifiers: { lazy: lazy2, trim, number } }, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        const castToNumber = number || vnode.props && vnode.props.type === "number";
        addEventListener(el, lazy2 ? "change" : "input", (e3) => {
          if (e3.target.composing)
            return;
          let domValue = el.value;
          if (trim) {
            domValue = domValue.trim();
          }
          if (castToNumber) {
            domValue = looseToNumber(domValue);
          }
          el[assignKey](domValue);
        });
        if (trim) {
          addEventListener(el, "change", () => {
            el.value = el.value.trim();
          });
        }
        if (!lazy2) {
          addEventListener(el, "compositionstart", onCompositionStart);
          addEventListener(el, "compositionend", onCompositionEnd);
          addEventListener(el, "change", onCompositionEnd);
        }
      },
      // set value on mounted so it's after min/max for type="range"
      mounted(el, { value: value2 }) {
        el.value = value2 == null ? "" : value2;
      },
      beforeUpdate(el, { value: value2, modifiers: { lazy: lazy2, trim, number } }, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        if (el.composing)
          return;
        const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
        const newValue = value2 == null ? "" : value2;
        if (elValue === newValue) {
          return;
        }
        if (document.activeElement === el && el.type !== "range") {
          if (lazy2) {
            return;
          }
          if (trim && el.value.trim() === newValue) {
            return;
          }
        }
        el.value = newValue;
      }
    };
    vModelCheckbox = {
      // #4096 array checkboxes need to be deep traversed
      deep: true,
      created(el, _, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        addEventListener(el, "change", () => {
          const modelValue = el._modelValue;
          const elementValue = getValue(el);
          const checked = el.checked;
          const assign = el[assignKey];
          if (isArray(modelValue)) {
            const index = looseIndexOf(modelValue, elementValue);
            const found = index !== -1;
            if (checked && !found) {
              assign(modelValue.concat(elementValue));
            } else if (!checked && found) {
              const filtered = [...modelValue];
              filtered.splice(index, 1);
              assign(filtered);
            }
          } else if (isSet(modelValue)) {
            const cloned = new Set(modelValue);
            if (checked) {
              cloned.add(elementValue);
            } else {
              cloned.delete(elementValue);
            }
            assign(cloned);
          } else {
            assign(getCheckboxValue(el, checked));
          }
        });
      },
      // set initial checked on mount to wait for true-value/false-value
      mounted: setChecked,
      beforeUpdate(el, binding, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        setChecked(el, binding, vnode);
      }
    };
    vModelRadio = {
      created(el, { value: value2 }, vnode) {
        el.checked = looseEqual(value2, vnode.props.value);
        el[assignKey] = getModelAssigner(vnode);
        addEventListener(el, "change", () => {
          el[assignKey](getValue(el));
        });
      },
      beforeUpdate(el, { value: value2, oldValue }, vnode) {
        el[assignKey] = getModelAssigner(vnode);
        if (value2 !== oldValue) {
          el.checked = looseEqual(value2, vnode.props.value);
        }
      }
    };
    rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
    enabledHydration = false;
    createApp = (...args) => {
      const app = ensureRenderer().createApp(...args);
      const { mount } = app;
      app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
          return;
        const component = app._component;
        if (!isFunction(component) && !component.render && !component.template) {
          component.template = container.innerHTML;
        }
        container.innerHTML = "";
        const proxy = mount(container, false, resolveRootNamespace(container));
        if (container instanceof Element) {
          container.removeAttribute("v-cloak");
          container.setAttribute("data-v-app", "");
        }
        return proxy;
      };
      return app;
    };
    createSSRApp = (...args) => {
      const app = ensureHydrationRenderer().createApp(...args);
      const { mount } = app;
      app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (container) {
          return mount(container, true, resolveRootNamespace(container));
        }
      };
      return app;
    };
    ssrDirectiveInitialized = false;
    initDirectivesForSSR = () => {
      if (!ssrDirectiveInitialized) {
        ssrDirectiveInitialized = true;
        initVModelForSSR();
      }
    };
    shouldIgnoreProp = /* @__PURE__ */ makeMap(
      `,key,ref,innerHTML,textContent,ref_key,ref_for`
    );
    commentTestRE = /^<!--.*-->$/s;
    commentRE = /<!--[^]*?-->/gm;
    {
      const g = getGlobalThis();
      const registerGlobalSetter = (key, setter) => {
        let setters;
        if (!(setters = g[key]))
          setters = g[key] = [];
        setters.push(setter);
        return (v3) => {
          if (setters.length > 1)
            setters.forEach((set2) => set2(v3));
          else
            setters[0](v3);
        };
      };
      registerGlobalSetter(
        `__VUE_INSTANCE_SETTERS__`,
        (v3) => v3
      );
      registerGlobalSetter(
        `__VUE_SSR_SETTERS__`,
        (v3) => v3
      );
    }
    ({
      createComponentInstance,
      setCurrentRenderingInstance,
      setupComponent,
      renderComponentRoot,
      normalizeVNode
    } = ssrUtils);
    ({ isVNode: isVNode$1 } = ssrUtils);
    initDirectivesForSSR();
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/@astrojs_DCSmFjgQ.mjs
function check(Component) {
  return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
}
async function renderToStaticMarkup(Component, inputProps, slotted, metadata) {
  const slots = {};
  const props = { ...inputProps };
  delete props.slot;
  for (const [key, value2] of Object.entries(slotted)) {
    slots[key] = () => h(StaticHtml, {
      value: value2,
      name: key === "default" ? void 0 : key,
      // Adjust how this is hydrated only when the version of Astro supports `astroStaticSlot`
      hydrate: metadata.astroStaticSlot ? !!metadata.hydrate : true
    });
  }
  const app = createSSRApp({ render: () => h(Component, props, slots) });
  await setup();
  const html = await renderToString(app);
  return { html };
}
function appendForwardSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}
function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString2(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString2).map((path, i3) => {
    if (i3 === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i3 === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(?:http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}
function slash(path) {
  return path.replace(/\\/g, "/");
}
function fileExtension(path) {
  const ext = path.split(".").pop();
  return ext !== path ? `.${ext}` : "";
}
function createExports(manifest2) {
  const app = new App(manifest2);
  const fetch2 = async (request, env, context) => {
    const { pathname } = new URL(request.url);
    if (manifest2.assets.has(pathname)) {
      return env.ASSETS.fetch(request.url.replace(/\.html$/, ""));
    }
    const routeData = app.match(request);
    if (!routeData) {
      const asset = await env.ASSETS.fetch(request.url.replace(/index.html$/, "").replace(/\.html$/, ""));
      if (asset.status !== 404) {
        return asset;
      }
    }
    Reflect.set(request, Symbol.for("astro.clientAddress"), request.headers.get("cf-connecting-ip"));
    process.env.ASTRO_STUDIO_APP_TOKEN ??= (() => {
      if (typeof env.ASTRO_STUDIO_APP_TOKEN === "string") {
        return env.ASTRO_STUDIO_APP_TOKEN;
      }
    })();
    const locals = {
      runtime: {
        env,
        cf: request.cf,
        caches,
        ctx: {
          waitUntil: (promise) => context.waitUntil(promise),
          passThroughOnException: () => context.passThroughOnException()
        }
      }
    };
    await Promise.resolve().then(() => (init_renderers(), renderers_exports)).then((n2) => n2.i).then((mod) => mod.setGetEnv(createGetEnv(env))).catch(() => {
    });
    const response = await app.render(request, { routeData, locals });
    if (app.setCookieHeaders) {
      for (const setCookieHeader of app.setCookieHeaders(response)) {
        response.headers.append("Set-Cookie", setCookieHeader);
      }
    }
    return response;
  };
  return { default: { fetch: fetch2 } };
}
var setup, StaticHtml, _renderer0, createGetEnv, serverEntrypointModule;
var init_astrojs_DCSmFjgQ = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/@astrojs_DCSmFjgQ.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_vue_BQBbmbrb();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    setup = () => {
    };
    StaticHtml = defineComponent({
      props: {
        value: String,
        name: String,
        hydrate: {
          type: Boolean,
          default: true
        }
      },
      setup({ name, value: value2, hydrate }) {
        if (!value2)
          return () => null;
        let tagName = hydrate ? "astro-slot" : "astro-static-slot";
        return () => h(tagName, { name, innerHTML: value2 });
      }
    });
    _renderer0 = {
      check,
      renderToStaticMarkup,
      supportsAstroStaticSlot: true
    };
    createGetEnv = (env) => (key) => {
      const v3 = env[key];
      if (typeof v3 === "undefined" || typeof v3 === "string") {
        return v3;
      }
      if (typeof v3 === "boolean" || typeof v3 === "number") {
        return v3.toString();
      }
      return void 0;
    };
    serverEntrypointModule = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      createExports
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/cookie_CrAhd5mk.mjs
function parse2(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (void 0 === obj[key]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value2 = enc(val);
  if (value2 && !fieldContentRegExp.test(value2)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value2;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate2(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate2(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e3) {
    return str;
  }
}
var parse_1, serialize_1, __toString, fieldContentRegExp;
var init_cookie_CrAhd5mk = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/cookie_CrAhd5mk.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    parse_1 = parse2;
    serialize_1 = serialize;
    __toString = Object.prototype.toString;
    fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/clsx_CNI3IGC6.mjs
function r(e3) {
  var t2, f3, n2 = "";
  if ("string" == typeof e3 || "number" == typeof e3)
    n2 += e3;
  else if ("object" == typeof e3)
    if (Array.isArray(e3)) {
      var o2 = e3.length;
      for (t2 = 0; t2 < o2; t2++)
        e3[t2] && (f3 = r(e3[t2])) && (n2 && (n2 += " "), n2 += f3);
    } else
      for (f3 in e3)
        e3[f3] && (n2 && (n2 += " "), n2 += f3);
  return n2;
}
function clsx() {
  for (var e3, t2, f3 = 0, n2 = "", o2 = arguments.length; f3 < o2; f3++)
    (e3 = arguments[f3]) && (t2 = r(e3)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
var init_clsx_CNI3IGC6 = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/clsx_CNI3IGC6.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/html-escaper_ClQ6UWd1.mjs
var replace, ca, esca, pe, escape;
var init_html_escaper_ClQ6UWd1 = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/html-escaper_ClQ6UWd1.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    ({ replace } = "");
    ca = /[&<>'"]/g;
    esca = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    };
    pe = (m3) => esca[m3];
    escape = (es) => replace.call(es, ca, pe);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/mrmime_DcLn5OCC.mjs
function lookup(extn) {
  let tmp = ("" + extn).trim().toLowerCase();
  let idx = tmp.lastIndexOf(".");
  return mimes[!~idx ? tmp : tmp.substring(++idx)];
}
var mimes;
var init_mrmime_DcLn5OCC = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/mrmime_DcLn5OCC.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    mimes = {
      "3g2": "video/3gpp2",
      "3gp": "video/3gpp",
      "3gpp": "video/3gpp",
      "3mf": "model/3mf",
      "aac": "audio/aac",
      "ac": "application/pkix-attr-cert",
      "adp": "audio/adpcm",
      "adts": "audio/aac",
      "ai": "application/postscript",
      "aml": "application/automationml-aml+xml",
      "amlx": "application/automationml-amlx+zip",
      "amr": "audio/amr",
      "apng": "image/apng",
      "appcache": "text/cache-manifest",
      "appinstaller": "application/appinstaller",
      "appx": "application/appx",
      "appxbundle": "application/appxbundle",
      "asc": "application/pgp-keys",
      "atom": "application/atom+xml",
      "atomcat": "application/atomcat+xml",
      "atomdeleted": "application/atomdeleted+xml",
      "atomsvc": "application/atomsvc+xml",
      "au": "audio/basic",
      "avci": "image/avci",
      "avcs": "image/avcs",
      "avif": "image/avif",
      "aw": "application/applixware",
      "bdoc": "application/bdoc",
      "bin": "application/octet-stream",
      "bmp": "image/bmp",
      "bpk": "application/octet-stream",
      "btf": "image/prs.btif",
      "btif": "image/prs.btif",
      "buffer": "application/octet-stream",
      "ccxml": "application/ccxml+xml",
      "cdfx": "application/cdfx+xml",
      "cdmia": "application/cdmi-capability",
      "cdmic": "application/cdmi-container",
      "cdmid": "application/cdmi-domain",
      "cdmio": "application/cdmi-object",
      "cdmiq": "application/cdmi-queue",
      "cer": "application/pkix-cert",
      "cgm": "image/cgm",
      "cjs": "application/node",
      "class": "application/java-vm",
      "coffee": "text/coffeescript",
      "conf": "text/plain",
      "cpl": "application/cpl+xml",
      "cpt": "application/mac-compactpro",
      "crl": "application/pkix-crl",
      "css": "text/css",
      "csv": "text/csv",
      "cu": "application/cu-seeme",
      "cwl": "application/cwl",
      "cww": "application/prs.cww",
      "davmount": "application/davmount+xml",
      "dbk": "application/docbook+xml",
      "deb": "application/octet-stream",
      "def": "text/plain",
      "deploy": "application/octet-stream",
      "dib": "image/bmp",
      "disposition-notification": "message/disposition-notification",
      "dist": "application/octet-stream",
      "distz": "application/octet-stream",
      "dll": "application/octet-stream",
      "dmg": "application/octet-stream",
      "dms": "application/octet-stream",
      "doc": "application/msword",
      "dot": "application/msword",
      "dpx": "image/dpx",
      "drle": "image/dicom-rle",
      "dsc": "text/prs.lines.tag",
      "dssc": "application/dssc+der",
      "dtd": "application/xml-dtd",
      "dump": "application/octet-stream",
      "dwd": "application/atsc-dwd+xml",
      "ear": "application/java-archive",
      "ecma": "application/ecmascript",
      "elc": "application/octet-stream",
      "emf": "image/emf",
      "eml": "message/rfc822",
      "emma": "application/emma+xml",
      "emotionml": "application/emotionml+xml",
      "eps": "application/postscript",
      "epub": "application/epub+zip",
      "exe": "application/octet-stream",
      "exi": "application/exi",
      "exp": "application/express",
      "exr": "image/aces",
      "ez": "application/andrew-inset",
      "fdf": "application/fdf",
      "fdt": "application/fdt+xml",
      "fits": "image/fits",
      "g3": "image/g3fax",
      "gbr": "application/rpki-ghostbusters",
      "geojson": "application/geo+json",
      "gif": "image/gif",
      "glb": "model/gltf-binary",
      "gltf": "model/gltf+json",
      "gml": "application/gml+xml",
      "gpx": "application/gpx+xml",
      "gram": "application/srgs",
      "grxml": "application/srgs+xml",
      "gxf": "application/gxf",
      "gz": "application/gzip",
      "h261": "video/h261",
      "h263": "video/h263",
      "h264": "video/h264",
      "heic": "image/heic",
      "heics": "image/heic-sequence",
      "heif": "image/heif",
      "heifs": "image/heif-sequence",
      "hej2": "image/hej2k",
      "held": "application/atsc-held+xml",
      "hjson": "application/hjson",
      "hlp": "application/winhlp",
      "hqx": "application/mac-binhex40",
      "hsj2": "image/hsj2",
      "htm": "text/html",
      "html": "text/html",
      "ics": "text/calendar",
      "ief": "image/ief",
      "ifb": "text/calendar",
      "iges": "model/iges",
      "igs": "model/iges",
      "img": "application/octet-stream",
      "in": "text/plain",
      "ini": "text/plain",
      "ink": "application/inkml+xml",
      "inkml": "application/inkml+xml",
      "ipfix": "application/ipfix",
      "iso": "application/octet-stream",
      "its": "application/its+xml",
      "jade": "text/jade",
      "jar": "application/java-archive",
      "jhc": "image/jphc",
      "jls": "image/jls",
      "jp2": "image/jp2",
      "jpe": "image/jpeg",
      "jpeg": "image/jpeg",
      "jpf": "image/jpx",
      "jpg": "image/jpeg",
      "jpg2": "image/jp2",
      "jpgm": "image/jpm",
      "jpgv": "video/jpeg",
      "jph": "image/jph",
      "jpm": "image/jpm",
      "jpx": "image/jpx",
      "js": "text/javascript",
      "json": "application/json",
      "json5": "application/json5",
      "jsonld": "application/ld+json",
      "jsonml": "application/jsonml+json",
      "jsx": "text/jsx",
      "jt": "model/jt",
      "jxr": "image/jxr",
      "jxra": "image/jxra",
      "jxrs": "image/jxrs",
      "jxs": "image/jxs",
      "jxsc": "image/jxsc",
      "jxsi": "image/jxsi",
      "jxss": "image/jxss",
      "kar": "audio/midi",
      "ktx": "image/ktx",
      "ktx2": "image/ktx2",
      "less": "text/less",
      "lgr": "application/lgr+xml",
      "list": "text/plain",
      "litcoffee": "text/coffeescript",
      "log": "text/plain",
      "lostxml": "application/lost+xml",
      "lrf": "application/octet-stream",
      "m1v": "video/mpeg",
      "m21": "application/mp21",
      "m2a": "audio/mpeg",
      "m2v": "video/mpeg",
      "m3a": "audio/mpeg",
      "m4a": "audio/mp4",
      "m4p": "application/mp4",
      "m4s": "video/iso.segment",
      "ma": "application/mathematica",
      "mads": "application/mads+xml",
      "maei": "application/mmt-aei+xml",
      "man": "text/troff",
      "manifest": "text/cache-manifest",
      "map": "application/json",
      "mar": "application/octet-stream",
      "markdown": "text/markdown",
      "mathml": "application/mathml+xml",
      "mb": "application/mathematica",
      "mbox": "application/mbox",
      "md": "text/markdown",
      "mdx": "text/mdx",
      "me": "text/troff",
      "mesh": "model/mesh",
      "meta4": "application/metalink4+xml",
      "metalink": "application/metalink+xml",
      "mets": "application/mets+xml",
      "mft": "application/rpki-manifest",
      "mid": "audio/midi",
      "midi": "audio/midi",
      "mime": "message/rfc822",
      "mj2": "video/mj2",
      "mjp2": "video/mj2",
      "mjs": "text/javascript",
      "mml": "text/mathml",
      "mods": "application/mods+xml",
      "mov": "video/quicktime",
      "mp2": "audio/mpeg",
      "mp21": "application/mp21",
      "mp2a": "audio/mpeg",
      "mp3": "audio/mpeg",
      "mp4": "video/mp4",
      "mp4a": "audio/mp4",
      "mp4s": "application/mp4",
      "mp4v": "video/mp4",
      "mpd": "application/dash+xml",
      "mpe": "video/mpeg",
      "mpeg": "video/mpeg",
      "mpf": "application/media-policy-dataset+xml",
      "mpg": "video/mpeg",
      "mpg4": "video/mp4",
      "mpga": "audio/mpeg",
      "mpp": "application/dash-patch+xml",
      "mrc": "application/marc",
      "mrcx": "application/marcxml+xml",
      "ms": "text/troff",
      "mscml": "application/mediaservercontrol+xml",
      "msh": "model/mesh",
      "msi": "application/octet-stream",
      "msix": "application/msix",
      "msixbundle": "application/msixbundle",
      "msm": "application/octet-stream",
      "msp": "application/octet-stream",
      "mtl": "model/mtl",
      "musd": "application/mmt-usd+xml",
      "mxf": "application/mxf",
      "mxmf": "audio/mobile-xmf",
      "mxml": "application/xv+xml",
      "n3": "text/n3",
      "nb": "application/mathematica",
      "nq": "application/n-quads",
      "nt": "application/n-triples",
      "obj": "model/obj",
      "oda": "application/oda",
      "oga": "audio/ogg",
      "ogg": "audio/ogg",
      "ogv": "video/ogg",
      "ogx": "application/ogg",
      "omdoc": "application/omdoc+xml",
      "onepkg": "application/onenote",
      "onetmp": "application/onenote",
      "onetoc": "application/onenote",
      "onetoc2": "application/onenote",
      "opf": "application/oebps-package+xml",
      "opus": "audio/ogg",
      "otf": "font/otf",
      "owl": "application/rdf+xml",
      "oxps": "application/oxps",
      "p10": "application/pkcs10",
      "p7c": "application/pkcs7-mime",
      "p7m": "application/pkcs7-mime",
      "p7s": "application/pkcs7-signature",
      "p8": "application/pkcs8",
      "pdf": "application/pdf",
      "pfr": "application/font-tdpfr",
      "pgp": "application/pgp-encrypted",
      "pkg": "application/octet-stream",
      "pki": "application/pkixcmp",
      "pkipath": "application/pkix-pkipath",
      "pls": "application/pls+xml",
      "png": "image/png",
      "prc": "model/prc",
      "prf": "application/pics-rules",
      "provx": "application/provenance+xml",
      "ps": "application/postscript",
      "pskcxml": "application/pskc+xml",
      "pti": "image/prs.pti",
      "qt": "video/quicktime",
      "raml": "application/raml+yaml",
      "rapd": "application/route-apd+xml",
      "rdf": "application/rdf+xml",
      "relo": "application/p2p-overlay+xml",
      "rif": "application/reginfo+xml",
      "rl": "application/resource-lists+xml",
      "rld": "application/resource-lists-diff+xml",
      "rmi": "audio/midi",
      "rnc": "application/relax-ng-compact-syntax",
      "rng": "application/xml",
      "roa": "application/rpki-roa",
      "roff": "text/troff",
      "rq": "application/sparql-query",
      "rs": "application/rls-services+xml",
      "rsat": "application/atsc-rsat+xml",
      "rsd": "application/rsd+xml",
      "rsheet": "application/urc-ressheet+xml",
      "rss": "application/rss+xml",
      "rtf": "text/rtf",
      "rtx": "text/richtext",
      "rusd": "application/route-usd+xml",
      "s3m": "audio/s3m",
      "sbml": "application/sbml+xml",
      "scq": "application/scvp-cv-request",
      "scs": "application/scvp-cv-response",
      "sdp": "application/sdp",
      "senmlx": "application/senml+xml",
      "sensmlx": "application/sensml+xml",
      "ser": "application/java-serialized-object",
      "setpay": "application/set-payment-initiation",
      "setreg": "application/set-registration-initiation",
      "sgi": "image/sgi",
      "sgm": "text/sgml",
      "sgml": "text/sgml",
      "shex": "text/shex",
      "shf": "application/shf+xml",
      "shtml": "text/html",
      "sieve": "application/sieve",
      "sig": "application/pgp-signature",
      "sil": "audio/silk",
      "silo": "model/mesh",
      "siv": "application/sieve",
      "slim": "text/slim",
      "slm": "text/slim",
      "sls": "application/route-s-tsid+xml",
      "smi": "application/smil+xml",
      "smil": "application/smil+xml",
      "snd": "audio/basic",
      "so": "application/octet-stream",
      "spdx": "text/spdx",
      "spp": "application/scvp-vp-response",
      "spq": "application/scvp-vp-request",
      "spx": "audio/ogg",
      "sql": "application/sql",
      "sru": "application/sru+xml",
      "srx": "application/sparql-results+xml",
      "ssdl": "application/ssdl+xml",
      "ssml": "application/ssml+xml",
      "stk": "application/hyperstudio",
      "stl": "model/stl",
      "stpx": "model/step+xml",
      "stpxz": "model/step-xml+zip",
      "stpz": "model/step+zip",
      "styl": "text/stylus",
      "stylus": "text/stylus",
      "svg": "image/svg+xml",
      "svgz": "image/svg+xml",
      "swidtag": "application/swid+xml",
      "t": "text/troff",
      "t38": "image/t38",
      "td": "application/urc-targetdesc+xml",
      "tei": "application/tei+xml",
      "teicorpus": "application/tei+xml",
      "text": "text/plain",
      "tfi": "application/thraud+xml",
      "tfx": "image/tiff-fx",
      "tif": "image/tiff",
      "tiff": "image/tiff",
      "toml": "application/toml",
      "tr": "text/troff",
      "trig": "application/trig",
      "ts": "video/mp2t",
      "tsd": "application/timestamped-data",
      "tsv": "text/tab-separated-values",
      "ttc": "font/collection",
      "ttf": "font/ttf",
      "ttl": "text/turtle",
      "ttml": "application/ttml+xml",
      "txt": "text/plain",
      "u3d": "model/u3d",
      "u8dsn": "message/global-delivery-status",
      "u8hdr": "message/global-headers",
      "u8mdn": "message/global-disposition-notification",
      "u8msg": "message/global",
      "ubj": "application/ubjson",
      "uri": "text/uri-list",
      "uris": "text/uri-list",
      "urls": "text/uri-list",
      "vcard": "text/vcard",
      "vrml": "model/vrml",
      "vtt": "text/vtt",
      "vxml": "application/voicexml+xml",
      "war": "application/java-archive",
      "wasm": "application/wasm",
      "wav": "audio/wav",
      "weba": "audio/webm",
      "webm": "video/webm",
      "webmanifest": "application/manifest+json",
      "webp": "image/webp",
      "wgsl": "text/wgsl",
      "wgt": "application/widget",
      "wif": "application/watcherinfo+xml",
      "wmf": "image/wmf",
      "woff": "font/woff",
      "woff2": "font/woff2",
      "wrl": "model/vrml",
      "wsdl": "application/wsdl+xml",
      "wspolicy": "application/wspolicy+xml",
      "x3d": "model/x3d+xml",
      "x3db": "model/x3d+fastinfoset",
      "x3dbz": "model/x3d+binary",
      "x3dv": "model/x3d-vrml",
      "x3dvz": "model/x3d+vrml",
      "x3dz": "model/x3d+xml",
      "xaml": "application/xaml+xml",
      "xav": "application/xcap-att+xml",
      "xca": "application/xcap-caps+xml",
      "xcs": "application/calendar+xml",
      "xdf": "application/xcap-diff+xml",
      "xdssc": "application/dssc+xml",
      "xel": "application/xcap-el+xml",
      "xenc": "application/xenc+xml",
      "xer": "application/patch-ops-error+xml",
      "xfdf": "application/xfdf",
      "xht": "application/xhtml+xml",
      "xhtml": "application/xhtml+xml",
      "xhvml": "application/xv+xml",
      "xlf": "application/xliff+xml",
      "xm": "audio/xm",
      "xml": "text/xml",
      "xns": "application/xcap-ns+xml",
      "xop": "application/xop+xml",
      "xpl": "application/xproc+xml",
      "xsd": "application/xml",
      "xsf": "application/prs.xsf+xml",
      "xsl": "application/xml",
      "xslt": "application/xml",
      "xspf": "application/xspf+xml",
      "xvm": "application/xv+xml",
      "xvml": "application/xv+xml",
      "yaml": "text/yaml",
      "yang": "application/yang",
      "yin": "application/yin+xml",
      "yml": "text/yaml",
      "zip": "application/zip"
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/renderers.mjs
var renderers_exports = {};
__export(renderers_exports, {
  A: () => App,
  a: () => renderHead,
  b: () => renderComponent,
  c: () => createComponent,
  d: () => renderSlot2,
  e: () => createAstro,
  f: () => addAttribute,
  g: () => sequence,
  h: () => deserializeManifest,
  i: () => setup2,
  j: () => generic___js,
  m: () => maybeRenderHead,
  r: () => renderTemplate,
  renderers: () => renderers,
  s: () => spreadAttributes
});
function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n2 = -2; n2 <= 2; n2++) {
    if (lines[loc.line + n2])
      visibleLines.push(loc.line + n2);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}
function hasActionsInternal(locals) {
  return "_actionsInternal" in locals;
}
function createGetActionResult(locals) {
  return (actionFn) => {
    if (!hasActionsInternal(locals))
      throw new AstroError({
        name: "AstroActionError",
        message: "Experimental actions are not enabled in your project.",
        hint: "See https://docs.astro.build/en/reference/configuration-reference/#experimental-flags"
      });
    return locals._actionsInternal.getActionResult(actionFn);
  };
}
function shouldAppendForwardSlash(trailingSlash, buildFormat) {
  switch (trailingSlash) {
    case "always":
      return true;
    case "never":
      return false;
    case "ignore": {
      switch (buildFormat) {
        case "directory":
          return true;
        case "preserve":
        case "file":
          return false;
      }
    }
  }
}
function createI18nMiddleware(i18n, base, trailingSlash, format) {
  if (!i18n)
    return (_, next) => next();
  const payload = {
    ...i18n,
    trailingSlash,
    base,
    format,
    domains: {}
  };
  const _redirectToDefaultLocale = redirectToDefaultLocale(payload);
  const _noFoundForNonLocaleRoute = notFound(payload);
  const _requestHasLocale = requestHasLocale(payload.locales);
  const _redirectToFallback = redirectToFallback(payload);
  const prefixAlways = (context) => {
    const url = context.url;
    if (url.pathname === base + "/" || url.pathname === base) {
      return _redirectToDefaultLocale(context);
    } else if (!_requestHasLocale(context)) {
      return _noFoundForNonLocaleRoute(context);
    }
    return void 0;
  };
  const prefixOtherLocales = (context, response) => {
    let pathnameContainsDefaultLocale = false;
    const url = context.url;
    for (const segment of url.pathname.split("/")) {
      if (normalizeTheLocale(segment) === normalizeTheLocale(i18n.defaultLocale)) {
        pathnameContainsDefaultLocale = true;
        break;
      }
    }
    if (pathnameContainsDefaultLocale) {
      const newLocation = url.pathname.replace(`/${i18n.defaultLocale}`, "");
      response.headers.set("Location", newLocation);
      return _noFoundForNonLocaleRoute(context);
    }
    return void 0;
  };
  return async (context, next) => {
    const response = await next();
    const type2 = response.headers.get(ROUTE_TYPE_HEADER);
    if (type2 !== "page" && type2 !== "fallback") {
      return response;
    }
    if (requestIs404Or500(context.request, base)) {
      return response;
    }
    const { currentLocale } = context;
    switch (i18n.strategy) {
      case "manual": {
        return response;
      }
      case "domains-prefix-other-locales": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixOtherLocales(context, response);
          if (result) {
            return result;
          }
        }
        break;
      }
      case "pathname-prefix-other-locales": {
        const result = prefixOtherLocales(context, response);
        if (result) {
          return result;
        }
        break;
      }
      case "domains-prefix-always-no-redirect": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = _noFoundForNonLocaleRoute(context, response);
          if (result) {
            return result;
          }
        }
        break;
      }
      case "pathname-prefix-always-no-redirect": {
        const result = _noFoundForNonLocaleRoute(context, response);
        if (result) {
          return result;
        }
        break;
      }
      case "pathname-prefix-always": {
        const result = prefixAlways(context);
        if (result) {
          return result;
        }
        break;
      }
      case "domains-prefix-always": {
        if (localeHasntDomain(i18n, currentLocale)) {
          const result = prefixAlways(context);
          if (result) {
            return result;
          }
        }
        break;
      }
    }
    return _redirectToFallback(context, response);
  };
}
function localeHasntDomain(i18n, currentLocale) {
  for (const domainLocale of Object.values(i18n.domainLookupTable)) {
    if (domainLocale === currentLocale) {
      return false;
    }
  }
  return true;
}
function requestHasLocale(locales) {
  return function(context) {
    return pathHasLocale(context.url.pathname, locales);
  };
}
function requestIs404Or500(request, base = "") {
  const url = new URL(request.url);
  return url.pathname.startsWith(`${base}/404`) || url.pathname.startsWith(`${base}/500`);
}
function pathHasLocale(path, locales) {
  const segments = path.split("/");
  for (const segment of segments) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) {
          return true;
        }
      } else if (segment === locale.path) {
        return true;
      }
    }
  }
  return false;
}
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  throw new AstroError(i18nNoLocaleFoundInPath);
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function toCodes(locales) {
  return locales.map((loopLocale) => {
    if (typeof loopLocale === "string") {
      return loopLocale;
    } else {
      return loopLocale.codes[0];
    }
  });
}
function redirectToDefaultLocale({
  trailingSlash,
  format,
  base,
  defaultLocale
}) {
  return function(context, statusCode) {
    if (shouldAppendForwardSlash(trailingSlash, format)) {
      return context.redirect(`${appendForwardSlash(joinPaths(base, defaultLocale))}`, statusCode);
    } else {
      return context.redirect(`${joinPaths(base, defaultLocale)}`, statusCode);
    }
  };
}
function notFound({ base, locales }) {
  return function(context, response) {
    if (response?.headers.get(REROUTE_DIRECTIVE_HEADER) === "no")
      return response;
    const url = context.url;
    const isRoot = url.pathname === base + "/" || url.pathname === base;
    if (!(isRoot || pathHasLocale(url.pathname, locales))) {
      if (response) {
        response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
        return new Response(response.body, {
          status: 404,
          headers: response.headers
        });
      } else {
        return new Response(null, {
          status: 404,
          headers: {
            [REROUTE_DIRECTIVE_HEADER]: "no"
          }
        });
      }
    }
    return void 0;
  };
}
function redirectToFallback({
  fallback,
  locales,
  defaultLocale,
  strategy,
  base
}) {
  return function(context, response) {
    if (response.status >= 300 && fallback) {
      const fallbackKeys = fallback ? Object.keys(fallback) : [];
      const segments = context.url.pathname.split("/");
      const urlLocale = segments.find((segment) => {
        for (const locale of locales) {
          if (typeof locale === "string") {
            if (locale === segment) {
              return true;
            }
          } else if (locale.path === segment) {
            return true;
          }
        }
        return false;
      });
      if (urlLocale && fallbackKeys.includes(urlLocale)) {
        const fallbackLocale = fallback[urlLocale];
        const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
        let newPathname;
        if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
          if (context.url.pathname.includes(`${base}`)) {
            newPathname = context.url.pathname.replace(`/${urlLocale}`, ``);
          } else {
            newPathname = context.url.pathname.replace(`/${urlLocale}`, `/`);
          }
        } else {
          newPathname = context.url.pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
        }
        return context.redirect(newPathname);
      }
    }
    return response;
  };
}
function parseLocale(header) {
  if (header === "*") {
    return [{ locale: header, qualityValue: void 0 }];
  }
  const result = [];
  const localeValues = header.split(",").map((str) => str.trim());
  for (const localeValue of localeValues) {
    const split2 = localeValue.split(";").map((str) => str.trim());
    const localeName = split2[0];
    const qualityValue = split2[1];
    if (!split2) {
      continue;
    }
    if (qualityValue && qualityValue.startsWith("q=")) {
      const qualityValueAsFloat = Number.parseFloat(qualityValue.slice("q=".length));
      if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) {
        result.push({
          locale: localeName,
          qualityValue: void 0
        });
      } else {
        result.push({
          locale: localeName,
          qualityValue: qualityValueAsFloat
        });
      }
    } else {
      result.push({
        locale: localeName,
        qualityValue: void 0
      });
    }
  }
  return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
  const normalizedLocales = toCodes(locales).map(normalizeTheLocale);
  return browserLocaleList.filter((browserLocale) => {
    if (browserLocale.locale !== "*") {
      return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
    }
    return true;
  }).sort((a2, b) => {
    if (a2.qualityValue && b.qualityValue) {
      return Math.sign(b.qualityValue - a2.qualityValue);
    }
    return 0;
  });
}
function computePreferredLocale(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = void 0;
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    const firstResult = browserLocaleList.at(0);
    if (firstResult && firstResult.locale !== "*") {
      for (const currentLocale of locales) {
        if (typeof currentLocale === "string") {
          if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
            result = currentLocale;
          }
        } else {
          for (const currentCode of currentLocale.codes) {
            if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
              result = currentLocale.path;
            }
          }
        }
      }
    }
  }
  return result;
}
function computePreferredLocaleList(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = [];
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") {
      return locales.map((locale) => {
        if (typeof locale === "string") {
          return locale;
        } else {
          return locale.codes.at(0);
        }
      });
    } else if (browserLocaleList.length > 0) {
      for (const browserLocale of browserLocaleList) {
        for (const loopLocale of locales) {
          if (typeof loopLocale === "string") {
            if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) {
              result.push(loopLocale);
            }
          } else {
            for (const code of loopLocale.codes) {
              if (code === browserLocale.locale) {
                result.push(loopLocale.path);
              }
            }
          }
        }
      }
    }
  }
  return result;
}
function computeCurrentLocale(pathname, locales) {
  for (const segment of pathname.split("/")) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (!segment.includes(locale))
          continue;
        if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) {
          return locale;
        }
      } else {
        if (locale.path === segment) {
          return locale.codes.at(0);
        } else {
          for (const code of locale.codes) {
            if (normalizeTheLocale(code) === normalizeTheLocale(segment)) {
              return code;
            }
          }
        }
      }
    }
  }
}
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of AstroCookies.consume(cookies)) {
    yield headerValue;
  }
  return [];
}
function sequence(...handlers2) {
  const filtered = handlers2.filter((h3) => !!h3);
  const length = filtered.length;
  if (!length) {
    return defineMiddleware((_context, next) => {
      return next();
    });
  }
  return defineMiddleware((context, next) => {
    let carriedPayload = void 0;
    return applyHandle(0, context);
    function applyHandle(i3, handleContext) {
      const handle = filtered[i3];
      const result = handle(handleContext, async (payload) => {
        if (i3 < length - 1) {
          if (payload) {
            let newRequest;
            if (payload instanceof Request) {
              newRequest = payload;
            } else if (payload instanceof URL) {
              newRequest = new Request(payload, handleContext.request);
            } else {
              newRequest = new Request(
                new URL(payload, handleContext.url.origin),
                handleContext.request
              );
            }
            carriedPayload = payload;
            handleContext.request = newRequest;
            handleContext.url = new URL(newRequest.url);
            handleContext.cookies = new AstroCookies(newRequest);
          }
          return applyHandle(i3 + 1, handleContext);
        } else {
          return next(payload ?? carriedPayload);
        }
      });
      return result;
    }
  });
}
function defineMiddleware(fn) {
  return fn;
}
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
async function renderEndpoint(mod, context, ssr, logger) {
  const { request, url } = context;
  const method = request.method.toUpperCase();
  const handler = mod[method] ?? mod["ALL"];
  if (!ssr && ssr === false && method !== "GET") {
    logger.warn(
      "router",
      `${url.pathname} ${bold(
        method
      )} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`
    );
  }
  if (handler === void 0) {
    logger.warn(
      "router",
      `No API Route handler exists for the method "${method}" for the route "${url.pathname}".
Found handlers: ${Object.keys(mod).map((exp) => JSON.stringify(exp)).join(", ")}
` + ("all" in mod ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")
    );
    return new Response(null, { status: 404 });
  }
  if (typeof handler !== "function") {
    logger.error(
      "router",
      `The route "${url.pathname}" exports a value for the method "${method}", but it is of the type ${typeof handler} instead of a function.`
    );
    return new Response(null, { status: 500 });
  }
  const response = await handler.call(mod, context);
  if (!response || response instanceof Response === false) {
    throw new AstroError(EndpointDidNotReturnAResponse);
  }
  if (REROUTABLE_STATUS_CODES.includes(response.status)) {
    response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
  }
  return response;
}
function validateArgs(args) {
  if (args.length !== 3)
    return false;
  if (!args[0] || typeof args[0] !== "object")
    return false;
  return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
  const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
  const fn = (...args) => {
    if (!validateArgs(args)) {
      throw new AstroError({
        ...InvalidComponentArgs,
        message: InvalidComponentArgs.message(name)
      });
    }
    return cb(...args);
  };
  Object.defineProperty(fn, "name", { value: name, writable: false });
  fn.isAstroComponentFactory = true;
  fn.moduleId = moduleId;
  fn.propagation = propagation;
  return fn;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
  return cb;
}
function createComponent(arg1, moduleId, propagation) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId, propagation);
  } else {
    return createComponentWithOptions(arg1);
  }
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult) => {
    if (typeof importMetaGlobResult === "string") {
      throw new AstroError({
        ...AstroGlobUsedOutside,
        message: AstroGlobUsedOutside.message(JSON.stringify(importMetaGlobResult))
      });
    }
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new AstroError({
        ...AstroGlobNoMatch,
        message: AstroGlobNoMatch.message(JSON.stringify(importMetaGlobResult))
      });
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(site) {
  return {
    // TODO: this is no longer necessary for `Astro.site`
    // but it somehow allows working around caching issues in content collections for some tests
    site: void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    glob: createAstroGlobFn()
  };
}
function isPromise2(value2) {
  return !!value2 && typeof value2 === "object" && "then" in value2 && typeof value2.then === "function";
}
function isHTMLString(value2) {
  return Object.prototype.toString.call(value2) === "[object HTMLString]";
}
function isVNode2(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function createRenderInstruction(instruction) {
  return Object.defineProperty(instruction, RenderInstructionSymbol, {
    value: true
  });
}
function isRenderInstruction(chunk) {
  return chunk && typeof chunk === "object" && chunk[RenderInstructionSymbol];
}
function serializeArray(value2, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value2)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value2);
  const serialized = value2.map((v3) => {
    return convertToSerializedForm(v3, metadata, parents);
  });
  parents.delete(value2);
  return serialized;
}
function serializeObject(value2, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value2)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value2);
  const serialized = Object.fromEntries(
    Object.entries(value2).map(([k, v3]) => {
      return [k, convertToSerializedForm(v3, metadata, parents)];
    })
  );
  parents.delete(value2);
  return serialized;
}
function convertToSerializedForm(value2, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value2);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value2.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value2.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, serializeArray(Array.from(value2), metadata, parents)];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, serializeArray(Array.from(value2), metadata, parents)];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value2.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value2.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, serializeArray(value2, metadata, parents)];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, Array.from(value2)];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, Array.from(value2)];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, Array.from(value2)];
    }
    default: {
      if (value2 !== null && typeof value2 === "object") {
        return [PROP_TYPE.Value, serializeObject(value2, metadata, parents)];
      } else if (value2 === void 0) {
        return [PROP_TYPE.Value];
      } else {
        return [PROP_TYPE.Value, value2];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}
function extractDirectives(inputProps, clientDirectives) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {},
    propsWithoutTransitionAttributes: {}
  };
  for (const [key, value2] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value2;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value2;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value2;
          if (!clientDirectives.has(extracted.hydration.directive)) {
            const hydrationMethods = Array.from(clientDirectives.keys()).map((d3) => `client:${d3}`).join(", ");
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${hydrationMethods}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else {
      extracted.props[key] = value2;
      if (!transitionDirectivesToCopyOnIsland.includes(key)) {
        extracted.propsWithoutTransitionAttributes[key] = value2;
      }
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
    extracted.propsWithoutTransitionAttributes[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer: renderer2, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new AstroError({
      ...NoMatchingImport,
      message: NoMatchingImport.message(metadata.displayName)
    });
  }
  const island = {
    children: "",
    props: {
      // This is for HMR, probably can avoid it in prod
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value2] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value2);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer2.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer2.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  transitionDirectivesToCopyOnIsland.forEach((name) => {
    if (typeof props[name] !== "undefined") {
      island.props[name] = props[name];
    }
  });
  return island;
}
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i3 = 0; i3 < str.length; i3++) {
    const ch = str.charCodeAt(i3);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.componentMetadata.has(factory.moduleId) && hint === "none") {
    hint = result.componentMetadata.get(factory.moduleId).propagation;
  }
  return hint === "in-tree" || hint === "self";
}
function isHeadAndContent(obj) {
  return typeof obj === "object" && !!obj[headAndContentSym];
}
function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(result, directive) {
  const clientDirectives = result.clientDirectives;
  const clientDirective = clientDirectives.get(directive);
  if (!clientDirective) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  return clientDirective;
}
function getPrescripts(result, type2, directive) {
  switch (type2) {
    case "both":
      return `${ISLAND_STYLES}<script>${getDirectiveScriptText(result, directive)};${astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(result, directive)}<\/script>`;
  }
  return "";
}
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value2] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value2)?.replace(
      /<\/script>/g,
      "\\x3C/script>"
    )};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value2, key, shouldEscape = true) {
  if (value2 == null) {
    return "";
  }
  if (value2 === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(clsx(value2), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value2 instanceof HTMLString)) {
    if (Array.isArray(value2) && value2.length === 2) {
      return markHTMLString(
        ` ${key}="${toAttributeString(`${toStyleString(value2[0])};${value2[1]}`, shouldEscape)}"`
      );
    }
    if (typeof value2 === "object") {
      return markHTMLString(` ${key}="${toAttributeString(toStyleString(value2), shouldEscape)}"`);
    }
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value2, shouldEscape)}"`);
  }
  if (typeof value2 === "string" && value2.includes("&") && isHttpUrl(value2)) {
    return markHTMLString(` ${key}="${toAttributeString(value2, false)}"`);
  }
  if (value2 === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value2, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value2] of Object.entries(values)) {
    output += addAttribute(value2, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)}>`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}
function renderToBufferDestination(bufferRenderFunction) {
  const renderer2 = new BufferedRenderer(bufferRenderFunction);
  return renderer2;
}
function promiseWithResolvers() {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return {
    promise,
    resolve,
    reject
  };
}
function isHttpUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return VALID_PROTOCOLS.includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}
function renderAllHeadContent(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map(
    (style) => style.props.rel === "stylesheet" ? renderElement$1("link", style) : renderElement$1("style", style)
  );
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  let content = styles.join("\n") + links.join("\n") + scripts.join("\n");
  if (result._metadata.extraHead.length > 0) {
    for (const part of result._metadata.extraHead) {
      content += part;
    }
  }
  return markHTMLString(content);
}
function renderHead() {
  return createRenderInstruction({ type: "head" });
}
function maybeRenderHead() {
  return createRenderInstruction({ type: "maybe-head" });
}
function isSlotString(str) {
  return !!str[slotString];
}
function renderSlot2(result, slotted, fallback) {
  if (!slotted && fallback) {
    return renderSlot2(result, fallback);
  }
  return {
    async render(destination) {
      await renderChild(destination, typeof slotted === "function" ? slotted(result) : slotted);
    }
  };
}
async function renderSlotToString(result, slotted, fallback) {
  let content = "";
  let instructions = null;
  const temporaryDestination = {
    write(chunk) {
      if (chunk instanceof SlotString) {
        content += chunk;
        if (chunk.instructions) {
          instructions ??= [];
          instructions.push(...chunk.instructions);
        }
      } else if (chunk instanceof Response)
        return;
      else if (typeof chunk === "object" && "type" in chunk && typeof chunk.type === "string") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunkToString(result, chunk);
      }
    }
  };
  const renderInstance = renderSlot2(result, slotted, fallback);
  await renderInstance.render(temporaryDestination);
  return markHTMLString(new SlotString(content, instructions));
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value2]) => renderSlotToString(result, value2).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}
function stringifyChunk(result, chunk) {
  if (isRenderInstruction(chunk)) {
    const instruction = chunk;
    switch (instruction.type) {
      case "directive": {
        const { hydration } = instruction;
        let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
        let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
        let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
        if (prescriptType) {
          let prescripts = getPrescripts(result, prescriptType, hydration.directive);
          return markHTMLString(prescripts);
        } else {
          return "";
        }
      }
      case "head": {
        if (result._metadata.hasRenderedHead || result.partial) {
          return "";
        }
        return renderAllHeadContent(result);
      }
      case "maybe-head": {
        if (result._metadata.hasRenderedHead || result._metadata.headInTree || result.partial) {
          return "";
        }
        return renderAllHeadContent(result);
      }
      case "renderer-hydration-script": {
        const { rendererSpecificHydrationScripts } = result._metadata;
        const { rendererName } = instruction;
        if (!rendererSpecificHydrationScripts.has(rendererName)) {
          rendererSpecificHydrationScripts.add(rendererName);
          return instruction.render();
        }
        return "";
      }
      default: {
        throw new Error(`Unknown chunk type: ${chunk.type}`);
      }
    }
  } else if (chunk instanceof Response) {
    return "";
  } else if (isSlotString(chunk)) {
    let out = "";
    const c2 = chunk;
    if (c2.instructions) {
      for (const instr of c2.instructions) {
        out += stringifyChunk(result, instr);
      }
    }
    out += chunk.toString();
    return out;
  }
  return chunk.toString();
}
function chunkToString(result, chunk) {
  if (ArrayBuffer.isView(chunk)) {
    return decoder$1.decode(chunk);
  } else {
    return stringifyChunk(result, chunk);
  }
}
function chunkToByteArray(result, chunk) {
  if (ArrayBuffer.isView(chunk)) {
    return chunk;
  } else {
    const stringified = stringifyChunk(result, chunk);
    return encoder.encode(stringified.toString());
  }
}
function isRenderInstance(obj) {
  return !!obj && typeof obj === "object" && "render" in obj && typeof obj.render === "function";
}
async function renderChild(destination, child) {
  if (isPromise2(child)) {
    child = await child;
  }
  if (child instanceof SlotString) {
    destination.write(child);
  } else if (isHTMLString(child)) {
    destination.write(child);
  } else if (Array.isArray(child)) {
    const childRenders = child.map((c2) => {
      return renderToBufferDestination((bufferDestination) => {
        return renderChild(bufferDestination, c2);
      });
    });
    for (const childRender of childRenders) {
      if (!childRender)
        continue;
      await childRender.renderToFinalDestination(destination);
    }
  } else if (typeof child === "function") {
    await renderChild(destination, child());
  } else if (typeof child === "string") {
    destination.write(markHTMLString(escapeHTML(child)));
  } else if (!child && child !== 0)
    ;
  else if (isRenderInstance(child)) {
    await child.render(destination);
  } else if (isRenderTemplateResult(child)) {
    await child.render(destination);
  } else if (isAstroComponentInstance(child)) {
    await child.render(destination);
  } else if (ArrayBuffer.isView(child)) {
    destination.write(child);
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    for await (const value2 of child) {
      await renderChild(destination, value2);
    }
  } else {
    destination.write(child);
  }
}
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (prop.startsWith("client:")) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory)) {
    result._metadata.propagators.add(instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && !!obj[astroComponentInstanceSym];
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && !!obj[renderTemplateResultSym];
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}
async function renderToString2(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response)
    return templateResult;
  let str = "";
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          str += doctype;
        }
      }
      if (chunk instanceof Response)
        return;
      str += chunkToString(result, chunk);
    }
  };
  await templateResult.render(destination);
  return str;
}
async function renderToReadableStream(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response)
    return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  return new ReadableStream({
    start(controller) {
      const destination = {
        write(chunk) {
          if (isPage && !renderedFirstPageChunk) {
            renderedFirstPageChunk = true;
            if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
              const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
              controller.enqueue(encoder.encode(doctype));
            }
          }
          if (chunk instanceof Response) {
            throw new AstroError({
              ...ResponseSentError
            });
          }
          const bytes = chunkToByteArray(result, chunk);
          controller.enqueue(bytes);
        }
      };
      (async () => {
        try {
          await templateResult.render(destination);
          controller.close();
        } catch (e3) {
          if (AstroError.is(e3) && !e3.loc) {
            e3.setLocation({
              file: route?.component
            });
          }
          setTimeout(() => controller.error(e3), 0);
        }
      })();
    },
    cancel() {
      result.cancelled = true;
    }
  });
}
async function callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    return factoryResult;
  } else if (isHeadAndContent(factoryResult)) {
    if (!isRenderTemplateResult(factoryResult.content)) {
      throw new AstroError({
        ...OnlyResponseCanBeReturned,
        message: OnlyResponseCanBeReturned.message(
          route?.route,
          typeof factoryResult
        ),
        location: {
          file: route?.component
        }
      });
    }
    return factoryResult.content;
  } else if (!isRenderTemplateResult(factoryResult)) {
    throw new AstroError({
      ...OnlyResponseCanBeReturned,
      message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
      location: {
        file: route?.component
      }
    });
  }
  return factoryResult;
}
async function bufferHeadContent(result) {
  const iterator = result._metadata.propagators.values();
  while (true) {
    const { value: value2, done } = iterator.next();
    if (done) {
      break;
    }
    const returnValue = await value2.init(result);
    if (isHeadAndContent(returnValue)) {
      result._metadata.extraHead.push(returnValue.head);
    }
  }
}
async function renderToAsyncIterable(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response)
    return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  let error3 = null;
  let next = null;
  const buffer = [];
  let renderingComplete = false;
  const iterator = {
    async next() {
      if (result.cancelled)
        return { done: true, value: void 0 };
      if (next !== null) {
        await next.promise;
      } else if (!renderingComplete && !buffer.length) {
        next = promiseWithResolvers();
        await next.promise;
      }
      if (!renderingComplete) {
        next = promiseWithResolvers();
      }
      if (error3) {
        throw error3;
      }
      let length = 0;
      for (let i3 = 0, len = buffer.length; i3 < len; i3++) {
        length += buffer[i3].length;
      }
      let mergedArray = new Uint8Array(length);
      let offset = 0;
      for (let i3 = 0, len = buffer.length; i3 < len; i3++) {
        const item = buffer[i3];
        mergedArray.set(item, offset);
        offset += item.length;
      }
      buffer.length = 0;
      const returnValue = {
        // The iterator is done when rendering has finished
        // and there are no more chunks to return.
        done: length === 0 && renderingComplete,
        value: mergedArray
      };
      return returnValue;
    },
    async return() {
      result.cancelled = true;
      return { done: true, value: void 0 };
    }
  };
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          buffer.push(encoder.encode(doctype));
        }
      }
      if (chunk instanceof Response) {
        throw new AstroError(ResponseSentError);
      }
      const bytes = chunkToByteArray(result, chunk);
      if (bytes.length > 0) {
        buffer.push(bytes);
        next?.resolve();
      } else if (buffer.length > 0) {
        next?.resolve();
      }
    }
  };
  const renderPromise = templateResult.render(destination);
  renderPromise.then(() => {
    renderingComplete = true;
    next?.resolve();
  }).catch((err) => {
    error3 = err;
    renderingComplete = true;
    next?.resolve();
  });
  return {
    [Symbol.asyncIterator]() {
      return iterator;
    }
  };
}
function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlotToString(result, slots?.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}
function guessRenderers(componentUrl) {
  const extname = componentUrl?.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte",
        "@astrojs/lit"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment2;
}
function isHTMLComponent(Component) {
  return Component && Component["astro:html"] === true;
}
function removeStaticAstroSlot(html, supportsAstroStaticSlot = true) {
  const exp = supportsAstroStaticSlot ? ASTRO_STATIC_SLOT_EXP : ASTRO_SLOT_EXP;
  return html.replace(exp, "");
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  if (!Component && "client:only" in _props === false) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers: renderers2, clientDirectives } = result;
  const metadata = {
    astroStaticSlot: true,
    displayName
  };
  const { hydration, isPage, props, propsWithoutTransitionAttributes } = extractDirectives(
    _props,
    clientDirectives
  );
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers2.filter((r4) => r4.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer2;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer2 = renderers2.find(({ name }) => name === rendererName);
    }
    if (!renderer2) {
      let error3;
      for (const r4 of renderers2) {
        try {
          if (await r4.ssr.check.call({ result }, Component, props, children)) {
            renderer2 = r4;
            break;
          }
        } catch (e3) {
          error3 ??= e3;
        }
      }
      if (!renderer2 && error3) {
        throw error3;
      }
    }
    if (!renderer2 && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = await renderHTMLElement(
        result,
        Component,
        _props,
        slots
      );
      return {
        render(destination) {
          destination.write(output);
        }
      };
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        renderer2 = renderers2.find(
          ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
        );
      }
    }
    if (!renderer2 && validRenderers.length === 1) {
      renderer2 = validRenderers[0];
    }
    if (!renderer2) {
      const extname = metadata.componentUrl?.split(".").pop();
      renderer2 = renderers2.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer2) {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        const plural = validRenderers.length > 1;
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r4) => "`" + r4 + "`"))
          )
        });
      } else {
        throw new AstroError({
          ...NoClientOnlyHint,
          message: NoClientOnlyHint.message(metadata.displayName),
          hint: NoClientOnlyHint.hint(
            probableRendererNames.map((r4) => r4.replace("@astrojs/", "")).join("|")
          )
        });
      }
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r4) => probableRendererNames.includes(r4.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r4) => "`" + r4 + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer2 = matchingRenderers[0];
        ({ html, attrs } = await renderer2.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          propsWithoutTransitionAttributes,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (!clientOnlyValues.has(rendererName)) {
        console.warn(
          `The client:only directive for ${metadata.displayName} is not recognized. The renderer ${renderer2.name} will be used. If you intended to use a different renderer, please provide a valid client:only directive.`
        );
      }
      html = await renderSlotToString(result, slots?.fallback);
    } else {
      performance.now();
      ({ html, attrs } = await renderer2.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        propsWithoutTransitionAttributes,
        children,
        metadata
      ));
    }
  }
  if (renderer2 && !renderer2.clientEntrypoint && renderer2.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...NoClientEntrypoint,
      message: NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer2.name
      )
    });
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const renderTemplateResult = renderTemplate`<${Tag}${internalSpreadAttributes(
      props
    )}${markHTMLString(
      childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
    )}`;
    html = "";
    const destination = {
      write(chunk) {
        if (chunk instanceof Response)
          return;
        html += chunkToString(result, chunk);
      }
    };
    await renderTemplateResult.render(destination);
  }
  if (!hydration) {
    return {
      render(destination) {
        if (slotInstructions) {
          for (const instruction of slotInstructions) {
            destination.write(instruction);
          }
        }
        if (isPage || renderer2?.name === "astro:jsx") {
          destination.write(html);
        } else if (html && html.length > 0) {
          destination.write(
            markHTMLString(removeStaticAstroSlot(html, renderer2?.ssr?.supportsAstroStaticSlot))
          );
        }
      }
    };
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer: renderer2, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        let tagName = renderer2?.ssr?.supportsAstroStaticSlot ? !!metadata.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot";
        let expectedHTML = key === "default" ? `<${tagName}>` : `<${tagName} name="${key}">`;
        if (!html.includes(expectedHTML)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
    island.children += `<!--astro:end-->`;
  }
  return {
    render(destination) {
      if (slotInstructions) {
        for (const instruction of slotInstructions) {
          destination.write(instruction);
        }
      }
      destination.write(createRenderInstruction({ type: "directive", hydration }));
      if (hydration.directive !== "only" && renderer2?.ssr.renderHydrationScript) {
        destination.write(
          createRenderInstruction({
            type: "renderer-hydration-script",
            rendererName: renderer2.name,
            render: renderer2.ssr.renderHydrationScript
          })
        );
      }
      const renderedElement = renderElement$1("astro-island", island, false);
      destination.write(markHTMLString(renderedElement));
    }
  };
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlotToString(result, slots?.default);
  return {
    render(destination) {
      if (children == null)
        return;
      destination.write(children);
    }
  };
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => chunkToString(result, instr)).join("") : "";
  return {
    render(destination) {
      destination.write(markHTMLString(hydrationHtml + html));
    }
  };
}
function renderAstroComponent(result, displayName, Component, props, slots = {}) {
  const instance = createAstroComponentInstance(result, displayName, Component, props, slots);
  return {
    async render(destination) {
      await instance.render(destination);
    }
  };
}
async function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise2(Component)) {
    Component = await Component.catch(handleCancellation);
  }
  if (isFragmentComponent(Component)) {
    return await renderFragmentComponent(result, slots).catch(handleCancellation);
  }
  props = normalizeProps(props);
  if (isHTMLComponent(Component)) {
    return await renderHTMLComponent(result, Component, props, slots).catch(handleCancellation);
  }
  if (isAstroComponentFactory(Component)) {
    return renderAstroComponent(result, displayName, Component, props, slots);
  }
  return await renderFrameworkComponent(result, displayName, Component, props, slots).catch(
    handleCancellation
  );
  function handleCancellation(e3) {
    if (result.cancelled)
      return { render() {
      } };
    throw e3;
  }
}
function normalizeProps(props) {
  if (props["class:list"] !== void 0) {
    const value2 = props["class:list"];
    delete props["class:list"];
    props["class"] = clsx(props["class"], value2);
    if (props["class"] === "") {
      delete props["class"];
    }
  }
  return props;
}
async function renderComponentToString(result, displayName, Component, props, slots = {}, isPage = false, route) {
  let str = "";
  let renderedFirstPageChunk = false;
  let head = "";
  if (isPage && !result.partial && nonAstroPageNeedsHeadInjection(Component)) {
    head += chunkToString(result, maybeRenderHead());
  }
  try {
    const destination = {
      write(chunk) {
        if (isPage && !result.partial && !renderedFirstPageChunk) {
          renderedFirstPageChunk = true;
          if (!/<!doctype html/i.test(String(chunk))) {
            const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
            str += doctype + head;
          }
        }
        if (chunk instanceof Response)
          return;
        str += chunkToString(result, chunk);
      }
    };
    const renderInstance = await renderComponent(result, displayName, Component, props, slots);
    await renderInstance.render(destination);
  } catch (e3) {
    if (AstroError.is(e3) && !e3.loc) {
      e3.setLocation({
        file: route?.component
      });
    }
    throw e3;
  }
  return str;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return !!pageComponent?.[needsHeadRenderingSymbol];
}
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v3) => renderJSX(result, v3)))).join("")
      );
  }
  return renderJSXVNode(result, vnode);
}
async function renderJSXVNode(result, vnode) {
  if (isVNode2(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value2] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value2 && typeof value2 === "object" && value2["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value2);
          } else {
            props[key] = value2;
          }
        }
        const str = await renderToString2(result, vnode.type, props, slots);
        if (str instanceof Response) {
          throw str;
        }
        const html = markHTMLString(str);
        return html;
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c2) => extractSlots2(c2));
        }
        if (!isVNode2(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (vnode.props[hasTriedRenderComponentSymbol]) {
          delete vnode.props[hasTriedRenderComponentSymbol];
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2?.[AstroJSX] || !output2) {
            return await renderJSXVNode(result, output2);
          } else {
            return;
          }
        } else {
          vnode.props[hasTriedRenderComponentSymbol] = true;
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value2] of Object.entries(props)) {
        if (value2?.["$$slot"]) {
          _slots[key] = value2;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value2] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value2).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToString(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToString(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      return markHTMLString(output);
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, prerenderElementChildren(tag, children))}</${tag}>`
    )}`
  );
}
function prerenderElementChildren(tag, children) {
  if (typeof children === "string" && (tag === "style" || tag === "script")) {
    return markHTMLString(children);
  } else {
    return children;
  }
}
async function renderPage(result, componentFactory, props, children, streaming, route) {
  if (!isAstroComponentFactory(componentFactory)) {
    result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
    const pageProps = { ...props ?? {}, "server:root": true };
    const str = await renderComponentToString(
      result,
      componentFactory.name,
      componentFactory,
      pageProps,
      {},
      true,
      route
    );
    const bytes = encoder.encode(str);
    return new Response(bytes, {
      headers: new Headers([
        ["Content-Type", "text/html; charset=utf-8"],
        ["Content-Length", bytes.byteLength.toString()]
      ])
    });
  }
  result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
  let body;
  if (streaming) {
    if (isNode && !isDeno) {
      const nodeBody = await renderToAsyncIterable(
        result,
        componentFactory,
        props,
        children,
        true,
        route
      );
      body = nodeBody;
    } else {
      body = await renderToReadableStream(result, componentFactory, props, children, true, route);
    }
  } else {
    body = await renderToString2(result, componentFactory, props, children, true, route);
  }
  if (body instanceof Response)
    return body;
  const init2 = result.response;
  const headers = new Headers(init2.headers);
  if (!streaming && typeof body === "string") {
    body = encoder.encode(body);
    headers.set("Content-Length", body.byteLength.toString());
  }
  if (route?.component.endsWith(".md")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  const response = new Response(body, { ...init2, headers });
  return response;
}
function spreadAttributes(values = {}, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value2] of Object.entries(values)) {
    output += addAttribute(value2, key, true);
  }
  return markHTMLString(output);
}
async function callMiddleware(onRequest2, apiContext, responseFunction, enableRerouting, logger) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async (payload) => {
    nextCalled = true;
    if (!enableRerouting && payload) {
      logger.warn(
        "router",
        "The rewrite API is experimental. To use this feature, add the `rewriting` flag to the `experimental` object in your Astro config."
      );
    }
    if (enableRerouting) {
      responseFunctionPromise = responseFunction(apiContext, payload);
    } else {
      responseFunctionPromise = responseFunction(apiContext);
    }
    return responseFunctionPromise;
  };
  let middlewarePromise = onRequest2(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value2) => {
    if (nextCalled) {
      if (typeof value2 !== "undefined") {
        if (value2 instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return value2;
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value2 === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value2 instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return value2;
    }
  });
}
async function renderRedirect(renderContext) {
  const {
    request: { method },
    routeData
  } = renderContext;
  const { redirect, redirectRoute } = routeData;
  const status = redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
  const headers = { location: encodeURI(redirectRouteGenerate(renderContext)) };
  return new Response(null, { status, headers });
}
function redirectRouteGenerate(renderContext) {
  const {
    params,
    routeData: { redirect, redirectRoute }
  } = renderContext;
  if (typeof redirectRoute !== "undefined") {
    return redirectRoute?.generate(params) || redirectRoute?.pathname || "/";
  } else if (typeof redirect === "string") {
    let target = redirect;
    for (const param of Object.keys(params)) {
      const paramValue = params[param];
      target = target.replace(`[${param}]`, paramValue);
      target = target.replace(`[...${param}]`, paramValue);
    }
    return target;
  } else if (typeof redirect === "undefined") {
    return "/";
  }
  return redirect.destination;
}
function setGetEnv(fn) {
}
function validateGetStaticPathsParameter([key, value2], route) {
  if (!VALID_PARAM_TYPES.includes(typeof value2)) {
    throw new AstroError({
      ...GetStaticPathsInvalidRouteParam,
      message: GetStaticPathsInvalidRouteParam.message(key, value2, typeof value2),
      location: {
        file: route
      }
    });
  }
}
function validateDynamicRouteModule(mod, {
  ssr,
  route
}) {
  if ((!ssr || route.prerender) && !mod.getStaticPaths) {
    throw new AstroError({
      ...GetStaticPathsRequired,
      location: { file: route.component }
    });
  }
}
function validateGetStaticPathsResult(result, logger, route) {
  if (!Array.isArray(result)) {
    throw new AstroError({
      ...InvalidGetStaticPathsReturn,
      message: InvalidGetStaticPathsReturn.message(typeof result),
      location: {
        file: route.component
      }
    });
  }
  result.forEach((pathObject) => {
    if (typeof pathObject === "object" && Array.isArray(pathObject) || pathObject === null) {
      throw new AstroError({
        ...InvalidGetStaticPathsEntry,
        message: InvalidGetStaticPathsEntry.message(
          Array.isArray(pathObject) ? "array" : typeof pathObject
        )
      });
    }
    if (pathObject.params === void 0 || pathObject.params === null || pathObject.params && Object.keys(pathObject.params).length === 0) {
      throw new AstroError({
        ...GetStaticPathsExpectedParams,
        location: {
          file: route.component
        }
      });
    }
    for (const [key, val] of Object.entries(pathObject.params)) {
      if (!(typeof val === "undefined" || typeof val === "string" || typeof val === "number")) {
        logger.warn(
          "router",
          `getStaticPaths() returned an invalid path param: "${key}". A string, number or undefined value was expected, but got \`${JSON.stringify(
            val
          )}\`.`
        );
      }
      if (typeof val === "string" && val === "") {
        logger.warn(
          "router",
          `getStaticPaths() returned an invalid path param: "${key}". \`undefined\` expected for an optional param, but got empty string.`
        );
      }
    }
  });
}
function stringifyParams(params, route) {
  const validatedParams = Object.entries(params).reduce((acc, next) => {
    validateGetStaticPathsParameter(next, route.component);
    const [key, value2] = next;
    if (value2 !== void 0) {
      acc[key] = typeof value2 === "string" ? trimSlashes(value2) : value2.toString();
    }
    return acc;
  }, {});
  return route.generate(validatedParams);
}
function generatePaginateFunction(routeMatch) {
  return function paginateUtility(data, args = {}) {
    let { pageSize: _pageSize, params: _params, props: _props } = args;
    const pageSize = _pageSize || 10;
    const paramName = "page";
    const additionalParams = _params || {};
    const additionalProps = _props || {};
    let includesFirstPageNumber;
    if (routeMatch.params.includes(`...${paramName}`)) {
      includesFirstPageNumber = false;
    } else if (routeMatch.params.includes(`${paramName}`)) {
      includesFirstPageNumber = true;
    } else {
      throw new AstroError({
        ...PageNumberParamNotFound,
        message: PageNumberParamNotFound.message(paramName)
      });
    }
    const lastPage = Math.max(1, Math.ceil(data.length / pageSize));
    const result = [...Array(lastPage).keys()].map((num) => {
      const pageNum = num + 1;
      const start2 = pageSize === Infinity ? 0 : (pageNum - 1) * pageSize;
      const end = Math.min(start2 + pageSize, data.length);
      const params = {
        ...additionalParams,
        [paramName]: includesFirstPageNumber || pageNum > 1 ? String(pageNum) : void 0
      };
      const current = correctIndexRoute(routeMatch.generate({ ...params }));
      const next = pageNum === lastPage ? void 0 : correctIndexRoute(routeMatch.generate({ ...params, page: String(pageNum + 1) }));
      const prev = pageNum === 1 ? void 0 : correctIndexRoute(
        routeMatch.generate({
          ...params,
          page: !includesFirstPageNumber && pageNum - 1 === 1 ? void 0 : String(pageNum - 1)
        })
      );
      return {
        params,
        props: {
          ...additionalProps,
          page: {
            data: data.slice(start2, end),
            start: start2,
            end: end - 1,
            size: pageSize,
            total: data.length,
            currentPage: pageNum,
            lastPage,
            url: { current, next, prev }
          }
        }
      };
    });
    return result;
  };
}
function correctIndexRoute(route) {
  if (route === "") {
    return "/";
  }
  return route;
}
async function callGetStaticPaths({
  mod,
  route,
  routeCache,
  logger,
  ssr
}) {
  const cached = routeCache.get(route);
  if (!mod) {
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  }
  if (cached?.staticPaths) {
    return cached.staticPaths;
  }
  validateDynamicRouteModule(mod, { ssr, route });
  if (ssr && !route.prerender) {
    const entry = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    routeCache.set(route, { ...cached, staticPaths: entry });
    return entry;
  }
  let staticPaths = [];
  if (!mod.getStaticPaths) {
    throw new Error("Unexpected Error.");
  }
  staticPaths = await mod.getStaticPaths({
    // Q: Why the cast?
    // A: So users downstream can have nicer typings, we have to make some sacrifice in our internal typings, which necessitate a cast here
    paginate: generatePaginateFunction(route)
  });
  validateGetStaticPathsResult(staticPaths, logger, route);
  const keyedStaticPaths = staticPaths;
  keyedStaticPaths.keyed = /* @__PURE__ */ new Map();
  for (const sp of keyedStaticPaths) {
    const paramsKey = stringifyParams(sp.params, route);
    keyedStaticPaths.keyed.set(paramsKey, sp);
  }
  routeCache.set(route, { ...cached, staticPaths: keyedStaticPaths });
  return keyedStaticPaths;
}
function findPathItemByKey(staticPaths, params, route, logger) {
  const paramsKey = stringifyParams(params, route);
  const matchedStaticPath = staticPaths.keyed.get(paramsKey);
  if (matchedStaticPath) {
    return matchedStaticPath;
  }
  logger.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${paramsKey}`);
}
function routeIsRedirect(route) {
  return route?.type === "redirect";
}
function routeIsFallback(route) {
  return route?.type === "fallback";
}
async function getProps(opts) {
  const { logger, mod, routeData: route, routeCache, pathname, serverLike } = opts;
  if (!route || route.pathname) {
    return {};
  }
  if (routeIsRedirect(route) || routeIsFallback(route) || route.component === DEFAULT_404_COMPONENT) {
    return {};
  }
  const params = getParams(route, pathname);
  if (mod) {
    validatePrerenderEndpointCollision(route, mod, params);
  }
  const staticPaths = await callGetStaticPaths({
    mod,
    route,
    routeCache,
    logger,
    ssr: serverLike
  });
  const matchedStaticPath = findPathItemByKey(staticPaths, params, route, logger);
  if (!matchedStaticPath && (serverLike ? route.prerender : true)) {
    throw new AstroError({
      ...NoMatchingStaticPathFound,
      message: NoMatchingStaticPathFound.message(pathname),
      hint: NoMatchingStaticPathFound.hint([route.component])
    });
  }
  const props = matchedStaticPath?.props ? { ...matchedStaticPath.props } : {};
  return props;
}
function getParams(route, pathname) {
  if (!route.params.length)
    return {};
  const paramsMatch = route.pattern.exec(decodeURIComponent(pathname));
  if (!paramsMatch)
    return {};
  const params = {};
  route.params.forEach((key, i3) => {
    if (key.startsWith("...")) {
      params[key.slice(3)] = paramsMatch[i3 + 1] ? paramsMatch[i3 + 1] : void 0;
    } else {
      params[key] = paramsMatch[i3 + 1];
    }
  });
  return params;
}
function validatePrerenderEndpointCollision(route, mod, params) {
  if (route.type === "endpoint" && mod.getStaticPaths) {
    const lastSegment = route.segments[route.segments.length - 1];
    const paramValues = Object.values(params);
    const lastParam = paramValues[paramValues.length - 1];
    if (lastSegment.length === 1 && lastSegment[0].dynamic && lastParam === void 0) {
      throw new AstroError({
        ...PrerenderDynamicEndpointPathCollide,
        message: PrerenderDynamicEndpointPathCollide.message(route.route),
        hint: PrerenderDynamicEndpointPathCollide.hint(route.component),
        location: {
          file: route.component
        }
      });
    }
  }
}
function getFunctionExpression(slot) {
  if (!slot)
    return;
  const expressions = slot?.expressions?.filter((e3) => isRenderInstruction(e3) === false);
  if (expressions?.length !== 1)
    return;
  return expressions[0];
}
function getAssetsPrefix(fileExtension2, assetsPrefix) {
  if (!assetsPrefix)
    return "";
  if (typeof assetsPrefix === "string")
    return assetsPrefix;
  const dotLessFileExtension = fileExtension2.slice(1);
  if (assetsPrefix[dotLessFileExtension]) {
    return assetsPrefix[dotLessFileExtension];
  }
  return assetsPrefix.fallback;
}
function createAssetLink(href, base, assetsPrefix) {
  if (assetsPrefix) {
    const pf = getAssetsPrefix(fileExtension(href), assetsPrefix);
    return joinPaths(pf, slash(href));
  } else if (base) {
    return prependForwardSlash(joinPaths(base, slash(href)));
  } else {
    return href;
  }
}
function createStylesheetElement(stylesheet, base, assetsPrefix) {
  if (stylesheet.type === "inline") {
    return {
      props: {},
      children: stylesheet.content
    };
  } else {
    return {
      props: {
        rel: "stylesheet",
        href: createAssetLink(stylesheet.src, base, assetsPrefix)
      },
      children: ""
    };
  }
}
function createStylesheetElementSet(stylesheets, base, assetsPrefix) {
  return new Set(stylesheets.map((s2) => createStylesheetElement(s2, base, assetsPrefix)));
}
function createModuleScriptElement(script, base, assetsPrefix) {
  if (script.type === "external") {
    return createModuleScriptElementWithSrc(script.value, base, assetsPrefix);
  } else {
    return {
      props: {
        type: "module"
      },
      children: script.value
    };
  }
}
function createModuleScriptElementWithSrc(src, base, assetsPrefix) {
  return {
    props: {
      type: "module",
      src: createAssetLink(src, base, assetsPrefix)
    },
    children: ""
  };
}
function ensure404Route(manifest2) {
  if (!manifest2.routes.some((route) => route.route === "/404")) {
    manifest2.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest2;
}
function matchRoute(pathname, manifest2) {
  const decodedPathname = decodeURI(pathname);
  return manifest2.routes.find((route) => {
    return route.pattern.test(decodedPathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(decodedPathname));
  });
}
function createOriginCheckMiddleware() {
  return defineMiddleware((context, next) => {
    const { request, url } = context;
    const contentType = request.headers.get("content-type");
    if (contentType) {
      if (FORM_CONTENT_TYPES.includes(contentType.toLowerCase())) {
        const forbidden = (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
        if (forbidden) {
          return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
            status: 403
          });
        }
      }
    }
    return next();
  });
}
function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value2]) => {
      if (typeof value2 === "string") {
        return [key, value2.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value2];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}
function deserializeManifest(serializedManifest) {
  const routes2 = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes2.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes: routes2
  };
}
function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  return typeof src === "object" && "then" in src ? (await src).default ?? await src : src;
}
function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function getTargetDimensions(options) {
  let targetWidth = options.width;
  let targetHeight = options.height;
  if (isESMImportedImage(options.src)) {
    const aspectRatio = options.src.width / options.src.height;
    if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (!targetWidth && !targetHeight) {
      targetWidth = options.src.width;
      targetHeight = options.src.height;
    }
  }
  return {
    targetWidth,
    targetHeight
  };
}
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4)
    return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize)
    return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box)
      break;
    if (box.name === boxName)
      return box;
    offset += box.size;
  }
}
function getSizeFromOffset(input, offset) {
  const value2 = input[offset];
  return value2 === 0 ? 256 : value2;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
function detectBrands(buffer, start2, end) {
  let brandsDetected = {};
  for (let i3 = start2; i3 <= end; i3 += 4) {
    const brand = toUTF8String(buffer, i3, i3 + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type2) {
  const size2 = ICON_TYPE_SIZE[type2];
  return { width: size2, height: size2, type: type2 };
}
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start2 = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start2 + IDF_ENTRY_BYTES;
    if (start2 > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start2, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
function parseLength(len) {
  const m3 = unitsReg.exec(len);
  if (!m3) {
    return void 0;
  }
  return Math.round(Number(m3[1]) * (units[m3[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type2 = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type2 === 3 || type2 === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
function detector(input) {
  const byte = input[0];
  const type2 = firstBytes.get(byte);
  if (type2 && typeHandlers.get(type2).validate(input)) {
    return type2;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}
function lookup2(input) {
  const type2 = detector(input);
  if (typeof type2 !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type2) > -1) {
      throw new TypeError("disabled file type: " + type2);
    }
    const size2 = typeHandlers.get(type2).calculate(input);
    if (size2 !== void 0) {
      size2.type = size2.type ?? type2;
      return size2;
    }
  }
  throw new TypeError("unsupported file type: " + type2);
}
async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value2;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value2 = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value2.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value2, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup2(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error3) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await Promise.resolve().then(() => noop).catch((e3) => {
      const error3 = new AstroError(InvalidImageService);
      error3.cause = e3;
      throw error3;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig2) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig2) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig2) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig2);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig2),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig2) : {}
  };
}
async function loadRemoteImage(src, headers) {
  try {
    const res = await fetch(src, {
      // Forward all headers from the original request
      headers
    });
    if (!res.ok) {
      return void 0;
    }
    return await res.arrayBuffer();
  } catch (err) {
    return void 0;
  }
}
var renderers, AstroError, ASTRO_VERSION, REROUTE_DIRECTIVE_HEADER, ROUTE_TYPE_HEADER, DEFAULT_404_COMPONENT, REROUTABLE_STATUS_CODES, clientAddressSymbol, clientLocalsSymbol, responseSentSymbol$1, ClientAddressNotAvailable, PrerenderClientAddressNotAvailable, StaticClientAddressNotAvailable, NoMatchingStaticPathFound, OnlyResponseCanBeReturned, MissingMediaQueryDirective, NoMatchingRenderer, NoClientEntrypoint, NoClientOnlyHint, InvalidGetStaticPathsEntry, InvalidGetStaticPathsReturn, GetStaticPathsExpectedParams, GetStaticPathsInvalidRouteParam, GetStaticPathsRequired, ReservedSlotName, NoMatchingImport, InvalidComponentArgs, PageNumberParamNotFound, ImageMissingAlt, InvalidImageService, MissingImageDimension, FailedToFetchRemoteImageDimensions, UnsupportedImageFormat, UnsupportedImageConversion, PrerenderDynamicEndpointPathCollide, ExpectedImage, ExpectedImageOptions, IncompatibleDescriptorOptions, ResponseSentError, MiddlewareNoDataOrNextCalled, MiddlewareNotAResponse, EndpointDidNotReturnAResponse, LocalsNotAnObject, AstroResponseHeadersReassigned, LocalImageUsedWrongly, AstroGlobUsedOutside, AstroGlobNoMatch, RewriteEncounteredAnError, i18nNoLocaleFoundInPath, DELETED_EXPIRATION, DELETED_VALUE, responseSentSymbol, AstroCookie, AstroCookies, astroCookiesSymbol, dateTimeFormat, levels, Logger, AstroIntegrationLogger, consoleLogDestination, escapeHTML, HTMLString, markHTMLString, AstroJSX, RenderInstructionSymbol, PROP_TYPE, transitionDirectivesToCopyOnIsland, dictionary, binary, headAndContentSym, astro_island_prebuilt_default, ISLAND_STYLES, voidElementNames, htmlBooleanAttributes, htmlEnumAttributes, svgEnumAttributes, AMPERSAND_REGEX, DOUBLE_QUOTE_REGEX, STATIC_DIRECTIVES, toIdent, toAttributeString, kebab, toStyleString, noop$1, BufferedRenderer, isNode, isDeno, VALID_PROTOCOLS, uniqueElements, slotString, SlotString, Fragment2, Renderer, encoder, decoder$1, astroComponentInstanceSym, AstroComponentInstance, renderTemplateResultSym, RenderTemplateResult, DOCTYPE_EXP, needsHeadRenderingSymbol, rendererAliases, clientOnlyValues, ASTRO_SLOT_EXP, ASTRO_STATIC_SLOT_EXP, ClientOnlyPlaceholder, hasTriedRenderComponentSymbol, VALID_PARAM_TYPES, RouteCache, Pipeline, RedirectComponentInstance, RedirectSinglePageBuiltModule, Slots, RenderContext, DEFAULT_404_ROUTE, FORM_CONTENT_TYPES, AppPipeline, _manifest, _manifestData, _logger, _baseWithoutTrailingSlash, _pipeline, _adapterLogger, _renderOptionsDeprecationWarningShown, _createPipeline, createPipeline_fn, _getPathnameFromRequest, getPathnameFromRequest_fn, _computePathnameFromDomain, computePathnameFromDomain_fn, _logRenderOptionsDeprecationWarning, logRenderOptionsDeprecationWarning_fn, _renderError, renderError_fn, _mergeResponses, mergeResponses_fn, _getDefaultStatusCode, getDefaultStatusCode_fn, _App, App, setup2, page, generic___js, VALID_SUPPORTED_FORMATS, DEFAULT_OUTPUT_FORMAT, DEFAULT_HASH_PROPS, baseService, decoder, toUTF8String, toHexString, readInt16LE, readUInt16BE, readUInt16LE, readUInt24LE, readInt32LE, readUInt32BE, readUInt32LE, methods, BMP, TYPE_ICON, SIZE_HEADER$1, SIZE_IMAGE_ENTRY, ICO, TYPE_CURSOR, CUR, DDS, gifRegexp, GIF, brandMap, HEIF, SIZE_HEADER, FILE_LENGTH_OFFSET, ENTRY_LENGTH_OFFSET, ICON_TYPE_SIZE, ICNS, J2C, JP2, EXIF_MARKER, APP1_DATA_SIZE_BYTES, EXIF_HEADER_BYTES, TIFF_BYTE_ALIGN_BYTES, BIG_ENDIAN_BYTE_ALIGN, LITTLE_ENDIAN_BYTE_ALIGN, IDF_ENTRY_BYTES, NUM_DIRECTORY_ENTRIES_BYTES, JPG, KTX, pngSignature, pngImageHeaderChunkName, pngFriedChunkName, PNG, PNMTypes, handlers, PNM, PSD, svgReg, extractorRegExps, INCH_CM, units, unitsReg, SVG, TGA, signatures, TIFF, WEBP, typeHandlers, types, firstBytes, globalOptions, $$Astro$1, $$Image, $$Astro, $$Picture, imageConfig, getImage, fnv1a52, etag, GET, generic, noopService, noop_default, noop;
var init_renderers = __esm({
  ".wrangler/tmp/pages-Meh8ui/renderers.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_kleur_BcFxsYqz();
    init_path_to_regexp_Xgx1vbKb();
    init_astrojs_DCSmFjgQ();
    init_cookie_CrAhd5mk();
    init_clsx_CNI3IGC6();
    init_html_escaper_ClQ6UWd1();
    init_mrmime_DcLn5OCC();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    renderers = [Object.assign({ "name": "@astrojs/vue", "clientEntrypoint": "@astrojs/vue/client.js", "serverEntrypoint": "@astrojs/vue/server.js" }, { ssr: _renderer0 })];
    AstroError = class extends Error {
      loc;
      title;
      hint;
      frame;
      type = "AstroError";
      constructor(props, options) {
        const { name, title, message, stack, location, hint, frame } = props;
        super(message, options);
        this.title = title;
        this.name = name;
        if (message)
          this.message = message;
        this.stack = stack ? stack : this.stack;
        this.loc = location;
        this.hint = hint;
        this.frame = frame;
      }
      setLocation(location) {
        this.loc = location;
      }
      setName(name) {
        this.name = name;
      }
      setMessage(message) {
        this.message = message;
      }
      setHint(hint) {
        this.hint = hint;
      }
      setFrame(source, location) {
        this.frame = codeFrame(source, location);
      }
      static is(err) {
        return err.type === "AstroError";
      }
    };
    ASTRO_VERSION = "4.10.2";
    REROUTE_DIRECTIVE_HEADER = "X-Astro-Reroute";
    ROUTE_TYPE_HEADER = "X-Astro-Route-Type";
    DEFAULT_404_COMPONENT = "astro-default-404.astro";
    REROUTABLE_STATUS_CODES = [404, 500];
    clientAddressSymbol = Symbol.for("astro.clientAddress");
    clientLocalsSymbol = Symbol.for("astro.locals");
    responseSentSymbol$1 = Symbol.for("astro.responseSent");
    ClientAddressNotAvailable = {
      name: "ClientAddressNotAvailable",
      title: "`Astro.clientAddress` is not available in current adapter.",
      message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
    };
    PrerenderClientAddressNotAvailable = {
      name: "PrerenderClientAddressNotAvailable",
      title: "`Astro.clientAddress` cannot be used inside prerendered routes.",
      message: `\`Astro.clientAddress\` cannot be used inside prerendered routes`
    };
    StaticClientAddressNotAvailable = {
      name: "StaticClientAddressNotAvailable",
      title: "`Astro.clientAddress` is not available in static mode.",
      message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
      hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR."
    };
    NoMatchingStaticPathFound = {
      name: "NoMatchingStaticPathFound",
      title: "No static path found for requested path.",
      message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
      hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
    };
    OnlyResponseCanBeReturned = {
      name: "OnlyResponseCanBeReturned",
      title: "Invalid type returned by Astro page.",
      message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
      hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
    };
    MissingMediaQueryDirective = {
      name: "MissingMediaQueryDirective",
      title: "Missing value for `client:media` directive.",
      message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
    };
    NoMatchingRenderer = {
      name: "NoMatchingRenderer",
      title: "No matching renderer found.",
      message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are" : "is"} ${validRenderersCount} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
      hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/guides/framework-components/ for more information on how to install and configure integrations.`
    };
    NoClientEntrypoint = {
      name: "NoClientEntrypoint",
      title: "No client entrypoint specified in renderer.",
      message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
      hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
    };
    NoClientOnlyHint = {
      name: "NoClientOnlyHint",
      title: "Missing hint on client:only directive.",
      message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
      hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
    };
    InvalidGetStaticPathsEntry = {
      name: "InvalidGetStaticPathsEntry",
      title: "Invalid entry inside getStaticPath's return value",
      message: (entryType) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${entryType}\``,
      hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    InvalidGetStaticPathsReturn = {
      name: "InvalidGetStaticPathsReturn",
      title: "Invalid value returned by getStaticPaths.",
      message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
      hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    GetStaticPathsExpectedParams = {
      name: "GetStaticPathsExpectedParams",
      title: "Missing params property on `getStaticPaths` route.",
      message: "Missing or empty required `params` property on `getStaticPaths` route.",
      hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    GetStaticPathsInvalidRouteParam = {
      name: "GetStaticPathsInvalidRouteParam",
      title: "Invalid value for `getStaticPaths` route parameter.",
      message: (key, value2, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value2}\`)`,
      hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
    };
    GetStaticPathsRequired = {
      name: "GetStaticPathsRequired",
      title: "`getStaticPaths()` function required for dynamic routes.",
      message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
      hint: `See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` or \`output: "hybrid"\` in your Astro config file to switch to a non-static server build. This error can also occur if using \`export const prerender = true;\`.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
    };
    ReservedSlotName = {
      name: "ReservedSlotName",
      title: "Invalid slot name.",
      message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
    };
    NoMatchingImport = {
      name: "NoMatchingImport",
      title: "No import found for component.",
      message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
      hint: "Please make sure the component is properly imported."
    };
    InvalidComponentArgs = {
      name: "InvalidComponentArgs",
      title: "Invalid component arguments.",
      message: (name) => `Invalid arguments passed to${name ? ` <${name}>` : ""} component.`,
      hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."
    };
    PageNumberParamNotFound = {
      name: "PageNumberParamNotFound",
      title: "Page number param not found.",
      message: (paramName) => `[paginate()] page number param \`${paramName}\` not found in your filepath.`,
      hint: "Rename your file to `[page].astro` or `[...page].astro`."
    };
    ImageMissingAlt = {
      name: "ImageMissingAlt",
      title: 'Image missing required "alt" property.',
      message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.',
      hint: 'Use an empty string ("") for decorative images.'
    };
    InvalidImageService = {
      name: "InvalidImageService",
      title: "Error while loading image service.",
      message: "There was an error loading the configured image service. Please see the stack trace for more information."
    };
    MissingImageDimension = {
      name: "MissingImageDimension",
      title: "Missing image dimensions",
      message: (missingDimension, imageURL) => `Missing ${missingDimension === "both" ? "width and height attributes" : `${missingDimension} attribute`} for ${imageURL}. When using remote images, both dimensions are required unless in order to avoid CLS.`,
      hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets). You can also use `inferSize={true}` for remote images to get the original dimensions."
    };
    FailedToFetchRemoteImageDimensions = {
      name: "FailedToFetchRemoteImageDimensions",
      title: "Failed to retrieve remote image dimensions",
      message: (imageURL) => `Failed to get the dimensions for ${imageURL}.`,
      hint: "Verify your remote image URL is accurate, and that you are not using `inferSize` with a file located in your `public/` folder."
    };
    UnsupportedImageFormat = {
      name: "UnsupportedImageFormat",
      title: "Unsupported image format",
      message: (format, imagePath, supportedFormats) => `Received unsupported format \`${format}\` from \`${imagePath}\`. Currently only ${supportedFormats.join(
        ", "
      )} are supported by our image services.`,
      hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for."
    };
    UnsupportedImageConversion = {
      name: "UnsupportedImageConversion",
      title: "Unsupported image conversion",
      message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported."
    };
    PrerenderDynamicEndpointPathCollide = {
      name: "PrerenderDynamicEndpointPathCollide",
      title: "Prerendered dynamic endpoint has path collision.",
      message: (pathname) => `Could not render \`${pathname}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,
      hint: (filename) => `Rename \`${filename}\` to \`${filename.replace(/\.(?:js|ts)/, (m3) => `.json` + m3)}\``
    };
    ExpectedImage = {
      name: "ExpectedImage",
      title: "Expected src to be an image.",
      message: (src, typeofOptions, fullOptions) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${src}\` (type: \`${typeofOptions}\`).

Full serialized options received: \`${fullOptions}\`.`,
      hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it."
    };
    ExpectedImageOptions = {
      name: "ExpectedImageOptions",
      title: "Expected image options.",
      message: (options) => `Expected getImage() parameter to be an object. Received \`${options}\`.`
    };
    IncompatibleDescriptorOptions = {
      name: "IncompatibleDescriptorOptions",
      title: "Cannot set both `densities` and `widths`",
      message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.",
      hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors."
    };
    ResponseSentError = {
      name: "ResponseSentError",
      title: "Unable to set response.",
      message: "The response has already been sent to the browser and cannot be altered."
    };
    MiddlewareNoDataOrNextCalled = {
      name: "MiddlewareNoDataOrNextCalled",
      title: "The middleware didn't return a `Response`.",
      message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function."
    };
    MiddlewareNotAResponse = {
      name: "MiddlewareNotAResponse",
      title: "The middleware returned something that is not a `Response` object.",
      message: "Any data returned from middleware must be a valid `Response` object."
    };
    EndpointDidNotReturnAResponse = {
      name: "EndpointDidNotReturnAResponse",
      title: "The endpoint did not return a `Response`.",
      message: "An endpoint must return either a `Response`, or a `Promise` that resolves with a `Response`."
    };
    LocalsNotAnObject = {
      name: "LocalsNotAnObject",
      title: "Value assigned to `locals` is not accepted.",
      message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",
      hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`."
    };
    AstroResponseHeadersReassigned = {
      name: "AstroResponseHeadersReassigned",
      title: "`Astro.response.headers` must not be reassigned.",
      message: "Individual headers can be added to and removed from `Astro.response.headers`, but it must not be replaced with another instance of `Headers` altogether.",
      hint: "Consider using `Astro.response.headers.add()`, and `Astro.response.headers.delete()`."
    };
    LocalImageUsedWrongly = {
      name: "LocalImageUsedWrongly",
      title: "Local images must be imported.",
      message: (imageFilePath) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${imageFilePath}\`.`,
      hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections). See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property."
    };
    AstroGlobUsedOutside = {
      name: "AstroGlobUsedOutside",
      title: "Astro.glob() used outside of an Astro file.",
      message: (globStr) => `\`Astro.glob(${globStr})\` can only be used in \`.astro\` files. \`import.meta.glob(${globStr})\` can be used instead to achieve a similar result.`,
      hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import"
    };
    AstroGlobNoMatch = {
      name: "AstroGlobNoMatch",
      title: "Astro.glob() did not match any files.",
      message: (globStr) => `\`Astro.glob(${globStr})\` did not return any matching files.`,
      hint: "Check the pattern for typos."
    };
    RewriteEncounteredAnError = {
      name: "RewriteEncounteredAnError",
      title: "Astro couldn't find the route to rewrite, or if was found but it emitted an error during the rendering phase.",
      message: (route, stack) => `The route ${route} that you tried to render doesn't exist, or it emitted an error during the rendering phase. ${stack ? stack : ""}.`
    };
    i18nNoLocaleFoundInPath = {
      name: "i18nNoLocaleFoundInPath",
      title: "The path doesn't contain any locale",
      message: "You tried to use an i18n utility on a path that doesn't contain any locale. You can use `pathHasLocale` first to determine if the path has a locale."
    };
    DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
    DELETED_VALUE = "deleted";
    responseSentSymbol = Symbol.for("astro.responseSent");
    AstroCookie = class {
      constructor(value2) {
        this.value = value2;
      }
      json() {
        if (this.value === void 0) {
          throw new Error(`Cannot convert undefined to an object.`);
        }
        return JSON.parse(this.value);
      }
      number() {
        return Number(this.value);
      }
      boolean() {
        if (this.value === "false")
          return false;
        if (this.value === "0")
          return false;
        return Boolean(this.value);
      }
    };
    AstroCookies = class {
      #request;
      #requestValues;
      #outgoing;
      #consumed;
      constructor(request) {
        this.#request = request;
        this.#requestValues = null;
        this.#outgoing = null;
        this.#consumed = false;
      }
      /**
       * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
       * in a Set-Cookie header added to the response.
       * @param key The cookie to delete
       * @param options Options related to this deletion, such as the path of the cookie.
       */
      delete(key, options) {
        const {
          // @ts-expect-error
          maxAge: _ignoredMaxAge,
          // @ts-expect-error
          expires: _ignoredExpires,
          ...sanitizedOptions
        } = options || {};
        const serializeOptions = {
          expires: DELETED_EXPIRATION,
          ...sanitizedOptions
        };
        this.#ensureOutgoingMap().set(key, [
          DELETED_VALUE,
          serialize_1(key, DELETED_VALUE, serializeOptions),
          false
        ]);
      }
      /**
       * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
       * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
       * from that set call, overriding any values already part of the request.
       * @param key The cookie to get.
       * @returns An object containing the cookie value as well as convenience methods for converting its value.
       */
      get(key, options = void 0) {
        if (this.#outgoing?.has(key)) {
          let [serializedValue, , isSetValue] = this.#outgoing.get(key);
          if (isSetValue) {
            return new AstroCookie(serializedValue);
          } else {
            return void 0;
          }
        }
        const values = this.#ensureParsed(options);
        if (key in values) {
          const value2 = values[key];
          return new AstroCookie(value2);
        }
      }
      /**
       * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
       * part of the initial request or set via Astro.cookies.set(key)
       * @param key The cookie to check for.
       * @returns
       */
      has(key, options = void 0) {
        if (this.#outgoing?.has(key)) {
          let [, , isSetValue] = this.#outgoing.get(key);
          return isSetValue;
        }
        const values = this.#ensureParsed(options);
        return !!values[key];
      }
      /**
       * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
       * an object it will be stringified via JSON.stringify(value). Additionally you
       * can provide options customizing how this cookie will be set, such as setting httpOnly
       * in order to prevent the cookie from being read in client-side JavaScript.
       * @param key The name of the cookie to set.
       * @param value A value, either a string or other primitive or an object.
       * @param options Options for the cookie, such as the path and security settings.
       */
      set(key, value2, options) {
        if (this.#consumed) {
          const warning = new Error(
            "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page."
          );
          warning.name = "Warning";
          console.warn(warning);
        }
        let serializedValue;
        if (typeof value2 === "string") {
          serializedValue = value2;
        } else {
          let toStringValue = value2.toString();
          if (toStringValue === Object.prototype.toString.call(value2)) {
            serializedValue = JSON.stringify(value2);
          } else {
            serializedValue = toStringValue;
          }
        }
        const serializeOptions = {};
        if (options) {
          Object.assign(serializeOptions, options);
        }
        this.#ensureOutgoingMap().set(key, [
          serializedValue,
          serialize_1(key, serializedValue, serializeOptions),
          true
        ]);
        if (this.#request[responseSentSymbol]) {
          throw new AstroError({
            ...ResponseSentError
          });
        }
      }
      /**
       * Astro.cookies.header() returns an iterator for the cookies that have previously
       * been set by either Astro.cookies.set() or Astro.cookies.delete().
       * This method is primarily used by adapters to set the header on outgoing responses.
       * @returns
       */
      *headers() {
        if (this.#outgoing == null)
          return;
        for (const [, value2] of this.#outgoing) {
          yield value2[1];
        }
      }
      /**
       * Behaves the same as AstroCookies.prototype.headers(),
       * but allows a warning when cookies are set after the instance is consumed.
       */
      static consume(cookies) {
        cookies.#consumed = true;
        return cookies.headers();
      }
      #ensureParsed(options = void 0) {
        if (!this.#requestValues) {
          this.#parse(options);
        }
        if (!this.#requestValues) {
          this.#requestValues = {};
        }
        return this.#requestValues;
      }
      #ensureOutgoingMap() {
        if (!this.#outgoing) {
          this.#outgoing = /* @__PURE__ */ new Map();
        }
        return this.#outgoing;
      }
      #parse(options = void 0) {
        const raw = this.#request.headers.get("cookie");
        if (!raw) {
          return;
        }
        this.#requestValues = parse_1(raw, options);
      }
    };
    astroCookiesSymbol = Symbol.for("astro.cookies");
    dateTimeFormat = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    levels = {
      debug: 20,
      info: 30,
      warn: 40,
      error: 50,
      silent: 90
    };
    if (typeof process !== "undefined") {
      let proc = process;
      if ("argv" in proc && Array.isArray(proc.argv)) {
        if (proc.argv.includes("--verbose"))
          ;
        else if (proc.argv.includes("--silent"))
          ;
        else
          ;
      }
    }
    Logger = class {
      options;
      constructor(options) {
        this.options = options;
      }
      info(label, message, newLine = true) {
        info(this.options, label, message, newLine);
      }
      warn(label, message, newLine = true) {
        warn(this.options, label, message, newLine);
      }
      error(label, message, newLine = true) {
        error(this.options, label, message, newLine);
      }
      debug(label, ...messages) {
        debug(label, ...messages);
      }
      level() {
        return this.options.level;
      }
      forkIntegrationLogger(label) {
        return new AstroIntegrationLogger(this.options, label);
      }
    };
    AstroIntegrationLogger = class {
      options;
      label;
      constructor(logging, label) {
        this.options = logging;
        this.label = label;
      }
      /**
       * Creates a new logger instance with a new label, but the same log options.
       */
      fork(label) {
        return new AstroIntegrationLogger(this.options, label);
      }
      info(message) {
        info(this.options, this.label, message);
      }
      warn(message) {
        warn(this.options, this.label, message);
      }
      error(message) {
        error(this.options, this.label, message);
      }
      debug(message) {
        debug(this.label, message);
      }
    };
    consoleLogDestination = {
      write(event) {
        let dest = console.error;
        if (levels[event.level] < levels["error"]) {
          dest = console.log;
        }
        if (event.label === "SKIP_FORMAT") {
          dest(event.message);
        } else {
          dest(getEventPrefix(event) + " " + event.message);
        }
        return true;
      }
    };
    escapeHTML = escape;
    HTMLString = class extends String {
      get [Symbol.toStringTag]() {
        return "HTMLString";
      }
    };
    markHTMLString = (value2) => {
      if (value2 instanceof HTMLString) {
        return value2;
      }
      if (typeof value2 === "string") {
        return new HTMLString(value2);
      }
      return value2;
    };
    AstroJSX = "astro:jsx";
    RenderInstructionSymbol = Symbol.for("astro:render");
    PROP_TYPE = {
      Value: 0,
      JSON: 1,
      // Actually means Array
      RegExp: 2,
      Date: 3,
      Map: 4,
      Set: 5,
      BigInt: 6,
      URL: 7,
      Uint8Array: 8,
      Uint16Array: 9,
      Uint32Array: 10
    };
    transitionDirectivesToCopyOnIsland = Object.freeze([
      "data-astro-transition-scope",
      "data-astro-transition-persist",
      "data-astro-transition-persist-props"
    ]);
    dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
    binary = dictionary.length;
    headAndContentSym = Symbol.for("astro.headAndContent");
    astro_island_prebuilt_default = `(()=>{var A=Object.defineProperty;var g=(i,o,a)=>o in i?A(i,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[o]=a;var d=(i,o,a)=>g(i,typeof o!="symbol"?o+"":o,a);{let i={0:t=>m(t),1:t=>a(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(a(t)),5:t=>new Set(a(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},o=t=>{let[l,e]=t;return l in i?i[l](e):void 0},a=t=>t.map(o),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([l,e])=>[l,o(e)]));class y extends HTMLElement{constructor(){super(...arguments);d(this,"Component");d(this,"hydrator");d(this,"hydrate",async()=>{var b;if(!this.hydrator||!this.isConnected)return;let e=(b=this.parentElement)==null?void 0:b.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let c=this.querySelectorAll("astro-slot"),n={},h=this.querySelectorAll("template[data-astro-template]");for(let r of h){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(let r of c){let s=r.closest(this.tagName);s!=null&&s.isSameNode(this)&&(n[r.getAttribute("name")||"default"]=r.innerHTML)}let p;try{p=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(r){let s=this.getAttribute("component-url")||"<unknown>",v=this.getAttribute("component-export");throw v&&(s+=\` (export \${v})\`),console.error(\`[hydrate] Error parsing props for component \${s}\`,this.getAttribute("props"),r),r}let u;await this.hydrator(this)(this.Component,p,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});d(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),c.disconnect(),this.childrenConnectedCallback()},c=new MutationObserver(()=>{var n;((n=this.lastChild)==null?void 0:n.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});c.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}async start(){let e=JSON.parse(this.getAttribute("opts")),c=this.getAttribute("client");if(Astro[c]===void 0){window.addEventListener(\`astro:\${c}\`,()=>this.start(),{once:!0});return}try{await Astro[c](async()=>{let n=this.getAttribute("renderer-url"),[h,{default:p}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),u=this.getAttribute("component-export")||"default";if(!u.includes("."))this.Component=h[u];else{this.Component=h;for(let f of u.split("."))this.Component=this.Component[f]}return this.hydrator=p,this.hydrate},e,this)}catch(n){console.error(\`[astro-island] Error hydrating \${this.getAttribute("component-url")}\`,n)}}attributeChangedCallback(){this.hydrate()}}d(y,"observedAttributes",["props"]),customElements.get("astro-island")||customElements.define("astro-island",y)}})();`;
    ISLAND_STYLES = `<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>`;
    voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
    htmlBooleanAttributes = /^(?:allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
    htmlEnumAttributes = /^(?:contenteditable|draggable|spellcheck|value)$/i;
    svgEnumAttributes = /^(?:autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
    AMPERSAND_REGEX = /&/g;
    DOUBLE_QUOTE_REGEX = /"/g;
    STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
    toIdent = (k) => k.trim().replace(/(?!^)\b\w|\s+|\W+/g, (match, index) => {
      if (/\W/.test(match))
        return "";
      return index === 0 ? match : match.toUpperCase();
    });
    toAttributeString = (value2, shouldEscape = true) => shouldEscape ? String(value2).replace(AMPERSAND_REGEX, "&#38;").replace(DOUBLE_QUOTE_REGEX, "&#34;") : value2;
    kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    toStyleString = (obj) => Object.entries(obj).filter(([_, v3]) => typeof v3 === "string" && v3.trim() || typeof v3 === "number").map(([k, v3]) => {
      if (k[0] !== "-" && k[1] !== "-")
        return `${kebab(k)}:${v3}`;
      return `${k}:${v3}`;
    }).join(";");
    noop$1 = () => {
    };
    BufferedRenderer = class {
      chunks = [];
      renderPromise;
      destination;
      constructor(bufferRenderFunction) {
        this.renderPromise = bufferRenderFunction(this);
        Promise.resolve(this.renderPromise).catch(noop$1);
      }
      write(chunk) {
        if (this.destination) {
          this.destination.write(chunk);
        } else {
          this.chunks.push(chunk);
        }
      }
      async renderToFinalDestination(destination) {
        for (const chunk of this.chunks) {
          destination.write(chunk);
        }
        this.destination = destination;
        await this.renderPromise;
      }
    };
    isNode = typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]";
    isDeno = typeof Deno !== "undefined";
    VALID_PROTOCOLS = ["http:", "https:"];
    uniqueElements = (item, index, all) => {
      const props = JSON.stringify(item.props);
      const children = item.children;
      return index === all.findIndex((i3) => JSON.stringify(i3.props) === props && i3.children == children);
    };
    slotString = Symbol.for("astro:slot-string");
    SlotString = class extends HTMLString {
      instructions;
      [slotString];
      constructor(content, instructions) {
        super(content);
        this.instructions = instructions;
        this[slotString] = true;
      }
    };
    Fragment2 = Symbol.for("astro:fragment");
    Renderer = Symbol.for("astro:renderer");
    encoder = new TextEncoder();
    decoder$1 = new TextDecoder();
    astroComponentInstanceSym = Symbol.for("astro.componentInstance");
    AstroComponentInstance = class {
      [astroComponentInstanceSym] = true;
      result;
      props;
      slotValues;
      factory;
      returnValue;
      constructor(result, props, slots, factory) {
        this.result = result;
        this.props = props;
        this.factory = factory;
        this.slotValues = {};
        for (const name in slots) {
          let didRender = false;
          let value2 = slots[name](result);
          this.slotValues[name] = () => {
            if (!didRender) {
              didRender = true;
              return value2;
            }
            return slots[name](result);
          };
        }
      }
      async init(result) {
        if (this.returnValue !== void 0)
          return this.returnValue;
        this.returnValue = this.factory(result, this.props, this.slotValues);
        if (isPromise2(this.returnValue)) {
          this.returnValue.then((resolved) => {
            this.returnValue = resolved;
          }).catch(() => {
          });
        }
        return this.returnValue;
      }
      async render(destination) {
        const returnValue = await this.init(this.result);
        if (isHeadAndContent(returnValue)) {
          await returnValue.content.render(destination);
        } else {
          await renderChild(destination, returnValue);
        }
      }
    };
    renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
    RenderTemplateResult = class {
      [renderTemplateResultSym] = true;
      htmlParts;
      expressions;
      error;
      constructor(htmlParts, expressions) {
        this.htmlParts = htmlParts;
        this.error = void 0;
        this.expressions = expressions.map((expression) => {
          if (isPromise2(expression)) {
            return Promise.resolve(expression).catch((err) => {
              if (!this.error) {
                this.error = err;
                throw err;
              }
            });
          }
          return expression;
        });
      }
      async render(destination) {
        const expRenders = this.expressions.map((exp) => {
          return renderToBufferDestination((bufferDestination) => {
            if (exp || exp === 0) {
              return renderChild(bufferDestination, exp);
            }
          });
        });
        for (let i3 = 0; i3 < this.htmlParts.length; i3++) {
          const html = this.htmlParts[i3];
          const expRender = expRenders[i3];
          destination.write(markHTMLString(html));
          if (expRender) {
            await expRender.renderToFinalDestination(destination);
          }
        }
      }
    };
    DOCTYPE_EXP = /<!doctype html/i;
    needsHeadRenderingSymbol = Symbol.for("astro.needsHeadRendering");
    rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
    clientOnlyValues = /* @__PURE__ */ new Set(["solid-js", "react", "preact", "vue", "svelte", "lit"]);
    ASTRO_SLOT_EXP = /<\/?astro-slot\b[^>]*>/g;
    ASTRO_STATIC_SLOT_EXP = /<\/?astro-static-slot\b[^>]*>/g;
    ClientOnlyPlaceholder = "astro-client-only";
    hasTriedRenderComponentSymbol = Symbol("hasTriedRenderComponent");
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((v3, c2) => (v3[c2.charCodeAt(0)] = c2, v3), []);
    "-0123456789_".split("").reduce((v3, c2) => (v3[c2.charCodeAt(0)] = c2, v3), []);
    VALID_PARAM_TYPES = ["string", "number", "undefined"];
    RouteCache = class {
      logger;
      cache = {};
      mode;
      constructor(logger, mode = "production") {
        this.logger = logger;
        this.mode = mode;
      }
      /** Clear the cache. */
      clearAll() {
        this.cache = {};
      }
      set(route, entry) {
        const key = this.key(route);
        if (this.mode === "production" && this.cache[key]?.staticPaths) {
          this.logger.warn(null, `Internal Warning: route cache overwritten. (${key})`);
        }
        this.cache[key] = entry;
      }
      get(route) {
        return this.cache[this.key(route)];
      }
      key(route) {
        return `${route.route}_${route.component}`;
      }
    };
    Pipeline = class {
      constructor(logger, manifest2, mode, renderers2, resolve, serverLike, streaming, adapterName = manifest2.adapterName, clientDirectives = manifest2.clientDirectives, inlinedScripts = manifest2.inlinedScripts, compressHTML = manifest2.compressHTML, i18n = manifest2.i18n, middleware = manifest2.middleware, routeCache = new RouteCache(logger, mode), site = manifest2.site ? new URL(manifest2.site) : void 0, callSetGetEnv = true) {
        this.logger = logger;
        this.manifest = manifest2;
        this.mode = mode;
        this.renderers = renderers2;
        this.resolve = resolve;
        this.serverLike = serverLike;
        this.streaming = streaming;
        this.adapterName = adapterName;
        this.clientDirectives = clientDirectives;
        this.inlinedScripts = inlinedScripts;
        this.compressHTML = compressHTML;
        this.i18n = i18n;
        this.middleware = middleware;
        this.routeCache = routeCache;
        this.site = site;
        this.callSetGetEnv = callSetGetEnv;
        this.internalMiddleware = [];
        if (i18n?.strategy !== "manual") {
          this.internalMiddleware.push(
            createI18nMiddleware(i18n, manifest2.base, manifest2.trailingSlash, manifest2.buildFormat)
          );
        }
        if (callSetGetEnv && manifest2.experimentalEnvGetSecretEnabled)
          ;
      }
      internalMiddleware;
    };
    RedirectComponentInstance = {
      default() {
        return new Response(null, {
          status: 301
        });
      }
    };
    RedirectSinglePageBuiltModule = {
      page: () => Promise.resolve(RedirectComponentInstance),
      onRequest: (_, next) => next(),
      renderers: []
    };
    Slots = class {
      #result;
      #slots;
      #logger;
      constructor(result, slots, logger) {
        this.#result = result;
        this.#slots = slots;
        this.#logger = logger;
        if (slots) {
          for (const key of Object.keys(slots)) {
            if (this[key] !== void 0) {
              throw new AstroError({
                ...ReservedSlotName,
                message: ReservedSlotName.message(key)
              });
            }
            Object.defineProperty(this, key, {
              get() {
                return true;
              },
              enumerable: true
            });
          }
        }
      }
      has(name) {
        if (!this.#slots)
          return false;
        return Boolean(this.#slots[name]);
      }
      async render(name, args = []) {
        if (!this.#slots || !this.has(name))
          return;
        const result = this.#result;
        if (!Array.isArray(args)) {
          this.#logger.warn(
            null,
            `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
          );
        } else if (args.length > 0) {
          const slotValue = this.#slots[name];
          const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
          const expression = getFunctionExpression(component);
          if (expression) {
            const slot = async () => typeof expression === "function" ? expression(...args) : expression;
            return await renderSlotToString(result, slot).then((res) => {
              return res;
            });
          }
          if (typeof component === "function") {
            return await renderJSX(result, component(...args)).then(
              (res) => res != null ? String(res) : res
            );
          }
        }
        const content = await renderSlotToString(result, this.#slots[name]);
        const outHTML = chunkToString(result, content);
        return outHTML;
      }
    };
    RenderContext = class {
      constructor(pipeline, locals, middleware, pathname, request, routeData, status, cookies = new AstroCookies(request), params = getParams(routeData, pathname), url = new URL(request.url), props = {}) {
        this.pipeline = pipeline;
        this.locals = locals;
        this.middleware = middleware;
        this.pathname = pathname;
        this.request = request;
        this.routeData = routeData;
        this.status = status;
        this.cookies = cookies;
        this.params = params;
        this.url = url;
        this.props = props;
        this.originalRoute = routeData;
      }
      // The first route that this instance of the context attempts to render
      originalRoute;
      /**
       * A flag that tells the render content if the rewriting was triggered
       */
      isRewriting = false;
      /**
       * A safety net in case of loops
       */
      counter = 0;
      static create({
        locals = {},
        middleware,
        pathname,
        pipeline,
        request,
        routeData,
        status = 200
      }) {
        return new RenderContext(
          pipeline,
          locals,
          sequence(...pipeline.internalMiddleware, middleware ?? pipeline.middleware),
          pathname,
          request,
          routeData,
          status
        );
      }
      /**
       * The main function of the RenderContext.
       *
       * Use this function to render any route known to Astro.
       * It attempts to render a route. A route can be a:
       *
       * - page
       * - redirect
       * - endpoint
       * - fallback
       */
      async render(componentInstance, slots = {}) {
        const { cookies, middleware, pipeline } = this;
        const { logger, serverLike, streaming } = pipeline;
        const props = Object.keys(this.props).length > 0 ? this.props : await getProps({
          mod: componentInstance,
          routeData: this.routeData,
          routeCache: this.pipeline.routeCache,
          pathname: this.pathname,
          logger,
          serverLike
        });
        const apiContext = this.createAPIContext(props);
        this.counter++;
        if (this.counter === 4) {
          return new Response("Loop Detected", {
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
            status: 508,
            statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
          });
        }
        const lastNext = async (ctx, payload) => {
          if (payload) {
            if (this.pipeline.manifest.rewritingEnabled) {
              const [routeData, component] = await pipeline.tryRewrite(
                payload,
                this.request,
                this.originalRoute
              );
              this.routeData = routeData;
              componentInstance = component;
              this.isRewriting = true;
            } else {
              this.pipeline.logger.warn(
                "router",
                "The rewrite API is experimental. To use this feature, add the `rewriting` flag to the `experimental` object in your Astro config."
              );
            }
          }
          switch (this.routeData.type) {
            case "endpoint":
              return renderEndpoint(componentInstance, ctx, serverLike, logger);
            case "redirect":
              return renderRedirect(this);
            case "page": {
              const result = await this.createResult(componentInstance);
              let response2;
              try {
                response2 = await renderPage(
                  result,
                  componentInstance?.default,
                  props,
                  slots,
                  streaming,
                  this.routeData
                );
              } catch (e3) {
                result.cancelled = true;
                throw e3;
              }
              response2.headers.set(ROUTE_TYPE_HEADER, "page");
              if (this.routeData.route === "/404" || this.routeData.route === "/500" || this.isRewriting) {
                response2.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
              }
              return response2;
            }
            case "fallback": {
              return new Response(null, { status: 500, headers: { [ROUTE_TYPE_HEADER]: "fallback" } });
            }
          }
        };
        const response = await callMiddleware(
          middleware,
          apiContext,
          lastNext,
          this.pipeline.manifest.rewritingEnabled,
          this.pipeline.logger
        );
        if (response.headers.get(ROUTE_TYPE_HEADER)) {
          response.headers.delete(ROUTE_TYPE_HEADER);
        }
        attachCookiesToResponse(response, cookies);
        return response;
      }
      createAPIContext(props) {
        const context = this.createActionAPIContext();
        return Object.assign(context, {
          props,
          getActionResult: createGetActionResult(context.locals)
        });
      }
      createActionAPIContext() {
        const renderContext = this;
        const { cookies, params, pipeline, url } = this;
        const generator = `Astro v${ASTRO_VERSION}`;
        const redirect = (path, status = 302) => new Response(null, { status, headers: { Location: path } });
        const rewrite = async (reroutePayload) => {
          pipeline.logger.debug("router", "Called rewriting to:", reroutePayload);
          const [routeData, component, newURL] = await pipeline.tryRewrite(
            reroutePayload,
            this.request,
            this.originalRoute
          );
          this.routeData = routeData;
          if (reroutePayload instanceof Request) {
            this.request = reroutePayload;
          } else {
            this.request = this.#copyRequest(newURL, this.request);
          }
          this.url = newURL;
          this.cookies = new AstroCookies(this.request);
          this.params = getParams(routeData, this.url.pathname);
          this.isRewriting = true;
          this.pathname = this.url.pathname;
          return await this.render(component);
        };
        return {
          cookies,
          get clientAddress() {
            return renderContext.clientAddress();
          },
          get currentLocale() {
            return renderContext.computeCurrentLocale();
          },
          generator,
          get locals() {
            return renderContext.locals;
          },
          // TODO(breaking): disallow replacing the locals object
          set locals(val) {
            if (typeof val !== "object") {
              throw new AstroError(LocalsNotAnObject);
            } else {
              renderContext.locals = val;
              Reflect.set(this.request, clientLocalsSymbol, val);
            }
          },
          params,
          get preferredLocale() {
            return renderContext.computePreferredLocale();
          },
          get preferredLocaleList() {
            return renderContext.computePreferredLocaleList();
          },
          redirect,
          rewrite,
          request: this.request,
          site: pipeline.site,
          url
        };
      }
      async createResult(mod) {
        const { cookies, pathname, pipeline, routeData, status } = this;
        const { clientDirectives, inlinedScripts, compressHTML, manifest: manifest2, renderers: renderers2, resolve } = pipeline;
        const { links, scripts, styles } = await pipeline.headElements(routeData);
        const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest2.componentMetadata;
        const headers = new Headers({ "Content-Type": "text/html" });
        const partial = Boolean(mod.partial);
        const response = {
          status,
          statusText: "OK",
          get headers() {
            return headers;
          },
          // Disallow `Astro.response.headers = new Headers`
          set headers(_) {
            throw new AstroError(AstroResponseHeadersReassigned);
          }
        };
        const actionResult = hasActionsInternal(this.locals) ? this.locals._actionsInternal?.actionResult : void 0;
        const result = {
          cancelled: false,
          clientDirectives,
          inlinedScripts,
          componentMetadata,
          compressHTML,
          cookies,
          /** This function returns the `Astro` faux-global */
          createAstro: (astroGlobal, props, slots) => this.createAstro(result, astroGlobal, props, slots),
          links,
          partial,
          pathname,
          renderers: renderers2,
          resolve,
          response,
          request: this.request,
          scripts,
          styles,
          actionResult,
          _metadata: {
            hasHydrationScript: false,
            rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
            hasRenderedHead: false,
            renderedScripts: /* @__PURE__ */ new Set(),
            hasDirectives: /* @__PURE__ */ new Set(),
            headInTree: false,
            extraHead: [],
            propagators: /* @__PURE__ */ new Set()
          }
        };
        return result;
      }
      #astroPagePartial;
      /**
       * The Astro global is sourced in 3 different phases:
       * - **Static**: `.generator` and `.glob` is printed by the compiler, instantiated once per process per astro file
       * - **Page-level**: `.request`, `.cookies`, `.locals` etc. These remain the same for the duration of the request.
       * - **Component-level**: `.props`, `.slots`, and `.self` are unique to each _use_ of each component.
       *
       * The page level partial is used as the prototype of the user-visible `Astro` global object, which is instantiated once per use of a component.
       */
      createAstro(result, astroStaticPartial, props, slotValues) {
        let astroPagePartial;
        if (this.isRewriting) {
          astroPagePartial = this.#astroPagePartial = this.createAstroPagePartial(
            result,
            astroStaticPartial
          );
        } else {
          astroPagePartial = this.#astroPagePartial ??= this.createAstroPagePartial(
            result,
            astroStaticPartial
          );
        }
        const astroComponentPartial = { props, self: null };
        const Astro = Object.assign(
          Object.create(astroPagePartial),
          astroComponentPartial
        );
        let _slots;
        Object.defineProperty(Astro, "slots", {
          get: () => {
            if (!_slots) {
              _slots = new Slots(
                result,
                slotValues,
                this.pipeline.logger
              );
            }
            return _slots;
          }
        });
        return Astro;
      }
      createAstroPagePartial(result, astroStaticPartial) {
        const renderContext = this;
        const { cookies, locals, params, pipeline, url } = this;
        const { response } = result;
        const redirect = (path, status = 302) => {
          if (this.request[responseSentSymbol$1]) {
            throw new AstroError({
              ...ResponseSentError
            });
          }
          return new Response(null, { status, headers: { Location: path } });
        };
        const rewrite = async (reroutePayload) => {
          pipeline.logger.debug("router", "Calling rewrite: ", reroutePayload);
          const [routeData, component, newURL] = await pipeline.tryRewrite(
            reroutePayload,
            this.request,
            this.originalRoute
          );
          this.routeData = routeData;
          if (reroutePayload instanceof Request) {
            this.request = reroutePayload;
          } else {
            this.request = this.#copyRequest(newURL, this.request);
          }
          this.url = new URL(this.request.url);
          this.cookies = new AstroCookies(this.request);
          this.params = getParams(routeData, this.url.pathname);
          this.pathname = this.url.pathname;
          this.isRewriting = true;
          return await this.render(component);
        };
        return {
          generator: astroStaticPartial.generator,
          glob: astroStaticPartial.glob,
          cookies,
          get clientAddress() {
            return renderContext.clientAddress();
          },
          get currentLocale() {
            return renderContext.computeCurrentLocale();
          },
          params,
          get preferredLocale() {
            return renderContext.computePreferredLocale();
          },
          get preferredLocaleList() {
            return renderContext.computePreferredLocaleList();
          },
          locals,
          redirect,
          rewrite,
          request: this.request,
          getActionResult: createGetActionResult(locals),
          response,
          site: pipeline.site,
          url
        };
      }
      clientAddress() {
        const { pipeline, request } = this;
        if (clientAddressSymbol in request) {
          return Reflect.get(request, clientAddressSymbol);
        }
        if (pipeline.serverLike) {
          if (request.body === null) {
            throw new AstroError(PrerenderClientAddressNotAvailable);
          }
          if (pipeline.adapterName) {
            throw new AstroError({
              ...ClientAddressNotAvailable,
              message: ClientAddressNotAvailable.message(pipeline.adapterName)
            });
          }
        }
        throw new AstroError(StaticClientAddressNotAvailable);
      }
      /**
       * API Context may be created multiple times per request, i18n data needs to be computed only once.
       * So, it is computed and saved here on creation of the first APIContext and reused for later ones.
       */
      #currentLocale;
      computeCurrentLocale() {
        const {
          url,
          pipeline: { i18n },
          routeData
        } = this;
        if (!i18n)
          return;
        const { defaultLocale, locales, strategy } = i18n;
        const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
        return this.#currentLocale ??= computeCurrentLocale(routeData.route, locales) ?? computeCurrentLocale(url.pathname, locales) ?? fallbackTo;
      }
      #preferredLocale;
      computePreferredLocale() {
        const {
          pipeline: { i18n },
          request
        } = this;
        if (!i18n)
          return;
        return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
      }
      #preferredLocaleList;
      computePreferredLocaleList() {
        const {
          pipeline: { i18n },
          request
        } = this;
        if (!i18n)
          return;
        return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
      }
      /**
       * Utility function that creates a new `Request` with a new URL from an old `Request`.
       *
       * @param newUrl The new `URL`
       * @param oldRequest The old `Request`
       */
      #copyRequest(newUrl, oldRequest) {
        return new Request(newUrl, {
          method: oldRequest.method,
          headers: oldRequest.headers,
          body: oldRequest.body,
          referrer: oldRequest.referrer,
          referrerPolicy: oldRequest.referrerPolicy,
          mode: oldRequest.mode,
          credentials: oldRequest.credentials,
          cache: oldRequest.cache,
          redirect: oldRequest.redirect,
          integrity: oldRequest.integrity,
          signal: oldRequest.signal,
          keepalive: oldRequest.keepalive,
          // https://fetch.spec.whatwg.org/#dom-request-duplex
          // @ts-expect-error It isn't part of the types, but undici accepts it and it allows to carry over the body to a new request
          duplex: "half"
        });
      }
    };
    DEFAULT_404_ROUTE = {
      component: DEFAULT_404_COMPONENT,
      generate: () => "",
      params: [],
      pattern: /\/404/,
      prerender: false,
      pathname: "/404",
      segments: [[{ content: "404", dynamic: false, spread: false }]],
      type: "page",
      route: "/404",
      fallbackRoutes: [],
      isIndex: false
    };
    FORM_CONTENT_TYPES = [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain"
    ];
    AppPipeline = class extends Pipeline {
      #manifestData;
      static create(manifestData, {
        logger,
        manifest: manifest2,
        mode,
        renderers: renderers2,
        resolve,
        serverLike,
        streaming
      }) {
        const pipeline = new AppPipeline(
          logger,
          manifest2,
          mode,
          renderers2,
          resolve,
          serverLike,
          streaming,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          false
        );
        pipeline.#manifestData = manifestData;
        return pipeline;
      }
      headElements(routeData) {
        const routeInfo = this.manifest.routes.find((route) => route.routeData === routeData);
        const links = /* @__PURE__ */ new Set();
        const scripts = /* @__PURE__ */ new Set();
        const styles = createStylesheetElementSet(routeInfo?.styles ?? []);
        for (const script of routeInfo?.scripts ?? []) {
          if ("stage" in script) {
            if (script.stage === "head-inline") {
              scripts.add({
                props: {},
                children: script.children
              });
            }
          } else {
            scripts.add(createModuleScriptElement(script));
          }
        }
        return { links, styles, scripts };
      }
      componentMetadata() {
      }
      async getComponentByRoute(routeData) {
        const module = await this.getModuleForRoute(routeData);
        return module.page();
      }
      async tryRewrite(payload, request, sourceRoute) {
        let foundRoute;
        let finalUrl = void 0;
        for (const route of this.#manifestData.routes) {
          if (payload instanceof URL) {
            finalUrl = payload;
          } else if (payload instanceof Request) {
            finalUrl = new URL(payload.url);
          } else {
            finalUrl = new URL(payload, new URL(request.url).origin);
          }
          if (route.pattern.test(decodeURI(finalUrl.pathname))) {
            foundRoute = route;
            break;
          } else if (finalUrl.pathname === "/404") {
            foundRoute = DEFAULT_404_ROUTE;
            break;
          }
        }
        if (foundRoute && finalUrl) {
          if (foundRoute.pathname === "/404") {
            const componentInstance = this.rewriteKnownRoute(foundRoute.pathname, sourceRoute);
            return [foundRoute, componentInstance, finalUrl];
          } else {
            const componentInstance = await this.getComponentByRoute(foundRoute);
            return [foundRoute, componentInstance, finalUrl];
          }
        }
        throw new AstroError({
          ...RewriteEncounteredAnError,
          message: RewriteEncounteredAnError.message(payload.toString())
        });
      }
      async getModuleForRoute(route) {
        if (route.component === DEFAULT_404_COMPONENT) {
          return {
            page: async () => ({ default: () => new Response(null, { status: 404 }) }),
            renderers: []
          };
        }
        if (route.type === "redirect") {
          return RedirectSinglePageBuiltModule;
        } else {
          if (this.manifest.pageMap) {
            const importComponentInstance = this.manifest.pageMap.get(route.component);
            if (!importComponentInstance) {
              throw new Error(
                `Unexpectedly unable to find a component instance for route ${route.route}`
              );
            }
            return await importComponentInstance();
          } else if (this.manifest.pageModule) {
            return this.manifest.pageModule;
          }
          throw new Error(
            "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
          );
        }
      }
      // We don't need to check the source route, we already are in SSR
      rewriteKnownRoute(pathname, _sourceRoute) {
        if (pathname === "/404") {
          return { default: () => new Response(null, { status: 404 }) };
        } else {
          return { default: () => new Response(null, { status: 500 }) };
        }
      }
    };
    _App = class {
      constructor(manifest2, streaming = true) {
        /**
         * Creates a pipeline by reading the stored manifest
         *
         * @param manifestData
         * @param streaming
         * @private
         */
        __privateAdd(this, _createPipeline);
        __privateAdd(this, _getPathnameFromRequest);
        __privateAdd(this, _computePathnameFromDomain);
        __privateAdd(this, _logRenderOptionsDeprecationWarning);
        /**
         * If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
         * This also handles pre-rendered /404 or /500 routes
         */
        __privateAdd(this, _renderError);
        __privateAdd(this, _mergeResponses);
        __privateAdd(this, _getDefaultStatusCode);
        __privateAdd(this, _manifest, void 0);
        __privateAdd(this, _manifestData, void 0);
        __privateAdd(this, _logger, new Logger({
          dest: consoleLogDestination,
          level: "info"
        }));
        __privateAdd(this, _baseWithoutTrailingSlash, void 0);
        __privateAdd(this, _pipeline, void 0);
        __privateAdd(this, _adapterLogger, void 0);
        __privateAdd(this, _renderOptionsDeprecationWarningShown, false);
        __privateSet(this, _manifest, manifest2);
        __privateSet(this, _manifestData, ensure404Route({
          routes: manifest2.routes.map((route) => route.routeData)
        }));
        __privateSet(this, _baseWithoutTrailingSlash, removeTrailingForwardSlash(__privateGet(this, _manifest).base));
        __privateSet(this, _pipeline, __privateMethod(this, _createPipeline, createPipeline_fn).call(this, __privateGet(this, _manifestData), streaming));
        __privateSet(this, _adapterLogger, new AstroIntegrationLogger(
          __privateGet(this, _logger).options,
          __privateGet(this, _manifest).adapterName
        ));
      }
      getAdapterLogger() {
        return __privateGet(this, _adapterLogger);
      }
      set setManifestData(newManifestData) {
        __privateSet(this, _manifestData, newManifestData);
      }
      removeBase(pathname) {
        if (pathname.startsWith(__privateGet(this, _manifest).base)) {
          return pathname.slice(__privateGet(this, _baseWithoutTrailingSlash).length + 1);
        }
        return pathname;
      }
      match(request) {
        const url = new URL(request.url);
        if (__privateGet(this, _manifest).assets.has(url.pathname))
          return void 0;
        let pathname = __privateMethod(this, _computePathnameFromDomain, computePathnameFromDomain_fn).call(this, request);
        if (!pathname) {
          pathname = prependForwardSlash(this.removeBase(url.pathname));
        }
        let routeData = matchRoute(pathname, __privateGet(this, _manifestData));
        if (!routeData || routeData.prerender)
          return void 0;
        return routeData;
      }
      async render(request, routeDataOrOptions, maybeLocals) {
        let routeData;
        let locals;
        let clientAddress;
        let addCookieHeader;
        if (routeDataOrOptions && ("addCookieHeader" in routeDataOrOptions || "clientAddress" in routeDataOrOptions || "locals" in routeDataOrOptions || "routeData" in routeDataOrOptions)) {
          if ("addCookieHeader" in routeDataOrOptions) {
            addCookieHeader = routeDataOrOptions.addCookieHeader;
          }
          if ("clientAddress" in routeDataOrOptions) {
            clientAddress = routeDataOrOptions.clientAddress;
          }
          if ("routeData" in routeDataOrOptions) {
            routeData = routeDataOrOptions.routeData;
          }
          if ("locals" in routeDataOrOptions) {
            locals = routeDataOrOptions.locals;
          }
        } else {
          routeData = routeDataOrOptions;
          locals = maybeLocals;
          if (routeDataOrOptions || locals) {
            __privateMethod(this, _logRenderOptionsDeprecationWarning, logRenderOptionsDeprecationWarning_fn).call(this);
          }
        }
        if (routeData) {
          __privateGet(this, _logger).debug(
            "router",
            "The adapter " + __privateGet(this, _manifest).adapterName + " provided a custom RouteData for ",
            request.url
          );
          __privateGet(this, _logger).debug("router", "RouteData:\n" + routeData);
        }
        if (locals) {
          if (typeof locals !== "object") {
            __privateGet(this, _logger).error(null, new AstroError(LocalsNotAnObject).stack);
            return __privateMethod(this, _renderError, renderError_fn).call(this, request, { status: 500 });
          }
          Reflect.set(request, clientLocalsSymbol, locals);
        }
        if (clientAddress) {
          Reflect.set(request, clientAddressSymbol, clientAddress);
        }
        if (!routeData) {
          routeData = this.match(request);
          __privateGet(this, _logger).debug("router", "Astro matched the following route for " + request.url);
          __privateGet(this, _logger).debug("router", "RouteData:\n" + routeData);
        }
        if (!routeData) {
          __privateGet(this, _logger).debug("router", "Astro hasn't found routes that match " + request.url);
          __privateGet(this, _logger).debug("router", "Here's the available routes:\n", __privateGet(this, _manifestData));
          return __privateMethod(this, _renderError, renderError_fn).call(this, request, { locals, status: 404 });
        }
        const pathname = __privateMethod(this, _getPathnameFromRequest, getPathnameFromRequest_fn).call(this, request);
        const defaultStatus = __privateMethod(this, _getDefaultStatusCode, getDefaultStatusCode_fn).call(this, routeData, pathname);
        const mod = await __privateGet(this, _pipeline).getModuleForRoute(routeData);
        let response;
        try {
          const renderContext = RenderContext.create({
            pipeline: __privateGet(this, _pipeline),
            locals,
            pathname,
            request,
            routeData,
            status: defaultStatus
          });
          response = await renderContext.render(await mod.page());
        } catch (err) {
          __privateGet(this, _logger).error(null, err.stack || err.message || String(err));
          return __privateMethod(this, _renderError, renderError_fn).call(this, request, { locals, status: 500 });
        }
        if (REROUTABLE_STATUS_CODES.includes(response.status) && response.headers.get(REROUTE_DIRECTIVE_HEADER) !== "no") {
          return __privateMethod(this, _renderError, renderError_fn).call(this, request, {
            locals,
            response,
            status: response.status
          });
        }
        if (response.headers.has(REROUTE_DIRECTIVE_HEADER)) {
          response.headers.delete(REROUTE_DIRECTIVE_HEADER);
        }
        if (addCookieHeader) {
          for (const setCookieHeaderValue of _App.getSetCookieFromResponse(response)) {
            response.headers.append("set-cookie", setCookieHeaderValue);
          }
        }
        Reflect.set(response, responseSentSymbol$1, true);
        return response;
      }
      setCookieHeaders(response) {
        return getSetCookiesFromResponse(response);
      }
    };
    App = _App;
    _manifest = new WeakMap();
    _manifestData = new WeakMap();
    _logger = new WeakMap();
    _baseWithoutTrailingSlash = new WeakMap();
    _pipeline = new WeakMap();
    _adapterLogger = new WeakMap();
    _renderOptionsDeprecationWarningShown = new WeakMap();
    _createPipeline = new WeakSet();
    createPipeline_fn = function(manifestData, streaming = false) {
      if (__privateGet(this, _manifest).checkOrigin) {
        __privateGet(this, _manifest).middleware = sequence(
          createOriginCheckMiddleware(),
          __privateGet(this, _manifest).middleware
        );
      }
      return AppPipeline.create(manifestData, {
        logger: __privateGet(this, _logger),
        manifest: __privateGet(this, _manifest),
        mode: "production",
        renderers: __privateGet(this, _manifest).renderers,
        resolve: async (specifier) => {
          if (!(specifier in __privateGet(this, _manifest).entryModules)) {
            throw new Error(`Unable to resolve [${specifier}]`);
          }
          const bundlePath = __privateGet(this, _manifest).entryModules[specifier];
          switch (true) {
            case bundlePath.startsWith("data:"):
            case bundlePath.length === 0: {
              return bundlePath;
            }
            default: {
              return createAssetLink(bundlePath, __privateGet(this, _manifest).base, __privateGet(this, _manifest).assetsPrefix);
            }
          }
        },
        serverLike: true,
        streaming
      });
    };
    _getPathnameFromRequest = new WeakSet();
    getPathnameFromRequest_fn = function(request) {
      const url = new URL(request.url);
      const pathname = prependForwardSlash(this.removeBase(url.pathname));
      return pathname;
    };
    _computePathnameFromDomain = new WeakSet();
    computePathnameFromDomain_fn = function(request) {
      let pathname = void 0;
      const url = new URL(request.url);
      if (__privateGet(this, _manifest).i18n && (__privateGet(this, _manifest).i18n.strategy === "domains-prefix-always" || __privateGet(this, _manifest).i18n.strategy === "domains-prefix-other-locales" || __privateGet(this, _manifest).i18n.strategy === "domains-prefix-always-no-redirect")) {
        let host = request.headers.get("X-Forwarded-Host");
        let protocol = request.headers.get("X-Forwarded-Proto");
        if (protocol) {
          protocol = protocol + ":";
        } else {
          protocol = url.protocol;
        }
        if (!host) {
          host = request.headers.get("Host");
        }
        if (host && protocol) {
          host = host.split(":")[0];
          try {
            let locale;
            const hostAsUrl = new URL(`${protocol}//${host}`);
            for (const [domainKey, localeValue] of Object.entries(
              __privateGet(this, _manifest).i18n.domainLookupTable
            )) {
              const domainKeyAsUrl = new URL(domainKey);
              if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
                locale = localeValue;
                break;
              }
            }
            if (locale) {
              pathname = prependForwardSlash(
                joinPaths(normalizeTheLocale(locale), this.removeBase(url.pathname))
              );
              if (url.pathname.endsWith("/")) {
                pathname = appendForwardSlash(pathname);
              }
            }
          } catch (e3) {
            __privateGet(this, _logger).error(
              "router",
              `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`
            );
            __privateGet(this, _logger).error("router", `Error: ${e3}`);
          }
        }
      }
      return pathname;
    };
    _logRenderOptionsDeprecationWarning = new WeakSet();
    logRenderOptionsDeprecationWarning_fn = function() {
      if (__privateGet(this, _renderOptionsDeprecationWarningShown))
        return;
      __privateGet(this, _logger).warn(
        "deprecated",
        `The adapter ${__privateGet(this, _manifest).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`
      );
      __privateSet(this, _renderOptionsDeprecationWarningShown, true);
    };
    _renderError = new WeakSet();
    renderError_fn = async function(request, { locals, status, response: originalResponse, skipMiddleware = false }) {
      const errorRoutePath = `/${status}${__privateGet(this, _manifest).trailingSlash === "always" ? "/" : ""}`;
      const errorRouteData = matchRoute(errorRoutePath, __privateGet(this, _manifestData));
      const url = new URL(request.url);
      if (errorRouteData) {
        if (errorRouteData.prerender) {
          const maybeDotHtml = errorRouteData.route.endsWith(`/${status}`) ? ".html" : "";
          const statusURL = new URL(
            `${__privateGet(this, _baseWithoutTrailingSlash)}/${status}${maybeDotHtml}`,
            url
          );
          const response2 = await fetch(statusURL.toString());
          const override = { status };
          return __privateMethod(this, _mergeResponses, mergeResponses_fn).call(this, response2, originalResponse, override);
        }
        const mod = await __privateGet(this, _pipeline).getModuleForRoute(errorRouteData);
        try {
          const renderContext = RenderContext.create({
            locals,
            pipeline: __privateGet(this, _pipeline),
            middleware: skipMiddleware ? (_, next) => next() : void 0,
            pathname: __privateMethod(this, _getPathnameFromRequest, getPathnameFromRequest_fn).call(this, request),
            request,
            routeData: errorRouteData,
            status
          });
          const response2 = await renderContext.render(await mod.page());
          return __privateMethod(this, _mergeResponses, mergeResponses_fn).call(this, response2, originalResponse);
        } catch {
          if (skipMiddleware === false) {
            return __privateMethod(this, _renderError, renderError_fn).call(this, request, {
              locals,
              status,
              response: originalResponse,
              skipMiddleware: true
            });
          }
        }
      }
      const response = __privateMethod(this, _mergeResponses, mergeResponses_fn).call(this, new Response(null, { status }), originalResponse);
      Reflect.set(response, responseSentSymbol$1, true);
      return response;
    };
    _mergeResponses = new WeakSet();
    mergeResponses_fn = function(newResponse, originalResponse, override) {
      if (!originalResponse) {
        if (override !== void 0) {
          return new Response(newResponse.body, {
            status: override.status,
            statusText: newResponse.statusText,
            headers: newResponse.headers
          });
        }
        return newResponse;
      }
      const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
      try {
        originalResponse.headers.delete("Content-type");
      } catch {
      }
      return new Response(newResponse.body, {
        status,
        statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
        // If you're looking at here for possible bugs, it means that it's not a bug.
        // With the middleware, users can meddle with headers, and we should pass to the 404/500.
        // If users see something weird, it's because they are setting some headers they should not.
        //
        // Although, we don't want it to replace the content-type, because the error page must return `text/html`
        headers: new Headers([
          ...Array.from(newResponse.headers),
          ...Array.from(originalResponse.headers)
        ])
      });
    };
    _getDefaultStatusCode = new WeakSet();
    getDefaultStatusCode_fn = function(routeData, pathname) {
      if (!routeData.pattern.exec(pathname)) {
        for (const fallbackRoute of routeData.fallbackRoutes) {
          if (fallbackRoute.pattern.test(pathname)) {
            return 302;
          }
        }
      }
      const route = removeTrailingForwardSlash(routeData.route);
      if (route.endsWith("/404"))
        return 404;
      if (route.endsWith("/500"))
        return 500;
      return 200;
    };
    /**
     * Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
     * For example,
     * ```ts
     * for (const cookie_ of App.getSetCookieFromResponse(response)) {
     *     const cookie: string = cookie_
     * }
     * ```
     * @param response The response to read cookies from.
     * @returns An iterator that yields key-value pairs as equal-sign-separated strings.
     */
    __publicField(App, "getSetCookieFromResponse", getSetCookiesFromResponse);
    setup2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      setGetEnv
    }, Symbol.toStringTag, { value: "Module" }));
    page = () => Promise.resolve().then(() => generic);
    generic___js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      page,
      renderers
    }, Symbol.toStringTag, { value: "Module" }));
    VALID_SUPPORTED_FORMATS = [
      "jpeg",
      "jpg",
      "png",
      "tiff",
      "webp",
      "gif",
      "svg",
      "avif"
    ];
    DEFAULT_OUTPUT_FORMAT = "webp";
    DEFAULT_HASH_PROPS = ["src", "width", "height", "format", "quality"];
    baseService = {
      propertiesToHash: DEFAULT_HASH_PROPS,
      validateOptions(options) {
        if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
          throw new AstroError({
            ...ExpectedImage,
            message: ExpectedImage.message(
              JSON.stringify(options.src),
              typeof options.src,
              JSON.stringify(options, (_, v3) => v3 === void 0 ? null : v3)
            )
          });
        }
        if (!isESMImportedImage(options.src)) {
          if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
            throw new AstroError({
              ...LocalImageUsedWrongly,
              message: LocalImageUsedWrongly.message(options.src)
            });
          }
          let missingDimension;
          if (!options.width && !options.height) {
            missingDimension = "both";
          } else if (!options.width && options.height) {
            missingDimension = "width";
          } else if (options.width && !options.height) {
            missingDimension = "height";
          }
          if (missingDimension) {
            throw new AstroError({
              ...MissingImageDimension,
              message: MissingImageDimension.message(missingDimension, options.src)
            });
          }
        } else {
          if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
            throw new AstroError({
              ...UnsupportedImageFormat,
              message: UnsupportedImageFormat.message(
                options.src.format,
                options.src.src,
                VALID_SUPPORTED_FORMATS
              )
            });
          }
          if (options.widths && options.densities) {
            throw new AstroError(IncompatibleDescriptorOptions);
          }
          if (options.src.format === "svg") {
            options.format = "svg";
          }
          if (options.src.format === "svg" && options.format !== "svg" || options.src.format !== "svg" && options.format === "svg") {
            throw new AstroError(UnsupportedImageConversion);
          }
        }
        if (!options.format) {
          options.format = DEFAULT_OUTPUT_FORMAT;
        }
        if (options.width)
          options.width = Math.round(options.width);
        if (options.height)
          options.height = Math.round(options.height);
        return options;
      },
      getHTMLAttributes(options) {
        const { targetWidth, targetHeight } = getTargetDimensions(options);
        const { src, width, height, format, quality, densities, widths, formats, ...attributes } = options;
        return {
          ...attributes,
          width: targetWidth,
          height: targetHeight,
          loading: attributes.loading ?? "lazy",
          decoding: attributes.decoding ?? "async"
        };
      },
      getSrcSet(options) {
        const srcSet = [];
        const { targetWidth } = getTargetDimensions(options);
        const { widths, densities } = options;
        const targetFormat = options.format ?? DEFAULT_OUTPUT_FORMAT;
        let imageWidth = options.width;
        let maxWidth = Infinity;
        if (isESMImportedImage(options.src)) {
          imageWidth = options.src.width;
          maxWidth = imageWidth;
        }
        const {
          width: transformWidth,
          height: transformHeight,
          ...transformWithoutDimensions
        } = options;
        const allWidths = [];
        if (densities) {
          const densityValues = densities.map((density) => {
            if (typeof density === "number") {
              return density;
            } else {
              return parseFloat(density);
            }
          });
          const densityWidths = densityValues.sort().map((density) => Math.round(targetWidth * density));
          allWidths.push(
            ...densityWidths.map((width, index) => ({
              maxTargetWidth: Math.min(width, maxWidth),
              descriptor: `${densityValues[index]}x`
            }))
          );
        } else if (widths) {
          allWidths.push(
            ...widths.map((width) => ({
              maxTargetWidth: Math.min(width, maxWidth),
              descriptor: `${width}w`
            }))
          );
        }
        for (const { maxTargetWidth, descriptor } of allWidths) {
          const srcSetTransform = { ...transformWithoutDimensions };
          if (maxTargetWidth !== imageWidth) {
            srcSetTransform.width = maxTargetWidth;
          } else {
            if (options.width && options.height) {
              srcSetTransform.width = options.width;
              srcSetTransform.height = options.height;
            }
          }
          srcSet.push({
            transform: srcSetTransform,
            descriptor,
            attributes: {
              type: `image/${targetFormat}`
            }
          });
        }
        return srcSet;
      },
      getURL(options, imageConfig2) {
        const searchParams = new URLSearchParams();
        if (isESMImportedImage(options.src)) {
          searchParams.append("href", options.src.src);
        } else if (isRemoteAllowed(options.src, imageConfig2)) {
          searchParams.append("href", options.src);
        } else {
          return options.src;
        }
        const params = {
          w: "width",
          h: "height",
          q: "quality",
          f: "format"
        };
        Object.entries(params).forEach(([param, key]) => {
          options[key] && searchParams.append(param, options[key].toString());
        });
        const imageEndpoint = joinPaths("/", "/_image");
        return `${imageEndpoint}?${searchParams}`;
      },
      parseURL(url) {
        const params = url.searchParams;
        if (!params.has("href")) {
          return void 0;
        }
        const transform = {
          src: params.get("href"),
          width: params.has("w") ? parseInt(params.get("w")) : void 0,
          height: params.has("h") ? parseInt(params.get("h")) : void 0,
          format: params.get("f"),
          quality: params.get("q")
        };
        return transform;
      }
    };
    decoder = new TextDecoder();
    toUTF8String = (input, start2 = 0, end = input.length) => decoder.decode(input.slice(start2, end));
    toHexString = (input, start2 = 0, end = input.length) => input.slice(start2, end).reduce((memo, i3) => memo + ("0" + i3.toString(16)).slice(-2), "");
    readInt16LE = (input, offset = 0) => {
      const val = input[offset] + input[offset + 1] * 2 ** 8;
      return val | (val & 2 ** 15) * 131070;
    };
    readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
    readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
    readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
    readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
    readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
    readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
    methods = {
      readUInt16BE,
      readUInt16LE,
      readUInt32BE,
      readUInt32LE
    };
    BMP = {
      validate: (input) => toUTF8String(input, 0, 2) === "BM",
      calculate: (input) => ({
        height: Math.abs(readInt32LE(input, 22)),
        width: readUInt32LE(input, 18)
      })
    };
    TYPE_ICON = 1;
    SIZE_HEADER$1 = 2 + 2 + 2;
    SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
    ICO = {
      validate(input) {
        const reserved = readUInt16LE(input, 0);
        const imageCount = readUInt16LE(input, 4);
        if (reserved !== 0 || imageCount === 0)
          return false;
        const imageType = readUInt16LE(input, 2);
        return imageType === TYPE_ICON;
      },
      calculate(input) {
        const nbImages = readUInt16LE(input, 4);
        const imageSize = getImageSize$1(input, 0);
        if (nbImages === 1)
          return imageSize;
        const imgs = [imageSize];
        for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
          imgs.push(getImageSize$1(input, imageIndex));
        }
        return {
          height: imageSize.height,
          images: imgs,
          width: imageSize.width
        };
      }
    };
    TYPE_CURSOR = 2;
    CUR = {
      validate(input) {
        const reserved = readUInt16LE(input, 0);
        const imageCount = readUInt16LE(input, 4);
        if (reserved !== 0 || imageCount === 0)
          return false;
        const imageType = readUInt16LE(input, 2);
        return imageType === TYPE_CURSOR;
      },
      calculate: (input) => ICO.calculate(input)
    };
    DDS = {
      validate: (input) => readUInt32LE(input, 0) === 542327876,
      calculate: (input) => ({
        height: readUInt32LE(input, 12),
        width: readUInt32LE(input, 16)
      })
    };
    gifRegexp = /^GIF8[79]a/;
    GIF = {
      validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
      calculate: (input) => ({
        height: readUInt16LE(input, 8),
        width: readUInt16LE(input, 6)
      })
    };
    brandMap = {
      avif: "avif",
      mif1: "heif",
      msf1: "heif",
      // hief-sequence
      heic: "heic",
      heix: "heic",
      hevc: "heic",
      // heic-sequence
      hevx: "heic"
      // heic-sequence
    };
    HEIF = {
      validate(buffer) {
        const ftype = toUTF8String(buffer, 4, 8);
        const brand = toUTF8String(buffer, 8, 12);
        return "ftyp" === ftype && brand in brandMap;
      },
      calculate(buffer) {
        const metaBox = findBox(buffer, "meta", 0);
        const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
        const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
        const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
        if (ispeBox) {
          return {
            height: readUInt32BE(buffer, ispeBox.offset + 16),
            width: readUInt32BE(buffer, ispeBox.offset + 12),
            type: detectBrands(buffer, 8, metaBox.offset)
          };
        }
        throw new TypeError("Invalid HEIF, no size found");
      }
    };
    SIZE_HEADER = 4 + 4;
    FILE_LENGTH_OFFSET = 4;
    ENTRY_LENGTH_OFFSET = 4;
    ICON_TYPE_SIZE = {
      ICON: 32,
      "ICN#": 32,
      // m => 16 x 16
      "icm#": 16,
      icm4: 16,
      icm8: 16,
      // s => 16 x 16
      "ics#": 16,
      ics4: 16,
      ics8: 16,
      is32: 16,
      s8mk: 16,
      icp4: 16,
      // l => 32 x 32
      icl4: 32,
      icl8: 32,
      il32: 32,
      l8mk: 32,
      icp5: 32,
      ic11: 32,
      // h => 48 x 48
      ich4: 48,
      ich8: 48,
      ih32: 48,
      h8mk: 48,
      // . => 64 x 64
      icp6: 64,
      ic12: 32,
      // t => 128 x 128
      it32: 128,
      t8mk: 128,
      ic07: 128,
      // . => 256 x 256
      ic08: 256,
      ic13: 256,
      // . => 512 x 512
      ic09: 512,
      ic14: 512,
      // . => 1024 x 1024
      ic10: 1024
    };
    ICNS = {
      validate: (input) => toUTF8String(input, 0, 4) === "icns",
      calculate(input) {
        const inputLength = input.length;
        const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
        let imageOffset = SIZE_HEADER;
        let imageHeader = readImageHeader(input, imageOffset);
        let imageSize = getImageSize(imageHeader[0]);
        imageOffset += imageHeader[1];
        if (imageOffset === fileLength)
          return imageSize;
        const result = {
          height: imageSize.height,
          images: [imageSize],
          width: imageSize.width
        };
        while (imageOffset < fileLength && imageOffset < inputLength) {
          imageHeader = readImageHeader(input, imageOffset);
          imageSize = getImageSize(imageHeader[0]);
          imageOffset += imageHeader[1];
          result.images.push(imageSize);
        }
        return result;
      }
    };
    J2C = {
      // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
      validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
      calculate: (input) => ({
        height: readUInt32BE(input, 12),
        width: readUInt32BE(input, 8)
      })
    };
    JP2 = {
      validate(input) {
        if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1)
          return false;
        const ftypBox = findBox(input, "ftyp", 0);
        if (!ftypBox)
          return false;
        return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
      },
      calculate(input) {
        const jp2hBox = findBox(input, "jp2h", 0);
        const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
        if (ihdrBox) {
          return {
            height: readUInt32BE(input, ihdrBox.offset + 8),
            width: readUInt32BE(input, ihdrBox.offset + 12)
          };
        }
        throw new TypeError("Unsupported JPEG 2000 format");
      }
    };
    EXIF_MARKER = "45786966";
    APP1_DATA_SIZE_BYTES = 2;
    EXIF_HEADER_BYTES = 6;
    TIFF_BYTE_ALIGN_BYTES = 2;
    BIG_ENDIAN_BYTE_ALIGN = "4d4d";
    LITTLE_ENDIAN_BYTE_ALIGN = "4949";
    IDF_ENTRY_BYTES = 12;
    NUM_DIRECTORY_ENTRIES_BYTES = 2;
    JPG = {
      validate: (input) => toHexString(input, 0, 2) === "ffd8",
      calculate(input) {
        input = input.slice(4);
        let orientation;
        let next;
        while (input.length) {
          const i3 = readUInt16BE(input, 0);
          if (input[i3] !== 255) {
            input = input.slice(1);
            continue;
          }
          if (isEXIF(input)) {
            orientation = validateExifBlock(input, i3);
          }
          validateInput(input, i3);
          next = input[i3 + 1];
          if (next === 192 || next === 193 || next === 194) {
            const size2 = extractSize(input, i3 + 5);
            if (!orientation) {
              return size2;
            }
            return {
              height: size2.height,
              orientation,
              width: size2.width
            };
          }
          input = input.slice(i3 + 2);
        }
        throw new TypeError("Invalid JPG, no size found");
      }
    };
    KTX = {
      validate: (input) => {
        const signature = toUTF8String(input, 1, 7);
        return ["KTX 11", "KTX 20"].includes(signature);
      },
      calculate: (input) => {
        const type2 = input[5] === 49 ? "ktx" : "ktx2";
        const offset = type2 === "ktx" ? 36 : 20;
        return {
          height: readUInt32LE(input, offset + 4),
          width: readUInt32LE(input, offset),
          type: type2
        };
      }
    };
    pngSignature = "PNG\r\n\n";
    pngImageHeaderChunkName = "IHDR";
    pngFriedChunkName = "CgBI";
    PNG = {
      validate(input) {
        if (pngSignature === toUTF8String(input, 1, 8)) {
          let chunkName = toUTF8String(input, 12, 16);
          if (chunkName === pngFriedChunkName) {
            chunkName = toUTF8String(input, 28, 32);
          }
          if (chunkName !== pngImageHeaderChunkName) {
            throw new TypeError("Invalid PNG");
          }
          return true;
        }
        return false;
      },
      calculate(input) {
        if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
          return {
            height: readUInt32BE(input, 36),
            width: readUInt32BE(input, 32)
          };
        }
        return {
          height: readUInt32BE(input, 20),
          width: readUInt32BE(input, 16)
        };
      }
    };
    PNMTypes = {
      P1: "pbm/ascii",
      P2: "pgm/ascii",
      P3: "ppm/ascii",
      P4: "pbm",
      P5: "pgm",
      P6: "ppm",
      P7: "pam",
      PF: "pfm"
    };
    handlers = {
      default: (lines) => {
        let dimensions = [];
        while (lines.length > 0) {
          const line = lines.shift();
          if (line[0] === "#") {
            continue;
          }
          dimensions = line.split(" ");
          break;
        }
        if (dimensions.length === 2) {
          return {
            height: parseInt(dimensions[1], 10),
            width: parseInt(dimensions[0], 10)
          };
        } else {
          throw new TypeError("Invalid PNM");
        }
      },
      pam: (lines) => {
        const size2 = {};
        while (lines.length > 0) {
          const line = lines.shift();
          if (line.length > 16 || line.charCodeAt(0) > 128) {
            continue;
          }
          const [key, value2] = line.split(" ");
          if (key && value2) {
            size2[key.toLowerCase()] = parseInt(value2, 10);
          }
          if (size2.height && size2.width) {
            break;
          }
        }
        if (size2.height && size2.width) {
          return {
            height: size2.height,
            width: size2.width
          };
        } else {
          throw new TypeError("Invalid PAM");
        }
      }
    };
    PNM = {
      validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
      calculate(input) {
        const signature = toUTF8String(input, 0, 2);
        const type2 = PNMTypes[signature];
        const lines = toUTF8String(input, 3).split(/[\r\n]+/);
        const handler = handlers[type2] || handlers.default;
        return handler(lines);
      }
    };
    PSD = {
      validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
      calculate: (input) => ({
        height: readUInt32BE(input, 14),
        width: readUInt32BE(input, 18)
      })
    };
    svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
    extractorRegExps = {
      height: /\sheight=(['"])([^%]+?)\1/,
      root: svgReg,
      viewbox: /\sviewBox=(['"])(.+?)\1/i,
      width: /\swidth=(['"])([^%]+?)\1/
    };
    INCH_CM = 2.54;
    units = {
      in: 96,
      cm: 96 / INCH_CM,
      em: 16,
      ex: 8,
      m: 96 / INCH_CM * 100,
      mm: 96 / INCH_CM / 10,
      pc: 96 / 72 / 12,
      pt: 96 / 72,
      px: 1
    };
    unitsReg = new RegExp(
      `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
    );
    SVG = {
      // Scan only the first kilo-byte to speed up the check on larger files
      validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
      calculate(input) {
        const root = toUTF8String(input).match(extractorRegExps.root);
        if (root) {
          const attrs = parseAttributes(root[0]);
          if (attrs.width && attrs.height) {
            return calculateByDimensions(attrs);
          }
          if (attrs.viewbox) {
            return calculateByViewbox(attrs, attrs.viewbox);
          }
        }
        throw new TypeError("Invalid SVG");
      }
    };
    TGA = {
      validate(input) {
        return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
      },
      calculate(input) {
        return {
          height: readUInt16LE(input, 14),
          width: readUInt16LE(input, 12)
        };
      }
    };
    signatures = [
      // '492049', // currently not supported
      "49492a00",
      // Little endian
      "4d4d002a"
      // Big Endian
      // '4d4d002a', // BigTIFF > 4GB. currently not supported
    ];
    TIFF = {
      validate: (input) => signatures.includes(toHexString(input, 0, 4)),
      calculate(input) {
        const isBigEndian = determineEndianness(input) === "BE";
        const ifdBuffer = readIFD(input, isBigEndian);
        const tags = extractTags(ifdBuffer, isBigEndian);
        const width = tags[256];
        const height = tags[257];
        if (!width || !height) {
          throw new TypeError("Invalid Tiff. Missing tags");
        }
        return { height, width };
      }
    };
    WEBP = {
      validate(input) {
        const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
        const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
        const vp8Header = "VP8" === toUTF8String(input, 12, 15);
        return riffHeader && webpHeader && vp8Header;
      },
      calculate(input) {
        const chunkHeader = toUTF8String(input, 12, 16);
        input = input.slice(20, 30);
        if (chunkHeader === "VP8X") {
          const extendedHeader = input[0];
          const validStart = (extendedHeader & 192) === 0;
          const validEnd = (extendedHeader & 1) === 0;
          if (validStart && validEnd) {
            return calculateExtended(input);
          } else {
            throw new TypeError("Invalid WebP");
          }
        }
        if (chunkHeader === "VP8 " && input[0] !== 47) {
          return calculateLossy(input);
        }
        const signature = toHexString(input, 3, 6);
        if (chunkHeader === "VP8L" && signature !== "9d012a") {
          return calculateLossless(input);
        }
        throw new TypeError("Invalid WebP");
      }
    };
    typeHandlers = /* @__PURE__ */ new Map([
      ["bmp", BMP],
      ["cur", CUR],
      ["dds", DDS],
      ["gif", GIF],
      ["heif", HEIF],
      ["icns", ICNS],
      ["ico", ICO],
      ["j2c", J2C],
      ["jp2", JP2],
      ["jpg", JPG],
      ["ktx", KTX],
      ["png", PNG],
      ["pnm", PNM],
      ["psd", PSD],
      ["svg", SVG],
      ["tga", TGA],
      ["tiff", TIFF],
      ["webp", WEBP]
    ]);
    types = Array.from(typeHandlers.keys());
    firstBytes = /* @__PURE__ */ new Map([
      [56, "psd"],
      [66, "bmp"],
      [68, "dds"],
      [71, "gif"],
      [73, "tiff"],
      [77, "tiff"],
      [82, "webp"],
      [105, "icns"],
      [137, "png"],
      [255, "jpg"]
    ]);
    globalOptions = {
      disabledTypes: []
    };
    $$Astro$1 = createAstro();
    $$Image = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
      Astro2.self = $$Image;
      const props = Astro2.props;
      if (props.alt === void 0 || props.alt === null) {
        throw new AstroError(ImageMissingAlt);
      }
      if (typeof props.width === "string") {
        props.width = parseInt(props.width);
      }
      if (typeof props.height === "string") {
        props.height = parseInt(props.height);
      }
      const image = await getImage(props);
      const additionalAttributes = {};
      if (image.srcSet.values.length > 0) {
        additionalAttributes.srcset = image.srcSet.attribute;
      }
      return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/node_modules/astro/components/Image.astro", void 0);
    $$Astro = createAstro();
    $$Picture = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
      Astro2.self = $$Picture;
      const defaultFormats = ["webp"];
      const defaultFallbackFormat = "png";
      const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
      const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
      if (props.alt === void 0 || props.alt === null) {
        throw new AstroError(ImageMissingAlt);
      }
      const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
      if (scopedStyleClass) {
        if (pictureAttributes.class) {
          pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
        } else {
          pictureAttributes.class = scopedStyleClass;
        }
      }
      for (const key in props) {
        if (key.startsWith("data-astro-cid")) {
          pictureAttributes[key] = props[key];
        }
      }
      const originalSrc = await resolveSrc(props.src);
      const optimizedImages = await Promise.all(
        formats.map(
          async (format) => await getImage({
            ...props,
            src: originalSrc,
            format,
            widths: props.widths,
            densities: props.densities
          })
        )
      );
      let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
      if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
        resultFallbackFormat = originalSrc.format;
      }
      const fallbackImage = await getImage({
        ...props,
        format: resultFallbackFormat,
        widths: props.widths,
        densities: props.densities
      });
      const imgAdditionalAttributes = {};
      const sourceAdditionalAttributes = {};
      if (props.sizes) {
        sourceAdditionalAttributes.sizes = props.sizes;
      }
      if (fallbackImage.srcSet.values.length > 0) {
        imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
      }
      return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
        const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
        return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
      })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/node_modules/astro/components/Picture.astro", void 0);
    imageConfig = { "service": { "entrypoint": "astro/assets/services/noop", "config": {} }, "domains": [], "remotePatterns": [] };
    getImage = async (options) => await getImage$1(options, imageConfig);
    fnv1a52 = (str) => {
      const len = str.length;
      let i3 = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v22 = 40164, t3 = 0, v3 = 52210;
      while (i3 < len) {
        v0 ^= str.charCodeAt(i3++);
        t0 = v0 * 435;
        t1 = v1 * 435;
        t2 = v22 * 435;
        t3 = v3 * 435;
        t2 += v0 << 8;
        t3 += v1 << 8;
        t1 += t0 >>> 16;
        v0 = t0 & 65535;
        t2 += t1 >>> 16;
        v1 = t1 & 65535;
        v3 = t3 + (t2 >>> 16) & 65535;
        v22 = t2 & 65535;
      }
      return (v3 & 15) * 281474976710656 + v22 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
    };
    etag = (payload, weak = false) => {
      const prefix = weak ? 'W/"' : '"';
      return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
    };
    GET = async ({ request }) => {
      try {
        const imageService = await getConfiguredImageService();
        if (!("transform" in imageService)) {
          throw new Error("Configured image service is not a local service");
        }
        const url = new URL(request.url);
        const transform = await imageService.parseURL(url, imageConfig);
        if (!transform?.src) {
          throw new Error("Incorrect transform returned by `parseURL`");
        }
        let inputBuffer = void 0;
        const isRemoteImage2 = isRemotePath(transform.src);
        const sourceUrl = isRemoteImage2 ? new URL(transform.src) : new URL(transform.src, url.origin);
        if (isRemoteImage2 && isRemoteAllowed(transform.src, imageConfig) === false) {
          return new Response("Forbidden", { status: 403 });
        }
        inputBuffer = await loadRemoteImage(sourceUrl, isRemoteImage2 ? new Headers() : request.headers);
        if (!inputBuffer) {
          return new Response("Not Found", { status: 404 });
        }
        const { data, format } = await imageService.transform(
          new Uint8Array(inputBuffer),
          transform,
          imageConfig
        );
        return new Response(data, {
          status: 200,
          headers: {
            "Content-Type": lookup(format) ?? `image/${format}`,
            "Cache-Control": "public, max-age=31536000",
            ETag: etag(data.toString()),
            Date: (/* @__PURE__ */ new Date()).toUTCString()
          }
        });
      } catch (err) {
        console.error("Could not process image request:", err);
        return new Response(`Server Error: ${err}`, { status: 500 });
      }
    };
    generic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      GET
    }, Symbol.toStringTag, { value: "Module" }));
    noopService = {
      ...baseService,
      propertiesToHash: ["src"],
      async transform(inputBuffer, transformOptions) {
        return {
          data: inputBuffer,
          format: transformOptions.format
        };
      }
    };
    noop_default = noopService;
    noop = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: noop_default
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/@0no-co_Dxoah_iz.mjs
function error2(e3) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${n} in ${e3}`);
}
function advance(e3) {
  e3.lastIndex = n;
  if (e3.test(i)) {
    return i.slice(n, n = e3.lastIndex);
  }
}
function blockString(e3) {
  var r4 = e3.split("\n");
  var i3 = "";
  var n2 = 0;
  var t2 = 0;
  var l3 = r4.length - 1;
  for (var o2 = 0; o2 < r4.length; o2++) {
    a.lastIndex = 0;
    if (a.test(r4[o2])) {
      if (o2 && (!n2 || a.lastIndex < n2)) {
        n2 = a.lastIndex;
      }
      t2 = t2 || o2;
      l3 = o2;
    }
  }
  for (var u3 = t2; u3 <= l3; u3++) {
    if (u3 !== t2) {
      i3 += "\n";
    }
    i3 += r4[u3].slice(n2).replace(/\\"""/g, '"""');
  }
  return i3;
}
function ignored() {
  for (var e3 = 0 | i.charCodeAt(n++); 9 === e3 || 10 === e3 || 13 === e3 || 32 === e3 || 35 === e3 || 44 === e3 || 65279 === e3; e3 = 0 | i.charCodeAt(n++)) {
    if (35 === e3) {
      while (10 !== (e3 = i.charCodeAt(n++)) && 13 !== e3) {
      }
    }
  }
  n--;
}
function value(e3) {
  var r4;
  var a2;
  l.lastIndex = n;
  if (91 === i.charCodeAt(n)) {
    n++;
    ignored();
    var d3 = [];
    while (93 !== i.charCodeAt(n)) {
      d3.push(value(e3));
    }
    n++;
    ignored();
    return {
      kind: "ListValue",
      values: d3
    };
  } else if (123 === i.charCodeAt(n)) {
    n++;
    ignored();
    var v3 = [];
    while (125 !== i.charCodeAt(n)) {
      if (null == (r4 = advance(t))) {
        throw error2("ObjectField");
      }
      ignored();
      if (58 !== i.charCodeAt(n++)) {
        throw error2("ObjectField");
      }
      ignored();
      v3.push({
        kind: "ObjectField",
        name: {
          kind: "Name",
          value: r4
        },
        value: value(e3)
      });
    }
    n++;
    ignored();
    return {
      kind: "ObjectValue",
      fields: v3
    };
  } else if (null != (a2 = l.exec(i))) {
    n = l.lastIndex;
    ignored();
    if (null != (r4 = a2[o.Const])) {
      return "null" === r4 ? {
        kind: "NullValue"
      } : {
        kind: "BooleanValue",
        value: "true" === r4
      };
    } else if (null != (r4 = a2[o.Var])) {
      if (e3) {
        throw error2("Variable");
      } else {
        return {
          kind: "Variable",
          name: {
            kind: "Name",
            value: r4
          }
        };
      }
    } else if (null != (r4 = a2[o.Int])) {
      var s2;
      if (null != (s2 = a2[o.Float])) {
        return {
          kind: "FloatValue",
          value: r4 + s2
        };
      } else {
        return {
          kind: "IntValue",
          value: r4
        };
      }
    } else if (null != (r4 = a2[o.BlockString])) {
      return {
        kind: "StringValue",
        value: blockString(r4.slice(3, -3)),
        block: true
      };
    } else if (null != (r4 = a2[o.String])) {
      return {
        kind: "StringValue",
        value: u.test(r4) ? JSON.parse(r4) : r4.slice(1, -1),
        block: false
      };
    } else if (null != (r4 = a2[o.Enum])) {
      return {
        kind: "EnumValue",
        value: r4
      };
    }
  }
  throw error2("Value");
}
function arguments_(e3) {
  if (40 === i.charCodeAt(n)) {
    var r4 = [];
    n++;
    ignored();
    var a2;
    do {
      if (null == (a2 = advance(t))) {
        throw error2("Argument");
      }
      ignored();
      if (58 !== i.charCodeAt(n++)) {
        throw error2("Argument");
      }
      ignored();
      r4.push({
        kind: "Argument",
        name: {
          kind: "Name",
          value: a2
        },
        value: value(e3)
      });
    } while (41 !== i.charCodeAt(n));
    n++;
    ignored();
    return r4;
  }
}
function directives(e3) {
  if (64 === i.charCodeAt(n)) {
    var r4 = [];
    var a2;
    do {
      n++;
      if (null == (a2 = advance(t))) {
        throw error2("Directive");
      }
      ignored();
      r4.push({
        kind: "Directive",
        name: {
          kind: "Name",
          value: a2
        },
        arguments: arguments_(e3)
      });
    } while (64 === i.charCodeAt(n));
    return r4;
  }
}
function type() {
  var e3;
  var r4 = 0;
  while (91 === i.charCodeAt(n)) {
    r4++;
    n++;
    ignored();
  }
  if (null == (e3 = advance(t))) {
    throw error2("NamedType");
  }
  ignored();
  var a2 = {
    kind: "NamedType",
    name: {
      kind: "Name",
      value: e3
    }
  };
  do {
    if (33 === i.charCodeAt(n)) {
      n++;
      ignored();
      a2 = {
        kind: "NonNullType",
        type: a2
      };
    }
    if (r4) {
      if (93 !== i.charCodeAt(n++)) {
        throw error2("NamedType");
      }
      ignored();
      a2 = {
        kind: "ListType",
        type: a2
      };
    }
  } while (r4--);
  return a2;
}
function selectionSet() {
  var e3 = [];
  var r4;
  var a2;
  do {
    d.lastIndex = n;
    if (null != (a2 = d.exec(i))) {
      n = d.lastIndex;
      if (null != a2[v.Spread]) {
        ignored();
        var l3 = advance(t);
        if (null != l3 && "on" !== l3) {
          ignored();
          e3.push({
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: l3
            },
            directives: directives(false)
          });
        } else {
          ignored();
          if ("on" === l3) {
            if (null == (l3 = advance(t))) {
              throw error2("NamedType");
            }
            ignored();
          }
          var o2 = directives(false);
          if (123 !== i.charCodeAt(n++)) {
            throw error2("InlineFragment");
          }
          ignored();
          e3.push({
            kind: "InlineFragment",
            typeCondition: l3 ? {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: l3
              }
            } : void 0,
            directives: o2,
            selectionSet: selectionSet()
          });
        }
      } else if (null != (r4 = a2[v.Name])) {
        var u3 = void 0;
        ignored();
        if (58 === i.charCodeAt(n)) {
          n++;
          ignored();
          u3 = r4;
          if (null == (r4 = advance(t))) {
            throw error2("Field");
          }
          ignored();
        }
        var s2 = arguments_(false);
        ignored();
        var c2 = directives(false);
        var f3 = void 0;
        if (123 === i.charCodeAt(n)) {
          n++;
          ignored();
          f3 = selectionSet();
        }
        e3.push({
          kind: "Field",
          alias: u3 ? {
            kind: "Name",
            value: u3
          } : void 0,
          name: {
            kind: "Name",
            value: r4
          },
          arguments: s2,
          directives: c2,
          selectionSet: f3
        });
      }
    } else {
      throw error2("SelectionSet");
    }
  } while (125 !== i.charCodeAt(n));
  n++;
  ignored();
  return {
    kind: "SelectionSet",
    selections: e3
  };
}
function fragmentDefinition() {
  var e3;
  var r4;
  if (null == (e3 = advance(t))) {
    throw error2("FragmentDefinition");
  }
  ignored();
  if ("on" !== advance(t)) {
    throw error2("FragmentDefinition");
  }
  ignored();
  if (null == (r4 = advance(t))) {
    throw error2("FragmentDefinition");
  }
  ignored();
  var a2 = directives(false);
  if (123 !== i.charCodeAt(n++)) {
    throw error2("FragmentDefinition");
  }
  ignored();
  return {
    kind: "FragmentDefinition",
    name: {
      kind: "Name",
      value: e3
    },
    typeCondition: {
      kind: "NamedType",
      name: {
        kind: "Name",
        value: r4
      }
    },
    directives: a2,
    selectionSet: selectionSet()
  };
}
function operationDefinition(e3) {
  var r4;
  var a2;
  var l3;
  if (e3) {
    ignored();
    r4 = advance(t);
    a2 = function variableDefinitions() {
      ignored();
      if (40 === i.charCodeAt(n)) {
        var e4 = [];
        n++;
        ignored();
        var r5;
        do {
          if (36 !== i.charCodeAt(n++)) {
            throw error2("Variable");
          }
          if (null == (r5 = advance(t))) {
            throw error2("Variable");
          }
          ignored();
          if (58 !== i.charCodeAt(n++)) {
            throw error2("VariableDefinition");
          }
          ignored();
          var a3 = type();
          var l4 = void 0;
          if (61 === i.charCodeAt(n)) {
            n++;
            ignored();
            l4 = value(true);
          }
          ignored();
          e4.push({
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: r5
              }
            },
            type: a3,
            defaultValue: l4,
            directives: directives(true)
          });
        } while (41 !== i.charCodeAt(n));
        n++;
        ignored();
        return e4;
      }
    }();
    l3 = directives(false);
  }
  if (123 === i.charCodeAt(n)) {
    n++;
    ignored();
    return {
      kind: "OperationDefinition",
      operation: e3 || "query",
      name: r4 ? {
        kind: "Name",
        value: r4
      } : void 0,
      variableDefinitions: a2,
      directives: l3,
      selectionSet: selectionSet()
    };
  }
}
function parse3(e3, r4) {
  i = "string" == typeof e3.body ? e3.body : e3;
  n = 0;
  return function document2() {
    var e4;
    var r5;
    ignored();
    var a2 = [];
    do {
      if ("fragment" === (e4 = advance(s))) {
        ignored();
        a2.push(fragmentDefinition());
      } else if (null != (r5 = operationDefinition(e4))) {
        a2.push(r5);
      } else {
        throw error2("Document");
      }
    } while (n < i.length);
    return {
      kind: "Document",
      definitions: a2
    };
  }();
}
function mapJoin(e3, r4, i3) {
  var n2 = "";
  for (var a2 = 0; a2 < e3.length; a2++) {
    if (a2) {
      n2 += r4;
    }
    n2 += i3(e3[a2]);
  }
  return n2;
}
function printString(e3) {
  return JSON.stringify(e3);
}
function printBlockString(e3) {
  return '"""\n' + e3.replace(/"""/g, '\\"""') + '\n"""';
}
function print(e3) {
  f = "\n";
  return m[e3.kind] ? m[e3.kind](e3) : "";
}
var e, GraphQLError, i, n, a, t, l, o, u, d, v, s, f, m, _print;
var init_no_co_Dxoah_iz = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/@0no-co_Dxoah_iz.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    e = {
      NAME: "Name",
      DOCUMENT: "Document",
      OPERATION_DEFINITION: "OperationDefinition",
      VARIABLE_DEFINITION: "VariableDefinition",
      SELECTION_SET: "SelectionSet",
      FIELD: "Field",
      ARGUMENT: "Argument",
      FRAGMENT_SPREAD: "FragmentSpread",
      INLINE_FRAGMENT: "InlineFragment",
      FRAGMENT_DEFINITION: "FragmentDefinition",
      VARIABLE: "Variable",
      INT: "IntValue",
      FLOAT: "FloatValue",
      STRING: "StringValue",
      BOOLEAN: "BooleanValue",
      NULL: "NullValue",
      ENUM: "EnumValue",
      LIST: "ListValue",
      OBJECT: "ObjectValue",
      OBJECT_FIELD: "ObjectField",
      DIRECTIVE: "Directive",
      NAMED_TYPE: "NamedType",
      LIST_TYPE: "ListType",
      NON_NULL_TYPE: "NonNullType"
    };
    GraphQLError = class extends Error {
      constructor(e3, r4, i3, n2, a2, t2, l3) {
        super(e3);
        this.name = "GraphQLError";
        this.message = e3;
        if (a2) {
          this.path = a2;
        }
        if (r4) {
          this.nodes = Array.isArray(r4) ? r4 : [r4];
        }
        if (i3) {
          this.source = i3;
        }
        if (n2) {
          this.positions = n2;
        }
        if (t2) {
          this.originalError = t2;
        }
        var o2 = l3;
        if (!o2 && t2) {
          var u3 = t2.extensions;
          if (u3 && "object" == typeof u3) {
            o2 = u3;
          }
        }
        this.extensions = o2 || {};
      }
      toJSON() {
        return {
          ...this,
          message: this.message
        };
      }
      toString() {
        return this.message;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLError";
      }
    };
    a = / +(?=[^\s])/y;
    t = /[_A-Za-z]\w*/y;
    l = new RegExp("(?:(null|true|false)|\\$(" + t.source + ')|(-?\\d+)((?:\\.\\d+)?[eE][+-]?\\d+|\\.\\d+)?|("""(?:"""|(?:[\\s\\S]*?[^\\\\])"""))|("(?:"|[^\\r\\n]*?[^\\\\]"))|(' + t.source + "))", "y");
    o = function(e3) {
      e3[e3.Const = 1] = "Const";
      e3[e3.Var = 2] = "Var";
      e3[e3.Int = 3] = "Int";
      e3[e3.Float = 4] = "Float";
      e3[e3.BlockString = 5] = "BlockString";
      e3[e3.String = 6] = "String";
      e3[e3.Enum = 7] = "Enum";
      return e3;
    }(o || {});
    u = /\\/g;
    d = new RegExp("(?:(\\.{3})|(" + t.source + "))", "y");
    v = function(e3) {
      e3[e3.Spread = 1] = "Spread";
      e3[e3.Name = 2] = "Name";
      return e3;
    }(v || {});
    s = /(?:query|mutation|subscription|fragment)/y;
    f = "\n";
    m = {
      OperationDefinition(e3) {
        var r4 = e3.operation;
        if (e3.name) {
          r4 += " " + e3.name.value;
        }
        if (e3.variableDefinitions && e3.variableDefinitions.length) {
          if (!e3.name) {
            r4 += " ";
          }
          r4 += "(" + mapJoin(e3.variableDefinitions, ", ", m.VariableDefinition) + ")";
        }
        if (e3.directives && e3.directives.length) {
          r4 += " " + mapJoin(e3.directives, " ", m.Directive);
        }
        return "query" !== r4 ? r4 + " " + m.SelectionSet(e3.selectionSet) : m.SelectionSet(e3.selectionSet);
      },
      VariableDefinition(e3) {
        var r4 = m.Variable(e3.variable) + ": " + _print(e3.type);
        if (e3.defaultValue) {
          r4 += " = " + _print(e3.defaultValue);
        }
        if (e3.directives && e3.directives.length) {
          r4 += " " + mapJoin(e3.directives, " ", m.Directive);
        }
        return r4;
      },
      Field(e3) {
        var r4 = e3.alias ? e3.alias.value + ": " + e3.name.value : e3.name.value;
        if (e3.arguments && e3.arguments.length) {
          var i3 = mapJoin(e3.arguments, ", ", m.Argument);
          if (r4.length + i3.length + 2 > 80) {
            r4 += "(" + (f += "  ") + mapJoin(e3.arguments, f, m.Argument) + (f = f.slice(0, -2)) + ")";
          } else {
            r4 += "(" + i3 + ")";
          }
        }
        if (e3.directives && e3.directives.length) {
          r4 += " " + mapJoin(e3.directives, " ", m.Directive);
        }
        if (e3.selectionSet) {
          r4 += " " + m.SelectionSet(e3.selectionSet);
        }
        return r4;
      },
      StringValue(e3) {
        if (e3.block) {
          return printBlockString(e3.value).replace(/\n/g, f);
        } else {
          return printString(e3.value);
        }
      },
      BooleanValue: (e3) => "" + e3.value,
      NullValue: (e3) => "null",
      IntValue: (e3) => e3.value,
      FloatValue: (e3) => e3.value,
      EnumValue: (e3) => e3.value,
      Name: (e3) => e3.value,
      Variable: (e3) => "$" + e3.name.value,
      ListValue: (e3) => "[" + mapJoin(e3.values, ", ", _print) + "]",
      ObjectValue: (e3) => "{" + mapJoin(e3.fields, ", ", m.ObjectField) + "}",
      ObjectField: (e3) => e3.name.value + ": " + _print(e3.value),
      Document(e3) {
        if (!e3.definitions || !e3.definitions.length) {
          return "";
        }
        return mapJoin(e3.definitions, "\n\n", _print);
      },
      SelectionSet: (e3) => "{" + (f += "  ") + mapJoin(e3.selections, f, _print) + (f = f.slice(0, -2)) + "}",
      Argument: (e3) => e3.name.value + ": " + _print(e3.value),
      FragmentSpread(e3) {
        var r4 = "..." + e3.name.value;
        if (e3.directives && e3.directives.length) {
          r4 += " " + mapJoin(e3.directives, " ", m.Directive);
        }
        return r4;
      },
      InlineFragment(e3) {
        var r4 = "...";
        if (e3.typeCondition) {
          r4 += " on " + e3.typeCondition.name.value;
        }
        if (e3.directives && e3.directives.length) {
          r4 += " " + mapJoin(e3.directives, " ", m.Directive);
        }
        return r4 += " " + m.SelectionSet(e3.selectionSet);
      },
      FragmentDefinition(e3) {
        var r4 = "fragment " + e3.name.value;
        r4 += " on " + e3.typeCondition.name.value;
        if (e3.directives && e3.directives.length) {
          r4 += " " + mapJoin(e3.directives, " ", m.Directive);
        }
        return r4 + " " + m.SelectionSet(e3.selectionSet);
      },
      Directive(e3) {
        var r4 = "@" + e3.name.value;
        if (e3.arguments && e3.arguments.length) {
          r4 += "(" + mapJoin(e3.arguments, ", ", m.Argument) + ")";
        }
        return r4;
      },
      NamedType: (e3) => e3.name.value,
      ListType: (e3) => "[" + _print(e3.type) + "]",
      NonNullType: (e3) => _print(e3.type) + "!"
    };
    _print = (e3) => m[e3.kind](e3);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/wonka_CkrEhcKe.mjs
function start(e3) {
  return {
    tag: 0,
    0: e3
  };
}
function push(e3) {
  return {
    tag: 1,
    0: e3
  };
}
function filter(r4) {
  return (t2) => (i3) => {
    var a2 = e2;
    t2((e3) => {
      if (0 === e3) {
        i3(0);
      } else if (0 === e3.tag) {
        a2 = e3[0];
        i3(e3);
      } else if (!r4(e3[0])) {
        a2(0);
      } else {
        i3(e3);
      }
    });
  };
}
function map(e3) {
  return (r4) => (t2) => r4((r5) => {
    if (0 === r5 || 0 === r5.tag) {
      t2(r5);
    } else {
      t2(push(e3(r5[0])));
    }
  });
}
function mergeMap(r4) {
  return (t2) => (i3) => {
    var a2 = [];
    var f3 = e2;
    var n2 = false;
    var s2 = false;
    t2((t3) => {
      if (s2)
        ;
      else if (0 === t3) {
        s2 = true;
        if (!a2.length) {
          i3(0);
        }
      } else if (0 === t3.tag) {
        f3 = t3[0];
      } else {
        n2 = false;
        !function applyInnerSource(r5) {
          var t4 = e2;
          r5((e3) => {
            if (0 === e3) {
              if (a2.length) {
                var r6 = a2.indexOf(t4);
                if (r6 > -1) {
                  (a2 = a2.slice()).splice(r6, 1);
                }
                if (!a2.length) {
                  if (s2) {
                    i3(0);
                  } else if (!n2) {
                    n2 = true;
                    f3(0);
                  }
                }
              }
            } else if (0 === e3.tag) {
              a2.push(t4 = e3[0]);
              t4(0);
            } else if (a2.length) {
              i3(e3);
              t4(0);
            }
          });
        }(r4(t3[0]));
        if (!n2) {
          n2 = true;
          f3(0);
        }
      }
    });
    i3(start((e3) => {
      if (1 === e3) {
        if (!s2) {
          s2 = true;
          f3(1);
        }
        for (var r5 = 0, t3 = a2, i4 = a2.length; r5 < i4; r5++) {
          t3[r5](1);
        }
        a2.length = 0;
      } else {
        if (!s2 && !n2) {
          n2 = true;
          f3(0);
        } else {
          n2 = false;
        }
        for (var l3 = 0, u3 = a2, o2 = a2.length; l3 < o2; l3++) {
          u3[l3](0);
        }
      }
    }));
  };
}
function mergeAll(e3) {
  return mergeMap(identity)(e3);
}
function merge(e3) {
  return mergeAll(r2(e3));
}
function onEnd(e3) {
  return (r4) => (t2) => {
    var i3 = false;
    r4((r5) => {
      if (i3)
        ;
      else if (0 === r5) {
        i3 = true;
        t2(0);
        e3();
      } else if (0 === r5.tag) {
        var a2 = r5[0];
        t2(start((r6) => {
          if (1 === r6) {
            i3 = true;
            a2(1);
            e3();
          } else {
            a2(r6);
          }
        }));
      } else {
        t2(r5);
      }
    });
  };
}
function onPush(e3) {
  return (r4) => (t2) => {
    var i3 = false;
    r4((r5) => {
      if (i3)
        ;
      else if (0 === r5) {
        i3 = true;
        t2(0);
      } else if (0 === r5.tag) {
        var a2 = r5[0];
        t2(start((e4) => {
          if (1 === e4) {
            i3 = true;
          }
          a2(e4);
        }));
      } else {
        e3(r5[0]);
        t2(r5);
      }
    });
  };
}
function onStart(e3) {
  return (r4) => (t2) => r4((r5) => {
    if (0 === r5) {
      t2(0);
    } else if (0 === r5.tag) {
      t2(r5);
      e3();
    } else {
      t2(r5);
    }
  });
}
function share(r4) {
  var t2 = [];
  var i3 = e2;
  var a2 = false;
  return (e3) => {
    t2.push(e3);
    if (1 === t2.length) {
      r4((e4) => {
        if (0 === e4) {
          for (var r5 = 0, f3 = t2, n2 = t2.length; r5 < n2; r5++) {
            f3[r5](0);
          }
          t2.length = 0;
        } else if (0 === e4.tag) {
          i3 = e4[0];
        } else {
          a2 = false;
          for (var s2 = 0, l3 = t2, u3 = t2.length; s2 < u3; s2++) {
            l3[s2](e4);
          }
        }
      });
    }
    e3(start((r5) => {
      if (1 === r5) {
        var f3 = t2.indexOf(e3);
        if (f3 > -1) {
          (t2 = t2.slice()).splice(f3, 1);
        }
        if (!t2.length) {
          i3(1);
        }
      } else if (!a2) {
        a2 = true;
        i3(0);
      }
    }));
  };
}
function switchMap(r4) {
  return (t2) => (i3) => {
    var a2 = e2;
    var f3 = e2;
    var n2 = false;
    var s2 = false;
    var l3 = false;
    var u3 = false;
    t2((t3) => {
      if (u3)
        ;
      else if (0 === t3) {
        u3 = true;
        if (!l3) {
          i3(0);
        }
      } else if (0 === t3.tag) {
        a2 = t3[0];
      } else {
        if (l3) {
          f3(1);
          f3 = e2;
        }
        if (!n2) {
          n2 = true;
          a2(0);
        } else {
          n2 = false;
        }
        !function applyInnerSource(e3) {
          l3 = true;
          e3((e4) => {
            if (!l3)
              ;
            else if (0 === e4) {
              l3 = false;
              if (u3) {
                i3(0);
              } else if (!n2) {
                n2 = true;
                a2(0);
              }
            } else if (0 === e4.tag) {
              s2 = false;
              (f3 = e4[0])(0);
            } else {
              i3(e4);
              if (!s2) {
                f3(0);
              } else {
                s2 = false;
              }
            }
          });
        }(r4(t3[0]));
      }
    });
    i3(start((e3) => {
      if (1 === e3) {
        if (!u3) {
          u3 = true;
          a2(1);
        }
        if (l3) {
          l3 = false;
          f3(1);
        }
      } else {
        if (!u3 && !n2) {
          n2 = true;
          a2(0);
        }
        if (l3 && !s2) {
          s2 = true;
          f3(0);
        }
      }
    }));
  };
}
function take(r4) {
  return (t2) => (i3) => {
    var a2 = e2;
    var f3 = false;
    var n2 = 0;
    t2((e3) => {
      if (f3)
        ;
      else if (0 === e3) {
        f3 = true;
        i3(0);
      } else if (0 === e3.tag) {
        {
          a2 = e3[0];
        }
      } else if (n2++ < r4) {
        i3(e3);
        if (!f3 && n2 >= r4) {
          f3 = true;
          i3(0);
          a2(1);
        }
      } else {
        i3(e3);
      }
    });
    i3(start((e3) => {
      if (1 === e3 && !f3) {
        f3 = true;
        a2(1);
      } else if (0 === e3 && !f3 && n2 < r4) {
        a2(0);
      }
    }));
  };
}
function takeUntil(r4) {
  return (t2) => (i3) => {
    var a2 = e2;
    var f3 = e2;
    var n2 = false;
    t2((e3) => {
      if (n2)
        ;
      else if (0 === e3) {
        n2 = true;
        f3(1);
        i3(0);
      } else if (0 === e3.tag) {
        a2 = e3[0];
        r4((e4) => {
          if (0 === e4)
            ;
          else if (0 === e4.tag) {
            (f3 = e4[0])(0);
          } else {
            n2 = true;
            f3(1);
            a2(1);
            i3(0);
          }
        });
      } else {
        i3(e3);
      }
    });
    i3(start((e3) => {
      if (1 === e3 && !n2) {
        n2 = true;
        a2(1);
        f3(1);
      } else if (!n2) {
        a2(0);
      }
    }));
  };
}
function takeWhile(r4, t2) {
  return (i3) => (a2) => {
    var f3 = e2;
    var n2 = false;
    i3((e3) => {
      if (n2)
        ;
      else if (0 === e3) {
        n2 = true;
        a2(0);
      } else if (0 === e3.tag) {
        f3 = e3[0];
        a2(e3);
      } else if (!r4(e3[0])) {
        n2 = true;
        {
          a2(e3);
        }
        a2(0);
        f3(1);
      } else {
        a2(e3);
      }
    });
  };
}
function lazy(e3) {
  return (r4) => e3()(r4);
}
function fromAsyncIterable(e3) {
  return (r4) => {
    var t2 = e3[asyncIteratorSymbol()] && e3[asyncIteratorSymbol()]() || e3;
    var i3 = false;
    var a2 = false;
    var f3 = false;
    var n2;
    r4(start(async (e4) => {
      if (1 === e4) {
        i3 = true;
        if (t2.return) {
          t2.return();
        }
      } else if (a2) {
        f3 = true;
      } else {
        for (f3 = a2 = true; f3 && !i3; ) {
          if ((n2 = await t2.next()).done) {
            i3 = true;
            if (t2.return) {
              await t2.return();
            }
            r4(0);
          } else {
            try {
              f3 = false;
              r4(push(n2.value));
            } catch (e5) {
              if (t2.throw) {
                if (i3 = !!(await t2.throw(e5)).done) {
                  r4(0);
                }
              } else {
                throw e5;
              }
            }
          }
        }
        a2 = false;
      }
    }));
  };
}
function fromIterable(e3) {
  if (e3[Symbol.asyncIterator]) {
    return fromAsyncIterable(e3);
  }
  return (r4) => {
    var t2 = e3[Symbol.iterator]();
    var i3 = false;
    var a2 = false;
    var f3 = false;
    var n2;
    r4(start((e4) => {
      if (1 === e4) {
        i3 = true;
        if (t2.return) {
          t2.return();
        }
      } else if (a2) {
        f3 = true;
      } else {
        for (f3 = a2 = true; f3 && !i3; ) {
          if ((n2 = t2.next()).done) {
            i3 = true;
            if (t2.return) {
              t2.return();
            }
            r4(0);
          } else {
            try {
              f3 = false;
              r4(push(n2.value));
            } catch (e5) {
              if (t2.throw) {
                if (i3 = !!t2.throw(e5).done) {
                  r4(0);
                }
              } else {
                throw e5;
              }
            }
          }
        }
        a2 = false;
      }
    }));
  };
}
function fromValue(e3) {
  return (r4) => {
    var t2 = false;
    r4(start((i3) => {
      if (1 === i3) {
        t2 = true;
      } else if (!t2) {
        t2 = true;
        r4(push(e3));
        r4(0);
      }
    }));
  };
}
function make(e3) {
  return (r4) => {
    var t2 = false;
    var i3 = e3({
      next(e4) {
        if (!t2) {
          r4(push(e4));
        }
      },
      complete() {
        if (!t2) {
          t2 = true;
          r4(0);
        }
      }
    });
    r4(start((e4) => {
      if (1 === e4 && !t2) {
        t2 = true;
        i3();
      }
    }));
  };
}
function makeSubject() {
  var e3;
  var r4;
  return {
    source: share(make((t2) => {
      e3 = t2.next;
      r4 = t2.complete;
      return teardownPlaceholder;
    })),
    next(r5) {
      if (e3) {
        e3(r5);
      }
    },
    complete() {
      if (r4) {
        r4();
      }
    }
  };
}
function subscribe(r4) {
  return (t2) => {
    var i3 = e2;
    var a2 = false;
    t2((e3) => {
      if (0 === e3) {
        a2 = true;
      } else if (0 === e3.tag) {
        (i3 = e3[0])(0);
      } else if (!a2) {
        r4(e3[0]);
        i3(0);
      }
    });
    return {
      unsubscribe() {
        if (!a2) {
          a2 = true;
          i3(1);
        }
      }
    };
  };
}
function publish(e3) {
  subscribe((e4) => {
  })(e3);
}
function toPromise(r4) {
  return new Promise((t2) => {
    var i3 = e2;
    var a2;
    r4((e3) => {
      if (0 === e3) {
        Promise.resolve(a2).then(t2);
      } else if (0 === e3.tag) {
        (i3 = e3[0])(0);
      } else {
        a2 = e3[0];
        i3(0);
      }
    });
  });
}
var teardownPlaceholder, e2, asyncIteratorSymbol, identity, r2;
var init_wonka_CkrEhcKe = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/wonka_CkrEhcKe.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    teardownPlaceholder = () => {
    };
    e2 = teardownPlaceholder;
    asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";
    identity = (e3) => e3;
    r2 = fromIterable;
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/@urql_CifOXjBQ.mjs
function makeFetchBody(e22) {
  var r22 = {
    query: void 0,
    documentId: void 0,
    operationName: getOperationName(e22.query),
    variables: e22.variables || void 0,
    extensions: e22.extensions
  };
  if ("documentId" in e22.query && e22.query.documentId && (!e22.query.definitions || !e22.query.definitions.length)) {
    r22.documentId = e22.query.documentId;
  } else if (!e22.extensions || !e22.extensions.persistedQuery || e22.extensions.persistedQuery.miss) {
    r22.query = stringifyDocument(e22.query);
  }
  return r22;
}
async function* streamBody(e22) {
  if (e22.body[Symbol.asyncIterator]) {
    for await (var r22 of e22.body) {
      yield toString(r22);
    }
  } else {
    var t2 = e22.body.getReader();
    var a2;
    try {
      while (!(a2 = await t2.read()).done) {
        yield toString(a2.value);
      }
    } finally {
      t2.cancel();
    }
  }
}
async function* split(e22, r22) {
  var t2 = "";
  var a2;
  for await (var o2 of e22) {
    t2 += o2;
    while ((a2 = t2.indexOf(r22)) > -1) {
      yield t2.slice(0, a2);
      t2 = t2.slice(a2 + r22.length);
    }
  }
}
async function* fetchOperation(e22, r22, t2) {
  var a2 = true;
  var o2 = null;
  var n2;
  try {
    yield await Promise.resolve();
    var s2 = (n2 = await (e22.context.fetch || fetch)(r22, t2)).headers.get("Content-Type") || "";
    var i22;
    if (/multipart\/mixed/i.test(s2)) {
      i22 = async function* parseMultipartMixed(e3, r32) {
        var t3 = e3.match(h2);
        var a3 = "--" + (t3 ? t3[1] : "-");
        var o3 = true;
        var n3;
        for await (var s3 of split(streamBody(r32), "\r\n" + a3)) {
          if (o3) {
            o3 = false;
            var i3 = s3.indexOf(a3);
            if (i3 > -1) {
              s3 = s3.slice(i3 + a3.length);
            } else {
              continue;
            }
          }
          try {
            yield n3 = JSON.parse(s3.slice(s3.indexOf("\r\n\r\n") + 4));
          } catch (e4) {
            if (!n3) {
              throw e4;
            }
          }
          if (n3 && false === n3.hasNext) {
            break;
          }
        }
        if (n3 && false !== n3.hasNext) {
          yield {
            hasNext: false
          };
        }
      }(s2, n2);
    } else if (/text\/event-stream/i.test(s2)) {
      i22 = async function* parseEventStream(e3) {
        var r32;
        for await (var t3 of split(streamBody(e3), "\n\n")) {
          var a3 = t3.match(m2);
          if (a3) {
            var o3 = a3[1];
            try {
              yield r32 = JSON.parse(o3);
            } catch (e4) {
              if (!r32) {
                throw e4;
              }
            }
            if (r32 && false === r32.hasNext) {
              break;
            }
          }
        }
        if (r32 && false !== r32.hasNext) {
          yield {
            hasNext: false
          };
        }
      }(n2);
    } else if (!/text\//i.test(s2)) {
      i22 = async function* parseJSON(e3) {
        yield JSON.parse(await e3.text());
      }(n2);
    } else {
      i22 = async function* parseMaybeJSON(e3) {
        var r32 = await e3.text();
        try {
          var t3 = JSON.parse(r32);
          if (false)
            ;
          yield t3;
        } catch (e4) {
          throw new Error(r32);
        }
      }(n2);
    }
    var f22;
    for await (var l22 of i22) {
      if (l22.pending && !o2) {
        f22 = l22.pending;
      } else if (l22.pending) {
        f22 = [...f22, ...l22.pending];
      }
      o2 = o2 ? mergeResultPatch(o2, l22, n2, f22) : makeResult(e22, l22, n2);
      a2 = false;
      yield o2;
      a2 = true;
    }
    if (!o2) {
      yield o2 = makeResult(e22, {}, n2);
    }
  } catch (r32) {
    if (!a2) {
      throw r32;
    }
    yield makeErrorResult(e22, n2 && (n2.status < 200 || n2.status >= 300) && n2.statusText ? new Error(n2.statusText) : r32, n2);
  }
}
function makeFetchSource(e22, r22, t2) {
  var a2;
  if ("undefined" != typeof AbortController) {
    t2.signal = (a2 = new AbortController()).signal;
  }
  return onEnd(() => {
    if (a2) {
      a2.abort();
    }
  })(filter((e3) => !!e3)(fromAsyncIterable(fetchOperation(e22, r22, t2))));
}
function withPromise(e22) {
  var source$ = (r22) => e22(r22);
  source$.toPromise = () => toPromise(take(1)(filter((e3) => !e3.stale && !e3.hasNext)(source$)));
  source$.then = (e3, r22) => source$.toPromise().then(e3, r22);
  source$.subscribe = (e3) => subscribe(e3)(source$);
  return source$;
}
function makeOperation(e22, r22, t2) {
  return {
    ...r22,
    kind: e22,
    context: r22.context ? {
      ...r22.context,
      ...t2
    } : t2 || r22.context
  };
}
function gql(n2) {
  var a2 = /* @__PURE__ */ new Map();
  var o2 = [];
  var i22 = [];
  var s2 = Array.isArray(n2) ? n2[0] : n2 || "";
  for (var c2 = 1; c2 < arguments.length; c2++) {
    var u22 = arguments[c2];
    if (u22 && u22.definitions) {
      i22.push(u22);
    } else {
      s2 += u22;
    }
    s2 += arguments[0][c2];
  }
  i22.unshift(keyDocument(s2));
  for (var p22 of i22) {
    for (var d22 of p22.definitions) {
      if (d22.kind === e.FRAGMENT_DEFINITION) {
        var v22 = d22.name.value;
        var l22 = stringifyDocument(d22);
        if (!a2.has(v22)) {
          a2.set(v22, l22);
          o2.push(d22);
        }
      } else {
        o2.push(d22);
      }
    }
  }
  return keyDocument({
    kind: e.DOCUMENT,
    definitions: o2
  });
}
var rehydrateGraphQlError, CombinedError, phash, i2, f2, stringify, extract, stringifyVariables, NoopConstructor, l2, c, d2, v2, replaceOutsideStrings, sanitizeDocument, p2, u2, stringifyDocument, hashDocument, keyDocument, createRequest, getOperationName, makeResult, deepMerge, mergeResultPatch, makeErrorResult, makeFetchURL, splitOutSearchParams, serializeBody, makeFetchOptions, y, h2, m2, toString, noop2, fetchExchange, composeExchanges, fallbackExchange, C;
var init_urql_CifOXjBQ = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/@urql_CifOXjBQ.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_no_co_Dxoah_iz();
    init_wonka_CkrEhcKe();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    rehydrateGraphQlError = (r22) => {
      if (r22 && r22.message && (r22.extensions || "GraphQLError" === r22.name)) {
        return r22;
      } else if ("object" == typeof r22 && r22.message) {
        return new GraphQLError(r22.message, r22.nodes, r22.source, r22.positions, r22.path, r22, r22.extensions || {});
      } else {
        return new GraphQLError(r22);
      }
    };
    CombinedError = class extends Error {
      constructor(e22) {
        var r22 = (e22.graphQLErrors || []).map(rehydrateGraphQlError);
        var t2 = ((e3, r32) => {
          var t3 = "";
          if (e3) {
            return `[Network] ${e3.message}`;
          }
          if (r32) {
            for (var a2 of r32) {
              if (t3) {
                t3 += "\n";
              }
              t3 += `[GraphQL] ${a2.message}`;
            }
          }
          return t3;
        })(e22.networkError, r22);
        super(t2);
        this.name = "CombinedError";
        this.message = t2;
        this.graphQLErrors = r22;
        this.networkError = e22.networkError;
        this.response = e22.response;
      }
      toString() {
        return this.message;
      }
    };
    phash = (e22, r22) => {
      var t2 = 0 | (r22 || 5381);
      for (var a2 = 0, o2 = 0 | e22.length; a2 < o2; a2++) {
        t2 = (t2 << 5) + t2 + e22.charCodeAt(a2);
      }
      return t2;
    };
    i2 = /* @__PURE__ */ new Set();
    f2 = /* @__PURE__ */ new WeakMap();
    stringify = (e22, r22) => {
      if (null === e22 || i2.has(e22)) {
        return "null";
      } else if ("object" != typeof e22) {
        return JSON.stringify(e22) || "";
      } else if (e22.toJSON) {
        return stringify(e22.toJSON(), r22);
      } else if (Array.isArray(e22)) {
        var t2 = "[";
        for (var a2 of e22) {
          if (t2.length > 1) {
            t2 += ",";
          }
          t2 += stringify(a2, r22) || "null";
        }
        return t2 += "]";
      } else if (!r22 && (l2 !== NoopConstructor && e22 instanceof l2 || c !== NoopConstructor && e22 instanceof c)) {
        return "null";
      }
      var o2 = Object.keys(e22).sort();
      if (!o2.length && e22.constructor && Object.getPrototypeOf(e22).constructor !== Object.prototype.constructor) {
        var n2 = f2.get(e22) || Math.random().toString(36).slice(2);
        f2.set(e22, n2);
        return stringify({
          __key: n2
        }, r22);
      }
      i2.add(e22);
      var s2 = "{";
      for (var d22 of o2) {
        var v22 = stringify(e22[d22], r22);
        if (v22) {
          if (s2.length > 1) {
            s2 += ",";
          }
          s2 += stringify(d22, r22) + ":" + v22;
        }
      }
      i2.delete(e22);
      return s2 += "}";
    };
    extract = (e22, r22, t2) => {
      if (null == t2 || "object" != typeof t2 || t2.toJSON || i2.has(t2))
        ;
      else if (Array.isArray(t2)) {
        for (var a2 = 0, o2 = t2.length; a2 < o2; a2++) {
          extract(e22, `${r22}.${a2}`, t2[a2]);
        }
      } else if (t2 instanceof l2 || t2 instanceof c) {
        e22.set(r22, t2);
      } else {
        i2.add(t2);
        for (var n2 of Object.keys(t2)) {
          extract(e22, `${r22}.${n2}`, t2[n2]);
        }
      }
    };
    stringifyVariables = (e22, r22) => {
      i2.clear();
      return stringify(e22, r22 || false);
    };
    NoopConstructor = class {
    };
    l2 = "undefined" != typeof File ? File : NoopConstructor;
    c = "undefined" != typeof Blob ? Blob : NoopConstructor;
    d2 = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;
    v2 = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;
    replaceOutsideStrings = (e22, r22) => r22 % 2 == 0 ? e22.replace(v2, "\n") : e22;
    sanitizeDocument = (e22) => e22.split(d2).map(replaceOutsideStrings).join("").trim();
    p2 = /* @__PURE__ */ new Map();
    u2 = /* @__PURE__ */ new Map();
    stringifyDocument = (e22) => {
      var t2;
      if ("string" == typeof e22) {
        t2 = sanitizeDocument(e22);
      } else if (e22.loc && u2.get(e22.__key) === e22) {
        t2 = e22.loc.source.body;
      } else {
        t2 = p2.get(e22) || sanitizeDocument(print(e22));
        p2.set(e22, t2);
      }
      if ("string" != typeof e22 && !e22.loc) {
        e22.loc = {
          start: 0,
          end: t2.length,
          source: {
            body: t2,
            name: "gql",
            locationOffset: {
              line: 1,
              column: 1
            }
          }
        };
      }
      return t2;
    };
    hashDocument = (e22) => {
      var r22;
      if (e22.documentId) {
        r22 = phash(e22.documentId);
      } else {
        r22 = phash(stringifyDocument(e22));
        if (e22.definitions) {
          var t2 = getOperationName(e22);
          if (t2) {
            r22 = phash(`
# ${t2}`, r22);
          }
        }
      }
      return r22;
    };
    keyDocument = (e22) => {
      var r22;
      var a2;
      if ("string" == typeof e22) {
        r22 = hashDocument(e22);
        a2 = u2.get(r22) || parse3(e22);
      } else {
        r22 = e22.__key || hashDocument(e22);
        a2 = u2.get(r22) || e22;
      }
      if (!a2.loc) {
        stringifyDocument(a2);
      }
      a2.__key = r22;
      u2.set(r22, a2);
      return a2;
    };
    createRequest = (e22, r22, t2) => {
      var a2 = r22 || {};
      var o2 = keyDocument(e22);
      var n2 = stringifyVariables(a2, true);
      var s2 = o2.__key;
      if ("{}" !== n2) {
        s2 = phash(n2, s2);
      }
      return {
        key: s2,
        query: o2,
        variables: a2,
        extensions: t2
      };
    };
    getOperationName = (e22) => {
      for (var r22 of e22.definitions) {
        if (r22.kind === e.OPERATION_DEFINITION) {
          return r22.name ? r22.name.value : void 0;
        }
      }
    };
    makeResult = (e22, r22, t2) => {
      if (!("data" in r22 || "errors" in r22 && Array.isArray(r22.errors))) {
        throw new Error("No Content");
      }
      var a2 = "subscription" === e22.kind;
      return {
        operation: e22,
        data: r22.data,
        error: Array.isArray(r22.errors) ? new CombinedError({
          graphQLErrors: r22.errors,
          response: t2
        }) : void 0,
        extensions: r22.extensions ? {
          ...r22.extensions
        } : void 0,
        hasNext: null == r22.hasNext ? a2 : r22.hasNext,
        stale: false
      };
    };
    deepMerge = (e22, r22) => {
      if ("object" == typeof e22 && null != e22) {
        if (!e22.constructor || e22.constructor === Object || Array.isArray(e22)) {
          e22 = Array.isArray(e22) ? [...e22] : {
            ...e22
          };
          for (var t2 of Object.keys(r22)) {
            e22[t2] = deepMerge(e22[t2], r22[t2]);
          }
          return e22;
        }
      }
      return r22;
    };
    mergeResultPatch = (e22, r22, t2, a2) => {
      var o2 = e22.error ? e22.error.graphQLErrors : [];
      var n2 = !!e22.extensions || !!(r22.payload || r22).extensions;
      var s2 = {
        ...e22.extensions,
        ...(r22.payload || r22).extensions
      };
      var i22 = r22.incremental;
      if ("path" in r22) {
        i22 = [r22];
      }
      var f22 = {
        data: e22.data
      };
      if (i22) {
        var _loop = function(e3) {
          if (Array.isArray(e3.errors)) {
            o2.push(...e3.errors);
          }
          if (e3.extensions) {
            Object.assign(s2, e3.extensions);
            n2 = true;
          }
          var r32 = "data";
          var t3 = f22;
          var i3 = [];
          if (e3.path) {
            i3 = e3.path;
          } else if (a2) {
            var l3 = a2.find((r4) => r4.id === e3.id);
            if (e3.subPath) {
              i3 = [...l3.path, ...e3.subPath];
            } else {
              i3 = l3.path;
            }
          }
          for (var c2 = 0, d22 = i3.length; c2 < d22; r32 = i3[c2++]) {
            t3 = t3[r32] = Array.isArray(t3[r32]) ? [...t3[r32]] : {
              ...t3[r32]
            };
          }
          if (e3.items) {
            var v22 = +r32 >= 0 ? r32 : 0;
            for (var p22 = 0, u22 = e3.items.length; p22 < u22; p22++) {
              t3[v22 + p22] = deepMerge(t3[v22 + p22], e3.items[p22]);
            }
          } else if (void 0 !== e3.data) {
            t3[r32] = deepMerge(t3[r32], e3.data);
          }
        };
        for (var l22 of i22) {
          _loop(l22);
        }
      } else {
        f22.data = (r22.payload || r22).data || e22.data;
        o2 = r22.errors || r22.payload && r22.payload.errors || o2;
      }
      return {
        operation: e22.operation,
        data: f22.data,
        error: o2.length ? new CombinedError({
          graphQLErrors: o2,
          response: t2
        }) : void 0,
        extensions: n2 ? s2 : void 0,
        hasNext: null != r22.hasNext ? r22.hasNext : e22.hasNext,
        stale: false
      };
    };
    makeErrorResult = (e22, r22, t2) => ({
      operation: e22,
      data: void 0,
      error: new CombinedError({
        networkError: r22,
        response: t2
      }),
      extensions: void 0,
      hasNext: false,
      stale: false
    });
    makeFetchURL = (e22, r22) => {
      var t2 = "query" === e22.kind && e22.context.preferGetMethod;
      if (!t2 || !r22) {
        return e22.context.url;
      }
      var a2 = splitOutSearchParams(e22.context.url);
      for (var o2 in r22) {
        var n2 = r22[o2];
        if (n2) {
          a2[1].set(o2, "object" == typeof n2 ? stringifyVariables(n2) : n2);
        }
      }
      var s2 = a2.join("?");
      if (s2.length > 2047 && "force" !== t2) {
        e22.context.preferGetMethod = false;
        return e22.context.url;
      }
      return s2;
    };
    splitOutSearchParams = (e22) => {
      var r22 = e22.indexOf("?");
      return r22 > -1 ? [e22.slice(0, r22), new URLSearchParams(e22.slice(r22 + 1))] : [e22, new URLSearchParams()];
    };
    serializeBody = (e22, r22) => {
      if (r22 && !("query" === e22.kind && !!e22.context.preferGetMethod)) {
        var t2 = stringifyVariables(r22);
        var a2 = ((e3) => {
          var r32 = /* @__PURE__ */ new Map();
          if (l2 !== NoopConstructor || c !== NoopConstructor) {
            i2.clear();
            extract(r32, "variables", e3);
          }
          return r32;
        })(r22.variables);
        if (a2.size) {
          var o2 = new FormData();
          o2.append("operations", t2);
          o2.append("map", stringifyVariables({
            ...[...a2.keys()].map((e3) => [e3])
          }));
          var n2 = 0;
          for (var s2 of a2.values()) {
            o2.append("" + n2++, s2);
          }
          return o2;
        }
        return t2;
      }
    };
    makeFetchOptions = (e22, r22) => {
      var t2 = {
        accept: "subscription" === e22.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
      };
      var a2 = ("function" == typeof e22.context.fetchOptions ? e22.context.fetchOptions() : e22.context.fetchOptions) || {};
      if (a2.headers) {
        if (((e3) => "has" in e3 && !Object.keys(e3).length)(a2.headers)) {
          a2.headers.forEach((e3, r32) => {
            t2[r32] = e3;
          });
        } else if (Array.isArray(a2.headers)) {
          a2.headers.forEach((e3, r32) => {
            if (Array.isArray(e3)) {
              if (t2[e3[0]]) {
                t2[e3[0]] = `${t2[e3[0]]},${e3[1]}`;
              } else {
                t2[e3[0]] = e3[1];
              }
            } else {
              t2[r32] = e3;
            }
          });
        } else {
          for (var o2 in a2.headers) {
            t2[o2.toLowerCase()] = a2.headers[o2];
          }
        }
      }
      var n2 = serializeBody(e22, r22);
      if ("string" == typeof n2 && !t2["content-type"]) {
        t2["content-type"] = "application/json";
      }
      return {
        ...a2,
        method: n2 ? "POST" : "GET",
        body: n2,
        headers: t2
      };
    };
    y = "undefined" != typeof TextDecoder ? new TextDecoder() : null;
    h2 = /boundary="?([^=";]+)"?/i;
    m2 = /data: ?([^\n]+)/;
    toString = (e22) => "Buffer" === e22.constructor.name ? e22.toString() : y.decode(e22);
    noop2 = () => {
    };
    fetchExchange = ({ forward: e22, dispatchDebug: r22 }) => (t2) => {
      var n2 = mergeMap((e3) => {
        var n3 = makeFetchBody(e3);
        var a3 = makeFetchURL(e3, n3);
        var i22 = makeFetchOptions(e3, n3);
        var s2 = takeUntil(filter((r32) => "teardown" === r32.kind && r32.key === e3.key)(t2))(makeFetchSource(e3, a3, i22));
        return s2;
      })(filter((e3) => "teardown" !== e3.kind && ("subscription" !== e3.kind || !!e3.context.fetchSubscriptions))(t2));
      var a2 = e22(filter((e3) => "teardown" === e3.kind || "subscription" === e3.kind && !e3.context.fetchSubscriptions)(t2));
      return merge([n2, a2]);
    };
    composeExchanges = (e22) => ({ client: r22, forward: t2, dispatchDebug: n2 }) => e22.reduceRight((e3, t3) => {
      return t3({
        client: r22,
        forward(r32) {
          return share(e3(share(r32)));
        },
        dispatchDebug(e4) {
        }
      });
    }, t2);
    fallbackExchange = ({ dispatchDebug: e22 }) => (r22) => {
      return filter((e3) => false)(r22);
    };
    C = function Client(e22) {
      var r22 = 0;
      var t2 = /* @__PURE__ */ new Map();
      var n2 = /* @__PURE__ */ new Map();
      var a2 = /* @__PURE__ */ new Set();
      var o2 = [];
      var i22 = {
        url: e22.url,
        fetchSubscriptions: e22.fetchSubscriptions,
        fetchOptions: e22.fetchOptions,
        fetch: e22.fetch,
        preferGetMethod: e22.preferGetMethod,
        requestPolicy: e22.requestPolicy || "cache-first"
      };
      var s2 = makeSubject();
      function nextOperation(e3) {
        if ("mutation" === e3.kind || "teardown" === e3.kind || !a2.has(e3.key)) {
          if ("teardown" === e3.kind) {
            a2.delete(e3.key);
          } else if ("mutation" !== e3.kind) {
            a2.add(e3.key);
          }
          s2.next(e3);
        }
      }
      var c2 = false;
      function dispatchOperation(e3) {
        if (e3) {
          nextOperation(e3);
        }
        if (!c2) {
          c2 = true;
          while (c2 && (e3 = o2.shift())) {
            nextOperation(e3);
          }
          c2 = false;
        }
      }
      var makeResultSource = (e3) => {
        var r32 = takeUntil(filter((r4) => "teardown" === r4.kind && r4.key === e3.key)(s2.source))(filter((r4) => r4.operation.kind === e3.kind && r4.operation.key === e3.key && (!r4.operation.context._instance || r4.operation.context._instance === e3.context._instance))(O2));
        if ("query" !== e3.kind) {
          r32 = takeWhile((e4) => !!e4.hasNext)(r32);
        } else {
          r32 = switchMap((r4) => {
            var t3 = fromValue(r4);
            return r4.stale || r4.hasNext ? t3 : merge([t3, map(() => {
              r4.stale = true;
              return r4;
            })(take(1)(filter((r5) => r5.key === e3.key)(s2.source)))]);
          })(r32);
        }
        if ("mutation" !== e3.kind) {
          r32 = onEnd(() => {
            a2.delete(e3.key);
            t2.delete(e3.key);
            n2.delete(e3.key);
            c2 = false;
            for (var r4 = o2.length - 1; r4 >= 0; r4--) {
              if (o2[r4].key === e3.key) {
                o2.splice(r4, 1);
              }
            }
            nextOperation(makeOperation("teardown", e3, e3.context));
          })(onPush((r4) => {
            if (r4.stale) {
              if (!r4.hasNext) {
                a2.delete(e3.key);
              } else {
                for (var n3 of o2) {
                  if (n3.key === r4.operation.key) {
                    a2.delete(n3.key);
                    break;
                  }
                }
              }
            } else if (!r4.hasNext) {
              a2.delete(e3.key);
            }
            t2.set(e3.key, r4);
          })(r32));
        } else {
          r32 = onStart(() => {
            nextOperation(e3);
          })(r32);
        }
        return share(r32);
      };
      var u22 = this instanceof Client ? this : Object.create(Client.prototype);
      var p22 = Object.assign(u22, {
        suspense: !!e22.suspense,
        operations$: s2.source,
        reexecuteOperation(e3) {
          if ("teardown" === e3.kind) {
            dispatchOperation(e3);
          } else if ("mutation" === e3.kind) {
            o2.push(e3);
            Promise.resolve().then(dispatchOperation);
          } else if (n2.has(e3.key)) {
            var r32 = false;
            for (var t3 = 0; t3 < o2.length; t3++) {
              if (o2[t3].key === e3.key) {
                o2[t3] = e3;
                r32 = true;
              }
            }
            if (!(r32 || a2.has(e3.key) && "network-only" !== e3.context.requestPolicy)) {
              o2.push(e3);
              Promise.resolve().then(dispatchOperation);
            } else {
              a2.delete(e3.key);
              Promise.resolve().then(dispatchOperation);
            }
          }
        },
        createRequestOperation(e3, t3, n3) {
          if (!n3) {
            n3 = {};
          }
          return makeOperation(e3, t3, {
            _instance: "mutation" === e3 ? r22 = r22 + 1 | 0 : void 0,
            ...i22,
            ...n3,
            requestPolicy: n3.requestPolicy || i22.requestPolicy,
            suspense: n3.suspense || false !== n3.suspense && p22.suspense
          });
        },
        executeRequestOperation(e3) {
          if ("mutation" === e3.kind) {
            return withPromise(makeResultSource(e3));
          }
          return withPromise(lazy(() => {
            var r32 = n2.get(e3.key);
            if (!r32) {
              n2.set(e3.key, r32 = makeResultSource(e3));
            }
            r32 = onStart(() => {
              dispatchOperation(e3);
            })(r32);
            var a3 = t2.get(e3.key);
            if ("query" === e3.kind && a3 && (a3.stale || a3.hasNext)) {
              return switchMap(fromValue)(merge([r32, filter((r4) => r4 === t2.get(e3.key))(fromValue(a3))]));
            } else {
              return r32;
            }
          }));
        },
        executeQuery(e3, r32) {
          var t3 = p22.createRequestOperation("query", e3, r32);
          return p22.executeRequestOperation(t3);
        },
        executeSubscription(e3, r32) {
          var t3 = p22.createRequestOperation("subscription", e3, r32);
          return p22.executeRequestOperation(t3);
        },
        executeMutation(e3, r32) {
          var t3 = p22.createRequestOperation("mutation", e3, r32);
          return p22.executeRequestOperation(t3);
        },
        readQuery(e3, r32, t3) {
          var n3 = null;
          subscribe((e4) => {
            n3 = e4;
          })(p22.query(e3, r32, t3)).unsubscribe();
          return n3;
        },
        query: (e3, r32, t3) => p22.executeQuery(createRequest(e3, r32), t3),
        subscription: (e3, r32, t3) => p22.executeSubscription(createRequest(e3, r32), t3),
        mutation: (e3, r32, t3) => p22.executeMutation(createRequest(e3, r32), t3)
      });
      var d22 = noop2;
      var g2 = composeExchanges(e22.exchanges);
      var O2 = share(g2({
        client: p22,
        dispatchDebug: d22,
        forward: fallbackExchange({
          dispatchDebug: d22
        })
      })(s2.source));
      publish(O2);
      return p22;
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/cart_C5DUbUDf.mjs
var cart_C5DUbUDf_exports = {};
__export(cart_C5DUbUDf_exports, {
  a: () => getProductsByIds,
  b: () => getProducts,
  c: () => signUp,
  d: () => getTxByUUID,
  e: () => client,
  f: () => getStripePI,
  g: () => getFormById,
  h: () => getCart,
  i: () => createTx,
  j: () => uploadPaymentProof,
  k: () => getUserData,
  l: () => login,
  m: () => newGuestSession,
  n: () => newCart,
  o: () => cart_json,
  s: () => signOut,
  u: () => updateTx,
  v: () => validateSession
});
async function PUT({ request }) {
  const body = await request.json();
  let data = await updateCart(body);
  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
var gql_url, client, getProducts, signUp, validateSession, login, getUserData, newCart, newGuestSession, signOut, getCart, updateCart, getFormById, getProductsByIds, createTx, updateTx, getTxByUUID, uploadPaymentProof, getStripePI, cart_json;
var init_cart_C5DUbUDf = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/cart_C5DUbUDf.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_urql_CifOXjBQ();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    gql_url = "https://gql.tipr.at";
    client = new C({
      url: gql_url,
      exchanges: [fetchExchange],
      fetchOptions: () => {
        return {
          headers: { "api-key": "sk_tar_403u3SjxF9" }
        };
      }
    });
    getProducts = async () => {
      const RunProductQuery = gql`
    mutation RunProductQuery($subject: String!, $method: String!, $query: JSON!) {
        runProductQuery(subject: $subject, method: $method, query: $query) {
            result
        }
    }
    `;
      let { data } = await client.mutation(RunProductQuery, {
        "subject": "product",
        "method": "findMany",
        "query": {}
      }).toPromise();
      return data.runProductQuery.result.result;
    };
    signUp = async (email, signature) => {
      const RunSignupQuery = gql`
        mutation Signup($email: String!, $signature: String!, $metadata: JSON) {
            signup(email: $email, signature: $signature, metadata: $metadata) {
                session {
                id
                userId
                fresh
                expiresAt
                }
                user {
                id
                email
                metadata
                }
                cookie
            }
        }
    `;
      let { data } = await client.mutation(RunSignupQuery, {
        "email": email,
        "signature": signature,
        "metadata": {}
      }).toPromise();
      return data.signup;
    };
    validateSession = async (sessionId) => {
      const ValidateSessionQuery = gql`
    mutation ValidateSession($sessionId: String!) {
      validateSession(sessionId: $sessionId) {
        session
        user
        cookie
      }
    }
  `;
      let { data } = await client.mutation(ValidateSessionQuery, {
        "sessionId": sessionId
      }).toPromise();
      return data.validateSession;
    };
    login = async (email, signature) => {
      const LoginMutation = gql`
    mutation Login($email: String!, $signature: String!) {
      login(email: $email, signature: $signature) {
        user {
          metadata
          id
          email
        }
        cookie
        session {
          expiresAt
          fresh
          id
          userId
        }
      }
    }
  `;
      let { data } = await client.mutation(LoginMutation, {
        "email": email,
        "signature": signature,
        "metadata": {}
      }).toPromise();
      return data.login;
    };
    getUserData = async (userId) => {
      const GetUserQuery = gql`
    query GetUserByID($userId: String!) {
      getUserByID(userID: $userId) {
        user {
          id
          email
          metadata
        }
      }
      getCartByOwner(ownerId: $userId) {
        id
        owner
        metadata
        items
      }
      getTxByOwner(owner_id: $userId) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
      let { data } = await client.query(GetUserQuery, {
        "userId": userId
      }).toPromise();
      return {
        user: data.getUserByID.user,
        cart: data.getCartByOwner,
        tx: data.getTxByOwner
      };
    };
    newCart = async (ownerId) => {
      const CreateCartMutation = gql`
    mutation CreateCart($metadata: JSON, $owner: String) {
      createCart(metadata: $metadata, owner: $owner) {
        id
        owner
        metadata
        items
      }
    }
  `;
      let { data } = await client.mutation(CreateCartMutation, {
        "metadata": null,
        "owner": ownerId
      }).toPromise();
      console.log(data);
      return data.createCart;
    };
    newGuestSession = async (metadata) => {
      const NewGuestSessionMutation = gql`
      mutation GuestSession($metadata: JSON) {
        guestSession(metadata: $metadata) {
          session {
            id
            userId
            fresh
            expiresAt
          }
          user {
            id
            email
            metadata
          }
          cookie
        }
      }
    `;
      let { data } = await client.mutation(NewGuestSessionMutation, { metadata }).toPromise();
      return data.guestSession;
    };
    signOut = async (email) => {
      const SignoutMutation = gql`
      mutation Signout($email: String!) {
        signout(email: $email) {
          id
          email
          message
        }
      }
    `;
      let { data } = await client.mutation(SignoutMutation, {
        "email": email
      }).toPromise();
      return data.signout;
    };
    getCart = async (cartId) => {
      const GetCartQuery = gql`
    query GetCart($cartId: String!) {
      getCart(cartId: $cartId) {
        id
        owner
        metadata
        items
      }
    }
  `;
      let { data } = await client.query(GetCartQuery, {
        "cartId": cartId
      }).toPromise();
      return data.getCart;
    };
    updateCart = async (args) => {
      console.log("update cart");
      let _cart = await getCart(args.cartId);
      if (args.items)
        _cart.items = args.items;
      if (args.owner)
        _cart.owner = args.owner;
      if (args.metadata)
        _cart.metadata = args.metadata;
      console.log(_cart);
      _cart.cartId = args.cartId;
      delete _cart.id;
      const UpdateCartMutation = gql`
    mutation UpdateCart($cartId: String!, $items: JSON, $owner: String, $metadata: JSON) {
      updateCart(cartId: $cartId, items: $items, owner: $owner, metadata: $metadata) {
        id
        owner
        metadata
        items
      }
    }
  `;
      let { data } = await client.mutation(UpdateCartMutation, _cart).toPromise();
      return data.updateCart;
    };
    getFormById = async (formId) => {
      const GetFormByIdQuery = gql`
    query GetFormById($formId: Int!) {
      getFormById(formId: $formId) {
        id
        name
        description
        createdAt
        schema
        metadata
      }
    }
  `;
      let { data } = await client.query(GetFormByIdQuery, {
        "formId": formId
      }).toPromise();
      return data.getFormById;
    };
    getProductsByIds = async (productIds) => {
      const GetProductsByIdsQuery = gql`
    query ProductsByIds($productIds: [Int!]!) {
      productsByIds(productIds: $productIds) {
        id
        name
        media
        price
        status
        metadata {
          id
          key
          type
          value
        }
      }
    }
  `;
      let { data } = await client.query(GetProductsByIdsQuery, {
        "productIds": productIds
      }).toPromise();
      return data.productsByIds;
    };
    createTx = async (args) => {
      const CreateTxMutation = gql`
    mutation CreateTx(
      $entries: [EntryInput],
      $form: JSON,
      $metadata: [MetadataInput],
      $paymentType: String,
      $paymentMetadata: JSON,
      $status: String,
      $ownerId: String
    ) {
      createTx(
        entries: $entries,
        form: $form,
        metadata: $metadata,
        payment_type: $paymentType,
        payment_metadata: $paymentMetadata,
        status: $status,
        owner_id: $ownerId
      ) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
      let payload = { ...args };
      payload.entries = args.entries.map((entry) => {
        return {
          ...entry,
          entry_id: String(entry.entry_id)
        };
      });
      let _metadata = [];
      for (let key of Object.keys(args.metadata)) {
        _metadata.push({
          type: "attribute",
          key,
          value: args.metadata[key]
        });
      }
      payload.metadata = _metadata;
      let result = await client.mutation(CreateTxMutation, payload).toPromise();
      console.log(result);
      return result.data.createTx;
    };
    updateTx = async (uuid, status, paymentType, paymentMetadata) => {
      const UpdateTxMutation = gql`
    mutation UpdateTx($uuid: String!, $status: String, $paymentType: String, $paymentMetadata: JSON) {
      updateTx(uuid: $uuid, status: $status, payment_type: $paymentType, payment_metadata: $paymentMetadata) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
      let result = await client.mutation(UpdateTxMutation, {
        "uuid": uuid,
        "status": status,
        "paymentType": paymentType,
        "paymentMetadata": paymentMetadata
      }).toPromise();
      console.log(result);
      return result.data.updateTx;
    };
    getTxByUUID = async (uuid) => {
      const GetTxByUUIDQuery = gql`
    query GetTxByUUID($uuid: String!) {
      getTxByUUID(uuid: $uuid) {
        id
        uuid
        form
        owner_id
        status
        value
        payment_type
        payment_metadata
        createdAt
        entries {
          id
          entryId
          type
          value
          metadata
        }
        metadata {
          id
          type
          key
          value
        }
      }
    }
  `;
      let { data } = await client.query(GetTxByUUIDQuery, {
        "uuid": uuid
      }).toPromise();
      return data.getTxByUUID;
    };
    uploadPaymentProof = async (base64Data, extension) => {
      const UploadPaymentProofMutation = gql`
    mutation UploadPaymentProof($base64Data: String!, $extension: String!) {
      uploadPaymentProof(base64_data: $base64Data, extension: $extension) {
        url
        message
      }
    }
  `;
      let { data } = await client.mutation(UploadPaymentProofMutation, {
        "base64Data": base64Data,
        "extension": extension
      }).toPromise();
      return data.uploadPaymentProof;
    };
    getStripePI = async (amount, currency, prodMode, metadata) => {
      const GetStripePIMutation = gql`
    mutation GetStripePI($amount: Int!, $currency: String!, $prodMode: Boolean!, $metadata: JSON) {
      getStripePI(amount: $amount, currency: $currency, prod_mode: $prodMode, metadata: $metadata)
    }
  `;
      let { data } = await client.mutation(GetStripePIMutation, {
        "amount": amount,
        "currency": currency,
        "prodMode": prodMode,
        "metadata": metadata
      }).toPromise();
      return data.getStripePI;
    };
    cart_json = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      PUT
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/address_DMXQMX5x.mjs
var address_DMXQMX5x_exports = {};
__export(address_DMXQMX5x_exports, {
  POST: () => POST
});
async function POST({ request }) {
  const { address } = await request.json();
  console.log("address", address);
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDZ4CXCTm6__5wf_IOlBA9L5JbLm7-sR3I`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { results, status } = await response.json();
  if (status == "OK") {
    return new Response(
      JSON.stringify(results),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } else {
    return new Response(JSON.stringify({ error: "Invalid address" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
var init_address_DMXQMX5x = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/address_DMXQMX5x.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/address_BsomB-2O.mjs
var address_BsomB_2O_exports = {};
__export(address_BsomB_2O_exports, {
  page: () => page2,
  renderers: () => renderers
});
var page2;
var init_address_BsomB_2O = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/address_BsomB-2O.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page2 = () => Promise.resolve().then(() => (init_address_DMXQMX5x(), address_DMXQMX5x_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/cart_ZDCPxiAM.mjs
var cart_ZDCPxiAM_exports = {};
__export(cart_ZDCPxiAM_exports, {
  page: () => page3,
  renderers: () => renderers
});
var page3;
var init_cart_ZDCPxiAM = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/cart_ZDCPxiAM.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page3 = () => Promise.resolve().then(() => (init_cart_C5DUbUDf(), cart_C5DUbUDf_exports)).then((n2) => n2.o);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/products_CyE7Keql.mjs
var products_CyE7Keql_exports = {};
__export(products_CyE7Keql_exports, {
  GET: () => GET2
});
async function GET2() {
  const product = await getProducts2();
  if (!product) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  return new Response(
    JSON.stringify(product),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
var getProducts2;
var init_products_CyE7Keql = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/products_CyE7Keql.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_urql_CifOXjBQ();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    getProducts2 = async () => {
      const RunProductQuery = gql`
    mutation RunProductQuery($subject: String!, $method: String!, $query: JSON!) {
        runProductQuery(subject: $subject, method: $method, query: $query) {
            result
        }
    }
    `;
      let { data } = await client.mutation(RunProductQuery, {
        "subject": "product",
        "method": "findMany",
        "query": {}
      }).toPromise();
      return data.runProductQuery.result.result;
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/products_C5TE89rm.mjs
var products_C5TE89rm_exports = {};
__export(products_C5TE89rm_exports, {
  page: () => page4,
  renderers: () => renderers
});
var page4;
var init_products_C5TE89rm = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/products_C5TE89rm.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page4 = () => Promise.resolve().then(() => (init_products_CyE7Keql(), products_CyE7Keql_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/signup_Dm4OpuwX.mjs
var signup_Dm4OpuwX_exports = {};
__export(signup_Dm4OpuwX_exports, {
  POST: () => POST2
});
var POST2;
var init_signup_Dm4OpuwX = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/signup_Dm4OpuwX.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    POST2 = async ({ request, cookies, redirect }) => {
      const { email, signature, destination } = await request.json();
      console.log(request);
      return redirect(destination, 307);
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/signup_4kc9CLOn.mjs
var signup_4kc9CLOn_exports = {};
__export(signup_4kc9CLOn_exports, {
  page: () => page5,
  renderers: () => renderers
});
var page5;
var init_signup_4kc9CLOn = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/signup_4kc9CLOn.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page5 = () => Promise.resolve().then(() => (init_signup_Dm4OpuwX(), signup_Dm4OpuwX_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/stripe_pi_CHIIdJlV.mjs
var stripe_pi_CHIIdJlV_exports = {};
__export(stripe_pi_CHIIdJlV_exports, {
  POST: () => POST3
});
var POST3;
var init_stripe_pi_CHIIdJlV = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/stripe_pi_CHIIdJlV.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    POST3 = async ({ request, redirect }) => {
      const { amount, currency, prodMode, metadata } = await request.json();
      let result = await getStripePI(amount, currency, prodMode, metadata);
      return new Response(
        JSON.stringify(result),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/stripe_pi_BOnVhJIJ.mjs
var stripe_pi_BOnVhJIJ_exports = {};
__export(stripe_pi_BOnVhJIJ_exports, {
  page: () => page6,
  renderers: () => renderers
});
var page6;
var init_stripe_pi_BOnVhJIJ = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/stripe_pi_BOnVhJIJ.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page6 = () => Promise.resolve().then(() => (init_stripe_pi_CHIIdJlV(), stripe_pi_CHIIdJlV_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/stripe_webhook_Cew18lxx.mjs
var stripe_webhook_Cew18lxx_exports = {};
__export(stripe_webhook_Cew18lxx_exports, {
  POST: () => POST4
});
var POST4;
var init_stripe_webhook_Cew18lxx = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/stripe_webhook_Cew18lxx.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    POST4 = async ({ request, redirect }) => {
      const body = await request.json();
      console.log(body);
      let metadata = body.data.object.metadata;
      let result = await updateTx(
        metadata.tx_uuid,
        "paid",
        "stripe",
        body
      );
      return new Response(JSON.stringify(result), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/stripe_webhook_DwpvqpDB.mjs
var stripe_webhook_DwpvqpDB_exports = {};
__export(stripe_webhook_DwpvqpDB_exports, {
  page: () => page7,
  renderers: () => renderers
});
var page7;
var init_stripe_webhook_DwpvqpDB = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/stripe_webhook_DwpvqpDB.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page7 = () => Promise.resolve().then(() => (init_stripe_webhook_Cew18lxx(), stripe_webhook_Cew18lxx_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/tx_DdV8fKLF.mjs
var tx_DdV8fKLF_exports = {};
__export(tx_DdV8fKLF_exports, {
  GET: () => GET3,
  POST: () => POST5,
  PUT: () => PUT2
});
var GET3, POST5, PUT2;
var init_tx_DdV8fKLF = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/tx_DdV8fKLF.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    GET3 = async ({ request, redirect }) => {
      const tx = new URL(request.url).searchParams.get("tx");
      if (tx) {
        let result = await getTxByUUID(tx);
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      return new Response(null, {
        status: 404,
        statusText: "Not found"
      });
    };
    POST5 = async ({ request, redirect }) => {
      const { cartId, form, dry_run } = await request.json();
      console.log(request);
      let cart = await getCart(cartId);
      let item_ids = Object.keys(cart.items).map((key) => cart.items[key]);
      let products = await getProductsByIds(item_ids);
      products = products.map((product) => {
        return {
          ...product,
          quantity: cart.items[product?.id]
        };
      });
      let entries = [];
      for (let product of products) {
        entries.push({
          entry_id: product.id,
          metadata: {
            label: `${product.quantity} x ${product.name}`,
            product,
            quantity: product.quantity,
            price: product.price
          },
          type: "product",
          value: product.price * product.quantity
        });
      }
      if (form.delivery_method === "postal") {
        let address_metadata = form.metadata.address_metadata;
        let postage_cost_map = {
          "west_malaysia": { label: "West Malaysia", value: 10 },
          "east_malaysia": { label: "East Malaysia", value: 15 },
          "singapore": { label: "Singapore", value: 69.8 },
          "taiwan": { label: "Taiwan", value: 71.85 },
          "hong_kong": { label: "Hong Kong", value: 69.62 },
          "usa": { label: "USA", value: 82.98 },
          "default": { label: "Others", value: 82.98 }
        };
        let detect_non_malaysia_shipping = (_address_metadata) => {
          for (let component of _address_metadata.address_components) {
            if (component.types.includes("country")) {
              if (component.short_name === "MY") {
                return false;
              } else if (component.short_name === "SG") {
                return postage_cost_map["singapore"];
              } else if (component.short_name === "TW") {
                return postage_cost_map["taiwan"];
              } else if (component.short_name === "HK") {
                return postage_cost_map["hong_kong"];
              } else if (component.short_name === "US") {
                return postage_cost_map["usa"];
              } else {
                return postage_cost_map["default"];
              }
            }
          }
        };
        let atomic_shipping_type = detect_non_malaysia_shipping(address_metadata);
        if (atomic_shipping_type === false) {
          let state = address_metadata.address_components.find((component) => component.types.includes("administrative_area_level_1"));
          if (state && state.long_name === "Sabah" || state.long_name === "Sarawak") {
            atomic_shipping_type = postage_cost_map["east_malaysia"];
          } else {
            atomic_shipping_type = postage_cost_map["west_malaysia"];
          }
        }
        let total_postage_cost = Math.ceil(products.length / 3) * Number(atomic_shipping_type?.value);
        entries.push({
          entry_id: "postage",
          metadata: {
            label: `Postage cost (${atomic_shipping_type?.label})`,
            atomic_shipping_type,
            total_postage_cost
          },
          type: "postage",
          value: total_postage_cost
        });
      }
      if (dry_run) {
        let tx_data = {
          dry_run: true,
          entries,
          form,
          metadata: {
            cart_id: cartId,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          paymentType: "",
          status: "pending",
          ownerId: cart.owner,
          value: entries.reduce((acc, entry) => acc + entry.value, 0)
        };
        return new Response(JSON.stringify(tx_data), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        let tx = await createTx({
          entries,
          form,
          metadata: {
            cart_id: cartId,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          paymentType: null,
          paymentMetadata: null,
          status: "pending",
          ownerId: cart.owner
        });
        return redirect(`/pay?tx=${tx.uuid}`);
      }
    };
    PUT2 = async ({ request, redirect }) => {
      let { uuid, status, paymentType, paymentMetadata } = await request.json();
      await updateTx(
        uuid,
        status,
        paymentType,
        paymentMetadata
      );
      return redirect(`/complete?tx=${uuid}`);
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/tx_Bn3-_Z7-.mjs
var tx_Bn3_Z7_exports = {};
__export(tx_Bn3_Z7_exports, {
  page: () => page8,
  renderers: () => renderers
});
var page8;
var init_tx_Bn3_Z7 = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/tx_Bn3-_Z7-.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page8 = () => Promise.resolve().then(() => (init_tx_DdV8fKLF(), tx_DdV8fKLF_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/upload_CuC8f_0D.mjs
var upload_CuC8f_0D_exports = {};
__export(upload_CuC8f_0D_exports, {
  POST: () => POST6
});
var POST6;
var init_upload_CuC8f_0D = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/upload_CuC8f_0D.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    POST6 = async ({ request, redirect }) => {
      const { base64_data, extension } = await request.json();
      let response = await uploadPaymentProof(base64_data, extension);
      return new Response(JSON.stringify(response), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/upload_CfHCt1_S.mjs
var upload_CfHCt1_S_exports = {};
__export(upload_CfHCt1_S_exports, {
  page: () => page9,
  renderers: () => renderers
});
var page9;
var init_upload_CfHCt1_S = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/upload_CfHCt1_S.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page9 = () => Promise.resolve().then(() => (init_upload_CuC8f_0D(), upload_CuC8f_0D_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/checkout_5MIZC1oE.mjs
var checkout_5MIZC1oE_exports = {};
__export(checkout_5MIZC1oE_exports, {
  $: () => $$Layout,
  c: () => checkout
});
var $$Astro$12, $$Layout, $$Astro2, $$Checkout, $$file, $$url, checkout;
var init_checkout_5MIZC1oE = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/checkout_5MIZC1oE.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_kleur_BcFxsYqz();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Astro$12 = createAstro();
    $$Layout = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$12, $$props, $$slots);
      Astro2.self = $$Layout;
      Astro2.props;
      const { cart } = Astro2.locals;
      return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> ${renderComponent($$result, "CartStore", null, { "client:only": "vue", "user_cart": cart, "client:component-hydration": "only", "client:component-path": "@/components/Product/CartStore.vue", "client:component-export": "default" })} ${renderSlot2($$result, $$slots["default"])} </body></html>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/layouts/Layout.astro", void 0);
    $$Astro2 = createAstro();
    $$Checkout = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro2, $$props, $$slots);
      Astro2.self = $$Checkout;
      let form = await getFormById(1);
      let { cart } = Astro2.locals;
      let item_ids = Object.keys(cart.items).map((key) => cart.items[key]);
      let products = await getProductsByIds(item_ids);
      products = products.map((product) => {
        return {
          ...product,
          quantity: cart.items[product.id]
        };
      });
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Checkout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Checkout</h1> ${products.map(
        (product) => {
          return renderTemplate`<div class="grid grid-cols-4"> <img class="w-12 h-12 object-cover"${addAttribute(`${product.media.image}`, "src")}> <h2>${product.name}</h2> <p>RM ${product.price}</p> <p>Quantity: ${product.quantity}</p> </div>`;
        }
      )}<div class="p-4"> ${renderComponent($$result2, "CheckoutVue", null, { "client:only": "vue", "cart": cart, "products": products, "json_schema": form.schema.definitions.zodSchema, "field_config": form.metadata.field_config, "client:component-hydration": "only", "client:component-path": "@/components/Checkout/Checkout.vue", "client:component-export": "default" })} </div> ` })}`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/checkout.astro", void 0);
    $$file = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/checkout.astro";
    $$url = "/checkout";
    checkout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$Checkout,
      file: $$file,
      url: $$url
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/checkout_Cg4RZnhe.mjs
var checkout_Cg4RZnhe_exports = {};
__export(checkout_Cg4RZnhe_exports, {
  page: () => page10,
  renderers: () => renderers
});
var page10;
var init_checkout_Cg4RZnhe = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/checkout_Cg4RZnhe.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page10 = () => Promise.resolve().then(() => (init_checkout_5MIZC1oE(), checkout_5MIZC1oE_exports)).then((n2) => n2.c);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/complete_B53fkGvc.mjs
var complete_B53fkGvc_exports = {};
__export(complete_B53fkGvc_exports, {
  default: () => $$Complete,
  file: () => $$file2,
  url: () => $$url2
});
var $$Astro3, $$Complete, $$file2, $$url2;
var init_complete_B53fkGvc = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/complete_B53fkGvc.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_kleur_BcFxsYqz();
    init_checkout_5MIZC1oE();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Astro3 = createAstro();
    $$Complete = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro3, $$props, $$slots);
      Astro2.self = $$Complete;
      const tx_id = Astro2.url.searchParams.get("tx") || "";
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "complete" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>complete</p> <br>  ${renderComponent($$result2, "Status", null, { "client:only": "vue", "tx": tx_id, "client:component-hydration": "only", "client:component-path": "@/components/Complete/Status.vue", "client:component-export": "default" })} ` })}`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/complete.astro", void 0);
    $$file2 = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/complete.astro";
    $$url2 = "/complete";
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/complete_BpqRJ5Tu.mjs
var complete_BpqRJ5Tu_exports = {};
__export(complete_BpqRJ5Tu_exports, {
  page: () => page11,
  renderers: () => renderers
});
var page11;
var init_complete_BpqRJ5Tu = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/complete_BpqRJ5Tu.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page11 = () => Promise.resolve().then(() => (init_complete_B53fkGvc(), complete_B53fkGvc_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/history_DRfg9yQZ.mjs
var history_DRfg9yQZ_exports = {};
__export(history_DRfg9yQZ_exports, {
  _: () => _export_sfc,
  h: () => history
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto p-0.5" }, _attrs))} data-v-61b3d4e1><div class="grid gap-4 overflow-y-auto" data-v-61b3d4e1><div class="flex flex-col justify-between" data-v-61b3d4e1><!--[-->`);
  ssrRenderList($setup.purchaseHistory, (order, index) => {
    _push(`<div class="product-card flex justify-between items-center p-4 bg-white" data-v-61b3d4e1><div class="product-info flex-grow" data-v-61b3d4e1><div class="flex justify-between" data-v-61b3d4e1><div class="flex flex-col" data-v-61b3d4e1><p class="text-lg font-semibold" data-v-61b3d4e1>${ssrInterpolate(order.date)}</p></div><div class="flex flex-col items-end" data-v-61b3d4e1><p class="my-2 font-semibold" data-v-61b3d4e1>\u8BA2\u8D2DID: ${ssrInterpolate(order.orderId)}</p></div></div><hr data-v-61b3d4e1><div class="flex justify-between items-center space-x-4 my-4" data-v-61b3d4e1><div class="flex items-center space-x-4" data-v-61b3d4e1><img src="/img/profile2.webp" class="w-16 h-16 object-cover rounded-lg" data-v-61b3d4e1><div class="flex flex-col" data-v-61b3d4e1><h3 class="font-semibold text-green-600" data-v-61b3d4e1>${ssrInterpolate(order.orderStatus)}</h3><h3 class="text-lg font-semibold" data-v-61b3d4e1>${ssrInterpolate(order.productName)}</h3><p class="text-sm text-gray-500" data-v-61b3d4e1>RM ${ssrInterpolate(order.productPrice.toFixed(2))}</p></div></div><div class="flex flex-col items-end" data-v-61b3d4e1><p class="font-semibold" data-v-61b3d4e1>Tracking No.: ${ssrInterpolate(order.trackingId)}</p><p class="font-semibold" data-v-61b3d4e1>x${ssrInterpolate(order.productQuantity)}</p></div></div><hr data-v-61b3d4e1><div class="flex justify-end" data-v-61b3d4e1><div class="flex flex-col" data-v-61b3d4e1><p class="mt-3 mb-1 mr-8" data-v-61b3d4e1>\u5C0F\u8BA1</p><p class="my-1" data-v-61b3d4e1>\u8FD0\u8D39</p><p class="my-1 font-semibold" data-v-61b3d4e1>\u603B\u8BA1</p></div><div class="flex flex-col" data-v-61b3d4e1><p class="mt-3 mb-1 mr-2" data-v-61b3d4e1>RM</p><p class="my-1" data-v-61b3d4e1>RM</p><p class="my-1 font-semibold" data-v-61b3d4e1>RM</p></div><div class="flex flex-col items-end" data-v-61b3d4e1><p class="mt-3 mb-1" data-v-61b3d4e1>${ssrInterpolate(order.subtotal.toFixed(2))}</p><p class="my-1" data-v-61b3d4e1>${ssrInterpolate(order.shippingFee.toFixed(2))}</p><p class="my-1 font-semibold" data-v-61b3d4e1>${ssrInterpolate(order.totalPrice.toFixed(2))}</p></div></div><hr data-v-61b3d4e1></div></div>`);
  });
  _push(`<!--]--></div></div></div>`);
}
var _export_sfc, _sfc_main, _sfc_setup, HistoryList, $$Astro4, $$History, $$file3, $$url3, history;
var init_history_DRfg9yQZ = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/history_DRfg9yQZ.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_vue_BQBbmbrb();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    _export_sfc = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };
    _sfc_main = {
      __name: "HistoryList",
      setup(__props, { expose: __expose }) {
        __expose();
        const purchaseHistory = ref([
          {
            date: "2024-06-13",
            orderId: "ORD123456",
            orderStatus: "\u5DF2\u53D1\u8D27",
            trackingId: "TRK123456",
            productName: "Product 1",
            productPrice: 100,
            productQuantity: 2,
            subtotal: 200,
            shippingFee: 10,
            totalPrice: 210
          },
          {
            date: "2024-06-14",
            orderId: "ORD123457",
            orderStatus: "\u5DF2\u53D1\u8D27",
            trackingId: "TRK123457",
            productName: "Product 2",
            productPrice: 150,
            productQuantity: 1,
            subtotal: 150,
            shippingFee: 15,
            totalPrice: 165
          }
          // Add more dummy data as needed
        ]);
        const __returned__ = { purchaseHistory, ref };
        Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
        return __returned__;
      }
    };
    _sfc_setup = _sfc_main.setup;
    _sfc_main.setup = (props, ctx) => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/HistoryList.vue");
      return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
    };
    HistoryList = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-61b3d4e1"]]);
    $$Astro4 = createAstro();
    $$History = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro4, $$props, $$slots);
      Astro2.self = $$History;
      const props = Astro2.props;
      return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>购买记录</title>${renderHead()}</head> <body class="bg-gray-100"> <div class="max-w-screen-md mx-auto bg-white p-4 shadow-md rounded-md"> <div class="navbar flex justify-between items-center p-4 text-lg border-b"> <div class="sticky top-0 z-20"> <div class="flex items-center"> <a href="/" class="flex items-center"> <button class="menu-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"${spreadAttributes(props)}> <path fill="currentColor" d="m6.293 13.707l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L4.414 7H14a1 1 0 0 1 0 2H4.414l3.293 3.293a.997.997 0 0 1 0 1.414a.999.999 0 0 1-1.414 0"></path> </svg> </button> </a> <p class="ml-4 font-semibold">购买记录</p> </div> </div> </div> <hr> ${renderComponent($$result, "HistoryList", HistoryList, {})} </div> </body></html>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/history.astro", void 0);
    $$file3 = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/history.astro";
    $$url3 = "/history";
    history = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: $$History,
      file: $$file3,
      url: $$url3
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/history_MUVPxNJt.mjs
var history_MUVPxNJt_exports = {};
__export(history_MUVPxNJt_exports, {
  page: () => page12,
  renderers: () => renderers
});
var page12;
var init_history_MUVPxNJt = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/history_MUVPxNJt.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page12 = () => Promise.resolve().then(() => (init_history_DRfg9yQZ(), history_DRfg9yQZ_exports)).then((n2) => n2.h);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/login_bare_hRsmVAJ7.mjs
var login_bare_hRsmVAJ7_exports = {};
__export(login_bare_hRsmVAJ7_exports, {
  default: () => $$LoginBare,
  file: () => $$file4,
  url: () => $$url4
});
var __freeze, __defProp2, __template, _a, $$Astro5, $$LoginBare, $$file4, $$url4;
var init_login_bare_hRsmVAJ7 = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/login_bare_hRsmVAJ7.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_kleur_BcFxsYqz();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    __freeze = Object.freeze;
    __defProp2 = Object.defineProperty;
    __template = (cooked, raw) => __freeze(__defProp2(cooked, "raw", { value: __freeze(cooked.slice()) }));
    $$Astro5 = createAstro();
    $$LoginBare = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro5, $$props, $$slots);
      Astro2.self = $$LoginBare;
      return renderTemplate(_a || (_a = __template([`<!-- ---
// Didn't use alr
import { signUp, signOut } from '../lib/tarpit_gql'

// const local = Astro.locals as { cart: any, user: any }
// if(local) {
//   let { cart, user } = local
// }

if (Astro.request.method === "POST") {
  try {
    const data = await Astro.request.formData();
    // const name = data.get("username");
    
    const operation = String(data.get("operation"));
    
    if(operation == "logout") {

      await signOut(Astro.locals?.user?.email)
      
      Astro.cookies.delete("auth_session")
      return Astro.redirect('/')
    }
    
    if(operation === "signup"){

      const email = String(data.get("email"))
      const password = String(data.get("password"));

      // Do something with the data
      const encoder = new TextEncoder();
      const encoded_data = encoder.encode(String(password));

      let password_signature = await crypto.subtle.digest("SHA-256", encoded_data)
      const hashArray = Array.from(new Uint8Array(password_signature)); // convert buffer to byte array
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string

      // console.log(email, hashHex,operation);

      let result = await signUp(email,hashHex)

      if(result) {
        const { user,session,cookie} = result
        
        console.log(user,session,cookie)
  
        Astro.cookies.set(cookie.name, cookie.value, cookie.attributes)

        return Astro.redirect('/')

      }

    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}


---


<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ghost Remake</title>
</head>
<body>

    <h1>Sign Up</h1>

     {JSON.stringify(cart)}
     {JSON.stringify(user)} 

    
    <form id="signup_form" method="POST">
        <input hidden name="operation" value="signup">
        <input id="signup_email" name="email" type="email" placeholder="email">
        <input id="signup_password" name="password" type="password" placeholder="password">

        <button type="submit">Sign Up</button>
    </form>
  
    <h1>Login</h1>

    
    <form id="login_form" method="post">
        <input id="login_email" name="email" type="email" placeholder="email">
        <input id="login_password" name="password" type="password" placeholder="password">

        <button type="submit">Login</button>
    </form>

    <form method="post">
      <input hidden name="operation" value="logout">
        <button type="submit">Logout</button>
    </form>


    <script> 

       


        // document.getElementById("signup_form")?.addEventListener('submit', async (e)=>{
        //     e.preventDefault()

        //     const email = document.getElementById("signup_email")?.value
        //     const password = document.getElementById("signup_password")?.value
            
        //     const encoder = new TextEncoder();
        //     const data = encoder.encode(password);

        //     let password_signature = await crypto.subtle.digest("SHA-256", data)
        //     const hashArray = Array.from(new Uint8Array(password_signature)); // convert buffer to byte array
        //     const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
            

        //     console.log(email,hashHex)

        //     // call the /signup.json endpoint
        //     let result = await fetch("/api/signup.json", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             signature: hashHex,
        //             destination: '/'
        //         })
        //     })

        //     result = await result.json()

        //     console.log(result)

        // })


        document.getElementById("login_form")?.addEventListener('submit', async (e)=>{
            e.preventDefault()

            const email = document.getElementById("login_email")?.value
            const password = document.getElementById("login_password")?.value
            
            const encoder = new TextEncoder();
            const data = encoder.encode(password);

            let password_signature = await crypto.subtle.digest("SHA-256", data)
            const hashArray = Array.from(new Uint8Array(password_signature)); // convert buffer to byte array
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
            

            console.log(email,hashHex)
        })



    <\/script>

</body>
</html> -->`])));
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/login_bare.astro", void 0);
    $$file4 = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/login_bare.astro";
    $$url4 = "/login_bare";
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/login_bare_CsqMVRtH.mjs
var login_bare_CsqMVRtH_exports = {};
__export(login_bare_CsqMVRtH_exports, {
  page: () => page13,
  renderers: () => renderers
});
var page13;
var init_login_bare_CsqMVRtH = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/login_bare_CsqMVRtH.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page13 = () => Promise.resolve().then(() => (init_login_bare_hRsmVAJ7(), login_bare_hRsmVAJ7_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/pay_Bqb16qPn.mjs
var pay_Bqb16qPn_exports = {};
__export(pay_Bqb16qPn_exports, {
  default: () => $$Pay,
  file: () => $$file5,
  url: () => $$url5
});
var $$Astro6, $$Pay, $$file5, $$url5;
var init_pay_Bqb16qPn = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/pay_Bqb16qPn.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_kleur_BcFxsYqz();
    init_checkout_5MIZC1oE();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Astro6 = createAstro();
    $$Pay = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro6, $$props, $$slots);
      Astro2.self = $$Pay;
      const tx_id = Astro2.url.searchParams.get("tx") || "";
      let tx = await getTxByUUID(tx_id);
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pay" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>pay</p>  ${renderComponent($$result2, "PaymentForm", null, { "client:only": "vue", "uuid": tx_id, "tx": tx, "client:component-hydration": "only", "client:component-path": "@/components/Pay/PaymentForm.vue", "client:component-export": "default" })} ` })}`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/pay.astro", void 0);
    $$file5 = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/pay.astro";
    $$url5 = "/pay";
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pay_H7hbv0kO.mjs
var pay_H7hbv0kO_exports = {};
__export(pay_H7hbv0kO_exports, {
  page: () => page14,
  renderers: () => renderers
});
var page14;
var init_pay_H7hbv0kO = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pay_H7hbv0kO.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page14 = () => Promise.resolve().then(() => (init_pay_Bqb16qPn(), pay_Bqb16qPn_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/setting_ihIYgAA0.mjs
var setting_ihIYgAA0_exports = {};
__export(setting_ihIYgAA0_exports, {
  default: () => $$Setting,
  file: () => $$file6,
  url: () => $$url6
});
function _sfc_ssrRender2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h2 data-v-1a02dbcc>Sign Up Form</h2><form action="/action_page.php" method="post" data-v-1a02dbcc><div class="imgcontainer" data-v-1a02dbcc><img src="img/img_avatar2.png" alt="Avatar" class="avatar" data-v-1a02dbcc></div><div class="container" data-v-1a02dbcc><label for="uname" data-v-1a02dbcc><b data-v-1a02dbcc>Username</b></label><input type="text" placeholder="Enter Username" name="uname" required data-v-1a02dbcc><label for="psw" data-v-1a02dbcc><b data-v-1a02dbcc>Password</b></label><input type="password" placeholder="Enter Password" name="psw" required data-v-1a02dbcc><label for="confirm_psw" data-v-1a02dbcc><b data-v-1a02dbcc>Confirm Password</b></label><input type="password" placeholder="Enter Confirmed Password" name="psw" required data-v-1a02dbcc><button type="submit" data-v-1a02dbcc>Sign Up</button><label data-v-1a02dbcc><input type="checkbox" checked="checked" name="remember" data-v-1a02dbcc> Remember me </label></div></form><a href="/login" data-v-1a02dbcc><button data-v-1a02dbcc>Login</button></a><!--]-->`);
}
var _sfc_main2, _sfc_setup2, SignUp, $$Setting, $$file6, $$url6;
var init_setting_ihIYgAA0 = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/setting_ihIYgAA0.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_kleur_BcFxsYqz();
    init_history_DRfg9yQZ();
    init_vue_BQBbmbrb();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    _sfc_main2 = {
      __name: "SignUp",
      setup(__props, { expose: __expose }) {
        __expose();
        const email = ref("");
        const __returned__ = { email, ref };
        Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
        return __returned__;
      }
    };
    _sfc_setup2 = _sfc_main2.setup;
    _sfc_main2.setup = (props, ctx) => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SignUp.vue");
      return _sfc_setup2 ? _sfc_setup2(props, ctx) : void 0;
    };
    SignUp = /* @__PURE__ */ _export_sfc(_sfc_main2, [["ssrRender", _sfc_ssrRender2], ["__scopeId", "data-v-1a02dbcc"]]);
    $$Setting = createComponent(($$result, $$props, $$slots) => {
      return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> <h1>Setting</h1> ${renderComponent($$result, "SignUp", SignUp, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/SignUp.vue", "client:component-export": "default" })} </body></html>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/setting.astro", void 0);
    $$file6 = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/setting.astro";
    $$url6 = "/setting";
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/setting_DhYFBctx.mjs
var setting_DhYFBctx_exports = {};
__export(setting_DhYFBctx_exports, {
  page: () => page15,
  renderers: () => renderers
});
var page15;
var init_setting_DhYFBctx = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/setting_DhYFBctx.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page15 = () => Promise.resolve().then(() => (init_setting_ihIYgAA0(), setting_ihIYgAA0_exports));
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/@iconify_B6WbOEZr.mjs
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value2 = parent && resolve(parent);
      if (value2) {
        resolved[name] = [parent].concat(value2);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse4(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse4(name);
  tree.forEach(parse4);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
function calculateSize(size2, ratio, precision) {
  if (ratio === 1) {
    return size2;
  }
  precision = precision || 100;
  if (typeof size2 === "number") {
    return Math.ceil(size2 * ratio * precision) / precision;
  }
  if (typeof size2 !== "string") {
    return size2;
  }
  const oldParts = size2.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size2;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber2 = unitsTest.test(code);
  while (true) {
    if (isNumber2) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber2 = !isNumber2;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start2 = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start2 === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start2 + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start2, end) {
  const split2 = splitSVGDefs(body);
  return mergeDefsAndContent(split2.defs, start2 + split2.content + end);
}
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value2) => {
    if (!isUnsetKeyword(value2)) {
      attributes[prop] = value2.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a2, b) => {
    if (a2.provider !== b.provider) {
      return a2.provider.localeCompare(b.provider);
    }
    if (a2.prefix !== b.prefix) {
      return a2.prefix.localeCompare(b.prefix);
    }
    return a2.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue2 = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue2.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue2 = [];
  }
  function subscribe2(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue2.length,
      subscribe: subscribe2,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue2.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue2 = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue2 = queue2.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue2.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue2.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue2.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error3) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error3);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value2) => {
      return callback(value2);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value2) {
  try {
    func.setItem(key, value2);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value2) {
  return setStoredItem(storage2, browserCacheCountKey, value2.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version2 = getStoredItem(func, browserCacheVersionKey);
  if (version2 !== browserCacheVersion) {
    if (version2) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i3 = 0; i3 < total2; i3++) {
        removeStoredItem(func, browserCachePrefix + i3.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i3 = total - 1; i3 >= 0; i3--) {
    if (!parseItem(i3)) {
      if (i3 === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i3);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function updateLastModified(storage2, lastModified) {
  const lastValue = storage2.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage2.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage2.provider || iconSet.prefix !== storage2.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage2, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set2 = browserStorageEmptyItems[key];
    let index;
    if (set2.size) {
      set2.delete(index = Array.from(set2).shift());
    } else {
      index = getBrowserStorageItemsCount(func);
      if (index >= browserStorageLimit || !setBrowserStorageItemsCount(func, index + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage2.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name) => {
              storage2.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage2,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage2.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage2, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage2);
        });
      });
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value2 = item[key];
    const valueType = typeof value2;
    if (key in defaultIconSizeCustomisations) {
      if (value2 === null || value2 && (valueType === "string" || valueType === "number")) {
        result[key] = value2;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value2 % 4 : value2;
    }
  }
  return result;
}
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value2 = str.trim();
    switch (value2) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value2, defaultValue = 0) {
  const units2 = value2.replace(/^-?[0-9.]*/, "");
  function cleanup(value22) {
    while (value22 < 0) {
      value22 += 4;
    }
    return value22 % 4;
  }
  if (units2 === "") {
    const num = parseInt(value2);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units2 !== value2) {
    let split2 = 0;
    switch (units2) {
      case "%":
        split2 = 25;
        break;
      case "deg":
        split2 = 90;
    }
    if (split2) {
      let num = parseFloat(value2.slice(0, value2.length - units2.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split2;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
function fixSize(value2) {
  return value2 + (value2.match(/^[-0-9.]+$/) ? "px" : "");
}
var matchIconName, stringToIcon, validateIconName, defaultIconDimensions, defaultIconTransformations, defaultIconProps, defaultExtendedIconProps, optionalPropertyDefaults, dataStorage, simpleNames, defaultIconSizeCustomisations, defaultIconCustomisations, unitsSplit, unitsTest, isUnsetKeyword, regex, randomPrefix, counter, storage, configStorage, fallBackAPISources, fallBackAPI, detectFetch, fetchModule, prepare, send, fetchAPIModule, idCounter, defaultConfig, redundancyCache, browserCacheVersion, browserCachePrefix, browserCacheCountKey, browserCacheVersionKey, browserStorageHour, browserStorageCacheExpiration, browserStorageLimit, browserStorageConfig, browserStorageEmptyItems, browserStorageStatus, _window, loadIcons, separator, defaultExtendedIconCustomisations, svgDefaults, commonProps, monotoneProps, coloredProps, propsToAdd, propsToAddTo, customisationAliases, render, emptyIcon, Icon;
var init_iconify_B6WbOEZr = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/@iconify_B6WbOEZr.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_vue_BQBbmbrb();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    stringToIcon = (value2, validate, allowSimpleName, provider = "") => {
      const colonSeparated = value2.split(":");
      if (value2.slice(0, 1) === "@") {
        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
          return null;
        }
        provider = colonSeparated.shift().slice(1);
      }
      if (colonSeparated.length > 3 || !colonSeparated.length) {
        return null;
      }
      if (colonSeparated.length > 1) {
        const name2 = colonSeparated.pop();
        const prefix = colonSeparated.pop();
        const result = {
          // Allow provider without '@': "provider:prefix:name"
          provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
          prefix,
          name: name2
        };
        return validate && !validateIconName(result) ? null : result;
      }
      const name = colonSeparated[0];
      const dashSeparated = name.split("-");
      if (dashSeparated.length > 1) {
        const result = {
          provider,
          prefix: dashSeparated.shift(),
          name: dashSeparated.join("-")
        };
        return validate && !validateIconName(result) ? null : result;
      }
      if (allowSimpleName && provider === "") {
        const result = {
          provider,
          prefix: "",
          name
        };
        return validate && !validateIconName(result, allowSimpleName) ? null : result;
      }
      return null;
    };
    validateIconName = (icon, allowSimpleName) => {
      if (!icon) {
        return false;
      }
      return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
    };
    defaultIconDimensions = Object.freeze(
      {
        left: 0,
        top: 0,
        width: 16,
        height: 16
      }
    );
    defaultIconTransformations = Object.freeze({
      rotate: 0,
      vFlip: false,
      hFlip: false
    });
    defaultIconProps = Object.freeze({
      ...defaultIconDimensions,
      ...defaultIconTransformations
    });
    defaultExtendedIconProps = Object.freeze({
      ...defaultIconProps,
      body: "",
      hidden: false
    });
    optionalPropertyDefaults = {
      provider: "",
      aliases: {},
      not_found: {},
      ...defaultIconDimensions
    };
    dataStorage = /* @__PURE__ */ Object.create(null);
    simpleNames = false;
    defaultIconSizeCustomisations = Object.freeze({
      width: null,
      height: null
    });
    defaultIconCustomisations = Object.freeze({
      // Dimensions
      ...defaultIconSizeCustomisations,
      // Transformations
      ...defaultIconTransformations
    });
    unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
    unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    isUnsetKeyword = (value2) => value2 === "unset" || value2 === "undefined" || value2 === "none";
    regex = /\sid="(\S+)"/g;
    randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
    counter = 0;
    storage = /* @__PURE__ */ Object.create(null);
    configStorage = /* @__PURE__ */ Object.create(null);
    fallBackAPISources = [
      "https://api.simplesvg.com",
      "https://api.unisvg.com"
    ];
    fallBackAPI = [];
    while (fallBackAPISources.length > 0) {
      if (fallBackAPISources.length === 1) {
        fallBackAPI.push(fallBackAPISources.shift());
      } else {
        if (Math.random() > 0.5) {
          fallBackAPI.push(fallBackAPISources.shift());
        } else {
          fallBackAPI.push(fallBackAPISources.pop());
        }
      }
    }
    configStorage[""] = createAPIConfig({
      resources: ["https://api.iconify.design"].concat(fallBackAPI)
    });
    detectFetch = () => {
      let callback;
      try {
        callback = fetch;
        if (typeof callback === "function") {
          return callback;
        }
      } catch (err) {
      }
    };
    fetchModule = detectFetch();
    prepare = (provider, prefix, icons) => {
      const results = [];
      const maxLength = calculateMaxLength(provider, prefix);
      const type2 = "icons";
      let item = {
        type: type2,
        provider,
        prefix,
        icons: []
      };
      let length = 0;
      icons.forEach((name, index) => {
        length += name.length + 1;
        if (length >= maxLength && index > 0) {
          results.push(item);
          item = {
            type: type2,
            provider,
            prefix,
            icons: []
          };
          length = name.length;
        }
        item.icons.push(name);
      });
      results.push(item);
      return results;
    };
    send = (host, params, callback) => {
      if (!fetchModule) {
        callback("abort", 424);
        return;
      }
      let path = getPath(params.provider);
      switch (params.type) {
        case "icons": {
          const prefix = params.prefix;
          const icons = params.icons;
          const iconsList = icons.join(",");
          const urlParams = new URLSearchParams({
            icons: iconsList
          });
          path += prefix + ".json?" + urlParams.toString();
          break;
        }
        case "custom": {
          const uri = params.uri;
          path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
          break;
        }
        default:
          callback("abort", 400);
          return;
      }
      let defaultError = 503;
      fetchModule(host + path).then((response) => {
        const status = response.status;
        if (status !== 200) {
          setTimeout(() => {
            callback(shouldAbort(status) ? "abort" : "next", status);
          });
          return;
        }
        defaultError = 501;
        return response.json();
      }).then((data) => {
        if (typeof data !== "object" || data === null) {
          setTimeout(() => {
            if (data === 404) {
              callback("abort", data);
            } else {
              callback("next", defaultError);
            }
          });
          return;
        }
        setTimeout(() => {
          callback("success", data);
        });
      }).catch(() => {
        callback("next", defaultError);
      });
    };
    fetchAPIModule = {
      prepare,
      send
    };
    idCounter = 0;
    defaultConfig = {
      resources: [],
      index: 0,
      timeout: 2e3,
      rotate: 750,
      random: false,
      dataAfterTimeout: false
    };
    redundancyCache = /* @__PURE__ */ Object.create(null);
    browserCacheVersion = "iconify2";
    browserCachePrefix = "iconify";
    browserCacheCountKey = browserCachePrefix + "-count";
    browserCacheVersionKey = browserCachePrefix + "-version";
    browserStorageHour = 36e5;
    browserStorageCacheExpiration = 168;
    browserStorageLimit = 50;
    browserStorageConfig = {
      local: true,
      session: true
    };
    browserStorageEmptyItems = {
      local: /* @__PURE__ */ new Set(),
      session: /* @__PURE__ */ new Set()
    };
    browserStorageStatus = false;
    _window = typeof window === "undefined" ? {} : window;
    loadIcons = (icons, callback) => {
      const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
      const sortedIcons = sortIcons(cleanedIcons);
      if (!sortedIcons.pending.length) {
        let callCallback = true;
        if (callback) {
          setTimeout(() => {
            if (callCallback) {
              callback(
                sortedIcons.loaded,
                sortedIcons.missing,
                sortedIcons.pending,
                emptyCallback
              );
            }
          });
        }
        return () => {
          callCallback = false;
        };
      }
      const newIcons = /* @__PURE__ */ Object.create(null);
      const sources = [];
      let lastProvider, lastPrefix;
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix } = icon;
        if (prefix === lastPrefix && provider === lastProvider) {
          return;
        }
        lastProvider = provider;
        lastPrefix = prefix;
        sources.push(getStorage(provider, prefix));
        const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
        if (!providerNewIcons[prefix]) {
          providerNewIcons[prefix] = [];
        }
      });
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix, name } = icon;
        const storage2 = getStorage(provider, prefix);
        const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
        if (!pendingQueue.has(name)) {
          pendingQueue.add(name);
          newIcons[provider][prefix].push(name);
        }
      });
      sources.forEach((storage2) => {
        const { provider, prefix } = storage2;
        if (newIcons[provider][prefix].length) {
          loadNewIcons(storage2, newIcons[provider][prefix]);
        }
      });
      return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
    };
    separator = /[\s,]+/;
    defaultExtendedIconCustomisations = {
      ...defaultIconCustomisations,
      inline: false
    };
    svgDefaults = {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "aria-hidden": true,
      "role": "img"
    };
    commonProps = {
      display: "inline-block"
    };
    monotoneProps = {
      backgroundColor: "currentColor"
    };
    coloredProps = {
      backgroundColor: "transparent"
    };
    propsToAdd = {
      Image: "var(--svg)",
      Repeat: "no-repeat",
      Size: "100% 100%"
    };
    propsToAddTo = {
      webkitMask: monotoneProps,
      mask: monotoneProps,
      background: coloredProps
    };
    for (const prefix in propsToAddTo) {
      const list = propsToAddTo[prefix];
      for (const prop in propsToAdd) {
        list[prefix + prop] = propsToAdd[prop];
      }
    }
    customisationAliases = {};
    ["horizontal", "vertical"].forEach((prefix) => {
      const attr = prefix.slice(0, 1) + "Flip";
      customisationAliases[prefix + "-flip"] = attr;
      customisationAliases[prefix.slice(0, 1) + "-flip"] = attr;
      customisationAliases[prefix + "Flip"] = attr;
    });
    render = (icon, props) => {
      const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
      const componentProps = { ...svgDefaults };
      const mode = props.mode || "svg";
      const style = {};
      const propsStyle = props.style;
      const customStyle = typeof propsStyle === "object" && !(propsStyle instanceof Array) ? propsStyle : {};
      for (let key in props) {
        const value2 = props[key];
        if (value2 === void 0) {
          continue;
        }
        switch (key) {
          case "icon":
          case "style":
          case "onLoad":
          case "mode":
            break;
          case "inline":
          case "hFlip":
          case "vFlip":
            customisations[key] = value2 === true || value2 === "true" || value2 === 1;
            break;
          case "flip":
            if (typeof value2 === "string") {
              flipFromString(customisations, value2);
            }
            break;
          case "color":
            style.color = value2;
            break;
          case "rotate":
            if (typeof value2 === "string") {
              customisations[key] = rotateFromString(value2);
            } else if (typeof value2 === "number") {
              customisations[key] = value2;
            }
            break;
          case "ariaHidden":
          case "aria-hidden":
            if (value2 !== true && value2 !== "true") {
              delete componentProps["aria-hidden"];
            }
            break;
          default: {
            const alias = customisationAliases[key];
            if (alias) {
              if (value2 === true || value2 === "true" || value2 === 1) {
                customisations[alias] = true;
              }
            } else if (defaultExtendedIconCustomisations[key] === void 0) {
              componentProps[key] = value2;
            }
          }
        }
      }
      const item = iconToSVG(icon, customisations);
      const renderAttribs = item.attributes;
      if (customisations.inline) {
        style.verticalAlign = "-0.125em";
      }
      if (mode === "svg") {
        componentProps.style = {
          ...style,
          ...customStyle
        };
        Object.assign(componentProps, renderAttribs);
        let localCounter = 0;
        let id = props.id;
        if (typeof id === "string") {
          id = id.replace(/-/g, "_");
        }
        componentProps["innerHTML"] = replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifyVue");
        return h("svg", componentProps);
      }
      const { body, width, height } = icon;
      const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
      const html = iconToHTML(body, {
        ...renderAttribs,
        width: width + "",
        height: height + ""
      });
      componentProps.style = {
        ...style,
        "--svg": svgToURL(html),
        "width": fixSize(renderAttribs.width),
        "height": fixSize(renderAttribs.height),
        ...commonProps,
        ...useMask ? monotoneProps : coloredProps,
        ...customStyle
      };
      return h("span", componentProps);
    };
    allowSimpleNames(true);
    setAPIModule("", fetchAPIModule);
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      initBrowserStorage();
      const _window2 = window;
      if (_window2.IconifyPreload !== void 0) {
        const preload = _window2.IconifyPreload;
        const err = "Invalid IconifyPreload syntax.";
        if (typeof preload === "object" && preload !== null) {
          (preload instanceof Array ? preload : [preload]).forEach((item) => {
            try {
              if (
                // Check if item is an object and not null/array
                typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
                typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
                !addCollection(item)
              ) {
                console.error(err);
              }
            } catch (e3) {
              console.error(err);
            }
          });
        }
      }
      if (_window2.IconifyProviders !== void 0) {
        const providers = _window2.IconifyProviders;
        if (typeof providers === "object" && providers !== null) {
          for (let key in providers) {
            const err = "IconifyProviders[" + key + "] is invalid.";
            try {
              const value2 = providers[key];
              if (typeof value2 !== "object" || !value2 || value2.resources === void 0) {
                continue;
              }
              if (!addAPIProvider(key, value2)) {
                console.error(err);
              }
            } catch (e3) {
              console.error(err);
            }
          }
        }
      }
    }
    emptyIcon = {
      ...defaultIconProps,
      body: ""
    };
    Icon = defineComponent({
      // Do not inherit other attributes: it is handled by render()
      inheritAttrs: false,
      // Set initial data
      data() {
        return {
          // Current icon name
          _name: "",
          // Loading
          _loadingIcon: null,
          // Mounted status
          iconMounted: false,
          // Callback counter to trigger re-render
          counter: 0
        };
      },
      mounted() {
        this.iconMounted = true;
      },
      unmounted() {
        this.abortLoading();
      },
      methods: {
        abortLoading() {
          if (this._loadingIcon) {
            this._loadingIcon.abort();
            this._loadingIcon = null;
          }
        },
        // Get data for icon to render or null
        getIcon(icon, onload) {
          if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
            this._name = "";
            this.abortLoading();
            return {
              data: icon
            };
          }
          let iconName;
          if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
            this.abortLoading();
            return null;
          }
          const data = getIconData(iconName);
          if (!data) {
            if (!this._loadingIcon || this._loadingIcon.name !== icon) {
              this.abortLoading();
              this._name = "";
              if (data !== null) {
                this._loadingIcon = {
                  name: icon,
                  abort: loadIcons([iconName], () => {
                    this.counter++;
                  })
                };
              }
            }
            return null;
          }
          this.abortLoading();
          if (this._name !== icon) {
            this._name = icon;
            if (onload) {
              onload(icon);
            }
          }
          const classes = ["iconify"];
          if (iconName.prefix !== "") {
            classes.push("iconify--" + iconName.prefix);
          }
          if (iconName.provider !== "") {
            classes.push("iconify--" + iconName.provider);
          }
          return { data, classes };
        }
      },
      // Render icon
      render() {
        this.counter;
        const props = this.$attrs;
        const icon = this.iconMounted || props.ssr ? this.getIcon(props.icon, props.onLoad) : null;
        if (!icon) {
          return render(emptyIcon, props);
        }
        let newProps = props;
        if (icon.classes) {
          newProps = {
            ...props,
            class: (typeof props["class"] === "string" ? props["class"] + " " : "") + icon.classes.join(" ")
          };
        }
        return render({
          ...defaultIconProps,
          ...icon.data
        }, newProps);
      }
    });
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/radix-vue_CbNNK-Ng.mjs
function Ir(a2) {
  let t2 = false, e3;
  const n2 = effectScope(true);
  return (...l3) => (t2 || (e3 = n2.run(() => a2(...l3)), t2 = true), e3);
}
function Ra(a2) {
  return a2 ? a2.flatMap((t2) => t2.type === Fragment ? Ra(t2.children) : [t2]) : [];
}
function Kp() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
var Nn, O;
var init_radix_vue_CbNNK_Ng = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/radix-vue_CbNNK-Ng.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_vue_BQBbmbrb();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
    Nn = defineComponent({
      name: "PrimitiveSlot",
      inheritAttrs: false,
      setup(a2, { attrs: t2, slots: e3 }) {
        return () => {
          var u3, d3;
          if (!e3.default)
            return null;
          const n2 = Ra(e3.default()), l3 = n2.findIndex((c2) => c2.type !== Comment);
          if (l3 === -1)
            return n2;
          const s2 = n2[l3];
          (u3 = s2.props) == null || delete u3.ref;
          const r4 = s2.props ? mergeProps(t2, s2.props) : t2;
          t2.class && ((d3 = s2.props) != null && d3.class) && delete s2.props.class;
          const i3 = cloneVNode(s2, r4);
          for (const c2 in r4)
            c2.startsWith("on") && (i3.props || (i3.props = {}), i3.props[c2] = r4[c2]);
          return n2.length === 1 ? i3 : (n2[l3] = i3, n2);
        };
      }
    });
    O = defineComponent({
      name: "Primitive",
      inheritAttrs: false,
      props: {
        asChild: {
          type: Boolean,
          default: false
        },
        as: {
          type: [String, Object],
          default: "div"
        }
      },
      setup(a2, { attrs: t2, slots: e3 }) {
        const n2 = a2.asChild ? "template" : a2.as;
        return typeof n2 == "string" && ["area", "img", "input"].includes(n2) ? () => h(n2, t2) : n2 !== "template" ? () => h(a2.as, t2, { default: e3.default }) : () => h(Nn, t2, { default: e3.default });
      }
    });
    reactive({
      layersRoot: /* @__PURE__ */ new Set(),
      layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
      branches: /* @__PURE__ */ new Set()
    });
    Ir(() => ref([]));
    Kp() === "coarse";
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/class-variance-authority_psgmYkVi.mjs
function r3(e3) {
  var t2, f3, n2 = "";
  if ("string" == typeof e3 || "number" == typeof e3)
    n2 += e3;
  else if ("object" == typeof e3)
    if (Array.isArray(e3))
      for (t2 = 0; t2 < e3.length; t2++)
        e3[t2] && (f3 = r3(e3[t2])) && (n2 && (n2 += " "), n2 += f3);
    else
      for (t2 in e3)
        e3[t2] && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function clsx2() {
  for (var e3, t2, f3 = 0, n2 = ""; f3 < arguments.length; )
    (e3 = arguments[f3++]) && (t2 = r3(e3)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
var falsyToString, cx, cva;
var init_class_variance_authority_psgmYkVi = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/class-variance-authority_psgmYkVi.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    falsyToString = (value2) => typeof value2 === "boolean" ? "".concat(value2) : value2 === 0 ? "0" : value2;
    cx = clsx2;
    cva = (base, config) => {
      return (props) => {
        var ref2;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null)
          return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant) => {
          const variantProp = props === null || props === void 0 ? void 0 : props[variant];
          const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
          if (variantProp === null)
            return null;
          const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
          return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
          let [key, value2] = param;
          if (value2 === void 0) {
            return acc;
          }
          acc[key] = value2;
          return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (ref2 = config.compoundVariants) === null || ref2 === void 0 ? void 0 : ref2.reduce((acc, param1) => {
          let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param1;
          return Object.entries(compoundVariantOptions).every((param) => {
            let [key, value2] = param;
            return Array.isArray(value2) ? value2.includes({
              ...defaultVariants,
              ...propsWithoutUndefined
            }[key]) : {
              ...defaultVariants,
              ...propsWithoutUndefined
            }[key] === value2;
          }) ? [
            ...acc,
            cvClass,
            cvClassName
          ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
      };
    };
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/tailwind-merge_TY4lI7Gs.mjs
function createClassUtils(config) {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
}
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value2]) => [prefix + key, value2]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  function update(key, value2) {
    cache.set(key, value2);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get(key) {
      let value2 = cache.get(key);
      if (value2 !== void 0) {
        return value2;
      }
      if ((value2 = previousCache.get(key)) !== void 0) {
        update(key, value2);
        return value2;
      }
    },
    set(key, value2) {
      if (cache.has(key)) {
        cache.set(key, value2);
      } else {
        update(key, value2);
      }
    }
  };
}
function createSplitModifiers(config) {
  const separator2 = config.separator;
  const isSeparatorSingleCharacter = separator2.length === 1;
  const firstSeparatorCharacter = separator2[0];
  const separatorLength = separator2.length;
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator2)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
function mergeClassList(classList, configUtils) {
  const {
    splitModifiers,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = splitModifiers(originalClassName);
    let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter((parsed) => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map((parsed) => parsed.originalClassName).join(" ");
}
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key) {
  const themeGetter = (theme) => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
function isLength(value2) {
  return isNumber(value2) || stringLengths.has(value2) || fractionRegex.test(value2);
}
function isArbitraryLength(value2) {
  return getIsArbitraryValue(value2, "length", isLengthOnly);
}
function isNumber(value2) {
  return Boolean(value2) && !Number.isNaN(Number(value2));
}
function isArbitraryNumber(value2) {
  return getIsArbitraryValue(value2, "number", isNumber);
}
function isInteger(value2) {
  return Boolean(value2) && Number.isInteger(Number(value2));
}
function isPercent(value2) {
  return value2.endsWith("%") && isNumber(value2.slice(0, -1));
}
function isArbitraryValue(value2) {
  return arbitraryValueRegex.test(value2);
}
function isTshirtSize(value2) {
  return tshirtUnitRegex.test(value2);
}
function isArbitrarySize(value2) {
  return getIsArbitraryValue(value2, sizeLabels, isNever);
}
function isArbitraryPosition(value2) {
  return getIsArbitraryValue(value2, "position", isNever);
}
function isArbitraryImage(value2) {
  return getIsArbitraryValue(value2, imageLabels, isImage);
}
function isArbitraryShadow(value2) {
  return getIsArbitraryValue(value2, "", isShadow);
}
function isAny() {
  return true;
}
function getIsArbitraryValue(value2, label, testValue) {
  const result = arbitraryValueRegex.exec(value2);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value2) {
  return lengthUnitRegex.test(value2) && !colorFunctionRegex.test(value2);
}
function isNever() {
  return false;
}
function isShadow(value2) {
  return shadowRegex.test(value2);
}
function isImage(value2) {
  return imageRegex.test(value2);
}
function getDefaultConfig() {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumber = () => [isNumber, isArbitraryNumber];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...getBlendModes(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var CLASS_PART_SEPARATOR, arbitraryPropertyRegex, IMPORTANT_MODIFIER, SPLIT_CLASSES_REGEX, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, sizeLabels, imageLabels, twMerge;
var init_tailwind_merge_TY4lI7Gs = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/tailwind-merge_TY4lI7Gs.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    CLASS_PART_SEPARATOR = "-";
    arbitraryPropertyRegex = /^\[(.+)\]$/;
    IMPORTANT_MODIFIER = "!";
    SPLIT_CLASSES_REGEX = /\s+/;
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/pages/index_BbWPQT8c.mjs
var index_BbWPQT8c_exports = {};
__export(index_BbWPQT8c_exports, {
  default: () => $$Index,
  file: () => $$file7,
  url: () => $$url7
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent($setup["Primitive"], mergeProps({
    as: $props.as,
    "as-child": $props.asChild,
    class: $setup.cn($setup.buttonVariants({ variant: $props.variant, size: $props.size }), $setup.props.class)
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "social-icons pb-4 flex justify-center space-x-4 mt-4" }, _attrs))}>`);
  _push(ssrRenderComponent($setup["Button"], {
    variant: "outline",
    size: "icon",
    class: "rounded-full"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent($setup["Icon"], {
          icon: "fe:facebook",
          class: "w-[18px] h-[18px]",
          style: { "color": "#1877f2" },
          ssr: true
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode($setup["Icon"], {
            icon: "fe:facebook",
            class: "w-[18px] h-[18px]",
            style: { "color": "#1877f2" },
            ssr: true
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent($setup["Button"], {
    variant: "outline",
    size: "icon",
    class: "rounded-full"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent($setup["Icon"], {
          icon: "hugeicons:instagram",
          class: "w-[18px] h-[18px]",
          style: { "color": "#1877f2" },
          ssr: true
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode($setup["Icon"], {
            icon: "hugeicons:instagram",
            class: "w-[18px] h-[18px]",
            style: { "color": "#1877f2" },
            ssr: true
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent($setup["Button"], { class: "flex items-center space-x-2 bg-[#1877f2] rounded-full p-3 h-[38px]" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<p class="text-[16px] text-white"${_scopeId}>\u79C1\u8BAF</p>`);
        _push2(ssrRenderComponent($setup["Icon"], {
          icon: "mingcute:messenger-line",
          style: { "color": "white", "font-size": "16px" },
          ssr: true
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode("p", { class: "text-[16px] text-white" }, "\u79C1\u8BAF"),
          createVNode($setup["Icon"], {
            icon: "mingcute:messenger-line",
            style: { "color": "white", "font-size": "16px" },
            ssr: true
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
function _sfc_ssrRender3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h1 class="title" data-v-dba3c651>\u5173\u4E8E</h1><div class="section section-large" data-v-dba3c651><img src="img/horizontal.webp" alt="Horizontal" class="object-cover cursor-pointer" data-v-dba3c651></div><div class="section-row" data-v-dba3c651><div class="section section-small section-col" data-v-dba3c651><img src="img/temporaryimg.webp" alt="Temporary" class="object-cover cursor-pointer" data-v-dba3c651></div><div class="section section-small section-col" data-v-dba3c651><img src="img/temporaryimg.webp" alt="Temporary" class="object-cover cursor-pointer" data-v-dba3c651></div></div><div class="section section-large" data-v-dba3c651><img src="img/horizontal.webp" alt="Horizontal" class="object-cover cursor-pointer" data-v-dba3c651></div><!--]-->`);
}
var $$Astro$13, $$ProductList, _sfc_main$2, _sfc_setup$2, Button, buttonVariants, _sfc_main$1, _sfc_setup$1, Main, $$MainText, _sfc_main3, _sfc_setup3, About, $$Astro7, $$Index, $$file7, $$url7;
var init_index_BbWPQT8c = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/pages/index_BbWPQT8c.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    init_kleur_BcFxsYqz();
    init_iconify_B6WbOEZr();
    init_radix_vue_CbNNK_Ng();
    init_class_variance_authority_psgmYkVi();
    init_clsx_CNI3IGC6();
    init_tailwind_merge_TY4lI7Gs();
    init_vue_BQBbmbrb();
    init_history_DRfg9yQZ();
    init_checkout_5MIZC1oE();
    init_cart_C5DUbUDf();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    $$Astro$13 = createAstro();
    $$ProductList = createComponent(($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro$13, $$props, $$slots);
      Astro2.self = $$ProductList;
      const { products } = Astro2.props;
      return renderTemplate`${maybeRenderHead()}<div> <div class="product-card flex justify-center items-center p-4 bg-white"> <h3 class="font-bold pl-4 text-[36px]">友鬼系列</h3> </div> <div class="featured-product p-4 m-4 bg-white border border-purple-500 rounded-lg relative flex flex-col items-center"> <span class="absolute top-2 right-2 text-purple-500 border border-purple-500 rounded-full px-2 py-1 text-sm">全新</span> <img src="/img/temporaryimg.webp" alt="Featured Product Image" class="w-[120px] h-[175px] mt-6 object-cover"> <div class="flex justify-between items-center w-full mt-4"> <h3 class="text-[24px] font-semibold">真的友鬼 7</h3> <p class="text-[16px]">RM 25</p> </div> <!-- <Button @click="increaseQuantity(products[6].id)" class="bg-purple-500 text-white py-2 px-4 rounded mt-4 w-full h-[54px] text-[24px]">
        <p>添加至购物车</p>
      </Button> --> </div> ${products.map((product) => renderTemplate`<div class="product-card flex justify-between items-center p-4 bg-white"> <img${addAttribute(product.media.image, "src")} alt="Product Image" class="w-16 h-16 rounded object-cover"> <div class="product-info flex-grow ml-4"> <h3 class="text-lg font-semibold">${product.name}</h3> <p class="text-sm text-gray-500">RM${product.price}</p> </div> <div class="actions flex justify-end items-center"> ${renderComponent($$result, "DetailsButton", null, { "client:only": "vue", "product": product, "client:component-hydration": "only", "client:component-path": "@/components/Product/DetailsButton.vue", "client:component-export": "default" })} ${renderComponent($$result, "AddButton", null, { "client:only": "vue", "product": product, "client:component-hydration": "only", "client:component-path": "@/components/Product/AddButton.vue", "client:component-export": "default" })} </div> </div>`)} </div>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/ProductList.astro", void 0);
    _sfc_main$2 = /* @__PURE__ */ defineComponent({
      __name: "Button",
      props: {
        variant: {},
        size: {},
        class: {},
        asChild: { type: Boolean },
        as: { default: "button" }
      },
      setup(__props, { expose: __expose }) {
        __expose();
        const props = __props;
        const __returned__ = { props, get Primitive() {
          return O;
        }, get buttonVariants() {
          return buttonVariants;
        }, get cn() {
          return cn;
        } };
        Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
        return __returned__;
      }
    });
    _sfc_setup$2 = _sfc_main$2.setup;
    _sfc_main$2.setup = (props, ctx) => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/button/Button.vue");
      return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
    };
    Button = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
    buttonVariants = cva(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      {
        variants: {
          variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
          },
          size: {
            default: "h-10 px-4 py-2",
            xs: "h-7 rounded px-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
          }
        },
        defaultVariants: {
          variant: "default",
          size: "default"
        }
      }
    );
    _sfc_main$1 = {
      __name: "Main",
      setup(__props, { expose: __expose }) {
        __expose();
        const __returned__ = { get Icon() {
          return Icon;
        }, get Button() {
          return Button;
        } };
        Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
        return __returned__;
      }
    };
    _sfc_setup$1 = _sfc_main$1.setup;
    _sfc_main$1.setup = (props, ctx) => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Main.vue");
      return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
    };
    Main = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
    $$MainText = createComponent(($$result, $$props, $$slots) => {
      const profileImg = "/img/profile2.webp";
      const profileName = "\u771F\u7684\u53CB\u9B3C";
      const profileDetails = "\u63ED\u5F00\u795E\u79D8\u7684\u7075\u5F02\u4E16\u754C\uFF0C\u6709\u8DA3\u7684\u9B3C\u6545\u4E8B\u96C6\u5C31\u5728\u300A\u771F\u7684\u53CB\u9B3C\u300B";
      return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Layout" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="profile-container text-center pt-4 flex flex-col items-center"> <img class="profile-img mx-auto rounded-[20px] w-[111px] h-[111px] object-cover"${addAttribute(profileImg, "src")} alt="Profile Image"> <h2 class="profile-name text-2xl mt-2 font-semibold pt-4">${profileName}</h2> <p class="text-lg w-[247px] text-center pt-3">${profileDetails}</p> </div> ` })}`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/MainText.astro", void 0);
    _sfc_main3 = /* @__PURE__ */ defineComponent({
      __name: "About",
      setup(__props, { expose: __expose }) {
        __expose();
        const __returned__ = {};
        Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
        return __returned__;
      }
    });
    _sfc_setup3 = _sfc_main3.setup;
    _sfc_main3.setup = (props, ctx) => {
      const ssrContext = useSSRContext();
      (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/About.vue");
      return _sfc_setup3 ? _sfc_setup3(props, ctx) : void 0;
    };
    About = /* @__PURE__ */ _export_sfc(_sfc_main3, [["ssrRender", _sfc_ssrRender3], ["__scopeId", "data-v-dba3c651"]]);
    $$Astro7 = createAstro();
    $$Index = createComponent(async ($$result, $$props, $$slots) => {
      const Astro2 = $$result.createAstro($$Astro7, $$props, $$slots);
      Astro2.self = $$Index;
      const products = await getProducts();
      const { cart, user } = Astro2.locals;
      const { session } = Astro2.locals;
      const userExist = ref(false);
      if (session && session.user_id && session.user_id.startsWith("guest")) {
        userExist.value = false;
      } else if (session && session.user_id) {
        userExist.value = true;
      }
      if (Astro2.request.method === "POST") {
        try {
          const data = await Astro2.request.formData();
          const operation = String(data.get("operation"));
          if (operation == "logout") {
            await signOut(user?.email);
            Astro2.cookies.delete("auth_session");
            return Astro2.redirect("/");
          }
          if (operation === "signup") {
            const email = String(data.get("email"));
            const password = String(data.get("password"));
            const encoder2 = new TextEncoder();
            const encoded_data = encoder2.encode(String(password));
            let password_signature = await crypto.subtle.digest(
              "SHA-256",
              encoded_data
            );
            const hashArray = Array.from(new Uint8Array(password_signature));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
            let result = await signUp(email, hashHex);
            if (result) {
              const { user: user2, session: session2, cookie } = result;
              console.log(user2, session2, cookie);
              Astro2.cookies.set(cookie.name, cookie.value, cookie.attributes);
              return Astro2.redirect("/");
            }
          }
          if (operation == "login") {
            const email = String(data.get("email"));
            const password = String(data.get("password"));
            const encoder2 = new TextEncoder();
            const encoded_data = encoder2.encode(String(password));
            let password_signature = await crypto.subtle.digest(
              "SHA-256",
              encoded_data
            );
            const hashArray = Array.from(new Uint8Array(password_signature));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
            console.log(email, hashHex);
            let result = await login(email, hashHex);
            if (result) {
              const { user: user2, session: session2, cookie } = result;
              console.log(user2, session2, cookie);
              Astro2.cookies.set(cookie.name, cookie.value, cookie.attributes);
              return Astro2.redirect("/");
            } else {
              console.error("Login failed: No result returned");
            }
          }
        } catch (error3) {
          if (error3 instanceof Error) {
            console.error("Error in POST operation:", error3.message);
          }
        }
      }
      return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ghost Remake</title>${renderHead()}</head> <body> <div class="bg-[#F6EAFF]"> <div class="container"> <div class="min-h-[92px]"> ${renderComponent($$result, "TopNavbar", null, { "client:only": "vue", "userExist": userExist.value, "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/TopNavbar.vue", "client:component-export": "default" })} </div> ${renderComponent($$result, "MainText", $$MainText, {})} ${renderComponent($$result, "Main", Main, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Main.vue", "client:component-export": "default" })} ${renderComponent($$result, "CartStore", null, { "client:only": "vue", "user_cart": cart, "client:component-hydration": "only", "client:component-path": "@/components/Product/CartStore.vue", "client:component-export": "default" })} </div> </div> <div class="sticky top-0 z-20 min-h-[56px] bg-[#F6EAFF]"> ${renderComponent($$result, "Navbar", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Navbar.vue", "client:component-export": "default" })} </div> <div class="bg-[#FFFFFF]"> <div class="container"> <div id="mainSection" class="border-b border-gray-200"> ${JSON.stringify(userExist)} ${JSON.stringify(cart)} ${renderComponent($$result, "ProductList", $$ProductList, { "products": products })} </div> <div id="braceletSection" class="border-b border-gray-200 pb-6 min-h-10"> ${renderComponent($$result, "Bracelet", null, { "client:only": "vue", "client:component-hydration": "only", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Bracelet.vue", "client:component-export": "default" })} </div> <div id="aboutSection"> ${renderComponent($$result, "About", About, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/About.vue", "client:component-export": "default" })} </div> <div class="pb-[80px] text-center"> <p>© 真的友鬼 2024</p> </div> </div> <!-- Accept quantity from ProductList.vue and pass as count to Footer --> <!-- <Footer client:only="vue" /> --> </div> </body></html>`;
    }, "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro", void 0);
    $$file7 = "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro";
    $$url7 = "";
  }
});

// .wrangler/tmp/pages-Meh8ui/chunks/index_D5ZCxJ11.mjs
var index_D5ZCxJ11_exports = {};
__export(index_D5ZCxJ11_exports, {
  page: () => page16,
  renderers: () => renderers
});
var page16;
var init_index_D5ZCxJ11 = __esm({
  ".wrangler/tmp/pages-Meh8ui/chunks/index_D5ZCxJ11.mjs"() {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    init_renderers();
    globalThis.process ??= {};
    globalThis.process.env ??= {};
    page16 = () => Promise.resolve().then(() => (init_index_BbWPQT8c(), index_BbWPQT8c_exports));
  }
});

// .wrangler/tmp/bundle-ruotjD/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/bundle-ruotjD/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/pages-Meh8ui/pmiklx8ah3f.js
init_checked_fetch();
init_modules_watch_stub();

// .wrangler/tmp/pages-Meh8ui/bundledWorker-0.19547636717393124.mjs
init_checked_fetch();
init_modules_watch_stub();
init_renderers();

// .wrangler/tmp/pages-Meh8ui/manifest_BgjKJpOE.mjs
init_checked_fetch();
init_modules_watch_stub();
init_renderers();
init_kleur_BcFxsYqz();
globalThis.process ??= {};
globalThis.process.env ??= {};
var manifest = deserializeManifest({ "adapterName": "@astrojs/cloudflare", "routes": [{ "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "type": "endpoint", "isIndex": false, "route": "/_image", "pattern": "^\\/_image$", "segments": [[{ "content": "_image", "dynamic": false, "spread": false }]], "params": [], "component": "node_modules/astro/dist/assets/endpoint/generic.js", "pathname": "/_image", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/address.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/address\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "address.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/address.json.js", "pathname": "/api/address.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/cart.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/cart\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "cart.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/cart.json.js", "pathname": "/api/cart.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/products.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/products\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "products.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/products.json.js", "pathname": "/api/products.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/signup.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/signup\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "signup.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/signup.json.ts", "pathname": "/api/signup.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/stripe_pi.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/stripe_pi\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "stripe_pi.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/stripe_pi.json.ts", "pathname": "/api/stripe_pi.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/stripe_webhook.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/stripe_webhook\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "stripe_webhook.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/stripe_webhook.json.ts", "pathname": "/api/stripe_webhook.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/tx.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/tx\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "tx.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/tx.json.ts", "pathname": "/api/tx.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/api/upload.json", "isIndex": false, "type": "endpoint", "pattern": "^\\/api\\/upload\\.json\\/?$", "segments": [[{ "content": "api", "dynamic": false, "spread": false }], [{ "content": "upload.json", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/api/upload.json.ts", "pathname": "/api/upload.json", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "external", "src": "/_astro/index.BuHFKhUh.css" }], "routeData": { "route": "/checkout", "isIndex": false, "type": "page", "pattern": "^\\/checkout\\/?$", "segments": [[{ "content": "checkout", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/checkout.astro", "pathname": "/checkout", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "external", "src": "/_astro/index.BuHFKhUh.css" }], "routeData": { "route": "/complete", "isIndex": false, "type": "page", "pattern": "^\\/complete\\/?$", "segments": [[{ "content": "complete", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/complete.astro", "pathname": "/complete", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "external", "src": "/_astro/index.BuHFKhUh.css" }, { "type": "inline", "content": ".container[data-v-61b3d4e1]{max-width:100%}\n" }], "routeData": { "route": "/history", "isIndex": false, "type": "page", "pattern": "^\\/history\\/?$", "segments": [[{ "content": "history", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/history.astro", "pathname": "/history", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [], "routeData": { "route": "/login_bare", "isIndex": false, "type": "page", "pattern": "^\\/login_bare\\/?$", "segments": [[{ "content": "login_bare", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/login_bare.astro", "pathname": "/login_bare", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "external", "src": "/_astro/index.BuHFKhUh.css" }, { "type": "inline", "content": "*[data-v-ce9694a7]{font-family:sans-serif}.m-0[data-v-ce9694a7]{margin:0}.dropzone[data-v-ce9694a7]{--v3-dropzone--primary: 94, 112, 210;--v3-dropzone--border: 214, 216, 220;--v3-dropzone--description: 190, 191, 195;--v3-dropzone--overlay: 40, 44, 53;--v3-dropzone--overlay-opacity: .3;--v3-dropzone--error: 255, 76, 81;--v3-dropzone--success: 36, 179, 100;position:relative;display:flex;flex-direction:column}.hidden[data-v-ce9694a7]{display:none}.dropzone-wrapper[data-v-ce9694a7]{border:2px dashed rgba(var(--v3-dropzone--border));border-radius:12px;padding:20px;display:flex;flex-direction:column;align-items:center;width:auto;height:200px;transition:.3s all ease;justify-content:center}.dropzone-wrapper--disabled[data-v-ce9694a7]{opacity:.5}.dropzone-wrapper__disabled[data-v-ce9694a7]{position:absolute;top:-2px;inset-inline-start:-2px;width:calc(100% + 4px);height:calc(100% + 4px);border-radius:12px;background:transparent;z-index:2}.dropzone-wrapper--active[data-v-ce9694a7]{border-color:rgba(var(--v3-dropzone--primary))!important;background:rgba(var(--v3-dropzone--primary),.1)!important}.dropzone-wrapper--error[data-v-ce9694a7]{border-color:rgba(var(--v3-dropzone--error))!important}.dropzone-wrapper--success[data-v-ce9694a7]{border-color:rgba(var(--v3-dropzone--success))!important}.select-file[data-v-ce9694a7]{background:rgba(var(--v3-dropzone--primary));border-radius:10px;font-weight:500;font-size:12px;border:none;padding:10px 20px;color:#fff;cursor:pointer;margin-bottom:10px;margin-top:10px}.description[data-v-ce9694a7]{font-size:12px;color:rgba(var(--v3-dropzone--description))}.titles[data-v-ce9694a7]{text-align:center}.titles h1[data-v-ce9694a7]{font-weight:400;font-size:20px}.titles h3[data-v-ce9694a7]{margin-top:30px;font-weight:400}.preview-container[data-v-ce9694a7]{width:100%;height:100%;overflow-y:auto;overflow-x:hidden;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:40px}.preview[data-v-ce9694a7]{width:100%;height:95%;border-radius:8px;flex-shrink:0;position:relative;display:flex;align-items:center;justify-content:center}.preview__multiple[data-v-ce9694a7]{height:90%!important;width:90%!important}.preview__file[data-v-ce9694a7]{border:1px dashed rgba(var(--v3-dropzone--primary))}.preview__file--error[data-v-ce9694a7]{border-color:rgba(var(--v3-dropzone--error))!important}.preview:hover .img-details[data-v-ce9694a7]{opacity:1!important;visibility:visible!important}.preview img[data-v-ce9694a7]{width:100%;height:100%;border-radius:8px}.img-details[data-v-ce9694a7]{position:absolute;top:0;inset-inline-start:0;width:100%;height:100%;background:rgba(var(--v3-dropzone--overlay),var(--v3-dropzone--overlay-opacity));border-radius:8px;transition:all .2s linear;-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);filter:grayscale(1%);opacity:0;visibility:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}.img-details h2[data-v-ce9694a7]{font-size:14px;font-weight:400;text-align:center;color:#fff;max-width:40%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media (max-width: 400px){.img-details h2[data-v-ce9694a7]{max-width:200px}}.img-details span[data-v-ce9694a7]{font-size:12px;font-weight:600;text-align:center;color:#fff}.img-remove[data-v-ce9694a7]{background:rgba(var(--v3-dropzone--error));border-radius:10px;border:none;padding:5px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;position:absolute;top:10px;right:10px;transition:all .2s linear}.img-remove[data-v-ce9694a7]:active{transform:scale(.9)}.img-remove[data-v-ce9694a7]:hover{background:rgba(var(--v3-dropzone--error),.8)}.preview>img{-o-object-fit:cover;object-fit:cover}\n" }], "routeData": { "route": "/pay", "isIndex": false, "type": "page", "pattern": "^\\/pay\\/?$", "segments": [[{ "content": "pay", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/pay.astro", "pathname": "/pay", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "inline", "content": "body[data-v-1a02dbcc]{font-family:Arial,Helvetica,sans-serif}form[data-v-1a02dbcc]{border:3px solid #f1f1f1}input[type=text][data-v-1a02dbcc],input[type=password][data-v-1a02dbcc]{width:100%;padding:12px 20px;margin:8px 0;display:inline-block;border:1px solid #ccc;box-sizing:border-box}button[data-v-1a02dbcc]{background-color:#04aa6d;color:#fff;padding:14px 20px;margin:8px 0;border:none;cursor:pointer;width:100%}button[data-v-1a02dbcc]:hover{opacity:.8}.cancelbtn[data-v-1a02dbcc]{width:auto;padding:10px 18px;background-color:#f44336}.imgcontainer[data-v-1a02dbcc]{text-align:center;margin:24px 0 12px}img.avatar[data-v-1a02dbcc]{width:40%;border-radius:50%}.container[data-v-1a02dbcc]{padding:16px}span.psw[data-v-1a02dbcc]{float:right;padding-top:16px}@media screen and (max-width: 300px){span.psw[data-v-1a02dbcc]{display:block;float:none}.cancelbtn[data-v-1a02dbcc]{width:100%}}\n" }], "routeData": { "route": "/setting", "isIndex": false, "type": "page", "pattern": "^\\/setting\\/?$", "segments": [[{ "content": "setting", "dynamic": false, "spread": false }]], "params": [], "component": "src/pages/setting.astro", "pathname": "/setting", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }, { "file": "", "links": [], "scripts": [], "styles": [{ "type": "external", "src": "/_astro/index.BuHFKhUh.css" }, { "type": "inline", "content": ".container[data-v-dba3c651]{max-width:800px;margin:0 auto;padding:20px}.title[data-v-dba3c651]{text-align:center;font-size:36px;font-weight:700;margin-bottom:20px}.section[data-v-dba3c651]{background-color:#e0e0e0;border-radius:8px;margin-bottom:20px}.section-large[data-v-dba3c651]{height:300px}.section-small[data-v-dba3c651]{height:150px}.section-row[data-v-dba3c651]{display:flex;gap:20px;justify-content:space-between}.section-col[data-v-dba3c651]{flex:1}img[data-v-dba3c651]{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;border-radius:8px;cursor:pointer}\n" }, { "type": "external", "src": "/_astro/TopNavbar.BaHiJHlN.css" }], "routeData": { "route": "/", "isIndex": true, "type": "page", "pattern": "^\\/$", "segments": [], "params": [], "component": "src/pages/index.astro", "pathname": "/", "prerender": false, "fallbackRoutes": [], "_meta": { "trailingSlash": "ignore" } } }], "base": "/", "trailingSlash": "ignore", "compressHTML": true, "componentMetadata": [["C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/index.astro", { "propagation": "none", "containsHead": true }], ["C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/checkout.astro", { "propagation": "none", "containsHead": true }], ["C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/complete.astro", { "propagation": "none", "containsHead": true }], ["C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/pay.astro", { "propagation": "none", "containsHead": true }], ["C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/history.astro", { "propagation": "none", "containsHead": true }], ["C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/pages/setting.astro", { "propagation": "none", "containsHead": true }]], "renderers": [], "clientDirectives": [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], "entryModules": { "\0astro-internal:middleware": "_astro-internal_middleware.mjs", "\0@astro-renderers": "renderers.mjs", "\0@astrojs-ssr-virtual-entry": "index.js", "/src/pages/api/address.json.js": "chunks/pages/address_DMXQMX5x.mjs", "/src/pages/complete.astro": "chunks/pages/complete_B53fkGvc.mjs", "/src/pages/index.astro": "chunks/pages/index_BbWPQT8c.mjs", "/src/pages/login_bare.astro": "chunks/pages/login_bare_hRsmVAJ7.mjs", "/src/pages/pay.astro": "chunks/pages/pay_Bqb16qPn.mjs", "/src/pages/api/products.json.js": "chunks/pages/products_CyE7Keql.mjs", "/src/pages/setting.astro": "chunks/pages/setting_ihIYgAA0.mjs", "/src/pages/api/signup.json.ts": "chunks/pages/signup_Dm4OpuwX.mjs", "/src/pages/api/stripe_pi.json.ts": "chunks/pages/stripe_pi_CHIIdJlV.mjs", "/src/pages/api/stripe_webhook.json.ts": "chunks/pages/stripe_webhook_Cew18lxx.mjs", "/src/pages/api/tx.json.ts": "chunks/pages/tx_DdV8fKLF.mjs", "/src/pages/api/upload.json.ts": "chunks/pages/upload_CuC8f_0D.mjs", "\0@astrojs-manifest": "manifest_BgjKJpOE.mjs", "\0@astro-page:src/pages/api/address.json@_@js": "chunks/address_BsomB-2O.mjs", "\0@astro-page:src/pages/api/cart.json@_@js": "chunks/cart_ZDCPxiAM.mjs", "\0@astro-page:src/pages/api/products.json@_@js": "chunks/products_C5TE89rm.mjs", "\0@astro-page:src/pages/api/signup.json@_@ts": "chunks/signup_4kc9CLOn.mjs", "\0@astro-page:src/pages/api/stripe_pi.json@_@ts": "chunks/stripe_pi_BOnVhJIJ.mjs", "\0@astro-page:src/pages/api/stripe_webhook.json@_@ts": "chunks/stripe_webhook_DwpvqpDB.mjs", "\0@astro-page:src/pages/api/tx.json@_@ts": "chunks/tx_Bn3-_Z7-.mjs", "\0@astro-page:src/pages/api/upload.json@_@ts": "chunks/upload_CfHCt1_S.mjs", "\0@astro-page:src/pages/checkout@_@astro": "chunks/checkout_Cg4RZnhe.mjs", "\0@astro-page:src/pages/complete@_@astro": "chunks/complete_BpqRJ5Tu.mjs", "\0@astro-page:src/pages/history@_@astro": "chunks/history_MUVPxNJt.mjs", "\0@astro-page:src/pages/login_bare@_@astro": "chunks/login_bare_CsqMVRtH.mjs", "\0@astro-page:src/pages/pay@_@astro": "chunks/pay_H7hbv0kO.mjs", "\0@astro-page:src/pages/setting@_@astro": "chunks/setting_DhYFBctx.mjs", "\0@astro-page:src/pages/index@_@astro": "chunks/index_D5ZCxJ11.mjs", "@astrojs/vue/client.js": "_astro/client.txDmNq-b.js", "@/components/Product/CartStore.vue": "_astro/CartStore.D3JbzuIT.js", "@/components/SignUp.vue": "_astro/SignUp.BgeVMosl.js", "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Bracelet.vue": "_astro/Bracelet.j3NtXjDR.js", "@/components/Complete/Status.vue": "_astro/Status.DRNpKjla.js", "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/About.vue": "_astro/About.Dz3KpJO4.js", "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Navbar.vue": "_astro/Navbar.DwtAv6um.js", "@/components/Product/DetailsButton.vue": "_astro/DetailsButton.BEOpXPyq.js", "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/Main.vue": "_astro/Main.DdZtUS8H.js", "@/components/Product/AddButton.vue": "_astro/AddButton.DFZKtzkm.js", "@/components/Pay/PaymentForm.vue": "_astro/PaymentForm.D8GPhC3T.js", "C:/Users/Goh JiaLe/Desktop/OSProject/GhostRemake/GhostRemake/src/components/TopNavbar.vue": "_astro/TopNavbar.BM6AZfmc.js", "@/components/Checkout/Checkout.vue": "_astro/Checkout.BGr6nfuD.js", "astro:scripts/before-hydration.js": "" }, "inlinedScripts": [], "assets": ["/_astro/index.BuHFKhUh.css", "/favicon.svg", "/_worker.js/index.js", "/_worker.js/middleware.mjs", "/_worker.js/renderers.mjs", "/_worker.js/_astro-internal_middleware.mjs", "/img/bracelet.jpeg", "/img/bracelet.webp", "/img/bracelet2.jpg", "/img/bracelet2.webp", "/img/ghostBook.png", "/img/horizontal.png", "/img/horizontal.webp", "/img/img_avatar2.png", "/img/profile.png", "/img/profile.webp", "/img/profile2.png", "/img/profile2.webp", "/img/temporaryimg.png", "/img/temporaryimg.webp", "/_astro/About.Dz3KpJO4.js", "/_astro/AddButton.DFZKtzkm.js", "/_astro/Bracelet.j3NtXjDR.js", "/_astro/cart.CN-8ua6S.js", "/_astro/CartStore.D3JbzuIT.js", "/_astro/Checkout.BGr6nfuD.js", "/_astro/client.txDmNq-b.js", "/_astro/constants.DRisgCBo.js", "/_astro/createLucideIcon.DWRxji2h.js", "/_astro/DetailsButton.BEOpXPyq.js", "/_astro/DialogContent.7JtJSakw.js", "/_astro/fa-brands-400.Ch568Ea9.woff2", "/_astro/fa-brands-400.DHHcbFjz.ttf", "/_astro/fa-regular-400.9VThgXHM.woff2", "/_astro/fa-regular-400.C54-fRIQ.ttf", "/_astro/fa-solid-900.Cm9M9sZB.ttf", "/_astro/fa-solid-900.QWY35r5r.woff2", "/_astro/fa-v4compatibility.BRdYr4HJ.woff2", "/_astro/fa-v4compatibility.DLBX5pNp.ttf", "/_astro/index.BbuoAtT9.css", "/_astro/index.B_bbKbOl.js", "/_astro/index.DCpvP46r.js", "/_astro/Input.FOT0vqyB.js", "/_astro/Main.DdZtUS8H.js", "/_astro/Navbar.DwtAv6um.js", "/_astro/PaymentForm.D8GPhC3T.js", "/_astro/runtime-core.esm-bundler.9yEGr9fS.js", "/_astro/runtime-dom.esm-bundler.BUvO9oxn.js", "/_astro/setting.yQO1iXp8.css", "/_astro/SignUp.BgeVMosl.js", "/_astro/Status.DRNpKjla.js", "/_astro/TabsContent.DT0Em5w9.js", "/_astro/TopNavbar.BaHiJHlN.css", "/_astro/TopNavbar.BM6AZfmc.js", "/_astro/utils.DjSCXy8j.js", "/_astro/x.Dq_NCSX3.js", "/_astro/_plugin-vue_export-helper.DlAUqK2U.js", "/_worker.js/chunks/@0no-co_Dxoah_iz.mjs", "/_worker.js/chunks/@astrojs_DCSmFjgQ.mjs", "/_worker.js/chunks/@floating-ui_nxDOIah1.mjs", "/_worker.js/chunks/@iconify_B6WbOEZr.mjs", "/_worker.js/chunks/@internationalized_nxDOIah1.mjs", "/_worker.js/chunks/@swc_nxDOIah1.mjs", "/_worker.js/chunks/@urql_CifOXjBQ.mjs", "/_worker.js/chunks/@vue_BQBbmbrb.mjs", "/_worker.js/chunks/address_BsomB-2O.mjs", "/_worker.js/chunks/ansi-regex_nxDOIah1.mjs", "/_worker.js/chunks/cart_ZDCPxiAM.mjs", "/_worker.js/chunks/checkout_Cg4RZnhe.mjs", "/_worker.js/chunks/class-variance-authority_psgmYkVi.mjs", "/_worker.js/chunks/clsx_CNI3IGC6.mjs", "/_worker.js/chunks/complete_BpqRJ5Tu.mjs", "/_worker.js/chunks/cookie_CrAhd5mk.mjs", "/_worker.js/chunks/cssesc_nxDOIah1.mjs", "/_worker.js/chunks/emoji-regex_nxDOIah1.mjs", "/_worker.js/chunks/get-east-asian-width_nxDOIah1.mjs", "/_worker.js/chunks/history_MUVPxNJt.mjs", "/_worker.js/chunks/html-escaper_ClQ6UWd1.mjs", "/_worker.js/chunks/index_D5ZCxJ11.mjs", "/_worker.js/chunks/kleur_BcFxsYqz.mjs", "/_worker.js/chunks/login_bare_CsqMVRtH.mjs", "/_worker.js/chunks/mrmime_DcLn5OCC.mjs", "/_worker.js/chunks/path-to-regexp_Xgx1vbKb.mjs", "/_worker.js/chunks/pay_H7hbv0kO.mjs", "/_worker.js/chunks/products_C5TE89rm.mjs", "/_worker.js/chunks/radix-vue_CbNNK-Ng.mjs", "/_worker.js/chunks/setting_DhYFBctx.mjs", "/_worker.js/chunks/signup_4kc9CLOn.mjs", "/_worker.js/chunks/string-width_nxDOIah1.mjs", "/_worker.js/chunks/strip-ansi_nxDOIah1.mjs", "/_worker.js/chunks/stripe_pi_BOnVhJIJ.mjs", "/_worker.js/chunks/stripe_webhook_DwpvqpDB.mjs", "/_worker.js/chunks/tailwind-merge_TY4lI7Gs.mjs", "/_worker.js/chunks/tx_Bn3-_Z7-.mjs", "/_worker.js/chunks/upload_CfHCt1_S.mjs", "/_worker.js/chunks/vue_BQS8vo3W.mjs", "/_worker.js/chunks/wonka_CkrEhcKe.mjs", "/_worker.js/_astro/index.BuHFKhUh.css", "/_worker.js/chunks/pages/address_DMXQMX5x.mjs", "/_worker.js/chunks/pages/cart_C5DUbUDf.mjs", "/_worker.js/chunks/pages/checkout_5MIZC1oE.mjs", "/_worker.js/chunks/pages/complete_B53fkGvc.mjs", "/_worker.js/chunks/pages/history_DRfg9yQZ.mjs", "/_worker.js/chunks/pages/index_BbWPQT8c.mjs", "/_worker.js/chunks/pages/login_bare_hRsmVAJ7.mjs", "/_worker.js/chunks/pages/pay_Bqb16qPn.mjs", "/_worker.js/chunks/pages/products_CyE7Keql.mjs", "/_worker.js/chunks/pages/setting_ihIYgAA0.mjs", "/_worker.js/chunks/pages/signup_Dm4OpuwX.mjs", "/_worker.js/chunks/pages/stripe_pi_CHIIdJlV.mjs", "/_worker.js/chunks/pages/stripe_webhook_Cew18lxx.mjs", "/_worker.js/chunks/pages/tx_DdV8fKLF.mjs", "/_worker.js/chunks/pages/upload_CuC8f_0D.mjs"], "buildFormat": "directory", "checkOrigin": false, "rewritingEnabled": false, "experimentalEnvGetSecretEnabled": false });

// .wrangler/tmp/pages-Meh8ui/bundledWorker-0.19547636717393124.mjs
init_astrojs_DCSmFjgQ();

// .wrangler/tmp/pages-Meh8ui/_astro-internal_middleware.mjs
init_checked_fetch();
init_modules_watch_stub();
init_cart_C5DUbUDf();
init_renderers();
globalThis.process ??= {};
globalThis.process.env ??= {};
var onRequest$1 = async (context, next) => {
  const sessionId = context.cookies.get("auth_session")?.value ?? null;
  console.log(sessionId);
  if (sessionId) {
    let { session, user: auth_user, cookie } = await validateSession(sessionId);
    context.locals.session = session;
    context.cookies.set(cookie.name, cookie.value, cookie.attributes);
    if (auth_user.id) {
      let { user, cart, tx } = await getUserData(auth_user.id);
      console.log(cart);
      if (cart?.length <= 0) {
        await newCart(auth_user.id);
        let new_data = await getUserData(auth_user.id);
        cart = new_data.cart;
      }
      context.locals.user = user;
      context.locals.cart = cart[0];
      context.locals.tx = tx;
    }
  } else {
    let { user: auth_user, cookie, session } = await newGuestSession({});
    context.locals.session = session;
    context.cookies.set(cookie.name, cookie.value, cookie.attributes);
    await newCart(auth_user.id);
    let { user, cart, tx } = await getUserData(auth_user.id);
    context.locals.user = user;
    context.locals.cart = cart[0];
    context.locals.tx = tx;
  }
  return next();
};
var onRequest = sequence(
  onRequest$1
);

// .wrangler/tmp/pages-Meh8ui/bundledWorker-0.19547636717393124.mjs
globalThis.process ??= {};
globalThis.process.env ??= {};
var _page0 = () => Promise.resolve().then(() => (init_renderers(), renderers_exports)).then((n2) => n2.j);
var _page1 = () => Promise.resolve().then(() => (init_address_BsomB_2O(), address_BsomB_2O_exports));
var _page2 = () => Promise.resolve().then(() => (init_cart_ZDCPxiAM(), cart_ZDCPxiAM_exports));
var _page3 = () => Promise.resolve().then(() => (init_products_C5TE89rm(), products_C5TE89rm_exports));
var _page4 = () => Promise.resolve().then(() => (init_signup_4kc9CLOn(), signup_4kc9CLOn_exports));
var _page5 = () => Promise.resolve().then(() => (init_stripe_pi_BOnVhJIJ(), stripe_pi_BOnVhJIJ_exports));
var _page6 = () => Promise.resolve().then(() => (init_stripe_webhook_DwpvqpDB(), stripe_webhook_DwpvqpDB_exports));
var _page7 = () => Promise.resolve().then(() => (init_tx_Bn3_Z7(), tx_Bn3_Z7_exports));
var _page8 = () => Promise.resolve().then(() => (init_upload_CfHCt1_S(), upload_CfHCt1_S_exports));
var _page9 = () => Promise.resolve().then(() => (init_checkout_Cg4RZnhe(), checkout_Cg4RZnhe_exports));
var _page10 = () => Promise.resolve().then(() => (init_complete_BpqRJ5Tu(), complete_BpqRJ5Tu_exports));
var _page11 = () => Promise.resolve().then(() => (init_history_MUVPxNJt(), history_MUVPxNJt_exports));
var _page12 = () => Promise.resolve().then(() => (init_login_bare_CsqMVRtH(), login_bare_CsqMVRtH_exports));
var _page13 = () => Promise.resolve().then(() => (init_pay_H7hbv0kO(), pay_H7hbv0kO_exports));
var _page14 = () => Promise.resolve().then(() => (init_setting_DhYFBctx(), setting_DhYFBctx_exports));
var _page15 = () => Promise.resolve().then(() => (init_index_D5ZCxJ11(), index_D5ZCxJ11_exports));
var pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/api/address.json.js", _page1],
  ["src/pages/api/cart.json.js", _page2],
  ["src/pages/api/products.json.js", _page3],
  ["src/pages/api/signup.json.ts", _page4],
  ["src/pages/api/stripe_pi.json.ts", _page5],
  ["src/pages/api/stripe_webhook.json.ts", _page6],
  ["src/pages/api/tx.json.ts", _page7],
  ["src/pages/api/upload.json.ts", _page8],
  ["src/pages/checkout.astro", _page9],
  ["src/pages/complete.astro", _page10],
  ["src/pages/history.astro", _page11],
  ["src/pages/login_bare.astro", _page12],
  ["src/pages/pay.astro", _page13],
  ["src/pages/setting.astro", _page14],
  ["src/pages/index.astro", _page15]
]);
var _manifest2 = Object.assign(manifest, {
  pageMap,
  renderers,
  middleware: onRequest
});
var _args = void 0;
var _exports = createExports(_manifest2);
var __astrojsSsrVirtualEntry = _exports.default;
var _start = "start";
if (_start in serverEntrypointModule) {
  serverEntrypointModule[_start](_manifest2, _args);
}

// node_modules/wrangler/templates/pages-dev-util.ts
init_checked_fetch();
init_modules_watch_stub();
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}

// .wrangler/tmp/pages-Meh8ui/pmiklx8ah3f.js
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/_astro/*",
    "/favicon.svg",
    "/img\\bracelet.jpeg",
    "/img\\bracelet.webp",
    "/img\\bracelet2.jpg",
    "/img\\bracelet2.webp",
    "/img\\ghostBook.png",
    "/img\\horizontal.png",
    "/img\\horizontal.webp",
    "/img\\img_avatar2.png",
    "/img\\profile.png",
    "/img\\profile.webp",
    "/img\\profile2.png",
    "/img\\profile2.webp",
    "/img\\temporaryimg.png",
    "/img\\temporaryimg.webp"
  ]
};
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (__astrojsSsrVirtualEntry.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return __astrojsSsrVirtualEntry.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_checked_fetch();
init_modules_watch_stub();
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e3) {
      console.error("Failed to drain the unused request body.", e3);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e3) {
  return {
    name: e3?.name,
    message: e3?.message ?? String(e3),
    stack: e3?.stack,
    cause: e3?.cause === void 0 ? void 0 : reduceError(e3.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e3) {
    const error3 = reduceError(e3);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-ruotjD/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  ...void 0 ?? [],
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-ruotjD/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type2, init2) {
        if (type2 === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type2, init2) => {
      if (type2 === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default,
  pageMap
};
/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
/**
* @vue/reactivity v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/runtime-core v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/runtime-dom v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/**
* @vue/server-renderer v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
//# sourceMappingURL=pmiklx8ah3f.js.map
