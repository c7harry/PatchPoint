import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { appTheme } from './src/theme/theme';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';

const theme = appTheme;

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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.background }
});
