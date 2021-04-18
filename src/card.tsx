import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
type Props = {
   rowIndex: Number,
    columnIndex: Number,
    onClick: Function,
    cardEnglishName: string,
    cardLatinName: string,
    cardSpanishName: string,
    canFlip: Boolean,
    resetCardsFlip: Boolean,
    onResetCardsFlip: Function,
    foundPairs: Array<string>
}

const useStyles = makeStyles({
  root: {
    minWidth: 175,
    minHeight: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 100,
  },
});

const PlayCard = ({
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
const classes = useStyles();
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
    <div className="">
      {!flip ? (
	 <Card className={classes.root} raised>
	         <CardContent>
        <div onClick={() => handleOnClick()}>
<CardMedia
          className={classes.media}
  image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.middlebury.edu%2Foffice%2Fsites%2Fwww.middlebury.edu.office%2Ffiles%2F2019-08%2Fbig-bird-portrait_0.jpg%3Ffv%3DktnJn2IK&f=1&nofb=1"
          title="a bird"
        />
          <div
            key={`button-${rowIndex}-${columnIndex}`}
          >{`Hi I am ${rowIndex}-${columnIndex}`}</div>
          <Typography variant="h5" component="h2">{cardEnglishName}</Typography>
          <Typography className={classes.pos} color="textSecondary">{cardLatinName}  </Typography>
          <Typography className="">{cardSpanishName}</Typography>
        </div>
	</CardContent>
</Card>
      ) : (
	<Card className={classes.root}
          onClick={() => handleOnClick()}
	>
	   <CardContent>
        <div
        >
          {wasFound && <Chip label="Got this one!"/>}
	   <Typography className={classes.pos} color="textSecondary">a card</Typography>
          <div key={`back-button-${rowIndex}-${columnIndex}`} />
        </div>
	</CardContent>
	 </Card>
      )}
    </div>
  );
};

export default PlayCard;
