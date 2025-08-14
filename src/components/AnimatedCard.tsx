import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Animated, 
  TouchableOpacity, 
  Dimensions, 
  Platform 
} from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '../theme/theme';
import { Article } from '../data/articles';
import { timeAgo } from '../utils/time';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props { 
  article: Article; 
  index: number;
  variant: 'hero' | 'trending' | 'grid' | 'list';
}

export const AnimatedCard: React.FC<Props> = ({ article, index, variant }) => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance animation
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous shimmer for hero cards
    if (variant === 'hero') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [index, variant]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: variant === 'hero' ? 0.98 : 0.95,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: Math.random() * 4 - 2, // Random slight rotation
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
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, screenWidth + 100],
  });

  const getCardDimensions = () => {
    switch (variant) {
      case 'hero':
        return {
          width: screenWidth - 40,
          height: screenHeight * 0.5,
        };
      case 'trending':
        return {
          width: screenWidth * 0.7,
          height: 280,
        };
      case 'grid':
        return {
          width: (screenWidth - 60) / 2,
          height: 320,
        };
      case 'list':
        return {
          width: screenWidth - 40,
          height: 140,
        };
    }
  };

  const dimensions = getCardDimensions();

  const renderHeroCard = () => (
    <View style={styles.heroContainer}>
      {/* Background Image fills the card */}
      <Image
        source={{
          uri: article.image || `https://picsum.photos/seed/${article.id}/1200/800?random=1`
        }}
        style={styles.heroImage}
        resizeMode="cover"
        defaultSource={require('../../assets/Favicon.png')}
      />

      {/* Shimmer Effect */}
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX: shimmerTranslate }]
          }
        ]}
      />

      {/* Content overlays image, no extra space */}
      <View style={styles.heroContent} pointerEvents="box-none">
        {/* Category & Time */}
        <View style={styles.heroMeta}>
          <View style={[styles.categoryPill, { backgroundColor: getCategoryColor(article.category) }]}> 
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.timeText}>{timeAgo ? timeAgo(article.publishedAt) : 'Just now'}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.heroTitle} numberOfLines={3}>
          {article.title}
        </Text>
            {/* Shadow background for text readability */}
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.6)']}
              style={styles.heroTextShadow}
              locations={[0, 0.2, 1]}
            />
        {/* Summary */}
        <Text style={styles.heroSummary} numberOfLines={3}>
          {article.summary}
        </Text>

        {/* Source & CTA */}
        <View style={styles.heroFooter}>
          <View style={styles.sourceContainer}>
            <Ionicons name="newspaper-outline" size={16} color="#ccc" />
            <Text style={styles.sourceText}>{article.source}</Text>
          </View>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaText}>Read Story</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );

  const renderTrendingCard = () => (
    <View style={styles.trendingContainer}>
      {/* Image Section */}
      <View style={styles.trendingImageContainer}>
        <Image
          source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/600/400` }}
          style={styles.trendingImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.trendingImageOverlay}
        />
        
        {/* Category Badge */}
        <View style={styles.trendingCategoryContainer}>
          <View style={[styles.trendingCategoryBadge, { backgroundColor: getCategoryColor(article.category) }]}>
            <Text style={styles.trendingCategoryText}>{article.category}</Text>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.trendingContent}>
        <Text style={styles.trendingTitle} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.trendingSummary} numberOfLines={2}>
          {article.summary}
        </Text>
        
        {/* Meta */}
        <View style={styles.trendingMeta}>
          <View style={styles.trendingSource}>
            <Ionicons name="radio-outline" size={12} color={palette.primary} />
            <Text style={styles.trendingSourceText}>{article.source}</Text>
          </View>
          <Text style={styles.trendingTime}>{timeAgo ? timeAgo(article.publishedAt) : 'Just now'}</Text>
        </View>
      </View>
    </View>
  );

  const renderGridCard = () => (
    <View style={styles.gridContainer}>
      {/* Image */}
      <View style={styles.gridImageContainer}>
        <Image
          source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/400/300` }}
          style={styles.gridImage}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.gridContent}>
        <View style={styles.gridCategoryRow}>
          <Chip 
            compact 
            style={[styles.gridChip, { backgroundColor: getCategoryColor(article.category) + '20' }]}
            textStyle={[styles.gridChipText, { color: getCategoryColor(article.category) }]}
          >
            {article.category}
          </Chip>
        </View>
        
        <Text style={styles.gridTitle} numberOfLines={2}>
          {article.title}
        </Text>
        
        <Text style={styles.gridSummary} numberOfLines={3}>
          {article.summary}
        </Text>

        <View style={styles.gridFooter}>
          <Text style={styles.gridSource} numberOfLines={1}>{article.source}</Text>
          <Text style={styles.gridTime}>{timeAgo ? timeAgo(article.publishedAt) : 'Just now'}</Text>
        </View>
      </View>
    </View>
  );

  const renderListCard = () => (
    <View style={styles.listContainer}>
      {/* Image */}
      <View style={styles.listImageContainer}>
        <Image
          source={{ uri: article.image || `https://picsum.photos/seed/${article.id}/300/200` }}
          style={styles.listImage}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.listContent}>
        <View style={styles.listHeader}>
          <Chip 
            compact 
            style={[styles.listChip, { backgroundColor: getCategoryColor(article.category) + '15' }]}
            textStyle={[styles.listChipText, { color: getCategoryColor(article.category) }]}
          >
            {article.category}
          </Chip>
          <Text style={styles.listTime}>{timeAgo ? timeAgo(article.publishedAt) : 'Just now'}</Text>
        </View>
        
        <Text style={styles.listTitle} numberOfLines={2}>
          {article.title}
        </Text>
        
        <Text style={styles.listSummary} numberOfLines={2}>
          {article.summary}
        </Text>

        <View style={styles.listFooter}>
          <View style={styles.listSourceContainer}>
            <Ionicons name="newspaper-outline" size={12} color={palette.textMuted} />
            <Text style={styles.listSource}>{article.source}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCardContent = () => {
    switch (variant) {
      case 'hero':
        return renderHeroCard();
      case 'trending':
        return renderTrendingCard();
      case 'grid':
        return renderGridCard();
      case 'list':
        return renderListCard();
    }
  };

  return (
    <Animated.View
      style={[
        {
          opacity: fadeIn,
          transform: [
            { translateY: slideUp },
            { scale: scaleValue },
            { 
              rotate: rotateAnim.interpolate({
                inputRange: [-10, 10],
                outputRange: ['-10deg', '10deg'],
              })
            }
          ],
          width: dimensions.width,
          height: dimensions.height,
        },
        variant === 'list' && styles.listWrapper,
        variant === 'grid' && styles.gridWrapper,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <Card style={[
          styles.baseCard,
          variant === 'hero' && styles.heroCard,
          variant === 'trending' && styles.trendingCard,
          variant === 'grid' && styles.gridCard,
          variant === 'list' && styles.listCard,
        ]}>
          {renderCardContent()}
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Technology: '#3b82f6',
    Health: '#ef4444',
    Sports: '#f59e0b',
    Politics: '#8b5cf6',
    Entertainment: '#ec4899',
    Business: '#10b981',
    Local: '#06b6d4',
    Education: '#84cc16'
  };
  return colors[category] || palette.primary || '#10b981';
};

const styles = StyleSheet.create({
  heroTextShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    // Start the shadow just above the meta/time tag (about 80px from bottom)
    bottom: 0,
    top: '-10%',
    zIndex: -1,
    pointerEvents: 'none',
  },
  touchable: {
    flex: 1,
  },

  baseCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: palette.surface || '#1a2f23',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    } : {
      elevation: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    })
  },

  // Hero Card Styles
  heroCard: {
    borderRadius: 28,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 10px 30px rgba(16,185,129,0.2)'
    } : {
      elevation: 20,
      shadowColor: palette.primary,
    })
  },

  heroContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: 440,
    overflow: 'hidden',
  },

  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ skewX: '-15deg' }],
    zIndex: 2,
  },

  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    zIndex: 3,
  },

  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 28,
    zIndex: 3,
    backgroundColor: 'transparent', // Ensure no background blocking
  },

  heroMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  categoryText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },

  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },

  timeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: 12,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  heroSummary: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },

  sourceText: {
    color: '#ccc',
    fontSize: 13,
    fontWeight: '600',
  },

  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.primary || '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },

  ctaText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  // Trending Card Styles
  trendingCard: {
    borderRadius: 24,
  },

  trendingContainer: {
    flex: 1,
  },

  trendingImageContainer: {
    height: 160,
    position: 'relative',
  },

  trendingImage: {
    width: '100%',
    height: '100%',
  },

  trendingImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },

  trendingCategoryContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  trendingCategoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  trendingCategoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  trendingContent: {
    padding: 16,
    flex: 1,
    backgroundColor: palette.surface || '#1a2f23',
  },

  trendingTitle: {
    color: palette.textPrimary || '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 8,
  },

  trendingSummary: {
    color: palette.textSecondary || 'rgba(255,255,255,0.7)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },

  trendingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  trendingSource: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (palette.primary || '#10b981') + '15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },

  trendingSourceText: {
    color: palette.primary || '#10b981',
    fontSize: 11,
    fontWeight: '600',
  },

  trendingTime: {
    color: palette.textMuted || 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '500',
  },

  // Grid Card Styles
  gridCard: {
    borderRadius: 20,
  },

  gridWrapper: {
    marginBottom: 16,
  },

  gridContainer: {
    flex: 1,
  },

  gridImageContainer: {
    height: 200,
    position: 'relative',
  },

  gridImage: {
    width: '100%',
    height: '100%',
  },

  gridImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },

  gridContent: {
    paddingHorizontal: 14,
    paddingTop: 5,
    paddingBottom: 8,
    flex: 1,
    backgroundColor: palette.surface || '#1a2f23',
  },

  gridCategoryRow: {
    marginBottom: 8,
  },

  gridChip: {
    alignSelf: 'flex-start',
  },

  gridChipText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  gridTitle: {
    color: palette.textPrimary || '#fff',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 8,
  },

  gridSummary: {
    color: palette.textSecondary || 'rgba(255,255,255,0.7)',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 4,
  },

  gridFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  gridSource: {
    color: palette.textMuted || 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },

  gridTime: {
    color: palette.textMuted || 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '500',
  },

  // List Card Styles
  listCard: {
    borderRadius: 16,
  },

  listWrapper: {
    marginBottom: 12,
  },

  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  listImageContainer: {
    width: 120,
    height: '100%',
  },

  listImage: {
    width: '100%',
    height: '100%',
  },

  listContent: {
    flex: 1,
    padding: 16,
    backgroundColor: palette.surface || '#1a2f23',
    justifyContent: 'space-between',
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  listChip: {
    alignSelf: 'flex-start',
  },

  listChipText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  listTime: {
    color: palette.textMuted || 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '500',
  },

  listTitle: {
    color: palette.textPrimary || '#fff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 6,
  },

  listSummary: {
    color: palette.textSecondary || 'rgba(255,255,255,0.7)',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },

  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  listSourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  listSource: {
    color: palette.textMuted || 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '500',
  },
});