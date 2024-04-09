
// Any type

function squareOfAny(x: any) {
    return x * x
}
function anyTypes() {

    console.log(squareOfAny(2)) // returns: 4

    console.log(squareOfAny('2'))


    function squareOfNum(x: number) {
        return x * x
    }

    console.log(squareOfNum(2)) // returns: 4

    //    console.log(squareOfNum('2'))
    //src/index.ts:7:10 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
    //7 squareOf('2') // returns: 4
    //Found 1 error in src/index.ts:7

    let a: any = 10
    let b: any = ['danger']
    let c: any = a + b
    console.log(c) // returns: 10danger
}

// unknown type
function unknownTypes() {
    let d: unknown = 30
    let e = d == 10
    // let f = d + 10 // error TS2571: Object is of type 'unknown'.
    if (typeof d == 'number') {
        let f = d + 10
    }
}

// boolean type
function booleanTypes() {

    let a = true                // boolean
    var b = false               // boolean
    const c = true              // true

    let d: boolean = true       // boolean
    let e: true = true          // true
    // let f: true = false         // Error TS2322: Type 'false' is not assignable
    // to type 'true'.
    const g: true = true

    // note both const are inferred as true.
}


function numberTypes() {

    let a = 1234                // number
    var b = Infinity * 0.10     // number
    const c = 5678              // 5678
    let d = a < b               // boolean
    let e: number = 100         // number
    let f: 26.218 = 26.218      // 26.218
    // let g: 26.218 = 10          // Error TS2322: Type '10' is not assignable
    // to type '26.218'.
    let one_million = 1_000_000
    let two_million: 2_000_000 = 2000000
}

function bigintTypes() {

    let a = 1234n               // bigint
    const b = 5678n             // 5678n
    var c = a + b               // bigint
    let d = a < 1235            // boolean
    // let e = 88.5n               // Error TS1353: A bigint literal must be an integer.
    let f: bigint = 100n        // bigint
    let g: 100n = 100n          // 100n
    // let h: bigint = 100         // Error TS2322: Type '100' is not assignable
    // to type 'bigint'.

}

function stringType() {
    let a = 'hello'
    var b = 'billy'



}
/*
In TypeScript, which is a superset of JavaScript, let and var are used to declare variables, but they have different scoping rules:

var: It is function-scoped, meaning a variable declared with var is accessible within the function it is declared in. If declared outside any function, it is globally scoped. var variables can also be re-declared and updated.
}
let: It is block-scoped, meaning a variable declared with let is only accessible within the block it is declared in, as well as any contained sub-blocks. let variables can be updated but not re-declared.
}
In general, it is recommended to use let over var in TypeScript and modern JavaScript to avoid potential issues with variable hoisting and overwriting variable values in the same scope.
*/
function symbolType() {

    console.log('***  symbolType Start ***')
    let a = Symbol('a')
    let b: Symbol = Symbol('b')
    var c = a === b
    // let d = a + 'c' // The '+' operator cannot be applied to type 'symbol'.ts(2469)
    console.log(b)
    console.log(c)

    const e = Symbol('e') //typeof e 
    console.log(e)

    const ed = Symbol('e') //typeof e 
    const f: unique symbol = Symbol('f') //typeof f
    // let g: unique symbol = Symbol('f') //A variable whose type is a 'unique symbol' type must be 'const'.ts(1332)

    let h = e === e
    //let hd = e === ed //This comparison appears to be unintentional because the types 'typeof e' and 'typeof ed' have no overlap.ts(2367)
    // let i = e === f // This comparison appears to be unintentional because the types 'typeof e' and 'typeof f' have no overlap.ts(2367)
    console.log(h)
    console.log('***  symbolType End ***')
}

symbolType()


