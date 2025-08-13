import React from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Surface, Text, Appbar, Searchbar } from 'react-native-paper';
import { sampleArticles, Article } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';

export const HomeScreen: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const filtered = sampleArticles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.summary.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/Favicon.png')} style={styles.logo} resizeMode="contain" />
          <Text variant="headlineLarge" style={styles.logoText}>
            PatchPoint
          </Text>
        </View>
      </Appbar.Header>
      <View style={styles.searchWrap}>
        <Searchbar placeholder="Search articles" value={query} onChangeText={setQuery} />
      </View>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filtered}
        keyExtractor={(item: Article) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { backgroundColor: '#1e293b' },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flex: 1
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 8
  },
  logoText: {
    fontFamily: 'Montserrat, Roboto, System',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#fff',
    letterSpacing: 1.5,
  },
  searchWrap: { padding: 12 },
  listContent: { padding: 12, paddingTop: 0 }
});
