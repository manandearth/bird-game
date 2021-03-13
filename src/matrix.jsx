import * as React from "react";

function Matrix(props) {
  const { level, selected } = props;
  const [matrix, setMatrix] = React.useState([]);
  const levels = { 0: [2, 3], 1: [5, 6], 2: [6, 6], 3: [6, 8] };

  const list = [
    { english: "bird1", spanish: "pajaro1", scientific: "ave ave" },
    { english: "bird2", spanish: "pajaro2", scientific: "ave birdaes" },
    { english: "bird3", spanish: "pajaro3", scientific: "avesauros rex" }
  ];
  React.useEffect(() => {
    let grid = [];

    let currentKey = Object.keys(levels).find(key => parseInt(key) === level);
    let currentValues = levels[currentKey];
    for (var i = 0; i < currentValues[0]; i++) {
      grid[i] = [];
      for (var j = 0; j < currentValues[1]; j++) {
        grid[i][j] = undefined;
      }
      console.log(typeof level);
    }

    if (selected) setMatrix(grid);
  }, [level, selected]);

  const [cardsFlipped, setCardsFlipped] = React.useState([]);

  const handleClick = (row, column) => {
    setCardsFlipped([...cardsFlipped, [row, column]]);
    console.log(`I told you that I am ${row}-${column}`);
  };

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const [deck, setDeck] = React.useState([]);
  React.useEffect(() => setDeck(JSON.stringify(shuffleArray(list))), [
    selected
  ]);
  const [pairedDeck, setPairedDeck] = React.useState([]);

  React.useEffect(() => {
    const currentlyPlaying = deck.slice(0, matrix.flat.length / 2);
    setPairedDeck(shuffleArray(currentlyPlaying));
  }, [deck]);

  return (
    <div>
      {matrix.map((row, rowIndex) => {
        return (
          <div key={`row-${rowIndex}`}>
            {row.map((column, columnIndex) => {
              return (
                <button
                  key={`button-${rowIndex}-${columnIndex}`}
                  onClick={() => handleClick(rowIndex, columnIndex)}
                >{`Hi I am ${rowIndex}-${columnIndex}`}</button>
              );
            })}
          </div>
        );
      })}
      <div>{cardsFlipped.map(card => `${card}, `)}</div>
      <div>{pairedDeck}</div>
    </div>
  );
}

export default Matrix;
