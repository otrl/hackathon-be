import { Request, Response } from "express";

import db from "../db";

export default class WorkHomeCatchmentController {
    static async post(req: Request, res: Response) {
        const {postcode, type} = req.body;

        const where: any = {};

        if (type === "work") {
            where.work_postal_sector = {
                [db.sequelize.Op.like]: `${postcode}%`
            };
        } else {
            where.home_postal_sector = {
                [db.sequelize.Op.like]: `${postcode}%`
            };
        }

        console.log(db);

        try {
            const results = await db.workershomecatchment.findAll({ where });

            console.log(results);

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
