# nest-list-routes

[![NPM Version](https://img.shields.io/npm/v/nest-list-routes.svg)](https://www.npmjs.com/package/nest-list-routes)

## Description

List all routes and additional information for [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm i --save nest-list-routes
```

## Setup

### Basic configuration

```ts
@Module({
    imports: [
        NestListRoutesModule.forRoot()
    ],
})
export class AppModule {}
```

That's all. When you start Nest, you will see the following output in the terminal:

![](https://locene.com/repos/nest-list-routes/assets/basic-configuration.png)

### List routes with metadata

Support printing the metadata of [custom decorators](https://docs.nestjs.com/custom-decorators).

For example, assume you have defined a custom decorator named `Role`, you can configure it like this:

```ts
@Module({
    imports: [
        NestListRoutesModule.forRoot({
            metadataKeys: ['Role'],
        })
    ],
})
export class AppModule {}
```

You will see the following output:

![](https://locene.com/repos/nest-list-routes/assets/list-routes-with-metadata.png)

## Configuration options

| Name         | Description                               | Default Value |
| :----------- | :---------------------------------------- | :------------ |
| print        | Whether to print output.                  | `true`        |
| metadataKeys | Decorators to output, accepting an array. | `[]`          |

## Contributing

You are welcome to contribute to this project, just open a PR.

## License
[Apache-2.0](LICENSE)
