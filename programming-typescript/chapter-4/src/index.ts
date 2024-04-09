function add(a: number, b: number) {
    return a + b
}

let addition = add
console.log(addition(1, 2)) // 3

// return type inference

function add1(a: number, b: number): number {
    return a + b
}

// named function

function greet(name: String) {
    return 'Hello, ' + name
}

// Function expression
let greet2 = function (name: string) {
    return 'hello, ' + name
}

// Arrow function expression    
let greet3 = (name: string) => {
    return 'hello, ' + name
}
//shrthand arrow function expression
let greet4 = (name: string) => 'hello, ' + name

//function constructor
let greet5 = new Function('name', 'return "hello"+name')

add(1, 2)

greet('John')

// add(1) //Expected 2 arguments, but got 1.ts(2554)

// greet('hi','df') //Expected 1 arguments, but got 2.ts(2554)




// Optional parameters and default parameters
function log(message: string, user?: string) {
    let time = new Date().toLocaleTimeString()
    console.log(time, message, user || 'Not signed in')
}

log('Page loaded')
log('User signed in', 'John')

function log2(message: string, user: string = 'Not signed in') {
    let time = new Date().toLocaleTimeString()
    console.log(time, message, user)
}

log2('Page loaded')
log2('User signed in', 'John')


type Context = {
    appId?: string
    userId?: string
}

function log3(message: string, context: Context = {}) {

    let time = new Date().toISOString()
    console.log(time, message, context.userId)
}
log3('Page loaded')
log3('User clicked on a button', { userId: '123' })



// Rest parameters
// unsafe arguments magic variable,
function sumVariadic(...numbers: number[]): number {
    return Array
        .from(arguments)
        .reduce((total, n) => total + n, 0)
}

sumVariadic(1, 2, 3) // evaluates to 6



/*
The provided TypeScript code defines a function named sumVariadic that takes a variable number of arguments and returns their sum. Let's break it down:

1  ...numbers: number[]: The ... syntax is known as the rest parameter syntax. It allows us to represent an indefinite number of arguments as an array. In this case, numbers is an array of numbers.

2 : number: This is the return type of the function. It indicates that the function will return a number.

3 Array.from(arguments): This line is converting arguments, which is an array-like object containing all arguments passed to the function, into a real array. However, in this case, it's unnecessary because we already have numbers as an array due to the rest parameter syntax.

4 .reduce((total, n) => total + n, 0): This line is using the reduce method of the array to sum up all the numbers. reduce takes a callback function that is called for each item in the array. The callback takes two arguments: the accumulator (total in this case) and the current value (n in this case). The accumulator is the value that you return from the previous invocation of the callback, or the initial value if it's the first invocation. In this case, the initial value is 0, and the callback adds the current number to the total.

However, there's a potential improvement to this function. Since we're already using the rest parameter syntax to collect all arguments into an array, we can use numbers directly instead of Array.from(arguments). Here's the improved function:

This function works exactly the same way as the original one, but it's simpler and more efficient because it doesn't need to convert arguments into an array.

*/


// rest parameter syntax

function sumVariadic1(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}

sumVariadic1(1, 2, 3) // evaluates to 6

// call , apply and bind ???

add(10, 20)
// add(10, 20): This is the most straightforward way to call a function. It's calling the add function with two arguments, 10 and 20.
add.apply(null, [10, 20])
//add.apply(null, [10, 20]): The apply method calls a function with a given this value, and arguments provided as an array (or an array-like object). In this case, null is used as the this value, which means the this value inside the add function will be null (or the global object in non-strict mode). The arguments 10 and 20 are provided as an array.
add.call(null, 10, 20)
//add.call(null, 10, 20): The call method works very similarly to apply, but it takes an argument list, rather than an array. So, add.call(null, 10, 20) is equivalent to add.apply(null, [10, 20]).
add.bind(null, 10, 20)()
//add.bind(null,10,20)(): The bind method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. In this case, it creates a new function that is equivalent to add(10, 20), and then immediately calls that function with ().

// In all four cases, the add function is called with the same arguments, 10 and 20, so it will return the same result, 30. The different methods are just different ways to call the function, which can be useful in different situations. For example, apply and call can be useful when you want to specify the this value, and bind can be useful when you want to create a new function with certain arguments preset.




// Typing `this`
let x = {
    a() {
        return this;
    }
};
console.log('This is ' + x.a());

let a = x.a;
console.log('This is ' + a()); // This is undefined

function fancyDate(this: Date) {
    return `${this.getDate()}/${this.getMonth()}/${this.getFullYear()}`;
}
console.log(fancyDate.call(new Date))
// fancyDate() //The 'this' context of type 'void' is not assignable to method's 'this' of type 'Date'.ts(2684)




