declare module 'expo-status-bar' {
  import * as React from 'react';
  import { ColorValue } from 'react-native';

  export interface StatusBarProps {
    style?: 'auto' | 'inverted' | 'light' | 'dark';
    backgroundColor?: ColorValue;
    hidden?: boolean;
    animated?: boolean;
    translucent?: boolean;
  }
  export const StatusBar: React.ComponentType<StatusBarProps>;
}
