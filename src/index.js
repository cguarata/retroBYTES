import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'


ReactDOM.render(
<ThemeProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
</ThemeProvider>,
  document.getElementById('root')
);
