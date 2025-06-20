# Description

This project explores **Event-Driven Architecture (EDA)** concepts in a modular, service-oriented codebase.

## 🧱 Architecture Overview

The application follows a **modular monorepo structure** with the following key components:

```
src/
├── api-gateway/ # Entry point with controllers delegating to services
├── tasks-service/ # Business logic and persistence for task entities
├── users-service/ # Business logic and persistence for user entities
├── shared/ # Common utilities, event bus, guards, decorators, Prisma
├── events/ # Event definitions and types shared across the app
```

Each service is self-contained and divided in layers by concern (domain, use-cases, presentation, persistence, listeners).

---

## Key Technologies

- **NestJS** (monorepo structure with modules)
- **RabbitMQ** (via `@nestjs/microservices`)
- **Event Bus** abstraction for publishing events
- **Listeners** in each service to react to events

Events include:

- `task.created`
- `task.completed`
- `user.created`
- `login` (user login event)


## Project setup

```bash
$ yarn install
$ docker compose up -d # for running RabbitMQ
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