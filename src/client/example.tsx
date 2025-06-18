import { createResource, createSignal } from "solid-js";
import { useClientAPI } from "@yetifrozty/solid-plugin/client";

const myAsyncLoadingFunction = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello, world!");
    }, 1000);
  });
};

export default function Example() {
  const [count, setCount] = createSignal(0);
  const [getData, setData] = createResource(myAsyncLoadingFunction, {deferStream: true});
  // console.log(getData());
  const clientAPI = useClientAPI();
  const url = () => clientAPI.serverData.url;
  const currentHistoryIndex = () => clientAPI.currentHistoryIndex;

  const link = clientAPI.link;
  return <div>
    <button onClick={() => setCount(count() + 1)}>Click me</button>
    <p>Count: {count()}</p>
    <p>URL: {url()}</p>
    <p>Data: {getData()}</p>
    <p>Current History Index: {currentHistoryIndex()}</p>
    <a use:link href="/awd">Test</a>
  </div>
}