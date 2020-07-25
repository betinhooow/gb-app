"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class MockMailTemplateProvider {
  async parse() {
    return 'Mail content';
  }

}

var _default = MockMailTemplateProvider;
exports.default = _default;