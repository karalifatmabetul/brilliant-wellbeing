import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  const handleCheck = () => {
    if (!selectedId) return;
    setIsChecking(true);
    setTimeout(() => {
      router.push('/course/lesson');
    }, 1500);
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
          <Text style={styles.scoreText}>✨ ⚡ 000</Text>
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
          style={[styles.choiceCard, selectedId === 'reels' && styles.selectedCard]} 
          onPress={() => setSelectedId('reels')}
          disabled={isChecking}
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
            isChecking && selectedId === 'hw' && styles.correctCard
          ]} 
          onPress={() => setSelectedId('hw')}
          disabled={isChecking}
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
          <View style={styles.focusGradient} />
          <View style={styles.focusSlider}>
             <Text>👁️</Text>
          </View>
        </View>
      </View>

      {/* Check Button */}
      <TouchableOpacity 
        style={[styles.checkButton, !selectedId && styles.checkButtonDisabled]}
        onPress={handleCheck}
        disabled={!selectedId || isChecking}
      >
        <Text style={[styles.checkButtonText, !selectedId && styles.checkButtonTextDisabled]}>Check</Text>
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
    width: '10%',
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
  questionContainer: {
    marginBottom: 24,
  },
  questionTitle: {
    color: '#FFFFFF', // colors.textPrimary
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  questionSubtitle: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  choiceCard: {
    width: (width - 32 - 16) / 2, // 2 columns with 16 gap
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#00E676',
  },
  correctCard: {
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
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
    borderColor: '#A0A0A0',
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
    backgroundColor: '#00E676',
  },
  choiceTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  choiceDesc: {
    color: '#A0A0A0',
    fontSize: 12,
    textAlign: 'center',
  },
  focusContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  focusLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  focusBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#2D2D3F',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  focusGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00E676',
  },
  focusSlider: {
    position: 'absolute',
    left: '50%',
    top: -5,
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  checkButton: {
    backgroundColor: '#00E676',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
  },
  checkButtonDisabled: {
    backgroundColor: '#2D2D3F',
  },
  checkButtonText: {
    color: '#0D0D0D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkButtonTextDisabled: {
    color: '#A0A0A0',
  }
});
