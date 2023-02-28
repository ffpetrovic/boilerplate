import { InternalEndpoint } from "../_types";

export const getRequestMethodFromEndpoint = (endpoint: InternalEndpoint) => endpoint.type === 'query' ? 'get' : 'post'
