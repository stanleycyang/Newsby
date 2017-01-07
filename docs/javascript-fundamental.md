# JavaScript Basics

**JavaScript** is the language of the web today. Not to be confused with Java, JavaScript allows you to build interactive websites. JavaScript has become so prevalent today that it can be used to build iOS, Android, and even desktop applications.

It is the **most popular language** on [Github](http://githut.info/) and continues to climb in popularity.

For a language that was create in 10 days in May 1995 by [Brendan Eich](http://en.wikipedia.org/wiki/Brendan_Eich), the growth has been explosive.

We will be learning **JavaScript** in order to make native **iOS & Android applications**. When you learn JavaScript, your skills become easily transferable to many other avenues in your future, if you so choose!

![JS](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/js-logo.png)

**Lesson 2 Objectives:**

- Understand and apply the concept of variables, functions, and arrays
- Create a while and for loop
- See JS control flow in action
- Understand and apply object oriented programming in practice

Before we get started..

Let's create a folder to house all our course material. 

```bash
$ cd ~
$ mkdir -p Workspace/AppWorkshop // makes nested directories
$ cd Workspace/AppWorkshop
$ touch js-fundamentals.js
```

I recommend you follow along with the code-along by opening up your `js-fundamentals.js`. 

To execute the code, run `node js-fundamentals.js` in the same directory to see the results.

**Variables:**

![Variable](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/variable.png)

Variables are used to store information to be referenced and / or manipulated in a computer program. 

**JavaScript primitive data types:**

These are the forms of data you can store inside of variables in JavaScript

- **String:** a sequence of characters e.g. "hello"
- **Number:** numeric values e.g. 100
- **Boolean:** boolean value either false or true
- **Undefined:** represents undefined value
- **Null:** no value at all

Variables provide a way of labeling data with a descriptive name, so our programs can be easily read and understood by the reader.

To remember this: a variable's purpose is to label and store data in memory. It can be used and referenced when needed throughout your programming.

Both are block scope, meaning that their value exists inside a code block:

```
// a code block is anything within the curly braces
{ 
	...code... 
}
```

If a variable (**let** or **const**) is defined within the code block, then it is defined only within the code block! This is beneficial because it helps us from polluting our codebase.

**Types of Variables:**

- **Const:** A variable that won't be reassigned. You cannot update a const variable
- **Let:** You can reassign the variable, and update it.


In JavaScript, there are two ways to call variables: `const` and `let`.

```js
// const's value won't be reassigned

const PI = 3.14;

// attempt to reassign
PI = 2.24;

// ERROR: Uncaught TypeError: Assignment to constant variable.

```

```js
// let's value can be reassigned, ie. in a loop

let radius = 5;

// reassign
radius = 2;

// SUCCESS
console.log(`Radius is ${radius}`); // returns Radius is 2

```

When we put them to work..

```js
let AreaOfCircle = PI * Math.pow(2, 2); // Math.pow is from a Math library. It comes with the JS language

console.log(AreaOfCircle); // logs 12.57

```

**Functions:**

![Functions](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/js-function.png)

Functions are code-blocks composed of a sequence of statements called the **function body**. Values can be passed into a function, and function will return a value. If you don't supply a return statement, it will return 'undefined', like how a C++ function with no return statement returns 'void'. You can call a function over and over again to perform a certain task.

**Note**: When you use the keyword **return**, your function will end at that line

```js
let number1 = 20,
	 number2 = 50;

function addNumbers(num1, num2) {
	return num1 + num2; // function returns the sum and ends
	console.log('hello'); // this never runs
}

console.log(addNumbers(number1, number2)); // You should get 70

```

Try and creating a function to multiply and divide as well. Once you get the hang of it, it's actually quite fun!

Let's try and make a function to calculate the area of a circle. How would you do it?

```js
function getAreaOfCircle(radius) {
	// this is a code block. consts and lets are scoped in here!!	
	const PI = 3.14;
	return PI * Math.pow(radius, 2); 
}
```

**Arrays:**

![Arrays](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/arrays.png)

Arrays are a special object that can hold multiple values in one place with numeric indexes:

```js
let numbers = [2, 4, 6, 5, 3, 7, 2, 4, 8, 10];
```

The array starts at the index of zero, so if you want to retrieve the first number in the array, you must:

```js
console.log(numbers[0]); // returns 2
```

To get the length of the array, you simply go:

```js
console.log(numbers.length); // returns 4
```

To get the last number in the array, you can simply:

```js
console.log(numbers[numbers.length - 1]); // returns 10
```

**Loops**

Loops are a big part behind the magic of programming. You automate some of the most mundane tasks by running loops.

Essentially, it is a sequence of instructions that is repeated until a certain condition is reached.

Here is an example:

```js
// This will execute until i is equal to 0.

// Start with the number 10
let number = 10;

// While 10 is not equal to 0, keep running the loop
while (i !== 0) {
  console.log('hi', i); // outputs the number of the loop iteration
  i--; // subtract variable i by 1
}
```

Loops and arrays work hand-in-hand, check it out

```js
let colors = ['black', 'red', 'blue', 'green'];

// loop through the colors
for (let i = 0; i < colors.length; i++) {
	console.log(colors[i]); // runs through the whole array
}
```

![For loop](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/loop.jpeg)

In this example, we used a for loop instead of a while loop. The for loops takes the initialization, the condition in which it will continue looping, and the increment / decrement at the end.

There are a lot of cool built-in looping functions for arrays, such a `map`, `filter`, and `forEach`. We will get into them more down the road.

**Control Flow:**

![Control Flow](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/control-flow.jpg)

Control flow is the order in which individual statements, instructions, or functions are executed. 

**Conditionals:**

- Use `if` to specify a block of code to be executed, if a specified condition is true
- Use `else` to specify a block of code to be executed, if the same `if` condition is false
- Use `else if` to specify a new condition to test, if the first condition is false
- Use `switch` to specify many alternative blocks of code to be executed

```js
if (found === 1){
    // if found is 1, do something
} else if (found === 2) {
	// if found is 2, do something
}else {
    // or else do something else
}

switch(found){
    case true:
        //do something
        break;
        
    ...

    default:
        //do something else
}
```

As it turns out, the `switch statement` is faster in most cases when compared to if-else, but significantly faster only when the number of conditions is large. The primary difference in performance between the two is that the incremental cost of an additional condition is larger for if-else than it is for switch. Therefore, our natural inclination to use if-else for a small number of conditions and a switch statement for a larger number of conditions is exactly the right advice when considering performance. [source](https://www.safaribooksonline.com/library/view/high-performance-javascript/9781449382308/ch04s02.html)


**Sync vs. Async**

Take a look at this small synchronous example:

```js
// code is executed from top to bottom

let i = 1;
i = i + 1;
i = i * 9;
console.log('i is', i);

```

Knowing that code is executed from top to bottom, what do you think the value of `i` will be?

If you got `18`, you are exactly right! The four lines are evaluated in that exact order going down.

Here is an asynchronous example:

```js
console.log('Hi from outside');

// a little asynchronous callback function with no time set in.
setTimeout(() => {
	console.log('Hi from inside');
});

console.log('Hi again');
```

In what order do you think this will be called?

If you said:

1. Hi from outside
2. Hi again
3. Hi from inside

You would've been correct. This is because even though the `setTimeout` function doesn't have a millisecond argument provided, it is **asynchronous**. 

Asynchronous operations are handled in a separate web API until the task is complete, then moved back into the **call stack**. Therefore it doesn't block the execution of other code (In this example, the `console.log('Hi again');` is executed without being blocked).

**Note:** a **call stack** is a data structure in computer programming that store information about active methods (functions) called at run time. It helps us keep track of the point each active function should return control when it finishes executing.

 Don't worry if you don't quite get it yet, you will see many more examples down the road.

If you do want to learn more about JavaScript's event loop **now**, watch [this](https://www.youtube.com/watch?v=8aGhZQkoFbQ) video.

**Object-Oriented Programming:**

![OOP](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l2/oop.jpg)

Object-oriented programming (OOP) is a way of programming that is centered around objects rather than actions. This allows the programmer another layer of organization for the code and maximizes reusability. Objects are based on classes, which are extensible code templates to provide initial attributes and behaviors.

Take a look at this example:

```js
// our class template

class Pony {
	constructor(color) {
		this.color = color;
	}
	
	jump() {
		console.log('jumped');
	}
}

// Create a new object using our Pony class
let jonny = new Pony('brown') // give it a brown color
```

The **constructor** is run on the initialization of the object (new Pony) and it gives the pony jonny a color.


Try and make your own Cat class. 

You can create objects without classes. Such as:

```js
// build a cat object
let cat = {
	numEyes: 2,
	numLegs: 4,
	furColor: 'grey',
	jump: function(howHigh) {
		return howHigh;
	}
};

console.log(cat.numEyes); // returns 2
console.log(numLegs); // returns 4
console.log(cat.furColor); // returns 'grey'

// modifies the cat
cat.numEyes = 4;

console.log(cat.numEyes); // returns 4

console.log('The cat jumped ', cat.jump('10ft')); // returns 'The cat jumped 10ft'
```

In JavaScript, we use a dot notation to organize our objects. 

`Exercise`: Try and create a `pup` object with the attributes furColor, numLegs, numEyes, and the behavior of bark.

Now that you have a fundamental understanding of the building blocks of JavaScript, you will find commmonality of these concepts among other programming languages. 

For more resources and practice, I've provided these recommendations below:

- [Mozilla Developer JS Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Eloquent JavaScript](http://eloquentjavascript.net/)
- [Code Academy](https://www.codecademy.com/en/tracks/javascript-combined)
- [JS the Right Way](http://jstherightway.org/)

At the end of this lesson, you should have:

- Learned about variables, functions, and arrays
- Wrote a while and for loop
- Observed the JavaScript control flow in action
- Applied object oriented programming in practice

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/javascript-fundamental.md). 