import autobind from "autobind-decorator";

@autobind
class A {
    a;
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}
class B {
    a;
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}
class C {
    a;
    lol = () => {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}
class D {
    a;
    @autobind
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}
class E {
    a;
    constructor() {
        this.lol = this.lol.bind(this);
    }
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
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
    var a = new A();
    var b = new B();
    var c = new C();
    var d = new D();
    var e = new E();

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

        .add('autobind class', a.lol)
        .add('simple class', b.lol)
        .add('arrow func', c.lol)
        .add('autobind method', d.lol)
        .add('bind in constructor', e.lol)
        .add('RegExp#test', () => /o/.test('Hello World!'))
        .add('String#indexOf', () => 'Hello World!'.indexOf('o') > -1)

        .run({ 'async': true })
    )
}

(async function() {
    await test1();
    await test2();
})();
