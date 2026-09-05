import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/src/theme/colors';
import { useAppContext } from '@/src/context/AppContext';

const { width } = Dimensions.get('window');

interface QuadrantInfo {
  title: string;
  subtitle: string;
  tip: string;
}

const QUADRANTS: Record<string, QuadrantInfo> = {
  do: {
    title: 'Do First',
    subtitle: 'Urgent & Important',
    tip: 'Tasks with clear deadlines and immediate consequences. Do these now!',
  },
  decide: {
    title: 'Schedule',
    subtitle: 'Not Urgent & Important',
    tip: 'Long-term goals, exercise, and habits. Block out uninterrupted focus time.',
  },
  delegate: {
    title: 'Delegate',
    subtitle: 'Urgent & Not Important',
    tip: 'Tasks that must be done soon, but do not require your specific expertise.',
  },
  delete: {
    title: 'Eliminate',
    subtitle: 'Not Urgent & Not Important',
    tip: 'Distractions, endless social feeds, and time wasters. Cut them out!',
  },
};

export default function LessonScreen() {
  const router = useRouter();
  const { addXp, completeLesson } = useAppContext();
  const [activeQuadrant, setActiveQuadrant] = useState<string | null>(null);

  const handleSelectQuadrant = async (key: string) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {
      // ignore
    }
    setActiveQuadrant(activeQuadrant === key ? null : key);
  };

  const handleFinish = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      // ignore
    }
    addXp(40);
    completeLesson('3');
    router.push('/(tabs)');
  };

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
          <TouchableOpacity
            style={[styles.matrixCard, styles.cardDo, activeQuadrant === 'do' && styles.cardActive]}
            onPress={() => handleSelectQuadrant('do')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, styles.circleRed]}>
              <Text style={styles.iconText}>⚡</Text>
            </View>
            <Text style={styles.cardTitle}>Do</Text>
            <Text style={styles.cardSubtitle}>Do it now.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.matrixCard, styles.cardDecide, activeQuadrant === 'decide' && styles.cardActive]}
            onPress={() => handleSelectQuadrant('decide')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, styles.circleBlue]}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <Text style={styles.cardTitle}>Decide</Text>
            <Text style={styles.cardSubtitle}>Schedule it.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.matrixCard, styles.cardDelegate, activeQuadrant === 'delegate' && styles.cardActive]}
            onPress={() => handleSelectQuadrant('delegate')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, styles.circleGreen]}>
              <Text style={styles.iconText}>➕</Text>
            </View>
            <Text style={styles.cardTitle}>Delegate</Text>
            <Text style={styles.cardSubtitle}>Hand off.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.matrixCard, styles.cardDelete, activeQuadrant === 'delete' && styles.cardActive]}
            onPress={() => handleSelectQuadrant('delete')}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, styles.circlePurple]}>
              <Text style={styles.iconText}>🗑️</Text>
            </View>
            <Text style={styles.cardTitle}>Delete</Text>
            <Text style={styles.cardSubtitle}>Remove it.</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Explanatory Tip Banner */}
      {activeQuadrant ? (
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>{QUADRANTS[activeQuadrant].title}: {QUADRANTS[activeQuadrant].subtitle}</Text>
          <Text style={styles.tipText}>{QUADRANTS[activeQuadrant].tip}</Text>
        </View>
      ) : (
        <Text style={styles.bottomText}>
          Then let's help Mr. Clocktopus with this new way.
        </Text>
      )}

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleFinish}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    color: Colors.textSecondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    marginHorizontal: 16,
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: Colors.premiumGold,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contentContainer: {
    marginBottom: 24,
  },
  mainText: {
    color: Colors.textSecondary,
    fontSize: 17,
    marginBottom: 6,
  },
  boldText: {
    color: Colors.textPrimary,
    fontSize: 21,
    fontWeight: 'bold',
  },
  matrixContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  matrixCard: {
    width: (width - 32 - 14) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    borderColor: Colors.accent,
    backgroundColor: Colors.surfaceLight,
  },
  cardDo: { borderTopWidth: 4, borderTopColor: '#FF5252' },
  cardDecide: { borderTopWidth: 4, borderTopColor: '#448AFF' },
  cardDelegate: { borderTopWidth: 4, borderTopColor: '#00E676' },
  cardDelete: { borderTopWidth: 4, borderTopColor: '#E040FB' },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  circleRed: { backgroundColor: 'rgba(255, 82, 82, 0.2)' },
  circleBlue: { backgroundColor: 'rgba(68, 138, 255, 0.2)' },
  circleGreen: { backgroundColor: 'rgba(0, 230, 118, 0.2)' },
  circlePurple: { backgroundColor: 'rgba(224, 64, 251, 0.2)' },
  iconText: {
    fontSize: 18,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  tipBox: {
    backgroundColor: Colors.surfaceLight,
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
    marginBottom: 24,
  },
  tipTitle: {
    color: Colors.accent,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  tipText: {
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  bottomText: {
    color: Colors.accent,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
  },
  continueButtonText: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
