/** @jsx TinyReact.createElement */ //babel replaces () with TinyReact.createElement

/*** Step 1,2,3,4 - createElement */

const root = document.getElementById("root");

let base = (
  <div>
    <h1 onClick={() => alert("ssup")}>I am a react element</h1>
  </div>
);

TinyReact.render(base, root);
