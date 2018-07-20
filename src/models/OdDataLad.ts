import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface OdDataLadInterface {
    id?: number;
    lad_name?: string;
    latitude?: string;
    longitude?: string;
}

export interface OdDataLadInstance extends Sequelize.Instance<OdDataLadInterface>, OdDataLadInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("oddata_lad", {
        lad_name: {type: DataTypes.STRING, allowNull: true},
        latitude: {type: DataTypes.STRING, allowNull: true},
        longitude: {type: DataTypes.STRING, allowNull: true}
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}