//Generator functions:
//convenient way to, well, generate a bunch of values. 

function* createFibonacciGenerator() {

    let a = 0
    let b = 1
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}

let fibonacciGenerator = createFibonacciGenerator()

console.log(fibonacciGenerator.next())
console.log(fibonacciGenerator.next())
console.log(fibonacciGenerator.next())
console.log(fibonacciGenerator.next())
console.log(fibonacciGenerator.next())
console.log(fibonacciGenerator.next())

function* createNumbers(): IterableIterator<number> {

    let a = 0
    while (true) {
        yield a;
        a++
    }
}
let createNumbersGenerator = createNumbers()
console.log(createNumbersGenerator.next())
console.log(createNumbersGenerator.next())
console.log(createNumbersGenerator.next())



// iterators

let numbers = {
    *[Symbol.iterator]() {
        for (let n = 1; n <= 10; n++) {
            yield n
        }
    }

}

// Iterate over an iterator with for-of
for (let a of numbers) {
    console.log(a)
}

let allNumbers = [...numbers]
console.log(allNumbers)
let [one, two, ...rest] = numbers
console.log(one)
console.log(two)
console.log(rest)



//Call Signatures
console.log(typeof add) // function
//Let’s go through a few of the examples of functions we’ve seen so far in this chapter, and pull out their types into standalone call signatures that we’ll bind to type aliases:

type Greet = (name: string) => string

type Log = (message: string, userId?: string) => void

type SumVariadicSafe = (...numbers: number[]) => number

//declare a function that implements that signature
let log1: Log = (message, userId = 'Not signed in') => {
    let time = new Date().toISOString()
    console.log(time, message, userId)
}




// Contextual Typing

function times(f: (index: number) => void, n: number) {
    for (let i = 0; i < n; i++) {
        f(i)
    }
}

times((n) => console.log(n), 4)


// function f(n) { // Parameter 'n' implicitly has an 'any' type.ts(7006)
//     console.log(n)
//   }
// times(f, 4)



// Overloaded Function Types

// Shorthand call signature
type Log2 = (message: string, userId?: string) => void

// Full call signature
type Log3 = {
    (message: string, userId?: string): void
}

// OVERLOADED FUNCTION
// A function with multiple call signatures.
type Reservation = string

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation

}
// let reserve: Reserve = (from, to, destination) => {
//     return 'done'
// }

let reserve: Reserve = (
    from: Date,
    toOrDestination: Date | string,
    destination?: string
) => {
    if (toOrDestination instanceof Date && destination !== undefined) {
        // Book a one-way trip
    } else if (typeof toOrDestination === 'string') {
        // Book a round trip
    }
    return 'done'
}



//When using overloads, try to keep your implementation’s signature as specific as possible to make it easier to implement the function. 

function getMonth(date: any): number | undefined {
    return date.getMonth()
}
function getMonth1(date: Date): number {
    return date.getMonth()
}
console.log("Month is " + getMonth(new Date())) // 5
console.log("Month is " + getMonth1(new Date())) // 5


// type CreateElement = {
//     (tag: 'a'): HTMLAnchorElement 1
//         (tag: 'canvas'): HTMLCanvasElement
//     (tag: 'table'): HTMLTableElement
//     (tag: string): HTMLElement 2
// }
// let createElement: CreateElement = (tag: string): HTMLElement => {
//     3
//     // ...
// }


// overload a function declaration


type HTMLAnchorElement = string
type HTMLCanvasElement = string
type HTMLTableElement = string
type HTMLElement = string

function createElement(tag: 'a'): HTMLAnchorElement
function createElement(tag: 'canvas'): HTMLCanvasElement
function createElement(tag: 'table'): HTMLTableElement
function createElement(tag: string): HTMLElement {

    return 'done'
}

// function reserve3 (from: Date, to: Date, destination: 'india'): Reservation
// function reserve3 (from: Date, to: Date, destination: 'uk'): string{
//     return 'done'
// }



type WarnUser = {
    (warning: string): void;
    wasCalled: boolean;
};
//TODO: Ask bence if he can fix this

// let warnUser: WarnUser = (warning: string) => {
//     if (warnUser.wasCalled) {
//         return
//     }
//     warnUser.wasCalled = true
//     // alert(warning)
// }
// warnUser.wasCalled = false







//Polymorphism



function filter(array, f) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (f(item)) {
        result.push(item)
      }
    }
    return result
  }
  
  filter([1, 2, 3, 4], _ => _ < 3) // evaluates to [1, 2]f