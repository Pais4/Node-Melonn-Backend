import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Melonn Orders App
          </Typography>
          <Link to='/'>
            <Button className={classes.btn}>Create Order</Button>
          </Link>
          <Link to='/selllist'>
            <Button className={classes.btn}>Sell List</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar