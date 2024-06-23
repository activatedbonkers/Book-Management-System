import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';


export interface Book {
  id?: number; //optional
  title: string;
  author: string;
  description: string;
}

interface BookState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookState = {
  books: [],
  status: 'idle',
  error: null,
};

const API_URL = 'http://localhost:5001/books';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book: Book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async (book: Book) => {
  const response = await axios.put(`${API_URL}/${book.id}`, book);
  return response.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.books.findIndex((book) => book.id === updatedBook.id);
        if (index !== -1) {
          state.books[index] = updatedBook;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

export const selectAllBooks = (state: RootState) => state.books.books;

export default bookSlice.reducer;
