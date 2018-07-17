import { Request, Response } from "express";

export default class TestController {
    static async post(req: Request, res: Response) {
        try {
            return res.json({message: 'That was a post'});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }

    static async get(req: Request, res: Response) {
        try {
            return res.json({message: 'That was a get'});
        } catch (err) {
            return res.status(500).json({err: err.message});
        }
    }
}
