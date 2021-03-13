import * as React from "react";

function Matrix(props) {
  const { level, selected } = props;
  const [matrix, setMatrix] = React.useState([]);
  const levels = { 1: [5, 6], 2: [6, 6], 3: [6, 8] };
  // const fixedMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

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
    </div>
  );
}

export default Matrix;
