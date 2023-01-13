import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {
    useGetBookByIdQuery,
    useGetVariationsQuery,
    useUpdateBookMutation
} from "../api/base-api";

export default function UpdateBook() {
    const location = useLocation()
    const navigate = useNavigate()
    const [state, setState] = useState({
        bookName: "",
        authorId: 0,
        authorName: '',
        genreId: 0,
        genreName: '',
        errors: {
            name: false,
            author: false,
            genre: false
        }
    })
    const bookId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    const {data: response, isFetching, isSuccess: isSuccessGet} = useGetBookByIdQuery(bookId);
    const {
        data: variations = {
            authors: [],
            genres: []
        }, isSuccess: isVariationSuccess
    } = useGetVariationsQuery();

    const [updateBook, isSuccess] = useUpdateBookMutation();

    useEffect(() => {
        if (isSuccessGet && isVariationSuccess) {
            setState({
                ...state,
                bookName: response.name,
                authorName: response.authorName,
                authorId: getAuthorIdByName(response.authorName),
                genreName: response.genreName,
                genreId: getGenreIdByName(response.genreName)
            })
        }
        if (isSuccess.isSuccess) {
            navigate("/")
        }
    }, [response, isSuccess])


    const handleUpdateBook = () => {
        if (validateRequest()) {
            let request = {
                bookId: response.id,
                bookName: state.bookName,
                authorId: state.authorId,
                genreId: state.genreId
            };
            updateBook(request);
            setState({
                ...state,
                errors: {}
            })
        }
    }
    const handleCancel = () => {
        setState({
            ...state,
            errors: {}
        })
        navigate("/")
    }

    const getAuthorIdByName = (authorName) => {
        let authorId = 0;
        variations.authors.forEach((author, index) => {
            if (author.name === authorName) {
                authorId = author.id;
            }
        })
        return authorId;
    }

    const getGenreIdByName = (genreName) => {
        let genreId = 0;
        variations.genres.forEach((genre, index) => {
            if (genre.name === genreName) {
                genreId = genre.id;
            }
        })
        return genreId;
    }

    const validateRequest = () => {
        let errors = {}
        if (state.bookName.trim() === '') {
            errors = {...errors, name: true}
        }
        if (state.authorId === 0) {
            errors = {...errors, author: true}
        }
        if (state.genreId === 0) {
            errors = {...errors, genre: true}
        }

        setState({
            ...state,
            errors: errors
        })
        return Object.keys(errors).length === 0
    }

    return (
        <Box>
            {isFetching ?
                <CircularProgress/> :
                <Box sx={{
                    width: 600,
                    ml: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography sx={{display: 'flex', justifyContent: 'center', color: '#1976d2'}}
                                variant="h4">
                        Edit book
                    </Typography>
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
                    <FormControl sx={{mt: 2, mb: 2}}
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
                    <FormControl sx={{mt: 2, mb: 2}}
                                 fullWidth>
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
                    <ButtonGroup>
                        <Button
                            onClick={handleUpdateBook}
                            sx={{mr: 2}}
                            variant="contained">
                            Update
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="outlined">
                            Cancel
                        </Button>
                    </ButtonGroup>

                </Box>
            }
        </Box>

    )
}
