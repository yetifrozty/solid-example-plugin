import solid from 'vite-plugin-solid'
import { injectExpress } from '@yetifrozty/express-plugin';
import { injectVite } from '@yetifrozty/vite-plugin';

function solidExamplePlugin() {
  let plugins = [];
  let currentMiddleware = void 0;
  return {
    name: "solid-example-boot",
    init: async (_plugins) => {
      plugins = _plugins;
      injectExpress(plugins);
      injectVite(plugins);
    },
    configureVite: async (vite) => {
      vite.clientPluginModules.push("@yetifrozty/solid-example-plugin/client");
      vite.serverPluginModules.push("@yetifrozty/solid-example-plugin/server");
      
      if (!vite.config.plugins) vite.config.plugins = [];
      if (!vite.config.plugins.find((p) => p.name === "solid")) {
        vite.config.plugins.push(solid({ssr: true}));
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
