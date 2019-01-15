import {A, B, C, D, E} from "./src/classes";

var n = 1000000;

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

function measure(instance) {
	var i = n;

	var start = performance.now();
	while (--i) instance.lol();
	var end = performance.now();

	return end - start;
}

function measureWithCreateClass(className) {
    var i = n;

    var start = performance.now();
    while (--i) {
        (new className()).lol();
    }
    var end = performance.now();

    return end - start;
}

insertInBody(`n = ${n}`);

insertInBody('without create: ');
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
