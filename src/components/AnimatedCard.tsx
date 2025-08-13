import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../theme/theme';
import { Article } from '../data/articles';
import { timeAgo } from '../utils/time';

const { width: screenWidth } = Dimensions.get('window');
const cardSpacing = 12;
const cardWidth = (screenWidth - cardSpacing * 3) / 2;

interface Props { 
  article: Article; 
  index: number;
  hero?: boolean;
  featured?: boolean;
}

export const AnimatedCard: React.FC<Props> = ({ article, index, hero, featured }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardHeight = hero ? 320 : featured ? 260 : 230;
  const cardWidthStyle = hero ? screenWidth - cardSpacing * 2 : cardWidth;
  const hasImage = !!article.image;

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity,
          transform: [{ translateY }, { scale: scaleValue }],
          width: cardWidthStyle,
          height: cardHeight,
        },
        hero && styles.heroContainer,
        featured && styles.featuredContainer,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
  <Card style={[styles.card, { height: cardHeight }]} mode="contained">
          {hero ? (
            <View style={styles.imageWrapperHero}>
              <Image
                source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/900/600` }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.05)','rgba(0,0,0,0.55)','rgba(0,0,0,0.9)']}
                style={styles.heroGradient}
              />
              <View style={[styles.overlayContent, styles.overlayContentHero]}>
                <View style={styles.headerRow}>
                  <Chip compact style={[styles.chip, { backgroundColor: getCategoryColor(article.category) }]} textStyle={styles.chipText}>
                    {article.category}
                  </Chip>
                  <Text style={styles.time} variant="labelSmall">{timeAgo(article.publishedAt)}</Text>
                </View>
                <Text variant="headlineSmall" style={[styles.title, styles.heroTitle]} numberOfLines={3}>{article.title}</Text>
                <Text variant="bodyMedium" style={styles.summary} numberOfLines={3}>{article.summary}</Text>
                <Text variant="labelSmall" style={styles.source}>{article.source}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.standardWrapper}>
              <View style={styles.topMedia}>
                <Image
                  source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/600/400` }}
                  style={styles.topImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0)','rgba(0,0,0,0.55)']}
                  style={styles.topGradient}
                />
                <View style={styles.topChipWrap}>
                  <Chip compact style={[styles.chip, { backgroundColor: getCategoryColor(article.category) }]} textStyle={styles.chipText}>
                    {article.category}
                  </Chip>
                </View>
              </View>
              <View style={styles.bodyContent}>
                <Text variant={featured ? 'titleLarge' : 'titleMedium'} style={styles.standardTitle} numberOfLines={2}>{article.title}</Text>
                <Text variant="bodySmall" style={styles.standardSummary} numberOfLines={3}>{article.summary}</Text>
                <View style={styles.metaRow}>
                  <Text variant="labelSmall" style={styles.source}>{article.source}</Text>
                  <Text style={styles.time} variant="labelSmall">{timeAgo(article.publishedAt)}</Text>
                </View>
              </View>
            </View>
          )}
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getCategoryColor = (category: string): string => {
  // Map categories to harmonious green-accent variants
  const map: Record<string, string> = {
    Technology: palette.primaryLight,
    Health: palette.primary,
    Sports: palette.accentWarm,
    Politics: '#ec6f5e',
    Entertainment: '#62c782',
    Business: '#52b47a',
    Local: palette.primaryLight,
    Education: '#4fb572'
  };
  return map[category] || palette.primaryLight;
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
  },
  heroContainer: { marginBottom: 28 },
  featuredContainer: { marginBottom: 22 },
  touchable: {
    flex: 1,
  },
  card: { borderRadius: 22, overflow: 'hidden', backgroundColor: palette.surface, ...(Platform.OS==='web'?{boxShadow:'0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.35)'}: {elevation:9}) },
  imageWrapperHero: { flex: 1, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  overlayContent: { position: 'absolute', left:0, right:0, bottom:0, padding:20 },
  overlayContentHero: {},
  headerRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10 },
  standardWrapper: { flex:1 },
  topMedia: { height:120, position:'relative' },
  topImage: { width:'100%', height:'100%' },
  topGradient: { ...StyleSheet.absoluteFillObject },
  topChipWrap: { position:'absolute', top:8, left:8 },
  bodyContent: { padding:14, gap:6 },
  standardTitle: { color: palette.textPrimary, fontWeight:'700', lineHeight:22 },
  standardSummary: { color: palette.textSecondary, lineHeight:17 },
  metaRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:4 },
  chip: {
    borderRadius: 12,
  },
  chipText: { color: '#fff', fontWeight: '600', fontSize: 11 },
  time: { color: palette.textMuted, fontWeight: '500' },
  title: { color: palette.textPrimary, fontWeight: '700', marginBottom: 6, lineHeight: 24 },
  heroTitle: { fontSize: 26, lineHeight: 30 },
  summary: { color: palette.textSecondary, marginTop:4, marginBottom:10, lineHeight: 20 },
  source: { color: palette.textMuted, fontWeight: '500' },
});
