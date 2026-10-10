# Casual web

Web ui for Casual built using [`SvelteKit`](https://svelte.dev/docs/kit/introduction) and [`shadcn-svelte`](https://www.shadcn-svelte.com/).

## Casual

Casual web expects Casual administration services to be available at `/.casual`. E.g `http://[domain]/.casual/domain/state`.

If needed add to nginx configuration:

```
location /.casual {
    casual_pass;
}
```

## Configuration

When Casual web client loads it fetches configuration from `http://[domain]/configuration.json`.

Configuration file is created created manually, it is not included in the build.

|Setting|Type|Default|Description|
|-------|----|-------|-----------|
|`read_only`|bool|`true`|Set to `false` to enable scaling/restart etc|

**Example configuration.json**

```json
{
  "read_only": false
}
```

## Development

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

### Dev configuration

When in dev mode the client gets its configuration from `configuration.local.json` if it exists. See section [Configuration](#configuration) for options. `configuration.local.json` is ignored by git.

## Building

Casual web is built as a [`single-page application`](https://svelte.dev/docs/kit/single-page-apps) using the svelte `adapter-static` adapter.

To create a production version:

```sh
npm run build
```

This will generate a `build` folder that includes everything needed to deploy the application.

## Serving from Casual

Copy the content of the `build` folder to `/opt/casual/webapp/` and configure nginx:

```
location / {
    root /opt/casual/webapp/;
    try_files $uri $uri/ /index.html;
}
```
