import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';

// theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Box my={4}>
            <Typography variant="h2" component="h1" gutterBottom>
              Book Management System
            </Typography>
            <BookForm />
            <BookList />
          </Box>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
