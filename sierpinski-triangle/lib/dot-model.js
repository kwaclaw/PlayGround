import { observable } from '@nx-js/observer-util/dist/es.es6.js';
export class DotModel {
    constructor(x, y, size) {
        this.hover = false;
        this.x = x;
        this.y = y;
        this.size = size;
        return observable(this);
    }
    enter() {
        this.hover = true;
    }
    leave() {
        this.hover = false;
    }
}
