# Casual web

Web ui for Casual built using [`SvelteKit`](https://svelte.dev/docs/kit/introduction) and [`shadcn-svelte`](https://www.shadcn-svelte.com/).

## Casual

Casual web expects Casual administration services to be available at `/.casual`. E.g `http://domain/.casual/domain/state`.

If needed add to nginx configuration:

```sh
location /.casual {
    casual_pass;
}
```

## Developing

Start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

What Casual domain to use during development is configured in `vite.config.ts`. `target` is the url to the domain:

```js
export default defineConfig({
  // ...
  server: {
    proxy: {
      '/.casual': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  // ...
})
```

## Building

Casual web is built as a [`single-page application`](https://svelte.dev/docs/kit/single-page-apps) using the svelte `adapter-static` adapter.

To create a production version:

```sh
npm run build
```

This will generate a `build` folder that includes everything needed to deploy the application.

## Serving from Casual

Copy the `build` folder to `/opt/casual/webapp/` and configure nginx:

```sh
location / {
    root /opt/casual/webapp/;
    try_files $uri $uri/ /index.html;
}
```
