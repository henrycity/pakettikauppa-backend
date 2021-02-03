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

### HTTPS
The backend supports HTTPS by either a cert and key file, or using devcert; this is controlled using the HTTPS environment variable:
 - `true`
	- Uses local files in the app root named `backend.crt` and `backend.key`
 - `devcert`
	- Uses devcert to generate keys and automatically trusts them for your browser. Requires root privileges.

Any other value will default to HTTP only