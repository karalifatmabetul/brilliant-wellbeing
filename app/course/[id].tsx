import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const lessons = [
    { id: '1', title: 'Introduction', isCompleted: true },
    { id: '2', title: 'The Problem', isCompleted: false },
    { id: '3', title: 'Eisenhower Matrix', isCompleted: false },
    { id: '4', title: 'Practice', isCompleted: false },
    { id: '5', title: 'Conclusion', isCompleted: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors?.textPrimary || '#FFF'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Detail</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.courseTitle}>Mind & Habits</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LEVEL 1</Text>
          </View>
          
          <Image 
            source={require('@/assets/images/mind-habits-icon.jpg')} 
            style={styles.heroImage} 
            resizeMode="cover"
          />
          
          <View style={styles.dotsContainer}>
            {lessons.map((lesson, idx) => (
              <View 
                key={lesson.id} 
                style={[
                  styles.dot, 
                  { backgroundColor: lesson.isCompleted ? (colors?.accent || '#00E676') : (colors?.surfaceLight || '#2D2D3F') }
                ]} 
              />
            ))}
          </View>
        </View>

        <View style={styles.lessonsCard}>
          <Text style={styles.lessonsTitle}>Lessons</Text>
          {lessons.map((lesson, index) => (
            <View key={lesson.id} style={styles.lessonItem}>
              <View style={[styles.lessonIcon, { backgroundColor: lesson.isCompleted ? (colors?.accent || '#00E676') : (colors?.surfaceLight || '#2D2D3F') }]}>
                <Ionicons name={lesson.isCompleted ? "checkmark" : "play"} size={16} color={lesson.isCompleted ? '#000' : '#FFF'} />
              </View>
              <Text style={styles.lessonText}>{index + 1}. {lesson.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.push('/course/brief')}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  courseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
  },
  levelText: {
    color: colors?.accent || '#00E676',
    fontWeight: 'bold',
    fontSize: 12,
  },
  heroImage: {
    width: 200,
    height: 200,
    borderRadius: 24,
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  lessonsCard: {
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 24,
    padding: 24,
  },
  lessonsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 16,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  lessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonText: {
    color: colors?.textPrimary || '#FFFFFF',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors?.surfaceLight || '#2D2D3F',
  },
  startButton: {
    backgroundColor: colors?.accent || '#00E676',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
