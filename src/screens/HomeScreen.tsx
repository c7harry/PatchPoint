import React from 'react';
import { StyleSheet, View, Image, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import { Text, Appbar, Searchbar, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../theme/theme';
import { sampleArticles, Article } from '../data/articles';
import { AnimatedCard } from '../components/AnimatedCard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<string>('All');
  const headerHeight = React.useRef(new Animated.Value(200)).current;
  
  const categories = React.useMemo(() => 
    ['All', ...Array.from(new Set(sampleArticles.map(a => a.category)))], []
  );
  
  const filtered = sampleArticles
    .filter(a => (category === 'All' || a.category === category))
    .filter(a => 
      a.title.toLowerCase().includes(query.toLowerCase()) || 
      a.summary.toLowerCase().includes(query.toLowerCase())
    );

  React.useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const newHeight = Math.max(120, 200 - value * 0.5);
      headerHeight.setValue(newHeight);
    });

    return () => scrollY.removeListener(listener);
  }, []);

  const renderStoryLayout = () => {
    if (filtered.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No articles found</Text>
        </View>
      );
    }

    // Only show Featured/Trending if 4+ articles, else just show Latest Updates
    if (filtered.length >= 4) {
      const featuredArticle = filtered[0];
      const trendingArticles = filtered.slice(1, 6);
      const latestArticles = filtered.slice(6, 12);
      const categoryArticles = filtered.slice(12);
      return (
        <View style={styles.storyContainer}>
          {/* Hero Story Section */}
          <View style={styles.heroSection}>
            <Text style={styles.sectionTitle}>Featured Story</Text>
            <AnimatedCard 
              article={featuredArticle} 
              index={0} 
              variant="hero"
            />
          </View>

          {/* Trending Stories Horizontal Scroll */}
          {trendingArticles.length > 0 && (
            <View style={styles.horizontalSection}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={styles.horizontalContent}
              >
                {trendingArticles.map((article, index) => (
                  <AnimatedCard 
                    key={article.id}
                    article={article} 
                    index={index + 1} 
                    variant="trending"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Latest News Grid */}
          {latestArticles.length > 0 && (
            <View style={styles.gridSection}>
              <Text style={styles.sectionTitle}>Latest Updates</Text>
              <View style={styles.newsGrid}>
                {latestArticles.map((article, index) => (
                  <AnimatedCard 
                    key={article.id}
                    article={article} 
                    index={index + 6} 
                    variant="grid"
                  />
                ))}
              </View>
            </View>
          )}

          {/* More Stories */}
          {categoryArticles.length > 0 && (
            <View style={styles.moreSection}>
              <Text style={styles.sectionTitle}>More Stories</Text>
              {categoryArticles.map((article, index) => (
                <AnimatedCard 
                  key={article.id}
                  article={article} 
                  index={index + 12} 
                  variant="list"
                />
              ))}
            </View>
          )}
        </View>
      );
    } else {
      // Show all as Latest Updates (grid)
      return (
        <View style={styles.storyContainer}>
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>Latest Updates</Text>
            <View style={styles.newsGrid}>
              {filtered.map((article, index) => (
                <AnimatedCard 
                  key={article.id}
                  article={article} 
                  index={index} 
                  variant="grid"
                />
              ))}
            </View>
          </View>
        </View>
      );
    }
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100, 200],
    outputRange: [1, 0.95, 0.85],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const searchBarTranslate = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Dynamic Background Gradient */}
      <LinearGradient
        colors={[
          palette.gradientTop || '#0d1f17',
          palette.gradientBottom || '#1a2f23',
          '#0a1a0e'
        ]}
        style={StyleSheet.absoluteFillObject}
        locations={[0, 0.6, 1]}
      />
      
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: headerHeight,
            opacity: headerOpacity,
          },
        ]}
      >
        {/* App Bar */}
        <Appbar.Header mode="center-aligned" style={styles.header}>
          <Animated.View 
            style={[
              styles.logoRow,
              { transform: [{ scale: titleScale }] }
            ]}
          >
            <Image 
              source={require('../../assets/Favicon.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <Text variant="headlineLarge" style={styles.logoText}>
              PatchPoint
            </Text>
          </Animated.View>
        </Appbar.Header>
        
        {/* Search and Controls */}
        <Animated.View 
          style={[
            styles.controlsContainer,
            { transform: [{ translateY: searchBarTranslate }] }
          ]}
        >
          <Searchbar 
            placeholder="Search stories, topics, or sources..." 
            value={query} 
            onChangeText={setQuery} 
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor={palette.primary}
            placeholderTextColor="rgba(255,255,255,0.6)"
          />
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.chipsRow}
          >
            {categories.map((cat, i) => (
              <Chip
                key={cat}
                compact={false}
                style={[
                  styles.chip, 
                  category === cat && styles.chipActive,
                  i === categories.length - 1 && { marginRight: 0 }
                ]}
                textStyle={[styles.chipText, category === cat && styles.chipActiveText]}
                onPress={() => setCategory(cat)}
                mode={category === cat ? "flat" : "outlined"}
              >
                {cat}
              </Chip>
            ))}
          </ScrollView>
        </Animated.View>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={8}
      >
        {renderStoryLayout()}
      </Animated.ScrollView>

      {/* Floating Action Hint */}
      <Animated.View 
        style={[
          styles.floatingHint,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            })
          }
        ]}
      >
        <Text style={styles.hintText}>Scroll to explore stories</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a1a0e' 
  },
  
  headerContainer: {
    zIndex: 10,
    backgroundColor: 'transparent',
    paddingBottom: 8,
  },
  
  header: { 
    backgroundColor: 'rgba(13,31,23,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    ...(Platform.OS === 'web' 
      ? { backdropFilter: 'blur(20px)' as any }
      : {}),
  },
  
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flex: 1
  },
  
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 4,
    shadowColor: palette.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  logoText: {
    fontFamily: 'Montserrat, System',
    fontWeight: '900',
    fontSize: 32,
    color: '#fff',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  
  controlsContainer: { 
    paddingVertical: 16, 
    paddingHorizontal: 20, 
    backgroundColor: 'rgba(13,31,23,0.9)' 
  },
  
  searchBar: { 
    marginBottom: 16, 
    borderRadius: 24, 
    backgroundColor: 'rgba(255,255,255,0.08)', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.15)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  
  searchInput: { 
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  
  chipsRow: { 
    paddingRight: 20,
    gap: 12
  },
  
  chip: { 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 20,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  
  chipText: { 
    color: 'rgba(255,255,255,0.8)', 
    fontWeight: '600',
    fontSize: 14
  },
  
  chipActive: { 
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  
  chipActiveText: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: { 
    paddingBottom: 60,
  },
  
  storyContainer: {
    paddingTop: 8,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
    fontWeight: '500',
  },
  
  // Section Styles
  heroSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  horizontalSection: {
    paddingBottom: 40,
  },
  
  gridSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  moreSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.5,
    paddingHorizontal: 20,
  },
  
  horizontalScroll: {
    paddingLeft: 20,
  },

  horizontalContent: {
    paddingRight: 20,
    gap: 16,
  },
  
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },

  floatingHint: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  hintText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});