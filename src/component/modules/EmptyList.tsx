import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../utility/colors';
import Image from '../common/Image';
import RegularText from '../common/RegularText';
import { APP_PADDING_HORIZONTAL } from '../../styles/globalStyles';
import { FONT_FAMILY, FONT_SIZE } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
interface EmptyListProps {
  msg?: string;
  img?: string;
  contentStyle?: StyleProp<TextStyle>;
  textComponent?: React.ReactNode;
  mainContaierStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageViewStyle?: StyleProp<ViewStyle>;
}

const EmptyList = ({
  msg,
  img,
  contentStyle,
  textComponent,
  mainContaierStyle,
  imageStyle,
  imageViewStyle,
}: EmptyListProps) => {
  return (
    <View style={[styles.mainContainer, mainContaierStyle]}>
      {img && (
        <Image source={img} style={[imageStyle]} viewStyle={[imageViewStyle]} />
      )}
      {!textComponent ? (
        <RegularText style={[styles.content, contentStyle]}>
          {msg || 'No data'}
        </RegularText>
      ) : (
        textComponent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    paddingVertical: APP_PADDING_HORIZONTAL * 2,
    paddingHorizontal: APP_PADDING_HORIZONTAL * 2,
    gap: spacing.MARGIN_20,
  },
  content: {
    fontSize: FONT_SIZE.SEMI_MEDIUM,
    fontFamily: FONT_FAMILY.PRIMARY_MEDIUM,
    color: colors.GREY_600,
  },
});

export default EmptyList;
