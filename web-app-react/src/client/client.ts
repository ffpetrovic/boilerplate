import {Configuration, UsersApi} from "./generated";

const configuration = new Configuration({
   basePath: 'http://localhost:3000',
});

export const UsersClient = new UsersApi(configuration);
