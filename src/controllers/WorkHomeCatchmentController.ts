import { Request, Response } from "express";

export default class WorkHomeCatchmentController {
    static async post(req: Request, res: Response) {
        try {
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
