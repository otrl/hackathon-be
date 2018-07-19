import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface PostcodeLadInterface {
    postcode_sector?: string;
    latitude?: string;
    longitude?: number;
}

export interface PostcodeLadInstance extends Sequelize.Instance<PostcodeLadInterface>, PostcodeLadInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("postcode_lad", {
        postcode_sector: {type: DataTypes.TEXT, primaryKey: true},
        latitude: {type: DataTypes.TEXT, allowNull: true},
        longitude: {type: DataTypes.TEXT, allowNull: true},
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    // PostcodeLad.associate = (models: any) => {
    //     TestModel.hasMany(models.whatever, { as: "Whatever", foreignKey: "whatever_id" });
    // };
    //
    // PostcodeLad.prototype.testInstanceMethod = function () {};

    // return PostcodeLad;
}
