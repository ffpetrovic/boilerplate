import * as express from 'express';
import * as endpoints from './src/endpoints'
import * as pkg from './package.json'
import {setupApi} from "./src/_internal/_setup";

const app = express()

setupApi(app, endpoints, pkg);

app.listen(3030);
