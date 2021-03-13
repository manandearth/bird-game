import * as React from "react";

function Matrix() {
  const fixedMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];

  const [cardsFlipped, setCardsFlipped] = React.useState([]);

  const handleClick = value => {
    setCardsFlipped([...cardsFlipped, value]);
    console.log(`I told you that I am ${value}`);
  };

  return (
    <div>
      {fixedMatrix.map(row => {
        return (
          <div>
            {row.map(card => {
              return (
                <button
                  onClick={() => handleClick(card)}
                >{`Hi I am ${card}`}</button>
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
