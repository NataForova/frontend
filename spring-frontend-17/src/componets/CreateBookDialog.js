import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import PropTypes from "prop-types";
import {useCreateBookMutation, useGetVariationsQuery} from "../api/base-api";

export default function CreateBookDialog(props) {
    const [state, setState] = useState({
        bookName: "",
        authorId: null,
        authorName: '',
        genreId: null,
        genreName: '',
        errors: {
            name: false,
            author: false,
            genre: false
        }
    })
    const [createBook, isSuccess] = useCreateBookMutation();
    const {
        data: variations = {
            authors: [],
            genres: []
        }, isSuccess: isVariationSuccess
    } = useGetVariationsQuery();


    useEffect(() => {
        if (isSuccess) {
            props.onClose(true);
        }
    }, [isSuccess])

    const handleClose = () => {
        setState({
            ...state,
            errors: {
                name: false,
                author: false,
                genre: false
            }
        })
        props.onClose(true);
    }

    const handleCreateBook = () => {
        if (validateRequest()) {
            let request = {
                bookName: state.bookName,
                authorId: state.authorId,
                genreId: state.genreId
            };
            createBook(request);
            setState({
                ...state,
                errors: {

                }
            })
        }
    }

    const validateRequest = () => {
        let errors = {}
        if (state.bookName.trim() === '') {
            errors = {...errors, name: true}
        }
        if (state.authorId == null) {
            errors = {...errors, author: true}
        }
        if (state.genreId == null) {
            errors = {...errors, genre: true}
        }

        setState({
            ...state,
            errors: errors
        })
        return Object.keys(errors).length === 0
    }
    return (

        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>
                {props.bookId ? "Edit book" : "Create a book"}
            </DialogTitle>
            {
                isVariationSuccess ?
                    <Box>
                        <DialogContent>
                            <TextField
                                value={state.bookName}
                                id="book-name"
                                label="Book name"
                                variant="outlined"
                                color="warning"
                                onChange={(event) => {
                                    setState({
                                        ...state,
                                        bookName: event.target.value
                                    })
                                }}
                                fullWidth
                                name="bookName"
                                sx={{mt: 2, mb: 2}}
                                error={state.errors.name}
                                helperText={state.errors.name
                                    ? "Поле не должно быть пустым."
                                    : ""}

                            />
                            <FormControl sx={{mt: 2, mb : 2}}
                                         fullWidth>
                                <InputLabel
                                    color="warning"
                                    id="author-select-label">
                                    Author
                                </InputLabel>
                                <Select
                                    color="warning"
                                    labelId="author-select-label"
                                    id="author-select"
                                    value={state.authorId}
                                    name={state.authorName}
                                    label="author"
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            authorName: event.target.name,
                                            authorId: event.target.value
                                        })
                                    }}
                                    error={state.errors.author}
                                    helperText={state.errors.author
                                        ? "Поле не должно быть пустым."
                                        : ""}
                                >
                                    {variations && variations.authors.map(({id, name}, index) => (
                                        <MenuItem key={`authors_select_${index}`}
                                                  name={name}
                                                  value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{mt: 2, mb: 2}} fullWidth>
                                <InputLabel
                                    color="warning"
                                    id="genre-select-label">
                                    Genre
                                </InputLabel>
                                <Select
                                    color="warning"
                                    labelId="genre-select-label"
                                    id="genre-select"
                                    value={state.genreId}
                                    name={state.genreName}
                                    label="genre"
                                    onChange={(event) => {
                                        setState({
                                            ...state,
                                            genreName: event.target.name,
                                            genreId: event.target.value
                                        })
                                    }}
                                    error={state.errors.genre}
                                    helperText={state.errors.genre
                                        ? "Поле не должно быть пустым."
                                        : ""}
                                >
                                    {variations && variations.genres.map(({id, name}, index) => (
                                        <MenuItem key={`genre_select_${index}`}
                                                  name={name}
                                                  value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained"
                                    onClick={handleCreateBook}>
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    props.onClose(true)
                                }}
                                variant="outlined">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Box>
                    :
                    <CircularProgress/>
            }
        </Dialog>
    );
}

CreateBookDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    bookId: PropTypes.number
};