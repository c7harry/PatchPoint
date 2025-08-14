import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { palette } from './src/theme/theme';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.primary,
    primaryContainer: palette.primaryLight,
    secondary: palette.accentWarm,
    secondaryContainer: palette.accentCool,
    surface: palette.surface,
    surfaceVariant: palette.surfaceAlt,
    background: palette.background,
    onPrimary: palette.textInverse,
    onSecondary: palette.textInverse,
    onSurface: palette.textPrimary,
    onBackground: palette.textPrimary,
    outline: palette.outline,
    error: palette.error,
  },
};

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: palette.background 
  }
});

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; err?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(err: any) { return { hasError: true, err }; }
  componentDidCatch(err: any, info: any) { console.warn('Root error boundary caught', err, info); }
  render() {
    if (this.state.hasError) {
      return <SafeAreaView style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}><StatusBar style="light" /><HomeScreen /></SafeAreaView>;
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <RootErrorBoundary>
        <SafeAreaView style={styles.root}>
          <HomeScreen />
          <StatusBar style="light" />
        </SafeAreaView>
      </RootErrorBoundary>
    </PaperProvider>
  );
}
