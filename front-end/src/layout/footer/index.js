import React from 'react'
import './styles.css'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        FMI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    gutterBottom: {
      marginBottom: '0.35em',
  }
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        DRoutine
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        React + Node.js Project, FMI, 2020
          </Typography>
      <Copyright />
    </footer>
  )
}

