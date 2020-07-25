"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1587922980137 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'provider_id',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'date',
        type: 'timestamp'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP(6)'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP(6)'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }

}

exports.default = CreateAppointments1587922980137;