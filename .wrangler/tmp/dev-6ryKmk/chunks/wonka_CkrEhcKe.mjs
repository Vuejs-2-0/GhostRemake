globalThis.process ??= {}; globalThis.process.env ??= {};
var teardownPlaceholder = () => {};

var e = teardownPlaceholder;

function start(e) {
  return {
    tag: 0,
    0: e
  };
}

function push(e) {
  return {
    tag: 1,
    0: e
  };
}

var asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";

var identity = e => e;

function filter(r) {
  return t => i => {
    var a = e;
    t((e => {
      if (0 === e) {
        i(0);
      } else if (0 === e.tag) {
        a = e[0];
        i(e);
      } else if (!r(e[0])) {
        a(0);
      } else {
        i(e);
      }
    }));
  };
}

function map(e) {
  return r => t => r((r => {
    if (0 === r || 0 === r.tag) {
      t(r);
    } else {
      t(push(e(r[0])));
    }
  }));
}

function mergeMap(r) {
  return t => i => {
    var a = [];
    var f = e;
    var n = !1;
    var s = !1;
    t((t => {
      if (s) ; else if (0 === t) {
        s = !0;
        if (!a.length) {
          i(0);
        }
      } else if (0 === t.tag) {
        f = t[0];
      } else {
        n = !1;
        !function applyInnerSource(r) {
          var t = e;
          r((e => {
            if (0 === e) {
              if (a.length) {
                var r = a.indexOf(t);
                if (r > -1) {
                  (a = a.slice()).splice(r, 1);
                }
                if (!a.length) {
                  if (s) {
                    i(0);
                  } else if (!n) {
                    n = !0;
                    f(0);
                  }
                }
              }
            } else if (0 === e.tag) {
              a.push(t = e[0]);
              t(0);
            } else if (a.length) {
              i(e);
              t(0);
            }
          }));
        }(r(t[0]));
        if (!n) {
          n = !0;
          f(0);
        }
      }
    }));
    i(start((e => {
      if (1 === e) {
        if (!s) {
          s = !0;
          f(1);
        }
        for (var r = 0, t = a, i = a.length; r < i; r++) {
          t[r](1);
        }
        a.length = 0;
      } else {
        if (!s && !n) {
          n = !0;
          f(0);
        } else {
          n = !1;
        }
        for (var l = 0, u = a, o = a.length; l < o; l++) {
          u[l](0);
        }
      }
    })));
  };
}

function mergeAll(e) {
  return mergeMap(identity)(e);
}

function merge(e) {
  return mergeAll(r(e));
}

function onEnd(e) {
  return r => t => {
    var i = !1;
    r((r => {
      if (i) ; else if (0 === r) {
        i = !0;
        t(0);
        e();
      } else if (0 === r.tag) {
        var a = r[0];
        t(start((r => {
          if (1 === r) {
            i = !0;
            a(1);
            e();
          } else {
            a(r);
          }
        })));
      } else {
        t(r);
      }
    }));
  };
}

function onPush(e) {
  return r => t => {
    var i = !1;
    r((r => {
      if (i) ; else if (0 === r) {
        i = !0;
        t(0);
      } else if (0 === r.tag) {
        var a = r[0];
        t(start((e => {
          if (1 === e) {
            i = !0;
          }
          a(e);
        })));
      } else {
        e(r[0]);
        t(r);
      }
    }));
  };
}

function onStart(e) {
  return r => t => r((r => {
    if (0 === r) {
      t(0);
    } else if (0 === r.tag) {
      t(r);
      e();
    } else {
      t(r);
    }
  }));
}

function share(r) {
  var t = [];
  var i = e;
  var a = !1;
  return e => {
    t.push(e);
    if (1 === t.length) {
      r((e => {
        if (0 === e) {
          for (var r = 0, f = t, n = t.length; r < n; r++) {
            f[r](0);
          }
          t.length = 0;
        } else if (0 === e.tag) {
          i = e[0];
        } else {
          a = !1;
          for (var s = 0, l = t, u = t.length; s < u; s++) {
            l[s](e);
          }
        }
      }));
    }
    e(start((r => {
      if (1 === r) {
        var f = t.indexOf(e);
        if (f > -1) {
          (t = t.slice()).splice(f, 1);
        }
        if (!t.length) {
          i(1);
        }
      } else if (!a) {
        a = !0;
        i(0);
      }
    })));
  };
}

function switchMap(r) {
  return t => i => {
    var a = e;
    var f = e;
    var n = !1;
    var s = !1;
    var l = !1;
    var u = !1;
    t((t => {
      if (u) ; else if (0 === t) {
        u = !0;
        if (!l) {
          i(0);
        }
      } else if (0 === t.tag) {
        a = t[0];
      } else {
        if (l) {
          f(1);
          f = e;
        }
        if (!n) {
          n = !0;
          a(0);
        } else {
          n = !1;
        }
        !function applyInnerSource(e) {
          l = !0;
          e((e => {
            if (!l) ; else if (0 === e) {
              l = !1;
              if (u) {
                i(0);
              } else if (!n) {
                n = !0;
                a(0);
              }
            } else if (0 === e.tag) {
              s = !1;
              (f = e[0])(0);
            } else {
              i(e);
              if (!s) {
                f(0);
              } else {
                s = !1;
              }
            }
          }));
        }(r(t[0]));
      }
    }));
    i(start((e => {
      if (1 === e) {
        if (!u) {
          u = !0;
          a(1);
        }
        if (l) {
          l = !1;
          f(1);
        }
      } else {
        if (!u && !n) {
          n = !0;
          a(0);
        }
        if (l && !s) {
          s = !0;
          f(0);
        }
      }
    })));
  };
}

