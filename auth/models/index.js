"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const config = require("../config/config");

const db = {};
console.log(env, "<< env");
console.log(config, "<< config");

let sequelize;
if (config[process.env.NODE_ENV].use_env_variable) {
  console.log("<< use_env");

  console.log(config[process.env.NODE_ENV].use_env_variable, "<< env_var");
  console.log(config[process.env.NODE_ENV], "<< config");

  sequelize = new Sequelize(
    process.env[config[process.env.NODE_ENV].use_env_variable],
    {
      ...config[process.env.NODE_ENV],
    }
  );
} else {
  console.log("<< else");

  console.log(config[process.env.NODE_ENV].use_env_variable, "<< env_var");
  console.log(config[process.env.NODE_ENV], "<< config");

  sequelize = new Sequelize(
    config[process.env.NODE_ENV].database,
    config[process.env.NODE_ENV].username,
    config[process.env.NODE_ENV].password,
    config[process.env.NODE_ENV]
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
