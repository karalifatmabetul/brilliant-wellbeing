import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';

export default function YouScreen() {
  const router = useRouter();
  const isFreeUser = true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>US</Text>
          </View>
          <Text style={styles.name}>User</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.subCard}>
            <Text style={styles.subText}>Current Plan: {isFreeUser ? 'Free' : 'Premium'}</Text>
            {isFreeUser && (
              <TouchableOpacity 
                style={styles.premiumButton}
                onPress={() => router.push('/paywall')}
              >
                <Text style={styles.premiumButtonText}>Go Premium</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="notifications-outline" size={24} color={colors?.textPrimary || '#FFF'} />
              <Text style={styles.settingText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color={colors?.textSecondary || '#A0A0A0'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="moon-outline" size={24} color={colors?.textPrimary || '#FFF'} />
              <Text style={styles.settingText}>Appearance</Text>
              <Ionicons name="chevron-forward" size={20} color={colors?.textSecondary || '#A0A0A0'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="help-circle-outline" size={24} color={colors?.textPrimary || '#FFF'} />
              <Text style={styles.settingText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color={colors?.textSecondary || '#A0A0A0'} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors?.textSecondary || '#A0A0A0',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 16,
  },
  subCard: {
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 16,
  },
  premiumButton: {
    backgroundColor: colors?.premiumGold || '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  premiumButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  settingsList: {
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors?.surfaceLight || '#2D2D3F',
  },
  settingText: {
    flex: 1,
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 16,
    marginLeft: 16,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  restoreButtonText: {
    color: colors?.textSecondary || '#A0A0A0',
    fontSize: 14,
  },
});
