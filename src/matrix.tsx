import * as React from "react";
import Papa from "papaparse";
import PlayCard from "./card";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
type Props = {
  level: Number,
  selected: any,
}
function Matrix({level, selected} : Props) {
  const [matrix, setMatrix] = React.useState([]);
  const levels : Object = { 0: [2, 3], 1: [5, 6], 2: [6, 6], 3: [6, 8] };
  const [birdList, setBirdList] = React.useState([]);

  interface IParse {
    data: any
  }
  
  React.useEffect(() => {
    async function getData() {
      const response  = await fetch("/data/BirdList1.csv");
      const reader = response?.body?.getReader();
      const result = await reader?.read(); // raw array
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value); // the csv text
      const results : IParse = Papa.parse(csv, { header: false, delimiter: "," }); // object with { data, errors, meta }
      const list  = results.data; // array of objects
      setBirdList(list);
      console.log(results.data);
    }
    getData();
  }, []); // [] means just do this once, after initial render

  React.useEffect(() => {
    let grid = [];

    let currentKey = Object.keys(levels)?.find(key  => parseInt(key) === level) || 0 ;
    let currentValues = levels[currentKey];
    for (var i = 0; i < currentValues[0]; i++) {
      grid[i] = [];
      for (var j = 0; j < currentValues[1]; j++) {
        grid[i][j] = undefined;
      }
      console.log(typeof level);
    }

    if (selected) setMatrix(grid);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, selected]);

  const [cardsFlipped, setCardsFlipped] = React.useState([]);

  const [canFlip, setCanFlip] = React.useState(true);

  const [resetCardsFlip, setResetCardsFlip] = React.useState(false);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const onResetCardsFlip = React.useCallback(value => setResetCardsFlip(value),[]);
  const onClick = (row, column) => {
    setCardsFlipped([...cardsFlipped, [row, column]]);
    console.log(`I told you that I am ${row}-${column}`);
    if (cardsFlipped.length === 1) {
      // console.log("cards flipped in this turn are: ", [
      // ...cardsFlipped,
      // [row, column]
      // ]);
      setCanFlip(false);
      setTimeout(() => {
        setResetCardsFlip(true);
        setCanFlip(true);
        // setCardsFlipped([]);
      }, 2000);
    }
  };
  const [foundPairs, setFoundPairs] = React.useState([]);

  React.useEffect(() => {
    console.log("found a pair");
    console.log(`the new pair is: ${foundPairs[foundPairs.length - 1]}`);
  }, [foundPairs]);

  const areCardsSame = pair => {
    const [a, b] = pair;
    const firstCard = positionsArray
      .filter(card => card.pos.columnIndex === a[1])
      .find(card => card.pos.rowIndex === a[0]);
    const secondCard = positionsArray
      .filter(card => card.pos.columnIndex === b[1])
      .find(card => card.pos.rowIndex === b[0]);
    console.log(positionsArray);
    console.log("firstCard", firstCard);
    console.log("secondCard", secondCard);
    if (firstCard.card[0] === secondCard.card[0]) {
      setFoundPairs([...foundPairs, firstCard.card[0]]);
      console.log([...foundPairs, firstCard.card[0]]);

      console.log(typeof [...foundPairs, firstCard.card[0]]);
    }
  };

  React.useEffect(() => {
    if (cardsFlipped.length === 2) {
      console.log("cards flipped in this turn are: ", cardsFlipped);
      areCardsSame(cardsFlipped);
      setCardsFlipped([]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsFlipped]);

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const [deck, setDeck] = React.useState([]);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => setDeck(shuffleArray(birdList)), [selected]);
  const [pairedDeck, setPairedDeck] = React.useState([]);

  React.useEffect(() => {
    const currentlyPlaying = deck.slice(0, matrix.flat().length / 2);
    setPairedDeck(
      shuffleArray([...currentlyPlaying, ...currentlyPlaying]).map(card => [
        ...card
      ])
    );

    console.log("currentlyPlaying: ", matrix.flat());
    //eslint-disable-next-line react-hooks/exhaustive-deps
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

  // React.useEffect(() => console.log("positionArray", positionsArray));

  return (
    <div>
      {matrix.map((row, rowIndex) => {
        return (
	      <Grid container alignItems="center" justify="center" spacing={3}>

            {row.map((column, columnIndex) => {
              const cardValue =
                pairedDeck?.length > 0 &&
                positionsArray
                  .filter(item => item.pos.columnIndex === columnIndex)
                  .find(item => item.pos.rowIndex === rowIndex).card;
              return (
		<Grid item >
                <PlayCard
                  key={`button-${rowIndex}-${columnIndex}`}
                  onClick={onClick}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  cardEnglishName={cardValue?.[0]}
                  cardLatinName={cardValue?.[1]}
                  cardSpanishName={cardValue?.[2]}
                  canFlip={canFlip}
                  resetCardsFlip={resetCardsFlip}
                  onResetCardsFlip={onResetCardsFlip}
                  foundPairs={foundPairs}
                />
		</Grid>
              );
            })}
	      </Grid>
        );
      })}
      <div>{cardsFlipped.map(card => `${card}, `)}</div>
      {/* <div>{pairedDeck}</div> */}
    </div>
  );
}

export default Matrix;
