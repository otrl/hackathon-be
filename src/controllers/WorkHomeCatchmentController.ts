import { Request, Response } from "express";
import * as _ from "lodash";

import db from "../db";

import {CatchmentLocations} from "../constants";

export default class WorkHomeCatchmentController {
    static async post(req: Request, res: Response) {
        const {postCode, type} = req.body;
        const postCodeToQuery = postCode.split(" ")[0];

        const where: any = {};

        if (type === "work") {
            where.work_postal_sector = {
                [db.sequelize.Op.like]: `${postCode}%`
            };
        } else {
            where.home_postal_sector = {
                [db.sequelize.Op.like]: `${postCode}%`
            };
        }

        try {
            const results = await db.workershomecatchment.findAll({ where });

            const processedResults: any = {};

            const persistResult = (result: any, type: CatchmentLocations) => {
                let fieldName: string = "home_postal_sector";
                if (type === CatchmentLocations.Home) {
                    fieldName = "work_postal_sector";
                }

                // const postcode: string = result[fieldName].split(" ")[0];
                const postcode: string = result[fieldName];
                if (_.has(processedResults, postcode)) {
                    processedResults[postcode].users = processedResults[postcode].users + Number(result.users);
                } else {
                    processedResults[postcode] = {
                        users: Number(result.users)
                    };
                }
            };

            results.map(result => {
                persistResult(result, type)
            });

            const postCodesArray: string[] = _.keys(processedResults);
            // postCodesArray.push(postCodeToQuery);

            const postCodesShortResults = await db.postcode_outcodes.findAll({
                where: {
                    postcode: postCodeToQuery
                }
            });

            console.log(postCodesShortResults);

            const postCodesResults = await db.postcode_lad.findAll({
                where: {
                    postcode_sector: postCodesArray
                }
            });

            const stuff: any[] = [];
            _.forOwn(processedResults, function(value, key) {
                const geoInfo = postCodesResults.find(result => result.postcode_sector === key);
                stuff.push(Object.assign(value, {
                    postcode: key, latitude: geoInfo.latitude, longitude: geoInfo.longitude
                }));
            });

            return res.json({data: stuff, originPoint: postCodesShortResults.find(result => result.postcode === postCodeToQuery)});

            // return res.json({data: [
            //         {
            //             work_postal_sector: "SE18 6",
            //             home_postal_sector: "E7 8",
            //             users: 10,
            //         },
            //         {
            //             work_postal_sector: "SE18",
            //             home_postal_sector: "NW1 1",
            //             users: 62,
            //         }
            //     ]});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
