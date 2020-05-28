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
    <p>one</p>
    <p>two</p>
  </div>
);

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Default title",
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={() => this.setState({ title: "updated title" })}>
          Update
        </button>
        <h2>{this.props.message}</h2>
      </div>
    );
  }
}

class Wishlist extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "I;mma dev",
    };
    this.update = this.update.bind(this);
  }
  update() {
    let title = this.inputwish.value;

    this.setState({ title });
  }
  render() {
    return (
      <div>
        <h1>Your wishlist</h1>
        <input
          type="text"
          ref={(ref) => (this.inputwish = ref)}
          placeholder="enter wish"
        />
        <button onClick={this.update}>Update</button>
        <h2>{this.props.message}</h2>
        <p>{this.state.title}</p>
      </div>
    );
  }
}

//TinyReact.render(<Wishlist />, root);
TinyReact.render(<Greeting />, root);

setTimeout(() => TinyReact.render(<Wishlist />, root), 4000);
