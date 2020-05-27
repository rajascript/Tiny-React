/** @jsx TinyReact.createElement */ //babel replaces () with TinyReact.createElement

/*** Step 1,2,3,4 - createElement */

const root = document.getElementById("root");

let base = (
  <div>
    <h1 onClick={() => alert("ssup")}>I am a react element</h1>
    <h2 onClick={() => alert("ssup")}>I shoudl be gone</h2>
  </div>
);

let updatedView = (
  <div>
    <h1 onClick={() => alert("ssup")}>I am updated react element</h1>
  </div>
);

const Heart = (props) => <span style={props.style}>Hearts</span>;
const Greeting = (props) => (
  <div className="greeting">
    <h2>Welcome {props.message}</h2>
    <Heart />
  </div>
);

TinyReact.render(<Greeting message="ssup" />, root);
