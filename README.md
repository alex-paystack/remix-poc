# Remix Demo App

This example app demonstrates some of [Remix's](https://remix.run/) core features

## Features

- Integration with [Pax](https://github.com/PaystackHQ/pax) and [Stitches](https://stitches.dev/) (also uses [Radix UI](https://www.radix-ui.com/))
- Data fetching and mutation with Remix loaders and actions
- Error handling
- Nested Routing

## Getting Started

To run this application locally, along with installing all dependencies, you will need to install Pax locally either using `npm link` or similar.

Then run the frontend development server and the API server using the following commands:

```bash
yarn dev

yarn start:server
```

## Commands

- `dev`: runs your application on `localhost:300x`
- `start-server`: runs the API server on `localhost:4000`
- `build`: creates the production build version
- `start`: starts a simple server with the production build
