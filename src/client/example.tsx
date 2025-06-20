import { createResource, createSignal, Suspense } from "solid-js";
import { useClientAPI } from "@yetifrozty/solid-plugin/client";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const myAsyncLoadingFunction = async (): Promise<string> => {
  await wait(1000);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
  const json = await response.json()
  return json.title
};

const myAsyncLoadingFunction2 = async (): Promise<string> => {
  await wait(2000);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/2")
  const json = await response.json()
  return json.title
};

export default function Example() {
  const [count, setCount] = createSignal(0);
  const [getData, setData] = createResource(myAsyncLoadingFunction);
  const [getData2, setData2] = createResource(myAsyncLoadingFunction2);
  // console.log(getData());
  const clientAPI = useClientAPI();
  const url = () => clientAPI.serverData.url;
  const currentHistoryIndex = () => clientAPI.currentHistoryIndex;

  const link = clientAPI.link;
  return <div>
    <button onClick={() => setCount(count() + 1)}>Click me</button>
    <p>Count: {count()}</p>
    <p>URL: {url()}</p>
    <Suspense fallback={<div>Loading...</div>}>
      <p>Data: {getData()}</p>
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <p>Data2: {getData2()}</p>
    </Suspense>
    <p>Current History Index: {currentHistoryIndex()}</p>
    <a use:link href="/awd">Test</a>
  </div>
}