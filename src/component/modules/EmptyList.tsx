import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { APP_PADDING_HORIZONTAL } from '../../styles/globalStyles';
import { spacing } from '../../styles/spacing';
import { FONT_FAMILY, FONT_SIZE } from '../../styles/typography';
import colors from '../../utility/colors';
import Image from '../common/Image';
import RegularText from '../common/RegularText';

type EmptyListProps = {
  msg?: string;
  subMsg?: string; // Added for the secondary description
  img?: any;
  contentStyle?: StyleProp<TextStyle>;
  subContentStyle?: StyleProp<TextStyle>;
  textComponent?: React.ReactNode;
  mainContaierStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  imageViewStyle?: StyleProp<ViewStyle>;
};

const EmptyList: React.FC<EmptyListProps> = ({
  msg,
  subMsg,
  img,
  contentStyle,
  subContentStyle,
  textComponent,
  mainContaierStyle,
  imageStyle,
  imageViewStyle,
}) => {
  return (
    <View style={[styles.mainContainer, mainContaierStyle]}>
      {img && (
        <Image
          source={img}
          style={[styles.defaultImage, imageStyle]}
          resizeMode="contain"
          viewStyle={[styles.imageCircle, imageViewStyle]}
        />
      )}

      {!textComponent ? (
        <View style={styles.textContainer}>
          <RegularText style={[styles.content, contentStyle]}>
            {msg || 'No data'}
          </RegularText>
          {subMsg && (
            <RegularText style={[styles.subContent, subContentStyle]}>
              {subMsg}
            </RegularText>
          )}
        </View>
      ) : (
        textComponent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.MARGIN_60,
    paddingHorizontal: APP_PADDING_HORIZONTAL * 3.1,
  },
  imageCircle: {
    width: spacing.WIDTH_90,
    height: spacing.WIDTH_90,
    borderRadius: spacing.RADIUS_100,
    backgroundColor: colors.GREEN_300, // Light tinted background from screenshot
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.MARGIN_24,
  },
  defaultImage: {},
  textContainer: {
    alignItems: 'center',
  },
  content: {
    fontSize: FONT_SIZE.SEMI_MEDIUM, // "No customers added yet" is prominent
    fontFamily: FONT_FAMILY.PRIMARY_SEMI_BOLD,
    color: colors.BLACK,
    textAlign: 'center',
  },
  subContent: {
    fontSize: FONT_SIZE.NORMAL,
    fontFamily: FONT_FAMILY.PRIMARY_REGULAR,
    color: colors.GREY_500,
    textAlign: 'center',
    marginTop: spacing.MARGIN_10,
    lineHeight: spacing.MARGIN_22,
  },
});

export default EmptyList;
