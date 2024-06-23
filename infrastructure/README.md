# Solaris Infrastructure

This project contain the infrastructure of Solaris by using AWS CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## Before to Start

Create two environments files for each environment, then set the environment variables

```
cp .env.example .env.dev
cp .env.example .env.prod
```

## Deploy

Deploy to a develop environment using the variables of `.env.dev`

```
npm run deploy:dev
```

Deploy to a production environment using the variables of `.env.prod`

```
npm run deploy:prod
```
