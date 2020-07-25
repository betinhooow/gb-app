"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class MockDiskStorageProvider {
  constructor() {
    this.storage = [];
  }

  async saveFile(file) {
    this.storage.push(file);
    return file;
  }

  async deleteFile(file) {
    const findIndex = this.storage.findIndex(storageFile => storageFile === file);
    this.storage.splice(findIndex, 1);
  }

}

var _default = MockDiskStorageProvider;
exports.default = _default;