import * as Sequelize from "sequelize";
import * as _ from "lodash";

export interface OdDataInterface {
    id?: number;
    start_lad_name?: string;
    start_latitude?: string;
    start_longitude?: string;
    end_lad_name?: string;
    end_latitude?: string;
    end_longitude?: string;
    mode?: string;
    period?: string;
    purpose?: string;
    trips?: number;
}

export interface OdDataInstance extends Sequelize.Instance<OdDataInterface>, OdDataInterface {}

export default function (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    return sequelize.define("oddata_lad_latlong", {
        start_lad_name: {type: DataTypes.STRING, allowNull: true},
        start_latitude: {type: DataTypes.STRING, allowNull: true},
        start_longitude: {type: DataTypes.STRING, allowNull: true},
        end_lad_name: {type: DataTypes.STRING, allowNull: true},
        end_latitude: {type: DataTypes.STRING, allowNull: true},
        end_longitude: {type: DataTypes.STRING, allowNull: true},
        mode: {type: DataTypes.STRING, allowNull: true},
        period: {type: DataTypes.STRING, allowNull: true},
        trips: {type: DataTypes.INTEGER, allowNull: true},
    }, {
        timestamps: false,
        freezeTableName: true,
    });
}
