# Javascript test

## About this code

A Javascript test for a job interview

## The test instructions

Prepare a function which will accept a data JSON URL and will call a callback function with an array of article objects present in data file. This function should properly restore articles and tags relations. You should optimise your solution considering:

* Efficient handling of large data sets
* Assuming that generating Tag object is very computation expensive operation and should be done only for tags in use
* Do not be shy to show your OO JavaScript skills. This can give you extra credit

After calling the method with data.json :

```readArticles('./data.json', console.log);```

you should get in the console something similar to :

```
[ Six British soldiers missing: UK, Europe, War {...},
   Burns hails Scottish fight fans: UK, Europe, Boxing, Sport {...},
   Hello Poise: Culture {...} ]
```

## Build and run the code

Requirements

* [node.js](http://nodejs.org/) installed
* [NPM](https://npmjs.org/) installed
* [python](https://www.python.org/downloads/) (version > V2.7)
* [java](https://www.java.com/en/download/index.jsp) (version > 7)
* grunt

Build

```
$ npm install
$ grunt build
```

Run and watch for changes

Then run the result with
```
$ node dist/test.js
```

## My tools of choice

Here is my code for the test

Concerning the language I hesitated between these techniques, which are my favorite ones

* vanilla Javascript with the google closure library for its clean and reliable browser compatibility layer used in gmail and drive
* Haxe, my favorite language, which outputs very efficient JS with a strong type system and great language features such as enums with parameters, structures, implicits/mixins, externs, type parameters, polymorphism… And the 3 things I love most with Haxe: macros are Haxe code, executed at compile time, which can interact with the compiler, manipulate the AST to change the compilation resulting code. I also love the cross platform approach of Haxe: there is almost no abstraction layer, with the Haxe syntax and tools, one manipulate directly the object model of the target platform. And finally, Haxe is a free and open source software, with tons of libraries and room for contributions, hacking, …
* Javascript with the upcoming Ecmascript6 and its great new language features still being specified by the w3c. While it is not fully specified nor implemented by the browsers, there are transpilers which convert the Javascript ES6 features to ES5 or even ES3 features, understood by all browsers. There is also compilers like Typescript or google closure compiler, compile the new syntax standard Javascript, adding type checking and other compile time features. My favorite ES6 features: destructuring assignment, the arrow function which preserve the scope, modules, promises, generators…

I chose ES6 with google closure compiler because it is the one way to do Javascript in this list, with which I ma the less comfortable at the moment. I have practiced Typescript, Haxe and p Aure JS a lot. And more importantly, the generators are an excellent way to optimize the processing of big data sets, like the "tags" in this case.

I used grunt and npm of course as well as git which I use a lot and I am passionate when it comes to workflows and automation.

Concerning the HTML templates, I could have used the web components but last time I tried I found their use very frustrating and not so useful for now. I often use jade template system and less or sass but I for the test I went with vanilla HTML/CSS since it is not the point here.

As an IDE, I could have used VIM or Sublime Text as I use them both on a daily basis, and Webstorm is a good choice too as far as I am concerned. But I wanted to try github’s Atom editor on a real but not too big project for a while so I went with it. I tried light table and brackets already but they are not quick enough. Also the fact that these three last editors are open source and build with Javascript is a good sign for me as it makes it tweakable with my tool set and favorite environment.

Finally, I did this test on a Mac, but Kubuntu or Debian would have been fine for me too. As long as my OS has a good command line, I am fine with it.

links
* [Atom vs Brackets vs Light Table](http://www.sitepoint.com/sitepoint-smackdown-atom-vs-brackets-vs-light-table-vs-sublime-text/)
* [ES6 features](http://www.frontendjournal.com/javascript-es6-learn-important-features-in-a-few-minutes/)
* [the output of several compile-to-javascript languages](https://gist.github.com/darthapo/3916195)

## Remarks

To be efficient in converting Json data to objects, I choose the eval function, instead of the JSON.parse method. This assumes that the data does not contain any javascript and this could be a security issue.

I hesitated rewrite the provided classes or find a way to optimize before they are called.. I choose to rewrite them in ES6.
The provided test.js looked strange to me, since it was necessary to develop these classes in the language I chose in order to optimize the process.

The following issues took me a lot of time. I guess this lack of documentation means that it is too early to use this stack in a real production line.

* I had to take the latest closure compiler sources and build it in order to have the ES6 to ES3 compilation feature
* Closure error message `ERROR - Parse error. primary expression expected` means that yield can not be used in a function defined with the arrow function... This was confusing.
* Same for `ERROR - Property super never defined on MySuperClass` which means that `MySuperClass.constructor` has to be used instead of `super`.

## Conclusion

ES6 is great, and it opens many optimization possibilities! But many of its features are not implemented in google closure compiler yet.

It took me

* 15 min to understand the instructions and decide what I wanted to do
* 45 min to set up the project and make tests and a poc
* 1:15 to develop and comment and write the dev notes
* 30 min to write the readme file with the dev notes I had written
