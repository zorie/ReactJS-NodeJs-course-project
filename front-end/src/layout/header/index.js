import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import auth from './../../services/auth.service'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { api } from '../../config/axios'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



export default function Header(props) {
  let history = useHistory()

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchText, setSearchText] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      console.log('value', e.target.value);

      if (e.target.value) {
        let formData = { "searchFor": `${e.target.value}` }
        api.post("/products/search", formData)
          .then(({ data }) => {
            console.log(data)
            setFilteredProducts(data)
            console.log("VYRNALI SME")
            console.log(data)

            history.push('/products/filter', { "filteredProducts": data })
          })
          .catch(err => {
            console.log('Error occurred on searching through the products.')
            console.error(err)
          })
      }
    }
  }

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
              DRoutine Skin Care
            </Link>
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={keyPress}
            />
          </div>
          <div className={classes.grow} />

          {props.isLoggedIn ? (

            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <Link to={`/profile/${auth.getUserIdFromToken()}`} style={{ textDecoration: 'none', color: "inherit" }}>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                </Link>

                <MenuItem onClick={handleMenuClose}>
                  <Link to="/products/create" style={{ textDecoration: 'none', color: "inherit" }}>
                    Add New Product
                </Link>

                </MenuItem>
                <Link to="#" style={{ textDecoration: 'none', color: "inherit" }}>
                  <MenuItem
                    onClick={() => {
                      auth.logout()
                      props.handleLogout()
                      handleMenuClose()
                      history.push('/login')
                    }}
                  >
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Link>
              </Menu>


            </div>
          ) :
            <React.Fragment>
              <Button>
                <Typography className={classes.title} variant="h6" noWrap>
                  <Link to="/login" style={{ textDecoration: 'none', color: "#FFF" }}>
                    Login
                    </Link>
                </Typography>
              </Button>
              <Button>
                <Typography className={classes.title} variant="h6" noWrap color="inherit">
                  <Link to="/register" style={{ textDecoration: 'none', color: "#FFF" }}>
                    Register
              </Link>

                </Typography>
              </Button>
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}