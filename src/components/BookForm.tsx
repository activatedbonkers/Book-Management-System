import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addBook, updateBook, Book } from '../features/books/bookSlice';
import { AppDispatch } from '../app/store';
import { TextField, Button, Box, Typography } from '@mui/material';

interface BookFormProps {
  book?: Book;
  onFormSubmit?: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onFormSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = book || { title: '', author: '', description: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        author: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        if (book) {
          dispatch(updateBook({ ...book, ...values }));
        } else {
          dispatch(addBook(values));
        }
        setSubmitting(false);
        if (onFormSubmit) {
          onFormSubmit();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <Field
              name="title"
              as={TextField}
              label="Title"
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              fullWidth
            />
            <Field
              name="author"
              as={TextField}
              label="Author"
              error={touched.author && Boolean(errors.author)}
              helperText={touched.author && errors.author}
              fullWidth
            />
            <Field
              name="description"
              as={TextField}
              label="Description"
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            {book ? 'Update Book' : 'Add Book'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BookForm;
