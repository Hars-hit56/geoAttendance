import React from 'react';
import { StyleSheet } from 'react-native';
import { APP_PADDING_HORIZONTAL } from '../../../../styles/globalStyles';
import { spacing } from '../../../../styles/spacing';
import AppContainer from '../../../common/container/AppContainer';
import RegularText from '../../../common/RegularText';
import Header from '../../../common/header/Header';
import colors from '../../../../utility/colors';

const Home = () => {
  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header
        title="Geo Attandance"
        hideBack
        titleStyle={styles.headerTitleStyle}
      />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: colors.THEME,
  },
});

export default Home;
