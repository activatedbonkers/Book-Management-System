import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook, Book } from '../features/books/bookSlice';
import { AppDispatch } from '../app/store';
import BookForm from './BookForm';

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState(false);

  const handleDelete = () => {
    dispatch(deleteBook(book.id!));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div>
      {editMode ? (
        <BookForm book={book} onFormSubmit={() => setEditMode(false)} />
      ) : (
        <>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.description}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default BookItem;
