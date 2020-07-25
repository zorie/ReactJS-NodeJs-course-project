import React, { useState, useEffect } from 'react'
import { api } from './../config/axios'
import UserDetails from './UserDetails'
import { Box, Grid, List, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import moment from 'moment'
import ListItemLink from './../common/ListItemLink'
// import OrganizationFeed from './../organization/OrganizationFeed'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

function UserDashboard(props) {
    const [userDetails, setUserDetails] = useState({})
    const [products, setProducts] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        api
            .get('/users/' + props.match.params.id)
            .then((res) => {
                setUserDetails(res.data)
                setDataLoaded(true)
            })
            .catch(console.error)

        setProducts([
            {
                "_id": "1",
                "title": "title of product"
            },
            {
                "_id": "2",
                "title": "2 title of product"
            }
        ]);
    }, [props.match.params.id])
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={12}>
                    {dataLoaded ? (
                        <UserDetails
                            firstName={userDetails.firstName}
                            lastName={userDetails.lastName}
                            email={userDetails.email}
                        />
                    ) : (
                            ''
                        )}
                    {/* <OrganizationFeed organizationId={organization._id} /> */}
                </Grid>

                {/* list ot favourite products */}

                <Grid item lg={2} md={2} sm={false}>
                    <List className={classes.root}>
                        {products.map((product) => (
                            <ListItemLink href={`/product/${product._id}`} key={product._id}>
                                <ListItemText
                                    primary={product.title}
                                    secondary="By Deciem"
                                />
                            </ListItemLink>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserDashboard
