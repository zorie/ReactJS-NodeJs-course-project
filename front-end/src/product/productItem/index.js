import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import auth from '../../services/auth.service'
import { api } from '../../config/axios'
import FailAlert from '../../common/alerts/failAlert'
import SuccessAlert from '../../common/alerts/successAlert'
import { constants } from '../../constants'
import { useHistory } from 'react-router-dom'

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
    maxWidth: "150px",
    maxHeight: "150px",
    width: "auto",
    height: "auto",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function ProductItem(props) {
  const history = useHistory()
  const { id, name, brand, description, type, photoLink, shouldHideViewButton = false } = props
  const classes = useStyles();
  const [promptMsg, setPromptMsg] = useState(undefined)
  const [isDeleted, setIsDeleted] = useState(false)
  const [successfulDeletion, setSuccessfulDeletion] = useState(undefined)

  const handleDeleteProduct = (event) => {
    api.delete(`/products/${id}`)
      .then(function (response) {
        setPromptMsg('Successfully deleted product item.')
        setSuccessfulDeletion(true)
        setIsDeleted(true)
        history.push('/')
      })
      .catch(function (error) {
        console.log('Error occurred on deletion of product.')
        console.error(error)
        setSuccessfulDeletion(false)

        if (error.response && error.response.status === 404) {
          setPromptMsg("Error occurred on deletion of product.")
          return
        }
        setPromptMsg(constants.userMessages.ERR_INTERNAL)
      })
  }

  return (
    <Grid item key={name} xs={12} sm={6} md={4}>
      { isDeleted ? '' : (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={photoLink}
          title={name}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            <Link href={`/products/${id}`} style={{ textDecoration: 'none', color: "inherit" }}>
              {name + " By " + brand}
            </Link>
          </Typography>
          <Typography>
            {type}
          </Typography>
          <Typography>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          {shouldHideViewButton ? '' :
            <Link href={`/products/${id}`} style={{ textDecoration: 'none', color: "inherit" }}>
              <Button size="small" color="primary">
                View
            </Button>
            </Link>
          }
          {auth.isLoggedIn() ?
            <div>
              <Link href={`/product/${id}`} style={{ textDecoration: 'none', color: "inherit" }}>
                <Button size="small" color="primary">
                  Add To Cart
            </Button>
              </Link>
              <Button size="small" color="primary" onClick={handleDeleteProduct}>
                Delete
            </Button>
            </div>
            : ''
          }
        </CardActions>
      </Card>
      )}
      
      {successfulDeletion ? (
        <SuccessAlert msg={promptMsg} onClose={() => { }} />
      ) :
        (promptMsg ? <FailAlert msg={promptMsg} onClose={() => { }} /> : '')
      }
      
    </Grid>

  );
}
