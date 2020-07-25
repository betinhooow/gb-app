"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class MockHashProvider {
  async generateHash(payload) {
    return payload;
  }

  async compareHash(payload, hashed) {
    return payload === hashed;
  }

}

var _default = MockHashProvider;
exports.default = _default;