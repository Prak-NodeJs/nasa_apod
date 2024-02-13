import { NextFunction, Request, Response } from "express";
import { fetchApodData, saveApodData } from "../services/apod.services";

export const getApodData = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const data = await fetchApodData(req.query, next);
        const apodData = await saveApodData(data); 
        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            data: apodData
        });
    } catch (error) {
        next(error);
    }
};
