import * as React from "react";

type Props = {
   rowIndex: object,
    columnIndex: object,
    onClick: Function,
    cardEnglishName: string,
    cardLatinName: string,
    cardSpanishName: string,
    canFlip: Boolean,
    resetCardsFlip: Function,
    onResetCardsFlip: Function,
    foundPairs: Array<string>
}
const Card = ({
    rowIndex,
    columnIndex,
    onClick,
    cardEnglishName,
    cardLatinName,
    cardSpanishName,
    canFlip,
    resetCardsFlip,
    onResetCardsFlip,
    foundPairs
  } : Props) => {

  const [flip, setFlip] = React.useState(true);

  const [wasFound, setWasFound] = React.useState(false);

  React.useEffect(() => {
    if (foundPairs.filter((card: string) => card === cardEnglishName).length > 0) {
      setWasFound(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundPairs]);
  const handleOnClick = () => {
    if (canFlip) {
      if (!wasFound) {
        setFlip(!flip);
        onClick(rowIndex, columnIndex);
        console.log(flip);
      } else {
        console.log("was already found!");
      }
    } else {
      console.log("cannot flip more than 2 cards, buddy!");
    }
  };

  React.useEffect(() => {
    if (resetCardsFlip) {
      setFlip(true);
      onResetCardsFlip(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div
          className={`item ${wasFound ? "backside" : ""}`}
          onClick={() => handleOnClick()}
        >
          <div key={`back-button-${rowIndex}-${columnIndex}`} />
        </div>
      )}
    </div>
  );
};

export default Card;
