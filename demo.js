import {
  myMap,
  myFilter,
  myReduce,
  compose,
  pipe,
  curry,
  partial,
  memoize,
  createChain
} from './hof.js';

const numbers = [1, 2, 3, 4, 5];
const users = [
  { id: 1, name: 'Max', age: 20 },
  { id: 2, name: 'Anna', age: 25 },
  { id: 3, name: 'John', age: 17 }
];

const double = (x) => x * 2;
const isEven = (x) => x % 2 === 0;

console.log('myMap double:', myMap(double, numbers));
console.log('myFilter isEven:', myFilter(isEven, numbers));
console.log('myReduce sum:', myReduce((acc, x) => acc + x, 0, numbers));

const inc = (x) => x + 1;
const square = (x) => x * x;

const incThenSquare = pipe(inc, square);
const squareThenInc = compose(inc, square);

console.log('pipe(inc, square)(2):', incThenSquare(2));
console.log('compose(inc, square)(2):', squareThenInc(2));

const add3 = (a, b, c) => a + b + c;
const curriedAdd3 = curry(add3);

console.log('curriedAdd3(1)(2)(3):', curriedAdd3(1)(2)(3));
console.log('curriedAdd3(1, 2)(3):', curriedAdd3(1, 2)(3));

const multiply = (a, b, c) => a * b * c;
const doubleAndTriple = partial(multiply, 2, 3);

console.log('partial multiply:', doubleAndTriple(4));

const slowFib = (n) => {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
};

const memoFib = memoize(slowFib);

console.time('slowFib(35)');
console.log('slowFib(35):', slowFib(35));
console.timeEnd('slowFib(35)');

console.time('memoFib(35) first');
console.log('memoFib(35) first:', memoFib(35));
console.timeEnd('memoFib(35) first');

console.time('memoFib(35) second');
console.log('memoFib(35) second:', memoFib(35));
console.timeEnd('memoFib(35) second');

const result1 = createChain(numbers)
  .map(double)
  .filter(isEven)
  .reduce((acc, x) => acc + x, 0)
  .value();

console.log('Chain result1:', result1);

const adultsNames = createChain(users)
  .filter((u) => u.age >= 18)
  .map((u) => u.name)
  .value();

console.log('Chain adults names:', adultsNames);

const prop = curry((key, obj) => obj[key]);
const getAge = prop('age');
const getName = prop('name');

const isAdult = (user) => getAge(user) >= 18;
const toUpper = (str) => str.toUpperCase();
const getUpperName = compose(toUpper, getName);

const adultUpperNames = createChain(users)
  .filter(isAdult)
  .map(getUpperName)
  .value();

console.log('Adult upper names:', adultUpperNames);
