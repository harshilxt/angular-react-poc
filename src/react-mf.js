// import React from 'react';
// // import ReactDOM from 'react-dom/client';
// import * as ReactDOM from 'react-dom/client';
// import singleSpaReact from 'single-spa-react';
// import RootComponent from './root.component.jsx';

// const lifecycles = singleSpaReact({
//   React,
//   ReactDOM,
//   rootComponent: RootComponent,
//   errorBoundary(err, info, props) {
//     // Customize the root error boundary for your microfrontend here.
//     return React.createElement('div', null, 'This microfrontend is broken, see console for details.');
//   },
// });

// export const { bootstrap, mount, unmount } = lifecycles;




// src/react-mf.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import RootComponent from './root.component.jsx';

// Keep a reference to the React root so we can unmount cleanly
let reactRoot = null;

// Optional: use a unique container id so multiple MFs don't collide
const CONTAINER_ID = 'xt-react-mf-container';

export async function bootstrap(/* props */) {
  // any async bootstrap logic can go here
  return Promise.resolve();
}

export async function mount(props) {
  // props may provide a domElement or domElementGetter; use it when present
  let container = null;

  // If single-spa passes a domElementGetter (common pattern), prefer it:
  if (props && typeof props.domElement === 'function') {
    container = props.domElement();
  }

  // If no domElementGetter, look for the container by id
  if (!container) {
    container = document.getElementById(CONTAINER_ID);
  }

  // If still not found, create it and append to body (or to props.mountRoot if you prefer)
  if (!container) {
    container = document.createElement('div');
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
  }

  // Create and render using React 18 createRoot
  reactRoot = createRoot(container);
  reactRoot.render(React.createElement(RootComponent, { ...props }));

  return Promise.resolve();
}

export async function unmount(/* props */) {
  if (reactRoot) {
    try {
      reactRoot.unmount();
    } catch (e) {
      // swallow harmless errors
      console.warn('Error during unmount:', e);
    }
    reactRoot = null;
  }

  return Promise.resolve();
}
