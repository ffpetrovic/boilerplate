import {Response} from "express";
import createHttpError from "http-errors";

export const throwErrorOnResponse = (res: Response, error: createHttpError.HttpError) => res.status(error.status).send(error.message)