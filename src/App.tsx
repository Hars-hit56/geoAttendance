import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppStack from './navigations';
import reduxStore from './redux/store';
import FlashMessage from 'react-native-flash-message';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={reduxStore}>
        <AppStack />
      </Provider>
      <FlashMessage position={'top'} />
    </View>
  );
}

export default App;
