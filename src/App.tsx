import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppStack from './navigations';
import reduxStore from './redux/store';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={reduxStore}>
        <AppStack />
      </Provider>
    </View>
  );
}

export default App;
