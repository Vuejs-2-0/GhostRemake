globalThis.process ??= {}; globalThis.process.env ??= {};
import { p as parse, a as print, e, G as GraphQLError } from './@0no-co_Dxoah_iz.mjs';
import { o as onEnd, f as filter, a as fromAsyncIterable, s as subscribe, b as share, p as publish, t as toPromise, m as merge, c as makeSubject, d as take, e as takeUntil, g as takeWhile, h as switchMap, i as onPush, j as onStart, l as lazy, k as fromValue, n as map, q as mergeMap } from './wonka_CkrEhcKe.mjs';

var rehydrateGraphQlError = (r2) => {
  if (r2 && r2.message && (r2.extensions || "GraphQLError" === r2.name)) {
    return r2;
  } else if ("object" == typeof r2 && r2.message) {
    return new GraphQLError(r2.message, r2.nodes, r2.source, r2.positions, r2.path, r2, r2.extensions || {});
  } else {
    return new GraphQLError(r2);
  }
};
class CombinedError extends Error {
  constructor(e2) {
    var r2 = (e2.graphQLErrors || []).map(rehydrateGraphQlError);
    var t2 = ((e3, r3) => {
      var t3 = "";
      if (e3) {
        return `[Network] ${e3.message}`;
      }
      if (r3) {
        for (var a2 of r3) {
          if (t3) {
            t3 += "\n";
          }
          t3 += `[GraphQL] ${a2.message}`;
        }
      }
      return t3;
    })(e2.networkError, r2);
    super(t2);
    this.name = "CombinedError";
    this.message = t2;
    this.graphQLErrors = r2;
    this.networkError = e2.networkError;
    this.response = e2.response;
  }
  toString() {
    return this.message;
  }
}
var phash = (e2, r2) => {
  var t2 = 0 | (r2 || 5381);
  for (var a2 = 0, o2 = 0 | e2.length; a2 < o2; a2++) {
    t2 = (t2 << 5) + t2 + e2.charCodeAt(a2);
  }
  return t2;
};
var i = /* @__PURE__ */ new Set();
var f = /* @__PURE__ */ new WeakMap();
var stringify = (e2, r2) => {
  if (null === e2 || i.has(e2)) {
    return "null";
  } else if ("object" != typeof e2) {
    return JSON.stringify(e2) || "";
  } else if (e2.toJSON) {
    return stringify(e2.toJSON(), r2);
  } else if (Array.isArray(e2)) {
    var t2 = "[";
    for (var a2 of e2) {
      if (t2.length > 1) {
        t2 += ",";
      }
      t2 += stringify(a2, r2) || "null";
    }
    return t2 += "]";
  } else if (!r2 && (l !== NoopConstructor && e2 instanceof l || c !== NoopConstructor && e2 instanceof c)) {
    return "null";
  }
  var o2 = Object.keys(e2).sort();
  if (!o2.length && e2.constructor && Object.getPrototypeOf(e2).constructor !== Object.prototype.constructor) {
    var n2 = f.get(e2) || Math.random().toString(36).slice(2);
    f.set(e2, n2);
    return stringify({
      __key: n2
    }, r2);
  }
  i.add(e2);
  var s2 = "{";
  for (var d2 of o2) {
    var v2 = stringify(e2[d2], r2);
    if (v2) {
      if (s2.length > 1) {
        s2 += ",";
      }
      s2 += stringify(d2, r2) + ":" + v2;
    }
  }
  i.delete(e2);
  return s2 += "}";
};
var extract = (e2, r2, t2) => {
  if (null == t2 || "object" != typeof t2 || t2.toJSON || i.has(t2)) ; else if (Array.isArray(t2)) {
    for (var a2 = 0, o2 = t2.length; a2 < o2; a2++) {
      extract(e2, `${r2}.${a2}`, t2[a2]);
    }
  } else if (t2 instanceof l || t2 instanceof c) {
    e2.set(r2, t2);
  } else {
    i.add(t2);
    for (var n2 of Object.keys(t2)) {
      extract(e2, `${r2}.${n2}`, t2[n2]);
    }
  }
};
var stringifyVariables = (e2, r2) => {
  i.clear();
  return stringify(e2, r2 || false);
};
class NoopConstructor {
}
var l = "undefined" != typeof File ? File : NoopConstructor;
var c = "undefined" != typeof Blob ? Blob : NoopConstructor;
var d = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;
var v = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;
var replaceOutsideStrings = (e2, r2) => r2 % 2 == 0 ? e2.replace(v, "\n") : e2;
var sanitizeDocument = (e2) => e2.split(d).map(replaceOutsideStrings).join("").trim();
var p = /* @__PURE__ */ new Map();
var u = /* @__PURE__ */ new Map();
var stringifyDocument = (e2) => {
  var t2;
  if ("string" == typeof e2) {
    t2 = sanitizeDocument(e2);
  } else if (e2.loc && u.get(e2.__key) === e2) {
    t2 = e2.loc.source.body;
  } else {
    t2 = p.get(e2) || sanitizeDocument(print(e2));
    p.set(e2, t2);
  }
  if ("string" != typeof e2 && !e2.loc) {
    e2.loc = {
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
var hashDocument = (e2) => {
  var r2;
  if (e2.documentId) {
    r2 = phash(e2.documentId);
  } else {
    r2 = phash(stringifyDocument(e2));
    if (e2.definitions) {
      var t2 = getOperationName(e2);
      if (t2) {
        r2 = phash(`
# ${t2}`, r2);
      }
    }
  }
  return r2;
};
var keyDocument = (e2) => {
  var r2;
  var a2;
  if ("string" == typeof e2) {
    r2 = hashDocument(e2);
    a2 = u.get(r2) || parse(e2);
  } else {
    r2 = e2.__key || hashDocument(e2);
    a2 = u.get(r2) || e2;
  }
  if (!a2.loc) {
    stringifyDocument(a2);
  }
  a2.__key = r2;
  u.set(r2, a2);
  return a2;
};
var createRequest = (e2, r2, t2) => {
  var a2 = r2 || {};
  var o2 = keyDocument(e2);
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
var getOperationName = (e2) => {
  for (var r2 of e2.definitions) {
    if (r2.kind === e.OPERATION_DEFINITION) {
      return r2.name ? r2.name.value : void 0;
    }
  }
};
var makeResult = (e2, r2, t2) => {
  if (!("data" in r2 || "errors" in r2 && Array.isArray(r2.errors))) {
    throw new Error("No Content");
  }
  var a2 = "subscription" === e2.kind;
  return {
    operation: e2,
    data: r2.data,
    error: Array.isArray(r2.errors) ? new CombinedError({
      graphQLErrors: r2.errors,
      response: t2
    }) : void 0,
    extensions: r2.extensions ? {
      ...r2.extensions
    } : void 0,
    hasNext: null == r2.hasNext ? a2 : r2.hasNext,
    stale: false
  };
};
var deepMerge = (e2, r2) => {
  if ("object" == typeof e2 && null != e2) {
    if (!e2.constructor || e2.constructor === Object || Array.isArray(e2)) {
      e2 = Array.isArray(e2) ? [...e2] : {
        ...e2
      };
      for (var t2 of Object.keys(r2)) {
        e2[t2] = deepMerge(e2[t2], r2[t2]);
      }
      return e2;
    }
  }
  return r2;
};
var mergeResultPatch = (e2, r2, t2, a2) => {
  var o2 = e2.error ? e2.error.graphQLErrors : [];
  var n2 = !!e2.extensions || !!(r2.payload || r2).extensions;
  var s2 = {
    ...e2.extensions,
    ...(r2.payload || r2).extensions
  };
  var i2 = r2.incremental;
  if ("path" in r2) {
    i2 = [r2];
  }
  var f2 = {
    data: e2.data
  };
  if (i2) {
    var _loop = function(e3) {
      if (Array.isArray(e3.errors)) {
        o2.push(...e3.errors);
      }
      if (e3.extensions) {
        Object.assign(s2, e3.extensions);
        n2 = true;
      }
      var r3 = "data";
      var t3 = f2;
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
      for (var c2 = 0, d2 = i3.length; c2 < d2; r3 = i3[c2++]) {
        t3 = t3[r3] = Array.isArray(t3[r3]) ? [...t3[r3]] : {
          ...t3[r3]
        };
      }
      if (e3.items) {
        var v2 = +r3 >= 0 ? r3 : 0;
        for (var p2 = 0, u2 = e3.items.length; p2 < u2; p2++) {
          t3[v2 + p2] = deepMerge(t3[v2 + p2], e3.items[p2]);
        }
      } else if (void 0 !== e3.data) {
        t3[r3] = deepMerge(t3[r3], e3.data);
      }
    };
    for (var l2 of i2) {
      _loop(l2);
    }
  } else {
    f2.data = (r2.payload || r2).data || e2.data;
    o2 = r2.errors || r2.payload && r2.payload.errors || o2;
  }
  return {
    operation: e2.operation,
    data: f2.data,
    error: o2.length ? new CombinedError({
      graphQLErrors: o2,
      response: t2
    }) : void 0,
    extensions: n2 ? s2 : void 0,
    hasNext: null != r2.hasNext ? r2.hasNext : e2.hasNext,
    stale: false
  };
};
var makeErrorResult = (e2, r2, t2) => ({
  operation: e2,
  data: void 0,
  error: new CombinedError({
    networkError: r2,
    response: t2
  }),
  extensions: void 0,
  hasNext: false,
  stale: false
});
function makeFetchBody(e2) {
  var r2 = {
    query: void 0,
    documentId: void 0,
    operationName: getOperationName(e2.query),
    variables: e2.variables || void 0,
    extensions: e2.extensions
  };
  if ("documentId" in e2.query && e2.query.documentId && (!e2.query.definitions || !e2.query.definitions.length)) {
    r2.documentId = e2.query.documentId;
  } else if (!e2.extensions || !e2.extensions.persistedQuery || e2.extensions.persistedQuery.miss) {
    r2.query = stringifyDocument(e2.query);
  }
  return r2;
}
var makeFetchURL = (e2, r2) => {
  var t2 = "query" === e2.kind && e2.context.preferGetMethod;
  if (!t2 || !r2) {
    return e2.context.url;
  }
  var a2 = splitOutSearchParams(e2.context.url);
  for (var o2 in r2) {
    var n2 = r2[o2];
    if (n2) {
      a2[1].set(o2, "object" == typeof n2 ? stringifyVariables(n2) : n2);
    }
  }
  var s2 = a2.join("?");
  if (s2.length > 2047 && "force" !== t2) {
    e2.context.preferGetMethod = false;
    return e2.context.url;
  }
  return s2;
};
var splitOutSearchParams = (e2) => {
  var r2 = e2.indexOf("?");
  return r2 > -1 ? [e2.slice(0, r2), new URLSearchParams(e2.slice(r2 + 1))] : [e2, new URLSearchParams()];
};
var serializeBody = (e2, r2) => {
  if (r2 && !("query" === e2.kind && !!e2.context.preferGetMethod)) {
    var t2 = stringifyVariables(r2);
    var a2 = ((e3) => {
      var r3 = /* @__PURE__ */ new Map();
      if (l !== NoopConstructor || c !== NoopConstructor) {
        i.clear();
        extract(r3, "variables", e3);
      }
      return r3;
    })(r2.variables);
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
var makeFetchOptions = (e2, r2) => {
  var t2 = {
    accept: "subscription" === e2.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
  };
  var a2 = ("function" == typeof e2.context.fetchOptions ? e2.context.fetchOptions() : e2.context.fetchOptions) || {};
  if (a2.headers) {
    if (((e3) => "has" in e3 && !Object.keys(e3).length)(a2.headers)) {
      a2.headers.forEach((e3, r3) => {
        t2[r3] = e3;
      });
    } else if (Array.isArray(a2.headers)) {
      a2.headers.forEach((e3, r3) => {
        if (Array.isArray(e3)) {
          if (t2[e3[0]]) {
            t2[e3[0]] = `${t2[e3[0]]},${e3[1]}`;
          } else {
            t2[e3[0]] = e3[1];
          }
        } else {
          t2[r3] = e3;
        }
      });
    } else {
      for (var o2 in a2.headers) {
        t2[o2.toLowerCase()] = a2.headers[o2];
      }
    }
  }
  var n2 = serializeBody(e2, r2);
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
var y = "undefined" != typeof TextDecoder ? new TextDecoder() : null;
var h = /boundary="?([^=";]+)"?/i;
var m = /data: ?([^\n]+)/;
var toString = (e2) => "Buffer" === e2.constructor.name ? e2.toString() : y.decode(e2);
async function* streamBody(e2) {
  if (e2.body[Symbol.asyncIterator]) {
    for await (var r2 of e2.body) {
      yield toString(r2);
    }
  } else {
    var t2 = e2.body.getReader();
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
async function* split(e2, r2) {
  var t2 = "";
  var a2;
  for await (var o2 of e2) {
    t2 += o2;
    while ((a2 = t2.indexOf(r2)) > -1) {
      yield t2.slice(0, a2);
      t2 = t2.slice(a2 + r2.length);
    }
  }
}
async function* fetchOperation(e2, r2, t2) {
  var a2 = true;
  var o2 = null;
  var n2;
  try {
    yield await Promise.resolve();
    var s2 = (n2 = await (e2.context.fetch || fetch)(r2, t2)).headers.get("Content-Type") || "";
    var i2;
    if (/multipart\/mixed/i.test(s2)) {
      i2 = async function* parseMultipartMixed(e3, r3) {
        var t3 = e3.match(h);
        var a3 = "--" + (t3 ? t3[1] : "-");
        var o3 = true;
        var n3;
        for await (var s3 of split(streamBody(r3), "\r\n" + a3)) {
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
      i2 = async function* parseEventStream(e3) {
        var r3;
        for await (var t3 of split(streamBody(e3), "\n\n")) {
          var a3 = t3.match(m);
          if (a3) {
            var o3 = a3[1];
            try {
              yield r3 = JSON.parse(o3);
            } catch (e4) {
              if (!r3) {
                throw e4;
              }
            }
            if (r3 && false === r3.hasNext) {
              break;
            }
          }
        }
        if (r3 && false !== r3.hasNext) {
          yield {
            hasNext: false
          };
        }
      }(n2);
    } else if (!/text\//i.test(s2)) {
      i2 = async function* parseJSON(e3) {
        yield JSON.parse(await e3.text());
      }(n2);
    } else {
      i2 = async function* parseMaybeJSON(e3) {
        var r3 = await e3.text();
        try {
          var t3 = JSON.parse(r3);
          if (false) ;
          yield t3;
        } catch (e4) {
          throw new Error(r3);
        }
      }(n2);
    }
    var f2;
    for await (var l2 of i2) {
      if (l2.pending && !o2) {
        f2 = l2.pending;
      } else if (l2.pending) {
        f2 = [...f2, ...l2.pending];
      }
      o2 = o2 ? mergeResultPatch(o2, l2, n2, f2) : makeResult(e2, l2, n2);
      a2 = false;
      yield o2;
      a2 = true;
    }
    if (!o2) {
      yield o2 = makeResult(e2, {}, n2);
    }
  } catch (r3) {
    if (!a2) {
      throw r3;
    }
    yield makeErrorResult(e2, n2 && (n2.status < 200 || n2.status >= 300) && n2.statusText ? new Error(n2.statusText) : r3, n2);
  }
}
function makeFetchSource(e2, r2, t2) {
  var a2;
  if ("undefined" != typeof AbortController) {
    t2.signal = (a2 = new AbortController()).signal;
  }
  return onEnd(() => {
    if (a2) {
      a2.abort();
    }
  })(filter((e3) => !!e3)(fromAsyncIterable(fetchOperation(e2, r2, t2))));
}

function withPromise(e2) {
  var source$ = (r2) => e2(r2);
  source$.toPromise = () => toPromise(take(1)(filter((e3) => !e3.stale && !e3.hasNext)(source$)));
  source$.then = (e3, r2) => source$.toPromise().then(e3, r2);
  source$.subscribe = (e3) => subscribe(e3)(source$);
  return source$;
}
function makeOperation(e2, r2, t2) {
  return {
    ...r2,
    kind: e2,
    context: r2.context ? {
      ...r2.context,
      ...t2
    } : t2 || r2.context
  };
}
var noop = () => {
};
function gql(n2) {
  var a2 = /* @__PURE__ */ new Map();
  var o2 = [];
  var i2 = [];
  var s2 = Array.isArray(n2) ? n2[0] : n2 || "";
  for (var c2 = 1; c2 < arguments.length; c2++) {
    var u2 = arguments[c2];
    if (u2 && u2.definitions) {
      i2.push(u2);
    } else {
      s2 += u2;
    }
    s2 += arguments[0][c2];
  }
  i2.unshift(keyDocument(s2));
  for (var p2 of i2) {
    for (var d2 of p2.definitions) {
      if (d2.kind === e.FRAGMENT_DEFINITION) {
        var v2 = d2.name.value;
        var l2 = stringifyDocument(d2);
        if (!a2.has(v2)) {
          a2.set(v2, l2);
          o2.push(d2);
        }
      } else {
        o2.push(d2);
      }
    }
  }
  return keyDocument({
    kind: e.DOCUMENT,
    definitions: o2
  });
}
var fetchExchange = ({ forward: e2, dispatchDebug: r2 }) => (t2) => {
  var n2 = mergeMap((e3) => {
    var n3 = makeFetchBody(e3);
    var a3 = makeFetchURL(e3, n3);
    var i2 = makeFetchOptions(e3, n3);
    var s2 = takeUntil(filter((r3) => "teardown" === r3.kind && r3.key === e3.key)(t2))(makeFetchSource(e3, a3, i2));
    return s2;
  })(filter((e3) => "teardown" !== e3.kind && ("subscription" !== e3.kind || !!e3.context.fetchSubscriptions))(t2));
  var a2 = e2(filter((e3) => "teardown" === e3.kind || "subscription" === e3.kind && !e3.context.fetchSubscriptions)(t2));
  return merge([n2, a2]);
};
var composeExchanges = (e2) => ({ client: r2, forward: t2, dispatchDebug: n2 }) => e2.reduceRight((e3, t3) => {
  return t3({
    client: r2,
    forward(r3) {
      return share(e3(share(r3)));
    },
    dispatchDebug(e4) {
    }
  });
}, t2);
var fallbackExchange = ({ dispatchDebug: e2 }) => (r2) => {
  return filter((e3) => false)(r2);
};
var C = function Client(e2) {
  var r2 = 0;
  var t2 = /* @__PURE__ */ new Map();
  var n2 = /* @__PURE__ */ new Map();
  var a2 = /* @__PURE__ */ new Set();
  var o2 = [];
  var i2 = {
    url: e2.url,
    fetchSubscriptions: e2.fetchSubscriptions,
    fetchOptions: e2.fetchOptions,
    fetch: e2.fetch,
    preferGetMethod: e2.preferGetMethod,
    requestPolicy: e2.requestPolicy || "cache-first"
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
    var r3 = takeUntil(filter((r4) => "teardown" === r4.kind && r4.key === e3.key)(s2.source))(filter((r4) => r4.operation.kind === e3.kind && r4.operation.key === e3.key && (!r4.operation.context._instance || r4.operation.context._instance === e3.context._instance))(O2));
    if ("query" !== e3.kind) {
      r3 = takeWhile((e4) => !!e4.hasNext)(r3);
    } else {
      r3 = switchMap((r4) => {
        var t3 = fromValue(r4);
        return r4.stale || r4.hasNext ? t3 : merge([t3, map(() => {
          r4.stale = true;
          return r4;
        })(take(1)(filter((r5) => r5.key === e3.key)(s2.source)))]);
      })(r3);
    }
    if ("mutation" !== e3.kind) {
      r3 = onEnd(() => {
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
      })(r3));
    } else {
      r3 = onStart(() => {
        nextOperation(e3);
      })(r3);
    }
    return share(r3);
  };
  var u2 = this instanceof Client ? this : Object.create(Client.prototype);
  var p2 = Object.assign(u2, {
    suspense: !!e2.suspense,
    operations$: s2.source,
    reexecuteOperation(e3) {
      if ("teardown" === e3.kind) {
        dispatchOperation(e3);
      } else if ("mutation" === e3.kind) {
        o2.push(e3);
        Promise.resolve().then(dispatchOperation);
      } else if (n2.has(e3.key)) {
        var r3 = false;
        for (var t3 = 0; t3 < o2.length; t3++) {
          if (o2[t3].key === e3.key) {
            o2[t3] = e3;
            r3 = true;
          }
        }
        if (!(r3 || a2.has(e3.key) && "network-only" !== e3.context.requestPolicy)) {
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
        _instance: "mutation" === e3 ? r2 = r2 + 1 | 0 : void 0,
        ...i2,
        ...n3,
        requestPolicy: n3.requestPolicy || i2.requestPolicy,
        suspense: n3.suspense || false !== n3.suspense && p2.suspense
      });
    },
    executeRequestOperation(e3) {
      if ("mutation" === e3.kind) {
        return withPromise(makeResultSource(e3));
      }
      return withPromise(lazy(() => {
        var r3 = n2.get(e3.key);
        if (!r3) {
          n2.set(e3.key, r3 = makeResultSource(e3));
        }
        r3 = onStart(() => {
          dispatchOperation(e3);
        })(r3);
        var a3 = t2.get(e3.key);
        if ("query" === e3.kind && a3 && (a3.stale || a3.hasNext)) {
          return switchMap(fromValue)(merge([r3, filter((r4) => r4 === t2.get(e3.key))(fromValue(a3))]));
        } else {
          return r3;
        }
      }));
    },
    executeQuery(e3, r3) {
      var t3 = p2.createRequestOperation("query", e3, r3);
      return p2.executeRequestOperation(t3);
    },
    executeSubscription(e3, r3) {
      var t3 = p2.createRequestOperation("subscription", e3, r3);
      return p2.executeRequestOperation(t3);
    },
    executeMutation(e3, r3) {
      var t3 = p2.createRequestOperation("mutation", e3, r3);
      return p2.executeRequestOperation(t3);
    },
    readQuery(e3, r3, t3) {
      var n3 = null;
      subscribe((e4) => {
        n3 = e4;
      })(p2.query(e3, r3, t3)).unsubscribe();
      return n3;
    },
    query: (e3, r3, t3) => p2.executeQuery(createRequest(e3, r3), t3),
    subscription: (e3, r3, t3) => p2.executeSubscription(createRequest(e3, r3), t3),
    mutation: (e3, r3, t3) => p2.executeMutation(createRequest(e3, r3), t3)
  });
  var d2 = noop;
  var g2 = composeExchanges(e2.exchanges);
  var O2 = share(g2({
    client: p2,
    dispatchDebug: d2,
    forward: fallbackExchange({
      dispatchDebug: d2
    })
  })(s2.source));
  publish(O2);
  return p2;
};

export { C, fetchExchange as f, gql as g };
