import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { fetchBooks, deleteBook, updateBook } from '../features/books/bookSlice';
import { AppDispatch } from '../app/store';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Book } from '../features/books/bookSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const bookStatus = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);

  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    if (bookStatus === 'idle') {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  const handleEdit = (book: Book) => {
    setEditId(book.id || null);
  };

  const handleDelete = (id?: number) => {
    if (id !== undefined) {
      dispatch(deleteBook(id));
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  let content;

  if (bookStatus === 'loading') {
    content = <Typography>Loading...</Typography>;
  } else if (bookStatus === 'succeeded') {
    content = (
      <TableContainer component={Paper}>
        <Table aria-label="book table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                {editId === book.id ? (
                  <Formik
                    initialValues={book}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      dispatch(updateBook(values));
                      setEditId(null);
                      setSubmitting(false);
                    }}
                  >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                      <>
                        <TableCell>
                          <Field
                            name="title"
                            as={TextField}
                            value={values.title}
                            onChange={handleChange}
                            fullWidth
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            name="author"
                            as={TextField}
                            value={values.author}
                            onChange={handleChange}
                            fullWidth
                            error={touched.author && Boolean(errors.author)}
                            helperText={touched.author && errors.author}
                          />
                        </TableCell>
                        <TableCell>
                          <Field
                            name="description"
                            as={TextField}
                            value={values.description}
                            onChange={handleChange}
                            fullWidth
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="save"
                            onClick={() => handleSubmit()}
                          >
                            <SaveIcon />
                          </IconButton>
                        </TableCell>
                      </>
                    )}
                  </Formik>
                ) : (
                  <>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => handleEdit(book)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(book.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (bookStatus === 'failed') {
    content = <Typography color="error">{error}</Typography>;
  }

  return <Box>{content}</Box>;
};

export default BookList;
