"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUserTokens1590599338004 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_token',
      columns: [{
        name: 'id',
        type: 'varchar',
        isPrimary: true
      }, {
        name: 'token',
        type: 'varchar'
      }, {
        name: 'user_id',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'TokenUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    queryRunner.dropTable('user_tokens');
  }

}

exports.default = CreateUserTokens1590599338004;