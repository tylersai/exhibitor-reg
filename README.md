# Exhibitors Registration

### Live Demo

You can view live demo here: [https://exhibitor-reg.netlify.app](https://exhibitor-reg.netlify.app)
_Note: need to allow `CORS` for this URL via backend if you want to fully test the app out_

### Development server

To change environment variables edit `src/environments/environment.ts`

Install required dependencies:

```bash
npm install
```

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
npm build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Third-party libraries used

[html2canvas](https://github.com/niklasvh/html2canvas) - to capture specific part of web page as HTML `<canvas>` and save as image. It's used to save registration code as png image in this project.

### Limitations or future improvements

- use better dropdown selection instead of relying on bootstrap's styling only
- list of country selection can be improved by adding features like putting frequently selected country on top, allow search, and load only few countries first via backend and load more as user types
- should have better display of results when there are a mix of success and failure registrations.
