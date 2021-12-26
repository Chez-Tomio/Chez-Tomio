import './i18n';

import { GlobalStyles } from '@chez-tomio/components-web';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
