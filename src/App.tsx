import "./App.css";
import * as React from "react";
import Matrix from "./matrix";
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function App() {
    const classes = useStyles();
  const [level, setLevel] = React.useState(1);
  const [selected, setSelected] = React.useState(false);

  return (
    <Container fixed maxWidth={false}>
    
	      <Grid container spacing={3} direction="column" justify="center" alignItems="center">
      <h1>bird-game</h1>
            <FormControl className={classes.formControl}>
      <h2>choose you level</h2>
      <Select
	 labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
        onChange={(e: any) => setLevel(parseInt(e.target.value))}
        disabled={selected}
        defaultValue={"1"}
      >
        {[0, 1, 2, 3].map(option => {
          return <MenuItem value={option} key={`option - ${option}`}>{option}</MenuItem>;
        })}
      </Select>
      <Button variant="contained" color="secondary" onClick={() => setSelected(true)} disabled={selected}>
        Start
      </Button>
 	</FormControl>
      <h2>{`level - ${level}`}</h2>
      </Grid>
      <Matrix level={level} selected={selected} />
    </Container>
  );
}

export default App;
