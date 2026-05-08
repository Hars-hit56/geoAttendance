import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { spacing } from '../../styles/spacing';
import { AttendanceRecord } from '../../utility/attendance';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import HistoryCard from '../row/historyCard';
import EmptyList from './EmptyList';

type HistoryListProps = {
  history: AttendanceRecord[];
};

const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  const isEmpty = !history || history.length === 0;
  return (
    <FlatList
      data={history}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <HistoryCard key={'HistoryCard' + index} history={item} index={index} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        isEmpty && styles.flexGrow,
      ]}
      ListEmptyComponent={
        <EmptyList
          mainContaierStyle={styles.centerEmpty}
          img={Images.IMG_HISTORY_INACTIVE}
          imageStyle={styles.img}
          msg="No attendance records"
          subMsg="Your check-in and check-out history will appear here."
          imageViewStyle={styles.imgView}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: spacing.MARGIN_20,
  },
  flexGrow: {
    flexGrow: 1,
  },
  centerEmpty: {
    flex: 1,
  },
  img: {
    width: spacing.WIDTH_30,
    height: spacing.WIDTH_30,
    tintColor: colors.THEME,
  },
  imgView: {
    backgroundColor: colors.LIGHT_THEME_01,
  },
});

export default HistoryList;
