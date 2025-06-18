import { ViteHooks, vitePlugin } from "@yetifrozty/vite-plugin"
import { ExpressHooks, expressPlugin } from "@yetifrozty/express-plugin"
import solidPlugin from "../../../solid-plugin/src/registerPlugins.js"
import { BaseHooks } from "@yetifrozty/base-plugin-system";
import { SolidExampleServerHooks } from "./server.js";
import { RequestHandler } from "express";

interface SolidExamplePlugin extends BaseHooks, ViteHooks, ExpressHooks, SolidExampleServerHooks {
  name: "solid-example-boot"
}

function solidExamplePlugin(): SolidExamplePlugin {
  let plugins: any[] = [];
  let currentMiddleware: RequestHandler | undefined = undefined;

  return {
    name: "solid-example-boot",
    init: async (_plugins) => {
      plugins = _plugins

      // dependencies
      if (!plugins.find((p): p is ReturnType<typeof expressPlugin> => p.name === "express")) {
        const express = expressPlugin();
        plugins.push(express);
        await express.init?.(plugins);
      }
      if (!plugins.find((p): p is ReturnType<typeof vitePlugin> => p.name === "vite")) {
        const vite = vitePlugin();
        plugins.push(vite);
        await vite.init?.(plugins);
      }
      if (!plugins.find((p): p is ReturnType<typeof solidPlugin> => p.name === "solid-boot")) {
        const solidClient = solidPlugin();
        plugins.push(solidClient);
        await solidClient.init?.(plugins);
      }
    },
    configureVite: async (vite) => {
      if (import.meta.env.PROD) {
        vite.clientPluginModules.push("@yetifrozty/solid-example-plugin/client")
        vite.serverPluginModules.push("@yetifrozty/solid-example-plugin/server")
      } else {
        vite.clientPluginModules.push("@yetifrozty/solid-example-plugin/dev/client")
        vite.serverPluginModules.push("@yetifrozty/solid-example-plugin/dev/server")
      }

      return vite
    },
    initVite: async () => {
    },
    initExpress: async (express) => {
      express.use((req, res, next) => {
        if (currentMiddleware) {
          currentMiddleware(req, res, next);
        } else {
          next();
        }
      })
    },
    initSolidExampleServer: (middleware) => {
      currentMiddleware = middleware;
    }
  }
}

export default solidExamplePlugin