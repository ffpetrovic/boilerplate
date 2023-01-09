import {
    generateOpenApiDocument,
    createOpenApiExpressMiddleware,
} from 'trpc-openapi';
import {createExpressMiddleware} from "@trpc/server/adapters/express";
import swaggerUi from "swagger-ui-express";
import express from 'express';
import * as pkg from '../package.json';
import {addOpenApiMetaToRouter, createContext, t} from "./utils/trpc";
import * as procedures from "./procedures";

export const router = t.router({
    ...Object.entries(procedures).reduce((total, [key, value]) => ({
        ...total,
        [key]: value.procedure,
    }), {}),
} as Record<keyof typeof procedures, (typeof procedures)[keyof typeof procedures]['procedure']>);
addOpenApiMetaToRouter(router);

const app = express();
app
    .use('/api', createOpenApiExpressMiddleware({ router, createContext }))
    .use('/api/trpc', createExpressMiddleware({ router, createContext }))
    .use('/', swaggerUi.serve)
    .get('/', swaggerUi.setup(generateOpenApiDocument(router, {
        title: pkg.name,
        version: pkg.version,
        baseUrl: 'http://localhost:3000/api',
    })))
    .listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
