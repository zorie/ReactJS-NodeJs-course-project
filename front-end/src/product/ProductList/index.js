import React, { useEffect, useState } from 'react'
import ProductItem from '../productItem'
import { api } from './../../config/axios'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function ProductList() {
  const classes = useStyles();

  const [products, setProducts] = useState([])

  const externalProps = useLocation();

  console.log('DA VIDIM PROPS KAKVO EUSE LOCATION')
  console.log(externalProps)

  useEffect(() => {
    if (externalProps.state && externalProps.state.filteredProducts) {
      setProducts(externalProps.state.filteredProducts)
    } else {
      api.get(`/products`).then(({ data }) => {
        if (data.success) {
          setProducts(data.allProducts)
        } else {
          toast.notify('Error', {
            position: 'bottom-right',
            duration: 1500,
          })
        }
      })
    }
    
  }, [externalProps])

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Skin Care Products for YOU
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We are always making sure you get the best out of the best...
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Request Routine
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Contact Us
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                description={product.description}
                type={product.type}
                brand={product.brand}
                photoLink={product.photoLink}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

