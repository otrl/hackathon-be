import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface PostcodeOutCodesInterface {
    id?: number;
    postcode?: string;
    latitude?: string;
    longitude?: number;
}

export interface PostcodeOutCodesInstance extends Sequelize.Instance<PostcodeOutCodesInterface>, PostcodeOutCodesInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("postcode_outcodes", {
        postcode: {type: DataTypes.TEXT, allowNull: true},
        latitude: {type: DataTypes.TEXT, allowNull: true},
        longitude: {type: DataTypes.TEXT, allowNull: true},
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    // PostcodeOutCodes.associate = (models: any) => {
    //     TestModel.hasMany(models.whatever, { as: "Whatever", foreignKey: "whatever_id" });
    // };
    //
    // PostcodeOutCodes.prototype.testInstanceMethod = function () {};

    // return PostcodeOutCodes;
}
