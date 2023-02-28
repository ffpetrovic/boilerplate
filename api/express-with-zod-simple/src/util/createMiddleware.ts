import {_createMiddleware} from "../_internal/util/_createMiddleware";
import {Context} from "../types/api";

export const createMiddleware = _createMiddleware<Context>;
