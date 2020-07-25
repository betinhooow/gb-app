"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateForeignKeyAppointmentProvider1587930374989 {
  async up(queryRunner) {
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
  }

}

exports.default = CreateForeignKeyAppointmentProvider1587930374989;