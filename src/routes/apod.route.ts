import express, {Request, Response} from 'express';
import { getApodData } from '../controller/apod.controller';

const router = express.Router()

router.get('/apod', getApodData)

export default router