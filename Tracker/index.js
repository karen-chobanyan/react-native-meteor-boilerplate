import React from 'react'
import { AppRegistry } from 'react-native';
import App from './app/index';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();
const tracker = () => {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

AppRegistry.registerComponent('Tracker', () => tracker);
