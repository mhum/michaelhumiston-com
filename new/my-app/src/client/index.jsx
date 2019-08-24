import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Root from '../client/components/Root';
import './less/styles.less';

ReactDOM.hydrate(
    <BrowserRouter>
        <Root />
    </BrowserRouter>, 
    document.getElementById('root')
);