function objectTypes() {
    /*
    TypeScript’s object types specify the shapes of objects. Notably, they can’t tell the difference between simple objects 
    (like the kind you make with {}) and more complicated ones (the kind you create with new Blah). 
    This is by design: JavaScript is generally structurally typed, so TypeScript favors that style of programming over a nominally typed style.
    
    STRUCTURAL TYPING
    A style of programming where you just care that an object has certain properties, and not what its name is (nominal typing). Also called duck typing in some languages (or, not judging a book by its cover).
    */


    let a: object = {
        b: 'x'
    }


    let person1: {
        firstName: string
        lastName: String
    } = {
        firstName: 'john',
        lastName: 'barrowman'
    }
    class Person {

        constructor(
            public firstName: string,// public is shorthand for
            // this.firstName = firstName
            public lastName: string
        ) { }

    }

    person1 = new Person('matt', 'smith')

    let a1: { b: number }
    // a1 = {} //Property 'b' is missing in type '{}' but required in type '{ b: number; }'.ts(2741)
    a1 = { b: 1 }
    // a1 = {b:1,c:2}  //Object literal may only specify known properties, and 'c' does not exist in type '{ b: number; }'.ts(2353)

}

function definite_assignment() {
    let i: number
    // let j = i * 3 // Variable 'i' is used before being assigned.ts(2454)
    i = 2
    let j = i * 3



    let a: {
        b: number
        c?: string
        [key: number]: boolean
    }
    a = { b: 1 }
    a = {
        b: 1,
        c: "optional property",
        1: true,
    };
    a = {
        b: 1,
        10: true,
        20: false
    };
    a = {
        b: 1,
        c: "optional property"
    }
    let airplaneSeatingAssignments: {
        [seatNumber: string]: string
    }
    airplaneSeatingAssignments = {
        '34D': 'Boris Chern'
    }

    let user: { readonly firstName: String }

    user = { firstName: 'abby' }
    console.log(user.firstName)
    // user.firstName='change' //Cannot assign to 'firstName' because it is a read-only property.ts(2540)
    let danger: {}

    danger = {}
    danger = { x: 1 }
    danger = []
    danger = 2
    danger = 'hello'

}


function typeAliases() {

    type Age = number

    type Person = {
        name: String
        age: Age
    }


    let person: Person = { name: 'matt', age: 55 }
    let age: Age = 55
    let person1: Person = { name: 'matt', age: age }

    type Color = 'red'
    // type Color = "blue" //Duplicate identifier 'Color'.ts(2300)

    let x = Math.random() < 0.5


    if (x) {
        type Color = 'blue'
        let b: Color = 'blue'
    } else {
        let c: Color = 'red'
    }


}


function unionAndIntersectionTypes() {

    type Cat = { name: String, purrs: boolean }
    type Dog = { name: String, barks: boolean, wags: Boolean }
    type CatOrDogOrBoth = Cat | Dog
    type CatAndDog = Cat & Dog

    let a: CatOrDogOrBoth

    a = { name: "Kitty", purrs: true }
    a = { name: "Kitty", purrs: true, barks: true, wags: true }
    a = { name: "Kitty", barks: true, wags: true }
    a = { name: "Kitty", purrs: true }

    let b: CatAndDog

    // b ={name:"Kitty", purrs:true,barks:true} //Type '{ name: string; purrs: true; barks: true; }' is not assignable to type 'CatAndDog'.
    // Property 'wags' is missing in type '{ name: string; purrs: true; barks: true; }' but required in type 'Dog'.
    b = { name: "Kitty", purrs: true, barks: true, wags: true }

    type Return = string | null
    function trueOrNull(isTrue: boolean): Return {

        if (isTrue) {
            return 'true'
        }
        return null
    }
}

