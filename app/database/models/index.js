import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

// get the database configuration for current environement
const environment = require('../../../config/server-config.json')['environment'];
const config = require('../config/database.json')[environment];

const basename = path.basename(module.filename);

//created new object to be exported for Sequelize sync
var db = {};
//create new connection with database
var sequelize = new Sequelize(config.database, config.user, config.password, config);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach((file) => {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
module.exports = db;