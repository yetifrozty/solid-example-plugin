import { type BaseHooks } from "@yetifrozty/base-plugin-system"
import { Request, RequestHandler, Response, Router } from "express";
import { CoreSolidServerPlugin, ServerData } from "@yetifrozty/solid-plugin/server";

interface SolidExampleServerPlugin extends BaseHooks {
  name: "solid-example-server";
}

export interface SolidExampleServerHooks {
  initSolidExampleServer: (middleware: RequestHandler) => void
}

export default function SolidServerPlugin(): SolidExampleServerPlugin {
  let plugins!: any[];
  let handleSolidRequest: (req: Request, res: Response, serverData: ServerData) => Promise<void>;

  return {
    name: "solid-example-server",
    init: async (_plugins) => {
      plugins = _plugins;
      handleSolidRequest = plugins.find((plugin): plugin is CoreSolidServerPlugin => plugin.name === "core-solid-server")?.handleSolidRequest!;
    },
    postInit: async () => {
      const router = Router();

      router.get("/api", (req, res) => {
        res.send("Hello World")
      })

      router.get("/", (req, res) => {
        handleSolidRequest(req, res, {
          pluginName: "solid-example-client",
          data: {
            url: req.originalUrl,
          }
        })
      })
      
      router.get("/awd", (req, res) => {
        handleSolidRequest(req, res, {
          pluginName: "solid-example-client",
          data: {
            url: req.originalUrl,
          }
        })
      })

      const relevantPlugins = plugins.filter((plugin): plugin is SolidExampleServerHooks => plugin.initSolidExampleServer);
      relevantPlugins.forEach((plugin) => plugin.initSolidExampleServer(router));
    }
  }
}