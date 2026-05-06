import { textScale } from './responsiveStyles';

export const FONT_FAMILY = {
  PRIMARY_LIGHT: 'OpenSans-Light',
  PRIMARY_REGULAR: 'OpenSans-Regular',
  PRIMARY_MEDIUM: 'OpenSans-Medium',
  PRIMARY_SEMI_BOLD: 'OpenSans-SemiBold',
  PRIMARY_BOLD: 'OpenSans-Bold',
  PRIMARY_EXTRA_BOLD: 'OpenSans-ExtraBold',
};

export const FONT_SIZE = {
  VERY_SMALL: textScale(8),
  SMALL: textScale(9),
  NORMAL: textScale(10),
  SEMI_MEDIUM: textScale(12),
  MEDIUM: textScale(14),
  TITLE: textScale(16),
  LARGE: textScale(18),
  EXTRA_LARGE: textScale(20),
  DOUBLE_EXTRA_LARGE: textScale(24),
};
