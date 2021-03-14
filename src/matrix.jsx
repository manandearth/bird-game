import * as React from "react";
import Papa from "papaparse";
import Card from "./card.jsx";

function Matrix(props) {
  const { level, selected } = props;
  const [matrix, setMatrix] = React.useState([]);
  const levels = { 0: [2, 3], 1: [5, 6], 2: [6, 6], 3: [6, 8] };
  const [birdList, setBirdList] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch("/data/BirdList1.csv");
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: false, delimiter: "," }); // object with { data, errors, meta }
      const list = results.data; // array of objects
      setBirdList(list);
      console.log(results.data);
    }
    getData();
  }, []); // [] means just do this once, after initial render

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
  React.useEffect(() => setDeck(shuffleArray(birdList)), [selected]);
  const [pairedDeck, setPairedDeck] = React.useState([]);

  React.useEffect(() => {
    const currentlyPlaying = deck.slice(0, matrix.flat().length / 2);
    setPairedDeck(
      shuffleArray([...currentlyPlaying, ...currentlyPlaying]).map(
        card => card[0]
      )
    );
    console.log("currentlyPlaying: ", matrix.flat());
  }, [deck]);

  const [positionsArray, setPositionsArray] = React.useState([]);
  React.useEffect(() => {
    const flatPositions = matrix
      .map((row, rowIndex) =>
        row.map((column, columnIndex) => ({ rowIndex, columnIndex }))
      )
      .flat();

    setPositionsArray(
      flatPositions.map((pos, i) => ({ pos, card: pairedDeck[i] }))
    );
  }, [matrix, pairedDeck]);

  React.useEffect(() => console.log("positionArray", positionsArray));

  return (
    <div>
      {matrix.map((row, rowIndex) => {
        return (
          <div className="container" key={`row-${rowIndex}`}>
            {row.map((column, columnIndex) => {
              return (
                <Card
                  key={`button-${rowIndex}-${columnIndex}`}
                  handleClick={handleClick}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  cardValue={
                    pairedDeck?.length > 0 &&
                    positionsArray
                      .filter(item => item.pos.columnIndex === columnIndex)
                      .find(item => item.pos.rowIndex === rowIndex).card
                  }
                />
              );
            })}
          </div>
        );
      })}
      {/* <div>{cardsFlipped.map(card => `${card}, `)}</div> */}
      <div>{pairedDeck}</div>
    </div>
  );
}

export default Matrix;
