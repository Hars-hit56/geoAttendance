import React from 'react';
import { StyleSheet, View } from 'react-native';
import commonStyle, { APP_PADDING_HORIZONTAL } from '../../styles/globalStyles';
import { boxShadowLess } from '../../styles/Mixins';
import { spacing } from '../../styles/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../styles/typography';
import { AttendanceRecord } from '../../utility/attendance';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import Image from '../common/Image';
import RegularText from '../common/RegularText';

type HistoryCardProps = {
  history: AttendanceRecord;
  index: number;
};
const HistoryCard: React.FC<HistoryCardProps> = ({ history, index }) => {
  const isSuccess = history.status === 'Checked In';
  return (
    <View
      style={[
        styles.mainContainer,
        index === 0 && { marginTop: spacing.MARGIN_10 },
      ]}
    >
      <Image source={isSuccess ? Images.IMG_CHECK : Images.IMG_FAILED} />
      <View style={styles.rightSection}>
        <View style={styles.contentContainer}>
          <RegularText style={styles.dateText}>{history.date}</RegularText>
          <RegularText style={styles.timeText}>{history.time}</RegularText>
        </View>
        <View
          style={[styles.contentContainer, { marginTop: spacing.MARGIN_2 }]}
        >
          <View>
            <RegularText
              style={[
                styles.statusText,
                { color: isSuccess ? colors.GREEN_600 : colors.RED_600 },
              ]}
            >
              {history.status}
            </RegularText>

            <RegularText style={styles.locationText}>
              {history.location}
            </RegularText>
          </View>
          <Image source={Images.IMG_ARROW} style={styles.chevron} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_12,
    marginBottom: spacing.MARGIN_16,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_12,
    ...boxShadowLess(colors.BLACK),
  },
  rightSection: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    ...commonStyle.flexDirectionRow,
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  timeText: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    color: colors.GREY_600,
  },
  statusText: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    marginBottom: spacing.MARGIN_2,
  },
  locationText: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    color: colors.GREY_600,
  },

  chevron: {
    tintColor: colors.GREY_600,
    width: spacing.WIDTH_20,
    height: spacing.WIDTH_20,
    transform: [{ rotate: '180deg' }],
  },
});
export default HistoryCard;
