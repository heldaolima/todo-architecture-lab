# Description

This project is a study-oriented implementation of a **Service-Based Architecture (SBA)**. It simulates how a modular and distributed system can be structured, even within a single monolithic application, by clearly separating services into independent feature modules.

## Architecture Overview

The application is organized into the following key services:

- **Tasks Service** (`tasks-service`): Handles all task-related operations (CRUD, completion, etc.).
- **Users Service** (`users-service`): Manages user registration and authentication logic.
- **API Gateway** (`api-gateway`): Serves as the unified entry point for the system, routing and orchestrating requests between services.

Each service follows a layered structure:

```
  tasks-service/
  ├── business/ # Use cases
  ├── domain/ # Entities
  ├── database/ # Implementations (e.g., Prisma, In-memory)
  ├── persistence/ # Repository interfaces
  ├── presentation/ # Controllers and DTOs
```
## User Service and Authentication

Initially, the system only included the task-related logic. To fully explore the service-based paradigm, a **User Service** was introduced. This addition allowed testing inter-service interaction and simulating identity boundaries.

As part of the user module, a **simple authentication mechanism** was also implemented using JWT. This authentication is enforced via guards and decorators under a shared module.

## API Gateway

The `api-gateway` module was introduced to simulate a real-world interface layer. All HTTP controllers were moved here, making the services entirely internal and focused on business logic. This aligns with SBA best practices by centralizing request handling and enforcing separation of concerns.

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

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
