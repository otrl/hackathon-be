import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";

import config from "./config";

import { TestModelInstance, TestModelInterface } from "./models/TestModel";
import { WorkersHomeCatchmentInstance, WorkersHomeCatchmentInterface } from "./models/WorkersHomeCatchment";
import { PostcodeOutCodesInstance, PostcodeOutCodesInterface } from "./models/PostcodeOutcodes";

export interface DbConnection {
    sequelize: Sequelize.Sequelize;
    TestModel: Sequelize.Model<TestModelInstance, TestModelInterface>;
    workershomecatchment: Sequelize.Model<WorkersHomeCatchmentInstance, WorkersHomeCatchmentInterface>;
    postcode_outcodes: Sequelize.Model<PostcodeOutCodesInstance, PostcodeOutCodesInterface>;
}

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: "postgres",
    logging: console.log,
    dialectOptions: {
        multipleStatements: true
    },
    operatorsAliases: false,
});

sequelize.authenticate().then(() => {
    console.log("Successfully connected to DB");
    // sequelize.sync();
}, err => {
    console.log("Could not connect to DB", err);
});

const db: any = {};

fs
    .readdirSync(path.join(__dirname , "models"))
    .filter(function(file) {
        return file.indexOf(".") !== 0 && (file.slice(-3) === ".ts" || file.slice(-3) === ".js");
    })
    .forEach(function(file) {
        const model: any = sequelize["import"](path.join(__dirname , "models", file));
        // NOTE: you have to change from the original property notation to
        // index notation or tsc will complain about undefined property.
        db[model["name"]] = model;
    });

Object.keys(db).forEach(function(modelName: string) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db["sequelize"] = sequelize;

export default <DbConnection>db;
