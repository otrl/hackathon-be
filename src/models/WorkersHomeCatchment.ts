import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface WorkersHomeCatchmentInterface {
    id?: number;
    work_postal_sector?: string;
    home_postal_sector?: string;
    users?: number;
}

export interface WorkersHomeCatchmentInstance extends Sequelize.Instance<WorkersHomeCatchmentInterface>, WorkersHomeCatchmentInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("workershomecatchment", {
        work_postal_sector: {type: DataTypes.TEXT, allowNull: true},
        home_postal_sector: {type: DataTypes.TEXT, allowNull: true},
        users: {type: DataTypes.INTEGER, allowNull: true},
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    // WorkersHomeCatchment.associate = (models: any) => {
    //     TestModel.hasMany(models.whatever, { as: "Whatever", foreignKey: "whatever_id" });
    // };
    //
    // WorkersHomeCatchment.prototype.testInstanceMethod = function () {};

    // return WorkersHomeCatchment;
}
