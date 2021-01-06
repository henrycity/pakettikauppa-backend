![Coverage](https://gitlab.pakettikauppa.fi/aalto/pakettikauppa-backend/badges/master/coverage.svg?style=flat-square)

### How to run

You need to have Node and Yarn installed

1. Run `yarn install` to install dependencies
2. Run `yarn start` to start the backend

For development mode (live reload), use `yarn dev` instead of `yarn start`

### Scripts
Run scripts by prepending them with `yarn`, e.g. `yarn lint`
- `build`
  - Build the TypeScript source. Resulting JavaScript files can be found in the `./build` folder
- `start`
  - Build the source and start the backend
- `start-no-build`
  - Start the backend without building it first
- `dev`
  - Start the backend with live reloading
- `format`
  - Format source files with Prettier
- `lint`
  - Lint and fix issues in source files with ESLint
- `type-check`
  - Run TypeScript's type-checking
- `test`
  - Run Jest tests