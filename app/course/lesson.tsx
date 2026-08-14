import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';

const { width } = Dimensions.get('window');

export default function LessonScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>✨ ⚡ 060</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.mainText}>
          It's not about having multiple arms or hands.
        </Text>
        <Text style={styles.boldText}>
          Categorizing tasks helps to manage them.
        </Text>
      </View>

      {/* Eisenhower Matrix */}
      <View style={styles.matrixContainer}>
        <View style={styles.row}>
          <View style={[styles.matrixCard, styles.cardDo]}>
            <View style={[styles.iconCircle, styles.circleRed]}>
              <Text style={styles.iconText}>⚡</Text>
            </View>
            <Text style={styles.cardTitle}>Do</Text>
            <Text style={styles.cardSubtitle}>Do it now.</Text>
          </View>
          <View style={[styles.matrixCard, styles.cardDecide]}>
            <View style={[styles.iconCircle, styles.circleBlue]}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <Text style={styles.cardTitle}>Decide</Text>
            <Text style={styles.cardSubtitle}>Schedule it.</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.matrixCard, styles.cardDelegate]}>
            <View style={[styles.iconCircle, styles.circleGreen]}>
              <Text style={styles.iconText}>➕</Text>
            </View>
            <Text style={styles.cardTitle}>Delegate</Text>
            <Text style={styles.cardSubtitle}>Hand off.</Text>
          </View>
          <View style={[styles.matrixCard, styles.cardDelete]}>
            <View style={[styles.iconCircle, styles.circlePurple]}>
              <Text style={styles.iconText}>🗑️</Text>
            </View>
            <Text style={styles.cardTitle}>Delete</Text>
            <Text style={styles.cardSubtitle}>Remove it.</Text>
          </View>
        </View>
      </View>

      <Text style={styles.bottomText}>
        Then let's help to Mr. Clocktopus with this new way.
      </Text>

      {/* Continue Button */}
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // colors.background
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    color: '#A0A0A0', // colors.textSecondary
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#1A1A2E', // colors.surface
    borderRadius: 4,
    marginHorizontal: 16,
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#00E676', // colors.accent
    borderRadius: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: '#FFD700', // colors.premiumGold
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    marginBottom: 32,
  },
  mainText: {
    color: '#A0A0A0',
    fontSize: 18,
    marginBottom: 8,
  },
  boldText: {
    color: '#FFFFFF', // colors.textPrimary
    fontSize: 22,
    fontWeight: 'bold',
  },
  matrixContainer: {
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  matrixCard: {
    width: (width - 32 - 16) / 2,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
  },
  cardDo: { borderTopWidth: 4, borderColor: '#FF5252' },
  cardDecide: { borderTopWidth: 4, borderColor: '#448AFF' },
  cardDelegate: { borderTopWidth: 4, borderColor: '#00E676' },
  cardDelete: { borderTopWidth: 4, borderColor: '#E040FB' },
  
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  circleRed: { backgroundColor: 'rgba(255, 82, 82, 0.2)' },
  circleBlue: { backgroundColor: 'rgba(68, 138, 255, 0.2)' },
  circleGreen: { backgroundColor: 'rgba(0, 230, 118, 0.2)' },
  circlePurple: { backgroundColor: 'rgba(224, 64, 251, 0.2)' },
  iconText: {
    fontSize: 20,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  bottomText: {
    color: '#00E676', // colors.accent
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: '#FFFFFF', // colors.textPrimary
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
  },
  continueButtonText: {
    color: '#0D0D0D', // colors.background
    fontSize: 18,
    fontWeight: 'bold',
  }
});
