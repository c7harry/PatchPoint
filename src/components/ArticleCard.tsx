import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { Article } from '../data/articles';
import { timeAgo } from '../utils/time';

interface Props { article: Article; }

export const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Card style={styles.card} mode="contained">
      <Card.Content>
        <View style={styles.headerRow}>
          <Chip compact style={styles.chip}>{article.category}</Chip>
          <Text style={styles.time} variant="labelSmall">{timeAgo(article.publishedAt)}</Text>
        </View>
        <Text variant="titleMedium" style={styles.title}>{article.title}</Text>
        <Text variant="bodyMedium" style={styles.summary}>{article.summary}</Text>
        <Text variant="labelSmall" style={styles.source}>Source: {article.source}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginBottom: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  chip: { backgroundColor: '#1e293b' },
  time: { color: '#94a3b8' },
  title: { marginTop: 4, marginBottom: 4 },
  summary: { color: '#cbd5e1', marginBottom: 6 },
  source: { color: '#64748b' }
});
