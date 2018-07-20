import { Request, Response } from "express";
import * as _ from "lodash";
import * as Sequelize from "sequelize";

import db from "../db";

import {CatchmentLocations} from "../constants";

export default class OdDataController {
    static async post(req: Request, res: Response) {
        const {place, type, purpose, timeZone} = req.body;
        const group: string[] = [];
        const where: any = {};

        if (type === "destination") {
            where.end_lad_name = place;
            group.push("start_lad_name");
        } else {
            where.start_lad_name = place;
            group.push("end_lad_name");
        }

        try {
            if (["nhb", "hbw inbound", "hbw outbound", "hbo outbound", "hbo inbound"].indexOf(purpose) >= 0) {
                where.purpose = purpose;
            } else if (purpose === "all") {
                // group.push("purpose")
            } else {
                throw new Error(`Invalid purpose "${purpose}"`);
            }
    
            if (["0700-1000", "1000-1600", "1600-1900", "1900-0700"].indexOf(timeZone) >= 0) {
                where.period = timeZone;
            } else if (timeZone === "all") {
                // group.push("period")
            } else {
                throw new Error(`Invalid timeZone period "${timeZone}"`);
            }
    
            const results = await db.oddata_lad_latlong.findAll({
                attributes: [
                    [Sequelize.fn('first', Sequelize.col('start_lad_name')), 'start_lad_name'],
                    [Sequelize.fn('first', Sequelize.col('start_latitude')), 'start_latitude'],
                    [Sequelize.fn('first', Sequelize.col('start_longitude')), 'start_longitude'],
                    [Sequelize.fn('first', Sequelize.col('end_lad_name')), 'end_lad_name'],
                    [Sequelize.fn('first', Sequelize.col('end_latitude')), 'end_latitude'],
                    [Sequelize.fn('first', Sequelize.col('end_longitude')), 'end_longitude'],
                    [Sequelize.fn('first', Sequelize.col('mode')), 'mode'],
                    [Sequelize.fn('first', Sequelize.col('period')), 'period'],
                    [Sequelize.fn('first', Sequelize.col('purpose')), 'purpose'],
                    [Sequelize.fn('sum', Sequelize.col('trips')), 'trips']
                ],
                group,
                where
            });

            if (purpose === "all") {
                results.map(r => r.purpose = purpose);
            }
            if (timeZone === "all") {
                results.map(r => r.period = timeZone);
            }

            return res.json({data: results});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }

    static async get(req: Request, res: Response) {
        const results = await db.oddata_lad.findAll({});

        try{
            return res.json({data: results});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
