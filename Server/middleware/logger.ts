import express, { NextFunction, Response, Request } from 'express';


export default function loggerMiddleware(req: Request,res: Response,next: NextFunction){
    console.log(`${req.method} ${req.url}`);
    next();
}