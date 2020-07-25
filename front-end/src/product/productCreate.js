import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import SuccessAlert from '../common/alerts/successAlert'
import FailAlert from '../common/alerts/failAlert'
import { useHistory } from 'react-router-dom'
import constants from '../constants'
import { api } from '../config/axios'

function ProductCreate(props) {
    const history = useHistory()
    const [name, setName] = useState(undefined)
    const [brand, setBrand] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [photoLink, setPhotoLink] = useState(undefined)
    const [successfulCreation, setSuccessfulCreation] = useState(undefined)
    const [promptMsg, setPromptMsg] = useState('')


    function handleSubmit() {
        const formData = {
            name: name,
            brand: brand,
            description: description,
            type: type,
            photoLink: photoLink
        }

        api.post('/products', formData)
            .then(function (response) {
                setPromptMsg(constants.userMessages.SUCC_CREATE_PRODUCT)
                setSuccessfulCreation(true)
                history.push('/')
            })
            .catch(function (error) {
                console.log('Error occurred on creation of new product.')
                console.error(error)
                setSuccessfulCreation(false)

                if (error.response && error.response.status === 404) {
                    setPromptMsg("Error occurred on creation of new product.")
                    return
                }
                setPromptMsg(constants.userMessages.ERR_INTERNAL)
            })
    }

    return (
        <div>
            <Container maxWidth="xs">
                <form noValidate autoComplete="off">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Product name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="brand"
                        label="Brand name"
                        name="brand"
                        autoComplete="brand"
                        autoFocus
                        onChange={(event) => setBrand(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="type"
                        label="Product type"
                        name="type"
                        autoComplete="type"
                        autoFocus
                        onChange={(event) => setType(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="desc"
                        label="Product description"
                        name="desc"
                        autoComplete="desc"
                        autoFocus
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="link"
                        label="Product photo link"
                        name="link"
                        autoComplete="link"
                        autoFocus
                        onChange={(event) => setPhotoLink(event.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Create
                    </Button>
                    {successfulCreation ? (
                        <SuccessAlert msg={promptMsg} onClose={() => { }} />
                    ) :
                        promptMsg ? <FailAlert msg={promptMsg} onClose={() => { }} /> : '' 
                    }
                </form>
            </Container>
        </div>
    )
}

export default ProductCreate
