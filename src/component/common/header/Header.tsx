import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { APP_PADDING_HORIZONTAL } from '../../../styles/globalStyles';
import { spacing } from '../../../styles/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../../styles/typography';
import colors from '../../../utility/colors';
import BackButton from '../buttons/BackButton';
import Title from '../Title';

interface HeaderProps {
  backText?: string;
  hideBack?: boolean;
  backgroundColor?: ColorValue;
  backArrowTintColor?: ColorValue;
  onPressBack?: () => void;
  title?: string;
  rightComponent?: any;
  mainContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  leftComponent?: any;
}

const Header = ({
  backText,
  backgroundColor,
  mainContainerStyle,
  rightComponent,
  hideBack,
  backArrowTintColor,
  onPressBack,
  title,
  leftComponent,
  titleStyle,
}: HeaderProps) => {
  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: backgroundColor ? backgroundColor : colors.WHITE },
        mainContainerStyle,
      ]}
    >
      <Title title={title || ''} style={[styles.title, titleStyle]} />
      {hideBack == true ? (
        leftComponent && leftComponent
      ) : (
        <BackButton
          text={backText || ' '}
          backArrowTintColor={backArrowTintColor || colors.BLACK}
          onBack={onPressBack}
        />
      )}
      {rightComponent && rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingTop: spacing.PADDING_12,
    paddingBottom: spacing.PADDING_12,
    minHeight: spacing.HEIGHT_58,
    borderBottomWidth: spacing.RADIUS_1,
    borderBottomColor: colors.GREY_300,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    fontSize: FONT_SIZE.MEDIUM,
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    left: APP_PADDING_HORIZONTAL,
    color: colors.BLACK,
  },
});

export default Header;
