import { StyleSheet } from 'react-native';
import colors from '../utility/colors';
import { spacing } from './spacing';
import { FONT_FAMILY, FONT_SIZE } from './typography';

export const APP_PADDING_HORIZONTAL = spacing.PADDING_16;
export const APP_CONTENT_GAP = spacing.MARGIN_20;

const commonStyle = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.APP_BACKGROUND_WHITE,
  },
  inputContainer: {
    height: spacing.HEIGHT_52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.RADIUS_8,
    backgroundColor: colors.WHITE,
    borderWidth: spacing.WIDTH_1,
    borderColor: colors.GREY_300,
  },
  inputFieldValue: {
    flex: 1,
    color: colors.BLACK,
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    paddingHorizontal: spacing.PADDING_12,
    zIndex: 1,
  },
  inputFieldError: {
    fontSize: FONT_SIZE.NORMAL,
    color: colors.RED_500,
    marginTop: spacing.MARGIN_2,
    marginLeft: spacing.MARGIN_4,
  },
  fieldTitle: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
  },
  iconCover: {
    width: spacing.WIDTH_38,
    height: spacing.WIDTH_38,
    borderRadius: spacing.RADIUS_12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default commonStyle;
