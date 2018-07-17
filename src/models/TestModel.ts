import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface TestModelInterface {
    id?: Number;
}

export interface TestModelInstance extends Sequelize.Instance<TestModelInterface>, TestModelInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    const TestModel: any = sequelize.define("Test", {
        test_field: {type: DataTypes.TEXT, allowNull: true},
    }, {
        timestamps: false
    });

    TestModel.associate = (models: any) => {
        TestModel.hasMany(models.whatever, { as: "Whatever", foreignKey: "whatever_id" });
    };

    TestModel.prototype.testInstanceMethod = function () {};

    return TestModel;
}
