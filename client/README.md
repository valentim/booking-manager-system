# Client web
This client web has the necessary interfaces to display and manage the restaurant reservation mechanism. It was done based on ReactJS and written with Typescript.

### Home
![](./examples/show_restaurants_and_tables.png)

### Booking
![](./examples/booking.png)

### Waiting Queue
![](./examples/waiting_queue1.png) ![](./examples/waiting_queue2.png) ![](./examples/waiting_queue3.png)

### Reservations
![](./examples/reservations.png)

### Creating restaurants
![](./examples/creating_restaurant.png)

### Creating tables
![](./examples/creating_table.png)

### Listing restaurants
![](./examples/list_restaurants.png)

### Listing tables
![](./examples/list_tables.png)

## Requirements
 - Nodejs >= 11.15
 - NPM >= 6.14.0
 - MongoDB >= 4.2
 - [API provider](../api/README.md)

## Install/Start
The project is dockerized, so to install it, follow the procedures below: 

### Note - I strongly recommend you running the project though the docker-compose from root of this monorepo

1 - Run mongodb container:  
`$ docker run -d -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=1234 -p 27027:27027` 
2 - Build and run api container:  
At the root of the project execute - `$ docker build -t api .` and after `$ docker run --name api -e MONGODB_RESOURCE=mongodb://root:1234@localhost:27017/booking?authSource=admin -p 3002:3002 -d api`  
3 - Start api service:  
`$ docker exec -it api bash -c 'npm run start'`  
4 - Build and run web container:  
At the root of the project execute - `$ docker build -t web .` and after `$ docker run --name web -p 3000:3000 -e API_PROVIDER=http://localhost:3002 -d web`  
3 - Start web service:  
`$ docker exec -it web bash -c 'yarn start'`

## Project structure
The project structure based on components.

In short:
 - examples
 - public
 - src
    - components
    - services
    - App.ts
    - index.ts
 - Dockerfile
 - tsconfig.json
 - package.json
 - server.js
 - README.md
 - LICENSE


## Live demo
View [example](http://ec2-52-205-252-32.compute-1.amazonaws.com:3000/)

