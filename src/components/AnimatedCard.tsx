import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '../theme/theme';
import { Article } from '../data/articles';
import { timeAgo } from '../utils/time';

const { width: screenWidth } = Dimensions.get('window');
const cardSpacing = 16;
const numColumns = 3;
const cardWidth = (screenWidth - cardSpacing * (numColumns + 1)) / numColumns;

interface Props { 
  article: Article; 
  index: number;
  hero?: boolean;
  featured?: boolean;
}

export const AnimatedCard: React.FC<Props> = ({ article, index, hero, featured }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const shimmerValue = useRef(new Animated.Value(0)).current;
  const hoverOpacity = useRef(new Animated.Value(0)).current;

  // Determine if this is a card in 3rd row or beyond (index 7+ accounting for hero card)
  const isLowerRowCard = index >= 7;

  useEffect(() => {
    // Staggered entrance animation
    Animated.sequence([
      Animated.delay(index * 50),
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ]).start();

    // Continuous shimmer effect for hero cards
    if (hero) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [index, hero]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(hoverOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(hoverOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '0deg'],
  });

  const shimmerTranslateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, screenWidth + 100],
  });

  const cardHeight = hero ? 280 : featured ? 260 : 240;
  const cardWidthStyle = hero ? screenWidth - cardSpacing * 2 : cardWidth;

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity,
          transform: [
            { translateY }, 
            { scale: scaleValue },
            { rotate: hero ? rotate : '0deg' }
          ],
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
        <Card style={[
          styles.card, 
          { height: cardHeight },
          hero && styles.heroCard,
          featured && styles.featuredCard
        ]} mode="contained">
          
          {/* Hover Overlay Effect */}
          <Animated.View 
            style={[
              styles.hoverOverlay,
              { opacity: hoverOpacity }
            ]} 
          />

          {hero ? (
            <View style={styles.heroWrapper}>
              {/* Premium Gradient Background */}
              <LinearGradient
                colors={[
                  palette.primaryDark + 'E6',
                  palette.primary + 'CC', 
                  palette.primaryLight + 'B3'
                ]}
                style={styles.heroBackgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              
              {/* Hero Image with Parallax Effect */}
              <View style={styles.heroImageContainer}>
                <Image
                  source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/1200/800` }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
                {/* Shimmer Effect */}
                {hero && (
                  <Animated.View
                    style={[
                      styles.shimmerOverlay,
                      {
                        transform: [{ translateX: shimmerTranslateX }]
                      }
                    ]}
                  />
                )}
              </View>

              {/* Professional Gradient Overlay */}
              <LinearGradient
                colors={[
                  'rgba(0,0,0,0.1)',
                  'rgba(0,0,0,0.3)',
                  'rgba(0,0,0,0.7)',
                  'rgba(0,0,0,0.9)'
                ]}
                style={styles.heroGradientOverlay}
                locations={[0, 0.3, 0.7, 1]}
              />

              {/* Content Overlay */}
              <View style={styles.heroContentWrapper}>
                {/* Header Section */}
                <View style={styles.heroHeader}>
                  <View style={styles.categoryWrapper}>
                    <LinearGradient
                      colors={[getCategoryColor(article.category), getCategoryColor(article.category) + '80']}
                      style={styles.categoryGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Chip 
                        compact 
                        style={styles.heroChip}
                        textStyle={styles.heroChipText}
                      >
                        {article.category}
                      </Chip>
                    </LinearGradient>
                  </View>
                  <View style={styles.timeWrapper}>
                    <Ionicons name="time-outline" size={14} color="#ffffff" style={styles.timeIcon} />
                    <Text style={styles.heroTime}>
                      {timeAgo(article.publishedAt)}
                    </Text>
                  </View>
                </View>

                {/* Title Section with Glassmorphism */}
                <View style={styles.heroTitleContainer}>
                  <Text style={styles.heroTitle} numberOfLines={2}>
                    {article.title}
                  </Text>
                </View>

                {/* Summary Section */}
                <View style={styles.heroSummaryContainer}>
                  <Text style={styles.heroSummary} numberOfLines={2}>
                    {article.summary}
                  </Text>
                </View>

                {/* Footer Meta */}
                <View style={styles.heroFooter}>
                  <View style={styles.sourceContainer}>
                    <Ionicons name="newspaper-outline" size={14} color="#e0e0e0" />
                    <Text style={styles.heroSource}>
                      {article.source}
                    </Text>
                  </View>
                  <View style={styles.readMoreContainer}>
                    <Text style={styles.readMore}>Read More</Text>
                    <Ionicons name="arrow-forward" size={14} color="#ffffff" />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            // Modern 3-Section Professional Card Layout
            <View style={styles.modernCardWrapper}>
              
              {/* SECTION 1: Image with Title Overlay - Primary Theme */}
              <View style={styles.sectionImageTitle}>
                <View style={styles.modernImageContainer}>
                  <Image
                    source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/800/600` }}
                    style={styles.modernImage}
                    resizeMode="cover"
                  />
                  
                  {/* Dark gradient overlay for text readability */}
                  <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
                    style={styles.modernImageOverlay}
                    locations={[0, 0.5, 1]}
                  />
                  
                  {/* Category badge overlay */}
                  <View style={styles.modernCategoryOverlay}>
                    <LinearGradient
                      colors={[getCategoryColor(article.category), getCategoryColor(article.category) + 'CC']}
                      style={styles.modernCategoryBadge}
                    >
                      <Text style={styles.modernCategoryText}>
                        {article.category}
                      </Text>
                    </LinearGradient>
                  </View>

                  {/* Title overlay on image */}
                  <View style={styles.titleOverlaySection}>
                    <Text style={[
                      styles.modernTitleOverlay,
                      featured && styles.modernFeaturedTitleOverlay
                    ]} numberOfLines={2}>
                      {article.title}
                    </Text>
                  </View>
                </View>
              </View>

              {/* SECTION 2: Summary - Secondary Theme */}
              <View style={styles.sectionSummary}>
                <Text style={styles.modernSummary} numberOfLines={3}>
                  {article.summary}
                </Text>
              </View>

              {/* SECTION 3: Meta Data - Tertiary Theme */}
              <View style={[
                styles.sectionMeta,
                isLowerRowCard && styles.sectionMetaCompact
              ]}>
                <View style={[
                  styles.modernMetaRow,
                  isLowerRowCard && styles.modernMetaRowCompact
                ]}>
                  <View style={styles.modernSourceBox}>
                    <Ionicons name="newspaper-outline" size={14} color={palette.primary} />
                    <Text style={styles.modernSource} numberOfLines={1}>
                      {article.source}
                    </Text>
                  </View>
                  
                  <View style={styles.modernTimeBox}>
                    <Ionicons name="time-outline" size={14} color={palette.textMuted} />
                    <Text style={styles.modernTime}>
                      {timeAgo(article.publishedAt)}
                    </Text>
                  </View>
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
  // Container Styles
  cardContainer: {
    marginBottom: 20,
  },
  heroContainer: { 
    marginBottom: 32,
  },
  featuredContainer: { 
    marginBottom: 24,
  },
  touchable: {
    flex: 1,
  },
  
  // Card Base Styles
  card: { 
    borderRadius: 24, 
    overflow: 'hidden', 
    backgroundColor: palette.surface,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)'
    } : {
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    })
  },
  
  heroCard: {
    borderRadius: 28,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 20px 60px rgba(32,150,72,0.15), 0 8px 24px rgba(0,0,0,0.2)'
    } : {
      elevation: 16,
      shadowColor: palette.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    })
  },
  
  featuredCard: {
    borderRadius: 26,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.08)'
    } : {
      elevation: 14,
    })
  },

  // Hover Effect
  hoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.05)',
    zIndex: 10,
  },

  // Hero Card Styles
  heroWrapper: {
    flex: 1,
    position: 'relative',
  },
  
  heroBackgroundGradient: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    zIndex: 1 
  },
  
  heroImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  
  heroImage: { 
    width: '100%', 
    height: '100%',
  },
  
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ skewX: '-20deg' }],
    zIndex: 5,
  },
  
  heroGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  
  heroContentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 40,
    zIndex: 4,
  },
  
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  categoryWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  categoryGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  heroChip: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  heroChipText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  
  timeIcon: {
    marginRight: 4,
  },
  
  heroTime: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  
  heroTitleContainer: {
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    padding: 16,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(10px)',
    } : {}),
  },
  
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
    color: '#ffffff',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  
  heroSummaryContainer: {
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    padding: 14,
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(8px)',
    } : {}),
  },
  
  heroSummary: {
    color: '#f0f0f0',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  heroSource: {
    color: '#e0e0e0',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },
  
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  
  readMore: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
    marginRight: 6,
  },

  // Modern 3-Section Card Styles
  modernCardWrapper: {
    flex: 1,
  },

  // SECTION 1: Image & Title (Primary Theme Colors)
  sectionImageTitle: {
    backgroundColor: palette.surface,
  },

  modernImageContainer: {
    height: 140,
    position: 'relative',
    backgroundColor: palette.surfaceAlt,
  },

  modernImage: {
    width: '100%',
    height: '100%',
  },

  modernImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },

  modernCategoryOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 4,
  },

  modernCategoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  modernCategoryText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  titleOverlaySection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    zIndex: 3,
  },

  modernTitleOverlay: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  modernFeaturedTitleOverlay: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
    textShadowRadius: 4,
  },

  titleSection: {
    padding: 14,
    backgroundColor: palette.surface,
  },

  modernTitle: {
    color: palette.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.2,
  },

  modernFeaturedTitle: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 22,
  },

  // SECTION 2: Summary (Secondary Theme Colors)
  sectionSummary: {
    backgroundColor: palette.surfaceElevated,
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: palette.outline + '15',
  },

  modernSummary: {
    color: palette.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    letterSpacing: 0.1,
  },

  // SECTION 3: Meta Data (Tertiary Theme Colors)
  sectionMeta: {
    backgroundColor: palette.surfaceAlt,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: palette.outline + '20',
  },

  sectionMetaCompact: {
    padding: 8,
    borderTopWidth: 0.5,
  },

  modernMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  modernMetaRowCompact: {
    marginBottom: 4,
  },

  modernSourceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },

  modernSource: {
    color: palette.primary,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
    letterSpacing: 0.2,
  },

  modernTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  modernTime: {
    color: palette.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },

  modernActionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  modernIndicatorLine: {
    width: 20,
    height: 2,
    backgroundColor: palette.primary,
    borderRadius: 1,
    marginRight: 8,
  },

  modernActionText: {
    color: palette.primary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginRight: 4,
  },

  // Legacy styles (keeping for compatibility)
  chip: { borderRadius: 12 },
  chipText: { color: '#fff', fontWeight: '600', fontSize: 11 },
  time: { color: palette.textMuted, fontWeight: '500' },
  title: { color: palette.textPrimary, fontWeight: '700', marginBottom: 6, lineHeight: 24 },
  summary: { color: palette.textSecondary, marginTop: 4, marginBottom: 10, lineHeight: 20 },
  source: { color: palette.textMuted, fontWeight: '500' },
});
