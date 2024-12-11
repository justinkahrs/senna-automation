"use client"
import { createTheme } from '@mui/material/styles';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4C789E',
    },
    background: {
      default: '#F5F6F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#4A4A4A',
    },
    divider: '#E3E5E7',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: cormorant.style.fontFamily,
      fontWeight: 600,
    },
    h2: {
      fontFamily: cormorant.style.fontFamily,
      fontWeight: 600,
    },
    h3: {
      fontFamily: cormorant.style.fontFamily,
      fontWeight: 500,
    },
    h4: {
      fontFamily: cormorant.style.fontFamily,
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: '1px',
          '&:hover': {
            borderWidth: '1px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});