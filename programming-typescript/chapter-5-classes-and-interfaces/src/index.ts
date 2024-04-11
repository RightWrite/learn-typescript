
console.log("Chapter 5 - classes and interfaces")

{
    type Color = 'Black' | 'White'
    type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
    type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8


    class Game {
        static makePieces() {
            return [

                // Kings
                new King('White', 'E', 1),
                new King('Black', 'E', 8),

                // Queens
                // new Queen('White', 'D', 1),
                // new Queen('Black', 'D', 8),

                // // Bishops
                // new Bishop('White', 'C', 1),
                // new Bishop('White', 'F', 1),
                // new Bishop('Black', 'C', 8),
                // new Bishop('Black', 'F', 8),

                // ...
            ]
        }

        private pieces = Game.makePieces()

    }

    abstract class Piece {
        protected position: Position
        constructor(private readonly color: Color,
            file: File,
            rank: Rank) {
            {
                this.position = new Position(file, rank)
            }
        }
        moveto(position: Position) {
            this.position = position
        }
        abstract canMoveTo(position: Position): boolean
    }

    class Position {
        constructor(private file: File,
            private rank: Rank) { }


        distanceFrom(position: Position) {
            return {
                rank: Math.abs(position.rank - this.rank),
                file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
            }
        }
    }

    class King extends Piece {
        canMoveTo(position: Position) {
            let distance = this.position.distanceFrom(position)
            return distance.rank < 2 && distance.file < 2
        }
    }
    // class Queen extends Piece { }
    // class Bishop extends Piece { }
    // class Knight extends Piece { }
    // class Rook extends Piece { }
    // class Pawn extends Piece { }

}

//Using this as a Return Type

{
    let set = new Set()
    set.add(1).add(2).add(3)
    console.log(set.has(2))
    console.log(set.has(4))
}

// interfaces

{
    type SushiType = {
        calories: number
        salty: boolean
        tasty: boolean
    }
    interface SushiInterface {
        calories: number
        salty: boolean
        tasty: boolean
    }
    // type Cake = {
    //     calories: number
    //     sweet: boolean
    //     tasty: boolean
    // }
    {
        type Food = {
            calories: number
            tasty: boolean
        }
        type Sushi = Food & {
            salty: boolean
        }
        type Cake = Food & {
            sweet: boolean
        }
    }
    {
        interface Food {
            calories: number
            tasty: boolean
        }
        interface Food {
            custom: string

        }
        interface Sushi extends Food {
            salty: boolean
        }
        interface Cake extends Food {
            sweet: boolean
        }
    }
}


// Declaration Merging

{
    interface User {
        name: string
        salary: number
    }
    interface User {
        age: number
    }

    let user: User = {
        name: "Ashley",
        age: 30,
        salary: 10
    }


    // type User = {  // Duplicate identifier 'User'.ts(2300)
    //     name: string
    //   }

    //   type User = {  // Duplicate identifier 'User'.ts(2300)
    //     age: number
    //   }


    // interface User {
    //     age: string
    // }

    // interface User {
    //     age: number  // Error TS2717: Subsequent property declarations must have
    // }


    interface Car {
        name: string
    }
    interface Car {
        name: string
    }

    {
        // interface User<Age extends number> {  // All declarations of 'User' must have identical type parameters.ts(2428)
        //     age: Age                           
        // }

        // interface User<Age extends string> {
        //     age: Age
        // }
    }

}


// Implementations

{

    interface Animal {

        eat(food: string): void,
        sleep(hours: number): void

    }
    class Cat implements Animal, Feline {
        meaw(): void {
            console.log("Meaw!")
        }
        eat(food: string) {
            console.log("Ate some " + food + ". Meaw!")

        }
        sleep(hours: number): void {
            console.log("Slept for " + hours + " hours. Meaw!")
        }
        name = "Cat"
    }

    interface Feline {
        meaw(): void
    }

    interface Animal {
        name: string
    }

}

//Classes Are Structurally Typed

{
    class Zebra {
        trot() {
            // ...
        }
    }

    class Poodle {
        trot() {
            // ...
        }
    }

    function ambleAround(animal: Zebra) {
        animal.trot()
    }

    let zebra = new Zebra
    let poodle = new Poodle

    ambleAround(zebra)   // OK
    ambleAround(poodle)  // OK


    class A {
        private x = 1
    }
    class B extends A {

    }
    function x(a: A) {
        console.log("ok")
    }
    x(new A)
    x(new B)
    // x({ x: 1 }) //  Property 'x' is private in type 'A' but not in type '{ x: number; }'.ts(2345)


}


// Classes Declare Both Values and Types

{

    //values
    let a = 999
    function b() {

    }


    //types
    type a = number
    interface b {
        (): void
    }
    if (a > 1) {
        console.log("a is value")
    }
    let num: a = 1


    class C { }
    let c: C = new C

    enum E { F, G }
    let e: E = E.F


    type State = {
        [key: string]: string
    }
    /*
    The syntax [key: string]: string is an index signature. It means that when you access 
    the property of a State object using a string key, it will return a string.

    In other words, a State object can have any number of properties, and the property names are strings (as indicated by [key: string]). 
    The type of the property values is also string (as indicated by : string after the index signature).
    */


    class StringDatabase {
        state: State = {}
        get(key: string): string | null {
            return key in this.state ? this.state[key] : null
        }
        set(key: string, value: string): void {
            this.state[key] = value
        }
        static from(state: State) {
            let db = new StringDatabase()
            for (let key in state) {
                db.set(key, state[key])
            }
            return db
        }
    }
}


//Polymorphism

{


    class MyMap<K, V> {
        constructor(initialKey: K, initialValue: V) {

        }
        get(key: K): V {
            return null as V

        }
        set(key: K, value: V): void {
            // ...
        }
        // merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {

        //     // ...
        // }
        // static of<K, V>(k: K, v: V): MyMap<K, V> {
        //     // ...
        // }

    }

    let a = new MyMap<string, number>('k', 1) // MyMap<string, number>
    let b = new MyMap('k', true) // MyMap<string, boolean>
}

//Mixins

// TODO : Read later

{


    //A mixin is just a function that takes a class constructor and returns a class constructor, so our mixin might look like this:
    type ClassConstructor = new (...args: any[]) => {}


    function EZDebug<C extends ClassConstructor>(Class: C) {
        return class extends Class {
            constructor(...args: any[]) {
                super(...args)
            }
        }
    }

    class User {

    }
    // User.debug()
}