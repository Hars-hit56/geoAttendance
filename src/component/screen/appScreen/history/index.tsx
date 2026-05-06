import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../../utility/colors';
import AppContainer from '../../../common/container/AppContainer';
import Header from '../../../common/header/Header';

const History = () => {
  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header title="Attandance History" hideBack />
    </AppContainer>
  );
};

const styles = StyleSheet.create({});

export default History;
