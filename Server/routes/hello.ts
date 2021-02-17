import express, { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';

const router = express.Router();

router.get('/', (req: Request, res: Response)=>{
    res.status(StatusCodes.OK).send('Hello world');
})

export default router;