import * as express from "express";
import { OpenAPIGenerator } from "@asteasolutions/zod-to-openapi";
import * as swaggerUi from "swagger-ui-express";
import {registry} from "./util/registry";
import {InternalEndpoint, InternalExtendedExpressApplication} from "./_types";
import {middlewareWrapper} from "./util/middlewareWrapper";
import {endpointExecutorCallback} from "./util/endpointExecutorCallback";
import {internalContextMiddleware} from "./middleware/internalContextMiddleware";
import {internalServerErrorMiddleware} from "./middleware/internalServerErrorMiddleware";
import {notFoundMiddleware} from "./middleware/notFoundMiddleware";
import {getRequestMethodFromEndpoint} from "./util/getRequestMethodFromEndpoint";

export const setupApi = (_app, endpoints: Record<string, InternalEndpoint<any, any>>, pkg: any) => {
    const app = _app as InternalExtendedExpressApplication;

    app.use(express.json())
    app.get('/favicon.ico', (req, res) => res.status(204));

    Object.entries(endpoints).forEach(([endpointName, endpoint]) => {
        const method = endpoint.type === 'query' ? 'get' : 'post'

        registry.register(`${endpointName[0].toUpperCase()}${endpointName.substring(1)}Request`, endpoint.input);
        registry.register(`${endpointName[0].toUpperCase()}${endpointName.substring(1)}Response`, endpoint.output);

        const registerPathParam: Parameters<typeof registry.registerPath>[0] = {
            path: `/${endpointName}`,
            method,
            responses: {
                200: {
                    description: "",
                    content: {
                        'application/json': {
                            schema: endpoint.output,
                        },
                    }
                }
            }
        }

        if (method === 'get') {
            registerPathParam['request'] = {
                query: endpoint.input,
            }
        } else {
            registerPathParam.request = {
                body: {
                    description: `${endpointName} endpoint request body model`,
                    content: {
                        'application/json': {
                            schema: endpoint.input,
                        }
                    }
                }
            }
        }

        if(endpoint._meta?.auth) {
            registerPathParam.security = [{
                bearerAuth: []
            }]
        }

        registry.registerPath(registerPathParam)
    });

    const generator = new OpenAPIGenerator(registry.definitions, '3.0.0');
    const openAPIDocument = generator.generateDocument({
        info: {
            title: pkg.name,
            version: pkg.version,
            description: pkg.description,
        },
        servers: [{url: 'http://localhost:3030'}],
    })

    openAPIDocument.components.securitySchemes = {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    };

    app.get('/openapi.json', (req, res) => {
        res.status(200).json(openAPIDocument)
    })
    app.use('/openapi', swaggerUi.serve);
    app.get('/openapi', swaggerUi.setup(openAPIDocument));

    Object.entries(endpoints).forEach(([endpointName, endpoint]) => {
        const method = getRequestMethodFromEndpoint(endpoint)

        app[method](`/${endpointName}`, ...[
            middlewareWrapper(internalContextMiddleware(endpoint)),
            middlewareWrapper(notFoundMiddleware(endpoints)),
            ...(endpoint.preMiddlewares?.map(middlewareWrapper) ?? []),
            endpointExecutorCallback(endpoint),
            ...(endpoint.postMiddlewares?.map(middlewareWrapper) ?? []),
            middlewareWrapper(internalServerErrorMiddleware),
            (req, res) => res.status(200).send(req._internal.outputResult),
        ])
    })
}
