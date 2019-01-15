import {A, B, C, D, E} from "./src/classes";

function format(text, strLen = 20) {
    while (text.length < strLen) {
        text += ' ';
    }
    return text;
}

function insertInBody(text) {
    var tag = document.createElement('pre');
    tag.innerHTML = text;
    document.body.appendChild(tag);
}

(new Benchmark.Suite)
    .on('start', () =>  insertInBody('create class:'))
    .on('cycle', event => {
        event.target.name = format(event.target.name);
        insertInBody(String(event.target));
    })
    .on('complete', function () {
        insertInBody('Fastest is ' + this.filter('fastest').map('name').map(name => name.replace(/ /g, '')))
    })

    .add('autobind class', () => new A())
    .add('simple class', () => new B())
    .add('arrow func', () => new C())
    .add('autobind method', () => new D())
    .add('bind in constructor', () => new E())
    .add('RegExp#test', () => /o/.test('Hello World!'))
    .add('String#indexOf', () => 'Hello World!'.indexOf('o') > -1)

    .run({ 'async': false });

var a = new A();
var b = new B();
var c = new C();
var d = new D();
var e = new E();

(new Benchmark.Suite)
    .on('start', () =>  insertInBody('call function:'))
    .on('cycle', event => {
        event.target.name = format(event.target.name);
        insertInBody(String(event.target));
    })
    .on('complete', function () {
        insertInBody('Fastest is ' + this.filter('fastest').map('name').map(name => name.replace(/ /g, '')))
    })

    .add('autobind class', a.lol)
    .add('simple class', b.lol)
    .add('arrow func', c.lol)
    .add('autobind method', d.lol)
    .add('bind in constructor', e.lol)
    .add('RegExp#test', () => /o/.test('Hello World!'))
    .add('String#indexOf', () => 'Hello World!'.indexOf('o') > -1)

    .run({ 'async': false });
/*

insertInBody(`${format('autobind class')}: ${measure(new A())}`);
insertInBody(`${format('simple class')}: ${measure(new B())}`);
insertInBody(`${format('arrow func')}: ${measure(new C())}`);
insertInBody(`${format('autobind method')}: ${measure(new D())}`);
insertInBody(`${format('bind in constructor')}: ${measure(new E())}`);

insertInBody('with create: ');
insertInBody(`${format('autobind class')}: ${measureWithCreateClass(A)}`);
insertInBody(`${format('simple class')}: ${measureWithCreateClass(B)}`);
insertInBody(`${format('arrow func')}: ${measureWithCreateClass(C)}`);
insertInBody(`${format('autobind method')}: ${measureWithCreateClass(D)}`);
insertInBody(`${format('bind in constructor')}: ${measureWithCreateClass(E)}`);
*/
