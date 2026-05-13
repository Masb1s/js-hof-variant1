window.myMap = (fn, list) => {
  const r = [];
  for (let i = 0; i < list.length; i++) r.push(fn(list[i]));
  return r;
};

window.myFilter = (fn, list) => {
  const r = [];
  for (let i = 0; i < list.length; i++) if (fn(list[i])) r.push(list[i]);
  return r;
};

window.myReduce = (fn, init, list) => {
  let acc = init;
  for (let i = 0; i < list.length; i++) acc = fn(acc, list[i]);
  return acc;
};

window.compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
window.pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

window.curry = (fn) => {
  const cur = (...args) =>
    args.length >= fn.length ? fn(...args) : (...rest) => cur(...args, ...rest);
  return cur;
};

window.partial = (fn, ...a) => (...b) => fn(...a, ...b);

window.memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const k = JSON.stringify(args);
    if (cache[k]) return cache[k];
    return (cache[k] = fn(...args));
  };
};

window.createChain = (v) => {
  let value = v;
  return {
    map(fn) {
      value = window.myMap(fn, value);
      return this;
    },
    filter(fn) {
      value = window.myFilter(fn, value);
      return this;
    },
    reduce(fn, init) {
      value = window.myReduce(fn, init, value);
      return this;
    },
    value() {
      return value;
    }
  };
};
