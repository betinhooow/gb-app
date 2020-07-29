"use strict";

var _typeorm = require("typeorm");

(0, _typeorm.createConnections)([{
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "docker",
  "database": "postgres",
  "entities": [__dirname + "./../../../../dist/modules/**/infra/typeorm/entities/*.js"],
  "migrations": [__dirname + "./../../../../dist/shared/infra/typeorm/migrations/*.js"],
  "cli": {
    "migrationsDir": __dirname + "./../../../../dist/shared/infra/typeorm/migrations"
  }
}, {
  "name": "mongo",
  "type": "mongodb",
  "host": "localhost",
  "port": 27017,
  "database": "gobarber",
  "useUnifiedTopology": true,
  "entities": [__dirname + "./../../../../dist/modules/**/infra/typeorm/schemas/*.js"]
}]);