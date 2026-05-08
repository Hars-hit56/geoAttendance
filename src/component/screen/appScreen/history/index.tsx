import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAttendanceHistory } from '../../../../redux/attendanceSlice';
import { AppDispatch, RootState } from '../../../../redux/store';
import colors from '../../../../utility/colors';
import AppContainer from '../../../common/container/AppContainer';
import flashMessage from '../../../common/FlashAlert';
import Header from '../../../common/header/Header';
import HistoryList from '../../../modules/HistoryList';

const History = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useSelector((state: RootState) => state.attendance.records);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadHistory = async () => {
        try {
          await dispatch(loadAttendanceHistory()).unwrap();
        } catch {
          if (isActive) {
            flashMessage('Unable to load attendance history', 'danger');
          }
        }
      };

      loadHistory();

      return () => {
        isActive = false;
      };
    }, [dispatch]),
  );

  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header title="Attendance History" hideBack />
      <HistoryList history={history} />
    </AppContainer>
  );
};

export default History;
