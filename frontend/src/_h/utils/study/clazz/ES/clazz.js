class Foo {
    constructor(prop) {
        this.prop = prop
    }

    static statcMethod() {
        return 'staticMethod'
    }

    prototypeMethod() {
        return this.prop;
    }
}
console.log(Foo.statcMethod())
const foo = new Foo(123)
console.log(foo.prototypeMethod())

class Circle {
    constructor(radius) {
        this.radius = radius
    }

    getDiameter() {
        return 2 * this.radius
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius
    }

    getArea() {
        return Math.PI * Math.pow(this.radius, 2)
    }
}

class Cylinder extends Circle {
    constructor(radius, height) {
        super(radius)
        this.height = height
    }

    getArea() {
        return (this.height * super.getPerimeter()) + (2 * super.getArea())
    }

    getVolume() {
        return super.getArea() * this.height;
    }
}

const circle = new Circle(3)
const cylinder = new Cylinder(2, 10)

console.log(circle.getDiameter())
console.log(cylinder)