function take(r) {
  return t => i => {
    var a = e;
    var f = !1;
    var n = 0;
    t((e => {
      if (f) ; else if (0 === e) {
        f = !0;
        i(0);
      } else if (0 === e.tag) {
        {
          a = e[0];
        }
      } else if (n++ < r) {
        i(e);
        if (!f && n >= r) {
          f = !0;
          i(0);
          a(1);
        }
      } else {
        i(e);
      }
    }));
    i(start((e => {
      if (1 === e && !f) {
        f = !0;
        a(1);
      } else if (0 === e && !f && n < r) {
        a(0);
      }
    })));
  };
}

function takeUntil(r) {
  return t => i => {
    var a = e;
    var f = e;
    var n = !1;
    t((e => {
      if (n) ; else if (0 === e) {
        n = !0;
        f(1);
        i(0);
      } else if (0 === e.tag) {
        a = e[0];
        r((e => {
          if (0 === e) ; else if (0 === e.tag) {
            (f = e[0])(0);
          } else {
            n = !0;
            f(1);
            a(1);
            i(0);
          }
        }));
      } else {
        i(e);
      }
    }));
    i(start((e => {
      if (1 === e && !n) {
        n = !0;
        a(1);
        f(1);
      } else if (!n) {
        a(0);
      }
    })));
  };
}

function takeWhile(r, t) {
  return i => a => {
    var f = e;
    var n = !1;
    i((e => {
      if (n) ; else if (0 === e) {
        n = !0;
        a(0);
      } else if (0 === e.tag) {
        f = e[0];
        a(e);
      } else if (!r(e[0])) {
        n = !0;
        {
          a(e);
        }
        a(0);
        f(1);
      } else {
        a(e);
      }
    }));
  };
}

function lazy(e) {
  return r => e()(r);
}

function fromAsyncIterable(e) {
  return r => {
    var t = e[asyncIteratorSymbol()] && e[asyncIteratorSymbol()]() || e;
    var i = !1;
    var a = !1;
    var f = !1;
    var n;
    r(start((async e => {
      if (1 === e) {
        i = !0;
        if (t.return) {
          t.return();
        }
      } else if (a) {
        f = !0;
      } else {
        for (f = a = !0; f && !i; ) {
          if ((n = await t.next()).done) {
            i = !0;
            if (t.return) {
              await t.return();
            }
            r(0);
          } else {
            try {
              f = !1;
              r(push(n.value));
            } catch (e) {
              if (t.throw) {
                if (i = !!(await t.throw(e)).done) {
                  r(0);
                }
              } else {
                throw e;
              }
            }
          }
        }
        a = !1;
      }
    })));
  };
}

function fromIterable(e) {
  if (e[Symbol.asyncIterator]) {
    return fromAsyncIterable(e);
  }
  return r => {
    var t = e[Symbol.iterator]();
    var i = !1;
    var a = !1;
    var f = !1;
    var n;
    r(start((e => {
      if (1 === e) {
        i = !0;
        if (t.return) {
          t.return();
        }
      } else if (a) {
        f = !0;
      } else {
        for (f = a = !0; f && !i; ) {
          if ((n = t.next()).done) {
            i = !0;
            if (t.return) {
              t.return();
            }
            r(0);
          } else {
            try {
              f = !1;
              r(push(n.value));
            } catch (e) {
              if (t.throw) {
                if (i = !!t.throw(e).done) {
                  r(0);
                }
              } else {
                throw e;
              }
            }
          }
        }
        a = !1;
      }
    })));
  };
}

var r = fromIterable;

function fromValue(e) {
  return r => {
    var t = !1;
    r(start((i => {
      if (1 === i) {
        t = !0;
      } else if (!t) {
        t = !0;
        r(push(e));
        r(0);
      }
    })));
  };
}

function make(e) {
  return r => {
    var t = !1;
    var i = e({
      next(e) {
        if (!t) {
          r(push(e));
        }
      },
      complete() {
        if (!t) {
          t = !0;
          r(0);
        }
      }
    });
    r(start((e => {
      if (1 === e && !t) {
        t = !0;
        i();
      }
    })));
  };
}

function makeSubject() {
  var e;
  var r;
  return {
    source: share(make((t => {
      e = t.next;
      r = t.complete;
      return teardownPlaceholder;
    }))),
    next(r) {
      if (e) {
        e(r);
      }
    },
    complete() {
      if (r) {
        r();
      }
    }
  };
}

function subscribe(r) {
  return t => {
    var i = e;
    var a = !1;
    t((e => {
      if (0 === e) {
        a = !0;
      } else if (0 === e.tag) {
        (i = e[0])(0);
      } else if (!a) {
        r(e[0]);
        i(0);
      }
    }));
    return {
      unsubscribe() {
        if (!a) {
          a = !0;
          i(1);
        }
      }
    };
  };
}

function publish(e) {
  subscribe((e => {}))(e);
}

function toPromise(r) {
  return new Promise((t => {
    var i = e;
    var a;
    r((e => {
      if (0 === e) {
        Promise.resolve(a).then(t);
      } else if (0 === e.tag) {
        (i = e[0])(0);
      } else {
        a = e[0];
        i(0);
      }
    }));
  }));
}

export { fromAsyncIterable as a, share as b, makeSubject as c, take as d, takeUntil as e, filter as f, takeWhile as g, switchMap as h, onPush as i, onStart as j, fromValue as k, lazy as l, merge as m, map as n, onEnd as o, publish as p, mergeMap as q, subscribe as s, toPromise as t };
