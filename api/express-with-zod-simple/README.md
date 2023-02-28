### Requirements
- OpenAPI (with references)
- Simple endpoint definitions
- Inter-endpoint call support

### To-Do
- [ ] env variable
- [ ] find a better way to define models without repeating the model name
- [ ] lint
- [ ] refactor "endpoint" to functions, to be an actual callable function, not `endpoint.handler()`
- [ ] switch to vite (`vanilla-ts`)
- [ ] remove request context, just access the endpoint context **within**
- [x] database models + zod
- [x] Database in context
- [x] Authentication
- [x] zod validation error response
