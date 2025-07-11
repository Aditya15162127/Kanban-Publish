import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-layouts/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-schedule/styles/material.css';
import '@syncfusion/ej2-richtexteditor/styles/material.css';

import '@syncfusion/ej2-kanban/styles/material.css';


import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
