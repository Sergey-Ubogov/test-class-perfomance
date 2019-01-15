import autobind from "autobind-decorator";

@autobind
export class A {
    a;
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}

export class B {
    a;
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}

export class C {
    a;
    lol = () => {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}

export class D {
    a;
    @autobind
    lol() {
        for (var i = 0; i < 100; i++) {
            this.a = i;
        }
    }
}

export class E {
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