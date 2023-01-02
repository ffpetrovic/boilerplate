import { initTRPC } from '@trpc/server';
import {
    OpenApiMeta,
    generateOpenApiDocument,
    createOpenApiExpressMiddleware
} from 'trpc-openapi';
import { z } from 'zod'
import {createExpressMiddleware} from "@trpc/server/adapters/express";
import swaggerUi from "swagger-ui-express";
import express from 'express';

const t = initTRPC.meta<OpenApiMeta>().create(); /* 👈 */

const appRouter = t.router({
    sayHello: t.procedure
        .meta({ /* 👉 */ openapi: { method: 'GET', path: '/say-hello', enabled: true } })
        .input(z.object({ name: z.string() }))
        .output(z.object({ greeting: z.string() }))
        .query(({ input }) => {
            return { greeting: `Hello ${input.name}!` };
        })
});

export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'tRPC OpenAPI',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
});

const app = express();

// Setup CORS
// app.use(express.cors());

// Handle incoming tRPC requests
app.use('/api/trpc', createExpressMiddleware({ router: appRouter }));
// Handle incoming OpenAPI requests
app.use('/api', createOpenApiExpressMiddleware({ router: appRouter }));

// Serve Swagger UI with our OpenAPI schema
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
