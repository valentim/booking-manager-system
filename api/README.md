# API Rest
This API Rest is a project based on Koajs and written with Typescript and the goal is to provide endpoints for managing a restaurant / table reservation management system

## Requirements
 - Nodejs >= 11.15
 - NPM >= 6.14.0
 - MongoDB >= 4.2

## Install/Start
The project is dockerized, so to install it, follow the procedures below: 

### Note - I strongly recommend that you run the project though the docker-compose from root of this monorepo.

1 - Run mongodb container:  
`$ docker run -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=1234 -p 27027:27027 -d mongo`  
2 - Build and run api container:  
At the root of the project execute - `$ docker build -t api .` and after `$ docker run --name api -e MONGODB_RESOURCE=mongodb://root:1234@localhost:27017/booking?authSource=admin -p 3002:3002 -d api`  
3 - Start service:  
`$ docker exec -it api bash -c 'npm run start'`

## Project structure / Architecture
The project structure has some good references from [HMVC](https://en.wikipedia.org/wiki/Hierarchical_model%E2%80%93view%E2%80%93controller), [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [Domain Drive Design](https://en.wikipedia.org/wiki/Domain-driven_design).

In short:
 - docs
 - src
    - config
        - settings.ts
    - domain
        - feature
            - controllers
            - entities
            - repositories
            - responses
            - errors
            - services
            - validations
    - infrastructure
        - databases
        - errors
        - queue
        - middlewares
        - validations
    - index.ts
 - tests
 - Dockerfile
 - tsconfig.json
 - tslint.json
 - package.json
 - .env
 - README.md
 - LICENSE

## Public API / Endpoint documentations
All the endpoint are documented [here](./docs/endpoints.md) and the Postman [here](https://www.getpostman.com/collections/735b09a432a4733844b7)

## How to execute unit tests
`$ npm t` (it can be done inside the container, but doing out of the container will need to install the packages `npm install`)

## SQS - Waiting queue
The env variable must be updated to the waiting queue works:  
```
REGION=us-east-1
SECRET_ACCESS_KEY=
ACCESS_KEY_ID=
```

## Live demo
View [api](http://ec2-52-205-252-32.compute-1.amazonaws.com:3002/v1/health)

