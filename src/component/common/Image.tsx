import React from 'react';
import {
  ImageResizeMode,
  ImageStyle,
  Image as RNImage,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

interface ImageProps {
  source: any;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode | any;
  showFull?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

const Image = ({ source, style, resizeMode, viewStyle }: ImageProps) => {
  return (
    <View style={viewStyle}>
      <RNImage
        source={source}
        resizeMode={resizeMode ? resizeMode : 'contain'}
        style={[style, {}]}
        key={source}
      />
    </View>
  );
};

export default Image;
