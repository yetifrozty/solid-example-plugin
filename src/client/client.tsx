import { type BaseHooks } from "@yetifrozty/base-plugin-system";
import { type SolidClientHooks } from "@yetifrozty/solid-plugin/client";
import { lazy } from "solid-js";

interface SolidExampleClientHooks extends BaseHooks, SolidClientHooks {
  name: "solid-example-client";
}

export default function solidExampleClient(): SolidExampleClientHooks {
  return {
    name: "solid-example-client",
    component: lazy(() => import("./example.jsx")),
  }
}