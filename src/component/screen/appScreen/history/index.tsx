import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../../utility/colors';
import AppContainer from '../../../common/container/AppContainer';
import Header from '../../../common/header/Header';
import HistoryList from '../../../modules/HistoryList';

const History = () => {
  const HISTORY_DATA = [
    {
      id: '1',
      date: '20 May 2025',
      time: '09:41 AM',
      status: 'Checked In',
      location: 'Inside Office Area',
    },
    {
      id: '2',
      date: '19 May 2025',
      time: '09:15 AM',
      status: 'Checked In',
      location: 'Inside Office Area',
    },
    {
      id: '3',
      date: '18 May 2025',
      time: '10:05 AM',
      status: 'Failed',
      location: 'Outside Office Area',
    },
    {
      id: '4',
      date: '18 May 2025',
      time: '10:05 AM',
      status: 'Failed',
      location: 'Outside Office Area',
    },
    {
      id: '5',
      date: '18 May 2025',
      time: '10:05 AM',
      status: 'Failed',
      location: 'Outside Office Area',
    },
    {
      id: '6',
      date: '18 May 2025',
      time: '10:05 AM',
      status: 'Failed',
      location: 'Outside Office Area',
    },
    {
      id: '7',
      date: '18 May 2025',
      time: '10:05 AM',
      status: 'Failed',
      location: 'Outside Office Area',
    },
    {
      id: '8',
      date: '18 May 2025',
      time: '10:05 AM',
      status: 'Failed',
      location: 'Outside Office Area',
    },
  ];
  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header title="Attandance History" hideBack />
      <HistoryList history={HISTORY_DATA} />
    </AppContainer>
  );
};

const styles = StyleSheet.create({});

export default History;
