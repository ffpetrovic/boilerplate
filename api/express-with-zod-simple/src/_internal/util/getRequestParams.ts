import {Request} from "express";

export const getRequestParams = (req: Request) => req.method.toLowerCase() === 'get' ? req.query : req.body
