import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction } from 'express';
import { Apod } from "../model/apod.model";
import { savedData,IApod, FetchApodOptions } from '../interface/apod.interface';
import { isValidDate } from '../utils/validate.date';
import ApiError from '../utils/error';

export const fetchApodData = async (options:FetchApodOptions, next:NextFunction): Promise<IApod[]> => {
    const { date, start_date, end_date, count, thumbs } = options;
    let apod_url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

    if (
        (date && !isValidDate(date)) ||   (start_date && !isValidDate(start_date)) || (end_date && !isValidDate(end_date))  
    ) {
        throw new ApiError(404, 'Invalid date format. Please use YYYY-MM-DD format.');
    }

     // Check for conflicting parameters
     if ((date && (start_date || end_date)) || (start_date && end_date) || (count && (date || start_date || end_date))) {
        throw new ApiError(400, 'Conflicting parameters. Please use only one of date, start_date, or end_date, and exclude count when using any of these.');
    }

    if (count && (count <= 0)) {
        throw new ApiError(400, 'Invalid count. Count must be greater than 0.');
    }

    if(date){
        apod_url+=`$data=${date}`
    }

    if (start_date && end_date) {
        apod_url += `&start_date=${start_date}&end_date=${end_date}`;
    }

    if (count){
        apod_url += `&count=${count}`;
    }

    if (thumbs) {
        apod_url += `&thumbs=${thumbs}`;
    }

    const result = await axios.get(apod_url);

    if (Array.isArray(result.data)) {
        return result.data;
    } else {
        return [result.data];
    }
};

export const saveApodData = async (datas:IApod[]): Promise<savedData[]> => {
    const uuid: string = uuidv4();
    for (const data of datas){
        await Apod.create({
            responseId:uuid,
            copyright: data.copyright,
            date: data.date,
            explanation: data.explanation,
            hdUrl: data.hdurl,
            mediaType: data.media_type,
            serviceVersion: data.service_version,
            title: data.title,
            url: data.url,
        });
    }

    const savedRecords = await Apod.findAll({
        where: {
            responseId: uuid,
        },
    });
    
    return savedRecords.map(record => record.toJSON()) as savedData[]
};

