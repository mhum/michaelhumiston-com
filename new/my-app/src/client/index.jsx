import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from '../client/components/Root';
import './styles/styles.scss';

ReactDOM.hydrate(
    <BrowserRouter>
        <Root />
    </BrowserRouter>, 
    document.getElementById('root')
);
