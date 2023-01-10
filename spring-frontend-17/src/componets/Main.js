import * as React from 'react';
import {useState} from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useGetAllBooksQuery} from "../api/base-api";
import CreateBookDialog from "./CreateBookDialog";
import {Link} from "react-router-dom";

const columns = [
    {field: 'id', headerName: 'ID', width: 50},
    {field: 'name', headerName: 'Name', width: 200},
    {field: 'authorName', headerName: 'Author', width: 200},
    {field: 'genreName', headerName: 'Genre', width: 200},
    {field: 'edit', headerName: 'Action', width: 150,
        renderCell: (params) => {
            return <Link to={`edit/${params.row.id}`}>{"Edit  " + params.row.name}</Link>
        }
    }

];

export default function Main() {
    const {data: response, isSuccess} = useGetAllBooksQuery();
    const [state, setState] = useState({
        bookId: null,
        isDialogOpen: false
    });
    const handleCreateBook = () => {
        setState({
            ...state,
            isDialogOpen: true
        })
    }

    const handleCloseDialog = () => {
        setState({
            ...state,
            bookId: null,
            isDialogOpen: false
        })
    }

    return (
        <Box sx={{m: 2}}>
            <Typography
                sx={{display: 'flex', justifyContent: 'center', color: '#1976d2'}}
                variant="h4">
                List of books
            </Typography>
            {isSuccess ?
                <Box sx={{height: 450, mt: 2}}>
                    <DataGrid rows={response}
                              columns={columns}
                              hideFooter
                              disableColumnSelector
                              disableColumnFilter
                              disableColumnMenu/>
                </Box> :
                <CircularProgress/>}
            <Button
                sx={{mt: 2}}
                variant="contained"
                onClick={handleCreateBook}>
                Create book
            </Button>
            <CreateBookDialog open={state.isDialogOpen}
                              onClose={handleCloseDialog}
                              bookId={state.bookId}
            />
        </Box>
    );
}