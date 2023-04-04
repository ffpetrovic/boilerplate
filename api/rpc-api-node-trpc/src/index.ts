import {
    createOpenApiExpressMiddleware,
} from 'trpc-openapi';
import {createExpressMiddleware} from "@trpc/server/adapters/express";
import swaggerUi from "swagger-ui-express";
import express from 'express';
import * as procedures from './procedures'
import {generateOpenAPIDocument, createContext, t} from "./utils/trpc";
import dotenv from 'dotenv'

dotenv.config()

export const router = t.router({
    ...Object.entries(procedures).reduce((total, [procedureName, { procedure }]) => ({
        ...total,
        [procedureName]: procedure,
    }), {}),
});

const openAPIDocument = generateOpenAPIDocument(router);
const app = express();

app
    .use('/api', createOpenApiExpressMiddleware({ router, createContext }))
    .use('/api/trpc', createExpressMiddleware({ router, createContext }))

app
    .get('/openapi.json', (req, res) => res.status(200).json(openAPIDocument))
    .use('/openapi', swaggerUi.serve)
    .get('/openapi', swaggerUi.setup(openAPIDocument));

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});
