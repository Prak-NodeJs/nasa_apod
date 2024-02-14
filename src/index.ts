import express, { Request, Response, Application,NextFunction} from 'express';
import dotenv from 'dotenv';

// Configure dotenv to load environment variables from .env file
dotenv.config();

import { dbConnection } from './config/config';
import apodRoute from './routes/apod.route'

const app: Application = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());

// Connect to the database
dbConnection();

//Routes
app.use('/', apodRoute)

//handle unknown routes
app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Route: ${req.originalUrl} does not exist on this server`,
    });
  });


// Error handling middleware
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    let statusCode;
    if (err.response && err.response.status) {
        statusCode = err.response.status;
    } else {
        statusCode = err.statusCode || 500;
    }   
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


//start server
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
