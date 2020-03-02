# Booking manager system
This project is a [monorepo](https://www.atlassian.com/git/tutorials/monorepos) composed of two services such as, api and client created using Mongodb, Nodejs and React with Typescript.

In addition, the infrastructure is prepared to run the docker containers and the development environment can be deployed via docker-compose.

## Install
Once there is a docker-compose, the environment can be deployed using the following command at the root of the project: 
`$ docker-compose up`

This command will configure and start the api, client and mongodb together.

## About API
The API is built on Koajs with Typescript and it follows the [Rest specification](https://standards.rest/), the architecture is based on [Domain driven design](https://en.wikipedia.org/wiki/Domain-driven_design) and [Twelve factors](https://12factor.net/).

I recommend that you read about the project documentation [here](/api/README.md)

## About Client
In short, the Client is a ReactJS project written with Typescript. To learn more about the project, read the project documentation [here](/client/README.md)

## Approaches
1 - The comments are done based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

## License

GNU © [Booking manager system](https://github.com/valentim/booking-manager-system)

