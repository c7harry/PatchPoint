import React from 'react';
import { StyleSheet, View, Image, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import { Text, Appbar, Searchbar, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../theme/theme';
import { sampleArticles, Article } from '../data/articles';
import { AnimatedCard } from '../components/AnimatedCard';

const { width: screenWidth } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<string>('All');
  
  const categories = React.useMemo(() => 
    ['All', ...Array.from(new Set(sampleArticles.map(a => a.category)))], []
  );
  
  const filtered = sampleArticles
    .filter(a => (category === 'All' || a.category === category))
    .filter(a => 
      a.title.toLowerCase().includes(query.toLowerCase()) || 
      a.summary.toLowerCase().includes(query.toLowerCase())
    );

  const renderMasonryLayout = () => {
    if (filtered.length === 0) return null;

    const leftColumn: Article[] = [];
    const rightColumn: Article[] = [];
    
    // First article is always hero
    const hero = filtered[0];
    const remaining = filtered.slice(1);
    
    // Distribute remaining articles in masonry pattern
    remaining.forEach((article, index) => {
      if (index % 2 === 0) {
        leftColumn.push(article);
      } else {
        rightColumn.push(article);
      }
    });

    return (
      <View style={styles.masonryContainer}>
        {/* Hero Card */}
        <AnimatedCard article={hero} index={0} hero />
        
        {/* Masonry Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.column}>
            {leftColumn.map((article, index) => (
              <AnimatedCard
                key={article.id}
                article={article}
                index={index + 1}
                featured={index === 0}
              />
            ))}
          </View>
          
          <View style={styles.column}>
            {rightColumn.map((article, index) => (
              <AnimatedCard
                key={article.id}
                article={article}
                index={index + leftColumn.length + 1}
                featured={index === 0}
              />
            ))}
          </View>
        </View>
      </View>
    );
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[palette.gradientTop, palette.gradientBottom]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
  <Appbar.Header mode="center-aligned" style={styles.header}>
          <View style={styles.logoRow}>
            <Image 
              source={require('../../assets/Favicon.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <Text variant="headlineLarge" style={styles.logoText}>
              PatchPoint
            </Text>
          </View>
        </Appbar.Header>
        
        <View style={styles.controlsContainer}>
          <Searchbar 
            placeholder="Search articles" 
            value={query} 
            onChangeText={setQuery} 
            style={styles.searchBar}
            inputStyle={styles.searchInput}
          />
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.chipsRow}
          >
            {categories.map(cat => (
              <Chip
                key={cat}
                compact
                style={[styles.chip, category === cat && styles.chipActive]}
                textStyle={[styles.chipText, category === cat && styles.chipActiveText]}
                onPress={() => setCategory(cat)}
              >
                {cat}
              </Chip>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {renderMasonryLayout()}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.background },
  headerContainer: {
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  header: { 
    backgroundColor: 'rgba(19,38,29,0.85)',
    ...(Platform.OS === 'web' 
      ? { backdropFilter: 'blur(10px)' as any }
      : {}),
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 8
  },
  logoText: {
    fontFamily: 'Montserrat, Roboto, System',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#fff',
    letterSpacing: 1.5,
  },
  controlsContainer: { paddingVertical: 12, paddingHorizontal: 16, backgroundColor: 'rgba(19,38,29,0.82)' },
  searchBar: { marginBottom: 12, borderRadius: 16, backgroundColor: 'rgba(32,150,72,0.14)', borderWidth:1, borderColor: 'rgba(32,150,72,0.35)' },
  searchInput: { color: palette.textPrimary },
  chipsRow: { 
    paddingRight: 16, 
    gap: 8 
  },
  chip: { backgroundColor: palette.chipBg, marginRight: 8, borderRadius: 16 },
  chipText: { color: palette.textSecondary, fontWeight: '500' },
  chipActive: { backgroundColor: palette.chipActive },
  chipActiveText: { color: '#fff', fontWeight: '700' },
  scrollView: {
    flex: 1,
  },
  scrollContent: { 
    paddingTop: 8,
    paddingBottom: 40,
  },
  masonryContainer: {
    paddingHorizontal: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    paddingHorizontal: 6,
  },
});
