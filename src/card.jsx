import * as React from "react";

const Card = props => {
  const {
    rowIndex,
    columnIndex,
    onClick,
    cardEnglishName,
    cardLatinName,
    cardSpanishName,
    canFlip,
    resetCardsFlip,
    onResetCardsFlip
  } = props;

  const [flip, setFlip] = React.useState(true);

  const handleOnClick = () => {
    if (canFlip) {
      setFlip(!flip);
      onClick(rowIndex, columnIndex);
      console.log(flip);
    } else {
      console.log("cannot flip more than 2 cards, buddy!");
    }
  };

  React.useEffect(() => {
    if (resetCardsFlip) {
      setFlip(true);
      onResetCardsFlip(false);
    }
  }, [resetCardsFlip]);

  return (
    <div className="item">
      {!flip ? (
        <div onClick={() => handleOnClick()}>
          <div
            key={`button-${rowIndex}-${columnIndex}`}
          >{`Hi I am ${rowIndex}-${columnIndex}`}</div>
          <div className="title">{cardEnglishName}</div>
          <div className="title">{cardLatinName}</div>
          <div className="title">{cardSpanishName}</div>
        </div>
      ) : (
        <div className="item" onClick={() => handleOnClick()}>
          <div key={`back-button-${rowIndex}-${columnIndex}`} />
        </div>
      )}
    </div>
  );
};

export default Card;
