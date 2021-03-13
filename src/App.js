import "./App.css";
import * as React from "react";
import Matrix from "./matrix.jsx";

function App() {
  const [level, setLevel] = React.useState(1);
  const [selected, setSelected] = React.useState(false);

  return (
    <div className="App">
      <h1>bird-game</h1>
      <h2>choose you level</h2>
      <select onChange={e => setLevel(parseInt(e.target.value))}>
        {[1, 2, 3].map(option => (
          <option key={`option - ${option}`}>{option}</option>
        ))}
      </select>
      <button onClick={() => setSelected(true)}>Start</button>
      <h2>{`level - ${level}`}</h2>
      <Matrix level={level} selected={selected} />
    </div>
  );
}

export default App;
