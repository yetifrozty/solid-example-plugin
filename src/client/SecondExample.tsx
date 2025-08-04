import { createSignal } from "solid-js";
import cheese from "./cheese.svg";

function SecondExample(props: {title: string}) {
  const [count, setCount] = createSignal(0);
  return <div>
    <button onClick={() => setCount(count() + 1)}>Click me</button>
    <p>Count: {count()}</p>
    <p>Title: {props.title}</p>
    <img src={cheese} alt="cheese" />
  </div>;
}

export default SecondExample;