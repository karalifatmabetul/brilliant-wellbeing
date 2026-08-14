import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';

export default function CoursesScreen() {
  const router = useRouter();
  
  const courses = [
    { id: '1', title: 'Mind & Habits', level: 1, lessons: 5, isPremium: false, icon: require('@/assets/images/mind-habits-icon.jpg') },
    { id: '2', title: 'Focus Flow', level: 2, lessons: 8, isPremium: true, icon: require('@/assets/images/reels-hole.jpg') },
    { id: '3', title: 'Time Mastery', level: 3, lessons: 10, isPremium: true, icon: require('@/assets/images/homework-deadline.jpg') },
    { id: '4', title: 'Deep Work', level: 4, lessons: 6, isPremium: true, icon: require('@/assets/images/mr-clocktopus.jpg') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Courses</Text>
        
        <View style={styles.grid}>
          {courses.map((course) => (
            <TouchableOpacity 
              key={course.id} 
              style={styles.card}
              onPress={() => router.push(`/course/${course.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image source={course.icon} style={styles.icon} resizeMode="cover" />
                {course.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Ionicons name="lock-closed" size={12} color="#000" />
                  </View>
                )}
              </View>
              <Text style={styles.cardTitle}>{course.title}</Text>
              <Text style={styles.cardSubtitle}>Level {course.level} • {course.lessons} Lessons</Text>
            </TouchableOpacity>
          ))}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors?.textPrimary || '#FFFFFF',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors?.surface || '#1A1A2E',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors?.surfaceLight || '#2D2D3F',
    overflow: 'hidden',
    position: 'relative',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors?.premiumGold || '#FFD700',
    padding: 4,
    borderRadius: 12,
  },
  cardTitle: {
    color: colors?.textPrimary || '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: colors?.textSecondary || '#A0A0A0',
    fontSize: 12,
  },
});
