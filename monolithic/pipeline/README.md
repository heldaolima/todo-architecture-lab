## Description

This To-Do API is implemented following the **Pipeline Architecture** style. The application is structured around composable operations that are chained together to form pipelines, allowing for flexible and reusable business workflows.

## Layers

- **Presentation**  
  Responsible for handling input and output from external sources (e.g., HTTP requests). Includes Controllers and DTOs for transport.

- **Pipelines**  
  Defines the high-level orchestration of business logic. Each pipeline is composed of reusable operations executed in sequence.

- **Operations**  
  Encapsulates atomic units of business logic, such as validation, transformation, and persistence. These operations are designed to be modular and composable.

- **Persistence**  
  Declares interfaces (contracts) for interacting with storage layers.

- **Database**  
  Provides concrete implementations of persistence interfaces using specific storage mechanisms (e.g., in-memory).

- **Domain**  
  Contains the core business entities and value objects that represent the application's data and rules.


Each pipeline follows a **linear and explicit flow**, where data is progressively transformed and validated by chained operations.

However, this is far from being the most productive architectural style for designing an API like this. There's a little reuse, but the setting up is excessivily tiring and specific, and even reuse does not always occur.

Notice, for instance, the `UpdateTaskPipeline`, in which I expected to reuse directly the `GetTaskById` operation. Because the next steps required different types, I need to chain all operations mannually, instead of just using the `Pipeline` class.

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
