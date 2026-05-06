import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

interface AppContentProps extends ScrollViewProps {
  children?: React.ReactNode;
}

const AppContent = ({ style, children, ...props }: AppContentProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={10}
      bounces={false}
      overScrollMode="never"
      scrollEnabled={true}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps={'handled'}
      style={style}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default AppContent;
