/* eslint-disable no-param-reassign */
'use strict';

class MyEventEmitter {
  #events = {};
  on(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    this.#events[event].push(listener);
  }
  off(event, listener) {
    const listeners = this.#events[event];

    if (!listeners) {
      return;
    }

    this.#events[event] = listeners.filter((cb) => cb !== listener);
  }
  once(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }
  emit(key, ...args) {
    for (const listener of this.#events[key]) {
      listener(...args);
    }
  }
  prependListener(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    this.#events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      this.off(event, wrapper);
    };

    this.prependListener(event, wrapper);
  }
  removeAllListeners(event) {
    this.#events[event] = [];
  }
  listenerCount(event) {
    if (Array.isArray(this.#events[event])) {
      return this.#events[event].reduce((acc) => (acc += 1), 0);
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
