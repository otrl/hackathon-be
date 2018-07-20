import { Request, Response } from "express";
import * as _ from "lodash";

import db from "../db";

import {CatchmentLocations} from "../constants";

export default class OdDataController {
    static async post(req: Request, res: Response) {
        try{
            return res.json({data: [
                    {
                        work_postal_sector: "SE18 6",
                        home_postal_sector: "E7 8",
                        users: 10,
                    },
                    {
                        work_postal_sector: "SE18",
                        home_postal_sector: "NW1 1",
                        users: 62,
                    }
                ]});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }

    static async get(req: Request, res: Response) {
        try{
            return res.json({data: [
                    {
                        work_postal_sector: "SE18 6",
                        home_postal_sector: "E7 8",
                        users: 10,
                    },
                    {
                        work_postal_sector: "SE18",
                        home_postal_sector: "NW1 1",
                        users: 62,
                    }
                ]});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
