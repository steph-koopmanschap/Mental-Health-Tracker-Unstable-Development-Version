import './App.css';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';

//This is the global component

function App() {

  /*
  The <Outlet /> component places all the components created 
  from routing in the outlet component. See index.js for the routing paths, and their accociated components.
  Thus every component will render inside the <div></div> of the App component. See index.js for more info.
  
  The <Provider > component ensures that the entire App has access to the global state from redux. 
  The global state lives in store.js.
  */

  return (
    <Provider store={store}>
      <div className="App">
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;

