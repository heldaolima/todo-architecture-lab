# Description

This is a classic To-Do API implemented using the **Layered Architecture** style. The application is organized into distinct layers, each with a specific responsibility:

- **Presentation**: Handles input/output from external actors (e.g., HTTP requests). Contains Controllers and DTOs for data transport.
- **Business**: Encapsulates the application's use cases and business rules. Contains UseCase classes.
- **Persistence**: Defines contracts (interfaces) for data access. Contains repository abstractions.
- **Database**: Implements the repository interfaces using concrete storage mechanisms (e.g., in memory).
- **Domain**: Represents the core domain model. Contains Entities and value objects.

All layers are **closed** (a.k.a. strict layering), meaning that a request must flow from the top (Presentation) to the bottom (Database), without bypassing intermediate layers. Each layer depends only on the layer directly beneath it.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