function arrayTypes() {
    let a = [1, 2, 3]
    var b = ['a', 'b']
    let c: string[] = ['a']

    let d = [1, 'b', 123n]

    let colors = ['red']
    colors.push('blue')
    // colors.push(1) // Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)

    let any_array = []
    any_array.push(1)
    any_array.push('hello')

    let h: number[] = []
    h.push(1)
    // h.push('red')//Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

    let i: Array<number>
    // i.push(1) //Variable 'i' is used before being assigned.ts(2454)
    i = []
    i.push(1)

    /*
    TypeScript supports two syntaxes for arrays: T[] and Array<T>. 
    They are identical both in meaning and in performance. 
    This book uses T[] syntax for its terseness, but you should pick whichever style 
    you like for your own code.
    */

    function buildArray() {
        let a = []                // any[]
        a.push(1)                 // number[]
        a.push('x')               // (string | number)[]
        return a
    }

    let myArray = buildArray()  // (string | number)[]
    //   myArray.push(true) //Argument of type 'boolean' is not assignable to parameter of type 'string | number'.ts(2345)


    function buildArray2() {
        let a = []                // any[]
        a.push(1)                 // number[]
        a.push('x')               // (string | number)[]
        a.push(true)              // (string | number | boolean)[]
        return a
    }
    let myArray2 = buildArray2()  // (string | number)[]
    myArray2.push(true)

    //Once your array leaves the scope it was defined in (for example, if you 
    //declared it in a function, then returned it), TypeScript will assign it a final
    //type that can’t be expanded anymore:


}


function tupleTypes() {

    let a: [number] = [1]

    let b: [string, string, string] = ['malcolm', 'gladwell', 'hello']
    // b = [1]//Type 'number' is not assignable to type 'string'.ts(2322)
    b.push('world')

    // optional elements
    let trainFairs: [number, number?][] = [[1], [1, 2], [3]]
    let moreTrainFairs: ([number] | [number, number])[] = [[1], [1, 2]]

    //Tuples also support rest elements
    let friends: [string, ...string[]]
    friends = ['sara']
    friends = ['sara', 'sara1']
    friends = ['sara', 'sara1', 'sara2']

    let list: [number, boolean, ...string[]]
    list = [1, true]
    list = [1, true, 'hello']
    list = [1, true, 'hello', 'world']

}


function readonlyArray() {
    console.log('*** readonlyArray Start ***')
    let as: readonly number[] = [1, 2, 3]
    let bs: readonly number[] = as.concat(4)
    console.log(as)
    console.log(bs)
    // as[1] = 5 //Index signature in type 'readonly number[]' only permits reading.ts(2542)
    // as.psuh(5)//Property 'psuh' does not exist on type 'readonly number[]'.ts(2339)


    console.log('*** readonlyArray End ***')
}

readonlyArray()

function null_undefined_void_and_never() {
    function returns_numm_or_number(x: number) {
        if (x < 10) {
            return x
        }
        return null
    }

    function return_void_or_number(x: number) {
        if (x < 10) {
            return x
        }
    }
    function return_void() {
        let a = 10
    }
    function return_never() {
        throw new Error('error')
    }
    function return_never2() {
        while (true) {
            console.log('hello')
        }
    }
    function return_undefined() {
        return undefined
    }

}


function enumTypes() {
    console.log('*** enumTypes Start ***')
    enum Language {
        English,
        Marathi,
        Spanish
    }
    console.log(Language.English)

    enum Language1 {
        English = 0,
        Marathi = 1,
        Spanish = 2
    }
    console.log(Language1.English)



    enum Language {
        Russian = 3
    }
    console.log(Language)

    enum Language3 {
        English = 100,
        Spanish = 200 + 300,
        Russian                 // TypeScript infers 501 (the next number after 500)
    }
    console.log(Language3)

    enum Color {
        Red = '#c10000',
        Blue = '#007ac1',
        Pink = 0xc10050,        // A hexadecimal literal
        White = 255             // A decimal literal
    }

    let red = Color.Red       // Color
    let pink = Color.Pink     // Color

    let a = Color.Red         // Color
    // let b = Color.Green       // Error TS2339: Property 'Green' does not exist
                              // on type 'typeof Color'.
    let c = Color[0]          // string
    let d = Color[6]          // string (!!!)
    console.log("d is "+d)


    const enum Language4 {
        English,
        Spanish,
        Russian
    }
    let a1 = Language4.English
    let b1 = Language4.Spanish
    // let c1 = Language4.Newlang //Property 'Newlang' does not exist on type 'typeof Language4'.ts(2339)
    // let d1 = Language4[0] // A const enum member can only be accessed using a string literal.ts(2476)
    // let e1 = Language4[6] // A const enum member can only be accessed using a string literal.ts(2476)
    console.log(Language4.English)








    console.log('*** enumTypes End ***')
}
enumTypes()