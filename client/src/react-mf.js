import React from 'react';
import ReactDOM from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import RootComponent from './root.component.jsx';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RootComponent,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return React.createElement('div', null, 'This microfrontend is broken, see console for details.');
  },
});

export const { bootstrap, mount, unmount } = lifecycles;