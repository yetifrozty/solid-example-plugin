import { type ClientBaseHooks } from "@yetifrozty/vite-plugin";


interface SolidExampleClientHooks extends ClientBaseHooks {
  name: "solid-example-client";
}

export default function solidExampleClient(): SolidExampleClientHooks {
  let plugins: any[] = [];
  
  return {
    name: "solid-example-client",
    init: async (_plugins) => {
      plugins = _plugins;
    },
    postInit: async () => {
      if (import.meta.env.SSR) {
        return;
      }
      const jsonData = document.getElementById("solid-example-data")?.textContent!
      if (!jsonData) {
        return;
      }

      const parsed = JSON.parse(jsonData);

      const { hydrate, createComponent } = await import("solid-js/web");

      const SecondExample = await import("./SecondExample.js").then(m=>m.default);

      hydrate(() => createComponent(SecondExample, {title: parsed.title}), document.getElementById("root")!);
    }
  }
}