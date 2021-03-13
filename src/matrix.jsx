import * as React from "react";

function Matrix(props) {
  const { level } = props;
  const [matrix, setMatrix] = React.useState([]);

  React.useEffect(() => {
    let grid = [];
    for (var i = 0; i < level; i++) {
      grid[i] = [];
      for (var j = 0; j < level; j++) {
        grid[i][j] = undefined;
      }
      console.log(typeof level);
    }

    setMatrix(grid);
  }, [level]);

  const fixedMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

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
