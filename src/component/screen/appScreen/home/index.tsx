import React from 'react';
import { StyleSheet, View } from 'react-native';
import commonStyle, {
  APP_PADDING_HORIZONTAL,
} from '../../../../styles/globalStyles';
import { spacing } from '../../../../styles/spacing';
import AppContainer from '../../../common/container/AppContainer';
import RegularText from '../../../common/RegularText';
import Header from '../../../common/header/Header';
import colors from '../../../../utility/colors';
import Button from '../../../common/buttons/Button';
import Image from '../../../common/Image';
import { Images } from '../../../../utility/imagePaths';
import { FONT_FAMILY, FONT_SIZE } from '../../../../styles/typography';

const Home = () => {
  const onPressCheckIn = () => {};
  return (
    <AppContainer statusBarColor={colors.APP_BACKGROUND_WHITE}>
      <Header
        title="Geo Attandance"
        hideBack
        titleStyle={styles.headerTitleStyle}
      />
      <View style={styles.map} />
      <View style={styles.bottomContainer}>
        <View style={styles.statusBanner}>
          <Image source={Images.IMG_CHECK} />
          <View style={styles.statusTextContainer}>
            <RegularText style={styles.statusTitle}>
              Inside Office Area
            </RegularText>
            <RegularText style={styles.statusSubtitle}>
              You are within the geofence
            </RegularText>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.iconPlaceholder} />
            <View>
              <RegularText style={styles.metricLabel}>Distance</RegularText>
              <RegularText style={styles.metricValue}>45 m</RegularText>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.iconPlaceholder} />
            <View>
              <RegularText style={styles.metricLabel}>Accuracy</RegularText>
              <RegularText style={styles.metricValue}>High</RegularText>
            </View>
          </View>
        </View>

        <Button title="Check In" onPressButton={onPressCheckIn} />

        <View style={styles.footerInfo}>
          <RegularText style={styles.footerText}>
            📍 Office radius: 100 meters
          </RegularText>
        </View>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: colors.THEME,
  },
  map: {
    backgroundColor: colors.GREY_400,
    height: spacing.FULL_HEIGHT / 2.5,
    marginBottom: -spacing.MARGIN_16,
  },
  bottomContainer: {
    borderTopLeftRadius: spacing.RADIUS_16,
    borderTopRightRadius: spacing.RADIUS_16,
    backgroundColor: colors.WHITE,
    flex: 1,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.MARGIN_12,
  },
  statusBanner: {
    ...commonStyle.flexDirectionRow,
    backgroundColor: colors.GREEN_50,
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_16,
    borderWidth: spacing.RADIUS_1,
    borderColor: colors.GREEN_100,
    marginBottom: spacing.MARGIN_16,
    gap: spacing.MARGIN_12,
  },

  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    color: colors.GREEN_700,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  statusSubtitle: {
    fontSize: FONT_SIZE.NORMAL,
    color: colors.GREY_600,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    marginTop: spacing.MARGIN_2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.MARGIN_16,
  },
  metricCard: {
    ...commonStyle.flexDirectionRow,
    backgroundColor: colors.WHITE,
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_16,
    width: '48%',
    borderWidth: spacing.RADIUS_1,
    borderColor: colors.GREY_200,
    gap: spacing.MARGIN_10,
  },
  iconPlaceholder: {
    width: spacing.WIDTH_34,
    height: spacing.WIDTH_34,
    borderRadius: spacing.RADIUS_30,
    backgroundColor: colors.GREY_300,
  },
  metricLabel: {
    fontSize: FONT_SIZE.NORMAL,
    color: colors.GREY_600,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  metricValue: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    color: colors.BLACK,
    fontFamily: FONT_FAMILY.PRIMARY_BOLD,
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: spacing.MARGIN_16,
  },
  footerText: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    color: colors.GREY_600,
  },
});

export default Home;
