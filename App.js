
import React from 'react';
import MainRoute from './src/screens/Navigation/MainRoute';
import firebase from 'firebase/app'
import { firebaseConfig } from './src/firebase/Config';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
  console.log("Connected .......!")
}


export default function App() {
  return (
    <Provider store={store}>
      <MainRoute></MainRoute>
    </Provider>
  );
}

