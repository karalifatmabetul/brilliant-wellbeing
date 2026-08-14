import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors?.textPrimary || '#FFF'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>🌟 Unlock All Courses</Text>
        
        <View style={styles.featuresList}>
          {['All courses & lessons', 'No advertisements', 'Offline access', 'Priority support'].map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color={colors?.accent || '#00E676'} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plansContainer}>
          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'weekly' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('weekly')}
          >
            <Text style={styles.planTitle}>Weekly</Text>
            <Text style={styles.planPrice}>$4.99</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('monthly')}
          >
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planPrice}>$9.99</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.planCard, selectedPlan === 'yearly' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('yearly')}
          >
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
            </View>
            <Text style={styles.planTitle}>Yearly</Text>
            <Text style={styles.planPrice}>$49.99</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Start Free Trial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy. Subscription automatically renews unless canceled.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors?.background || '#0D0D0D',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 4,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  featuresList: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 18,
    marginLeft: 12,
  },
  plansContainer: {
    marginBottom: 32,
  },
  planCard: {
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardSelected: {
    borderColor: colors?.accent || '#00E676',
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
  },
  planTitle: {
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 18,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: colors?.accent || '#00E676',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: colors?.accent || '#00E676',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restoreButton: {
    alignItems: 'center',
    marginBottom: 32,
  },
  restoreButtonText: {
    color: colors?.textSecondary || '#A0A0A0',
    fontSize: 16,
  },
  termsText: {
    color: colors?.textSecondary || '#A0A0A0',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
