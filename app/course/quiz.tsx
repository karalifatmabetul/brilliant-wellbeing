import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/src/theme/colors';
import { useAppContext } from '@/src/context/AppContext';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const router = useRouter();
  const { addXp } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [focusWidth, setFocusWidth] = useState('50%');
  const [score, setScore] = useState('000');

  const handleSelect = async (id: string) => {
    if (isChecking) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {
      // ignore if haptics unavailable on simulator
    }
    setSelectedId(id);
  };

  const handleCheck = async () => {
    if (!selectedId || isChecking) return;
    setIsChecking(true);

    const isCorrect = selectedId === 'hw';

    try {
      if (isCorrect) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setFocusWidth('85%');
        setScore('060');
        addXp(60);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setFocusWidth('20%');
      }
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      router.push('/course/lesson');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, isChecking && { width: '40%' }]} />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>✨ ⚡ {score}</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>Which task will help Mr. Clocktopus the most?</Text>
        <Text style={styles.questionSubtitle}>Watch what happens to his Focus Capacity.</Text>
      </View>

      {/* Choices */}
      <View style={styles.choicesContainer}>
        {/* Left Choice */}
        <TouchableOpacity
          style={[
            styles.choiceCard,
            selectedId === 'reels' && styles.selectedCard,
            isChecking && selectedId === 'reels' && styles.wrongCard,
          ]}
          onPress={() => handleSelect('reels')}
          disabled={isChecking}
          activeOpacity={0.8}
        >
          <Image source={require('@/assets/images/reels-hole.jpg')} style={styles.choiceImage} />
          <View style={styles.radioContainer}>
            <View style={[styles.radio, selectedId === 'reels' && styles.radioSelected]} />
          </View>
          <Text style={styles.choiceTitle}>INTO THE REELS HOLE</Text>
          <Text style={styles.choiceDesc}>Only take 5 minutes.</Text>
        </TouchableOpacity>

        {/* Right Choice */}
        <TouchableOpacity
          style={[
            styles.choiceCard,
            selectedId === 'hw' && styles.selectedCard,
            isChecking && selectedId === 'hw' && styles.correctCard,
          ]}
          onPress={() => handleSelect('hw')}
          disabled={isChecking}
          activeOpacity={0.8}
        >
          <Image source={require('@/assets/images/homework-deadline.jpg')} style={styles.choiceImage} />
          <View style={styles.radioContainer}>
            <View style={[styles.radio, selectedId === 'hw' && styles.radioSelected]} />
          </View>
          <Text style={styles.choiceTitle}>HOMEWORK DEADLINE</Text>
          <Text style={styles.choiceDesc}>He promised he'd send it today.</Text>
        </TouchableOpacity>
      </View>

      {/* Focus Capacity Bar */}
      <View style={styles.focusContainer}>
        <Text style={styles.focusLabel}>Focus Capacity</Text>
        <View style={styles.focusBar}>
          <View style={[styles.focusGradient, { width: focusWidth as any }]} />
          <View style={[styles.focusSlider, { left: focusWidth as any }]}>
            <Text style={{ fontSize: 14 }}>👁️</Text>
          </View>
        </View>
      </View>

      {/* Check Button */}
      <TouchableOpacity
        style={[styles.checkButton, !selectedId && styles.checkButtonDisabled]}
        onPress={handleCheck}
        disabled={!selectedId || isChecking}
        activeOpacity={0.8}
      >
        <Text style={[styles.checkButtonText, !selectedId && styles.checkButtonTextDisabled]}>
          {isChecking ? 'Checking...' : 'Check'}
        </Text>
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
    width: '20%',
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
  questionContainer: {
    marginBottom: 24,
  },
  questionTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionSubtitle: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  choiceCard: {
    width: (width - 32 - 16) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: Colors.accent,
  },
  correctCard: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
  },
  wrongCard: {
    borderColor: Colors.danger,
    backgroundColor: 'rgba(255, 82, 82, 0.15)',
  },
  choiceImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  radioContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: Colors.accent,
  },
  choiceTitle: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  choiceDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
  },
  focusContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  focusLabel: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  focusBar: {
    width: '100%',
    height: 18,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 9,
    position: 'relative',
    overflow: 'hidden',
  },
  focusGradient: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 9,
  },
  focusSlider: {
    position: 'absolute',
    top: -4,
    marginLeft: -12,
    width: 26,
    height: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  checkButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
  },
  checkButtonDisabled: {
    backgroundColor: Colors.surfaceLight,
  },
  checkButtonText: {
    color: '#0D0D0D',
    fontSize: 17,
    fontWeight: 'bold',
  },
  checkButtonTextDisabled: {
    color: Colors.textSecondary,
  },
});
