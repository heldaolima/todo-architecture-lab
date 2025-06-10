## Description

This To-Do API is implemented following the **Microkernel Architecture**, consisting of:
- A minimal **core system** with essential business logic (basicaly the **Layrered Architecture** version of the API)
- **Plug-in** components for additional features
- Clear contracts between core and plugins

## Structure

- `core`:
  - `presentation`: Handles input/output from external actors (e.g., HTTP requests). Contains Controllers and DTOs for data transport.
  - `business`: Encapsulates the application's use cases and business rules. Contains UseCase classes.
  - `persistence`: Defines contracts (interfaces) for data access. Contains repository abstractions.
  - `database`: Implements the repository interfaces using concrete storage mechanisms (e.g., in memory).
  - `domain`: Represents the core domain model. Contains Entities and value objects.
  - `registry`: Plugin registration system and type definitions
- `plugins`:
  - `notifications`: Example plugin for task event notifications
  - `password-encryption`: Example plugin for task data encryption

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