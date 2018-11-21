/**
 * 类不存在变量提升
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get X() {
        return this.x;
    }

    set X(x) {
        this.x = x;
    }

    get Y() {
        return this.y;
    }

    set Y(y) {
        this.y = y;
    }

    toString() {
        return `the Point is (${this.x},${this.y})`;
    }
}

const angle = class Angle {
    /**
     * 使用对角顶点构造长方形
     * @param point1
     * @param point2
     */
    constructor(point1, point2) {
        //确定对角顶点位置（左上--右下，左下--右上）
        if (point1.x() > point2.x() && point1.y() > point2.y()) {

        }
    }

    /**
     * 计算周长
     */
    area() {

    }

    /**
     * 计算面积
     */
    perimeter() {

    }

    toString() {
        return 'the Angle is hard to be described,so ...';
    }
}