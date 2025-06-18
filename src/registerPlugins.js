import { vitePlugin } from '@yetifrozty/vite-plugin';
import { expressPlugin } from '@yetifrozty/express-plugin';
import solidPlugin from '../../solid-plugin/src/registerPlugins.js';

function solidExamplePlugin() {
  let plugins = [];
  let currentMiddleware = void 0;
  return {
    name: "solid-example-boot",
    init: async (_plugins) => {
      plugins = _plugins;
      if (!plugins.find((p) => p.name === "express")) {
        const express = expressPlugin();
        plugins.push(express);
        await express.init?.(plugins);
      }
      if (!plugins.find((p) => p.name === "vite")) {
        const vite = vitePlugin();
        plugins.push(vite);
        await vite.init?.(plugins);
      }
      if (!plugins.find((p) => p.name === "solid-boot")) {
        const solidClient = solidPlugin();
        plugins.push(solidClient);
        await solidClient.init?.(plugins);
      }
    },
    configureVite: async (vite) => {
      {
        vite.clientPluginModules.push("@yetifrozty/solid-example-plugin/client");
        vite.serverPluginModules.push("@yetifrozty/solid-example-plugin/server");
      }
      return vite;
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
      });
    },
    initSolidExampleServer: (middleware) => {
      currentMiddleware = middleware;
    }
  };
}

export { solidExamplePlugin as default };
