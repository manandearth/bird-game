import * as React from "react";

const Card = props => {
  const { rowIndex, columnIndex, handleClick, cardValue } = props;
  return (
    <div className="item">
      <div
        key={`button-${rowIndex}-${columnIndex}`}
        onClick={() => handleClick(rowIndex, columnIndex)}
      >{`Hi I am ${rowIndex}-${columnIndex}`}</div>
      <div>{cardValue}</div>
    </div>
  );
};

export default Card;
