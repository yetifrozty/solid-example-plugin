import { ViteHooks } from "@yetifrozty/vite-plugin";
import { ExpressHooks } from "@yetifrozty/express-plugin";
import { BaseHooks } from "@yetifrozty/base-plugin-system";
import { SolidExampleServerHooks } from "./server.js";
interface SolidExamplePlugin extends BaseHooks, ViteHooks, ExpressHooks, SolidExampleServerHooks {
    name: "solid-example-boot";
}
declare function solidExamplePlugin(): SolidExamplePlugin;
export default solidExamplePlugin;
