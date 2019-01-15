import autobind from "autobind-decorator";
import {Component} from 'react';

@autobind
class A extends Component {
    lol() {
        var sum = 0;
        for (var i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
}
class B extends Component {
    lol() {
        var sum = 0;
        for (var i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
}
class C extends Component {
    lol = () => {
        var sum = 0;
        for (var i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
}
class D extends Component {
    @autobind
    lol() {
        var sum = 0;
        for (var i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
}
class E extends Component {
    constructor() {
        super();

        this.lol = this.lol.bind(this);
    }
    lol() {
        var sum = 0;
        for (var i = 1; i <= 100; i++) {
            sum += i;
        }
        return sum;
    }
}

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

async function test1() {
    insertInBody('create class:');
    await new Promise((resolve) => (new Benchmark.Suite)
        .on('cycle', event => {
            event.target.name = format(event.target.name);
            insertInBody(String(event.target));
        })
        .on('complete', function () {
            insertInBody('Fastest is ' + this.filter('fastest').map('name').map(name => name.replace(/ /g, '')));
            resolve();
        })

        .add('autobind class', () => new A())
        .add('simple class', () => new B())
        .add('arrow func', () => new C())
        .add('autobind method', () => new D())
        .add('bind in constructor', () => new E())
        .add('RegExp#test', () => /o/.test('Hello World!'))
        .add('String#indexOf', () => 'Hello World!'.indexOf('o') > -1)

        .run({ 'async': true })
    )
}

async function test2() {
    insertInBody('call function:');

    await new Promise(resolve => (new Benchmark.Suite)
        .on('cycle', event => {
            event.target.name = format(event.target.name);
            insertInBody(String(event.target));
        })
        .on('complete', function () {
            insertInBody('Fastest is ' + this.filter('fastest').map('name').map(name => name.replace(/ /g, '')));
            resolve();
        })

        .add('autobind class', () => {
            var a = new A();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
        })
        .add('simple class', () => {
            var a = new B();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
        })
        .add('simple class 2', () => {
            var a = new B();
            var b = a.lol.bind(a);
            b();
            b();
            b();
            b();
            b();
            b();
            b();
            b();
            b();
            b();
        })
        .add('simple class 3', () => {
            var a = new B();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
            a.lol.bind(a)();
        })
        .add('simple class 4', () => {
            var a = new B();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
            (() => a.lol())();
        })
        .add('simple class 5', () => {
            var a = new B();

            var newVar = () => a.lol();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
            (newVar)();
        })
        .add('arrow func', () => {
            var a = new C();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
        })
        .add('autobind method', () => {
            var a = new D();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
        })
        .add('bind in constructor', () => {
            var a = new E();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
            a.lol();
        })
        .add('RegExp#test', () => /o/.test('Hello World!'))
        .add('String#indexOf', () => 'Hello World!'.indexOf('o') > -1)

        .run({ 'async': true })
    )
}

(async function() {
    //await test1();
    await test2();
})();
