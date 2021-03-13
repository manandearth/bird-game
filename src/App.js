import "./App.css";
import * as React from "react";
import Matrix from "./matrix.jsx";

function App() {
  const [level, setLevel] = React.useState(1);

  return (
    <div className="App">
      <h1>bird-game</h1>
      <h2>choose you level</h2>
      <input onChange={e => setLevel(e.target.value)} />
      <h2>{`level - ${level}`}</h2>
      <Matrix level={level} />
    </div>
  );
}

export default App;
