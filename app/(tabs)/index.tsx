import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const xp = 120;
  const streak = 5;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome back!</Text>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>⚡ {xp} XP</Text>
          </View>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View style={styles.streakInfo}>
            <Text style={styles.streakTitle}>{streak} Day Streak!</Text>
            <Text style={styles.streakSubtitle}>Keep it up!</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
          <View style={styles.progressCard}>
            <Text style={styles.courseTitle}>Mind & Habits</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>60% Complete</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.courseCard}>
                <View style={styles.courseCardPlaceholder} />
                <Text style={styles.courseCardTitle}>Time Management</Text>
                <Text style={styles.courseCardSubtitle}>Level {item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.background || '#0D0D0D',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
  },
  xpBadge: {
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpText: {
    color: colors?.premiumGold || '#FFD700',
    fontWeight: 'bold',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors?.surface || '#1A1A2E',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  streakEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
  },
  streakSubtitle: {
    color: colors?.textSecondary || '#A0A0A0',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: colors?.surface || '#1A1A2E',
    padding: 16,
    borderRadius: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors?.accent || '#00E676',
    borderRadius: 4,
  },
  progressText: {
    color: colors?.textSecondary || '#A0A0A0',
    fontSize: 12,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  courseCard: {
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 140,
  },
  courseCardPlaceholder: {
    height: 80,
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
    borderRadius: 8,
    marginBottom: 12,
  },
  courseCardTitle: {
    color: colors?.textPrimary || '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  courseCardSubtitle: {
    color: colors?.textSecondary || '#A0A0A0',
    fontSize: 12,
  },
});
