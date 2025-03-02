import { Obj } from '../foundation/Object.js';
import { ViewEventsController } from '../views/ViewEventsController.js';

import '../core/Array.js'; // For Array#erase

const gestureManager = new Obj({
    _gestures: [],

    register(gesture) {
        this._gestures.push(gesture);
        return this;
    },

    deregister(gesture) {
        this._gestures.erase(gesture);
        return this;
    },

    isMouseDown: false,

    fire(type, event) {
        if (/^touch/.test(type)) {
            const gestures = this._gestures;
            type = type.slice(5);
            for (let i = gestures.length - 1; i >= 0; i -= 1) {
                gestures[i][type](event);
            }
        }
        if (!event.button) {
            if (type === 'mousedown') {
                this.set('isMouseDown', true);
            }
            if (type === 'mouseup') {
                this.set('isMouseDown', false);
            }
        }
        event.propagationStopped = false;
    },
});

ViewEventsController.addEventTarget(gestureManager, 30);

export { gestureManager };
