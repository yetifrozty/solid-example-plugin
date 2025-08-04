import { Request, RequestHandler, Response, Router } from "express";
import { InitVite, SSRBaseHooks, ViteHooks } from "@yetifrozty/vite-plugin";
import { generateHydrationScript, getAssets, renderToStringAsync } from "solid-js/web";
import SecondExample from "../client/SecondExample.jsx";

interface SolidExampleServerPlugin extends SSRBaseHooks, ViteHooks {
  name: "solid-example-server";
}

export interface SolidExampleServerHooks {
  initSolidExampleServer: (middleware: RequestHandler) => void
}

export default function SolidServerPlugin(): SolidExampleServerPlugin {
  let plugins!: any[];
  let vite: InitVite;
  return {
    name: "solid-example-server",
    init: async (_plugins, _vite) => {
      plugins = _plugins;
      vite = _vite;
    },
    postInit: async () => {
      const router = Router();

      router.get("/api", (req, res) => {
        res.send("Hello World")
      })

      router.get("/", (req, res) => {
        res.send("Hello World")
      })

      router.get("/test", async (req, res) => {
        //const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
        //const json = await response.json()
        //const title = json.title
        const title = "Hello World"

        const body = await renderToStringAsync(() => <SecondExample title={title} />)
        const hydrationScript = generateHydrationScript()
        const assets = getAssets()

        res.send(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            ${await vite.generateHeadContent()}
            ${hydrationScript}
            ${assets}
            <script id="solid-example-data" type="application/json">${JSON.stringify({title})}</script>
          </head>
          <body>
            <div id="root">${body}</div>
          </body>
        </html>`)
      })
      
      router.get("/awd", (req, res) => {
        res.send("Hello World")
      })

      const relevantPlugins = plugins.filter((plugin): plugin is SolidExampleServerHooks => plugin.initSolidExampleServer);
      relevantPlugins.forEach((plugin) => plugin.initSolidExampleServer(router));
    }
  }
}