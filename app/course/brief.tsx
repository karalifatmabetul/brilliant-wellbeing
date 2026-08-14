import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CourseBriefScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* XP Badge - Top Right */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>2</Text>
          <Ionicons name="flash" size={14} color="#FFD700" />
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Mr. Clocktopus Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/mr-clocktopus.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Meet Mr. Clocktopus</Text>

        {/* Description */}
        <Text style={styles.description}>
          Mr. Clocktopus has eight arms.{'\n'}
          Yet somehow… he's always behind.
        </Text>

        <Text style={styles.descriptionHighlight}>
          Maybe the problem isn't having enough arms.{' '}
          <Text style={styles.bold}>Let's help him figure it out.</Text>
        </Text>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/course/quiz')}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    gap: 4,
  },
  xpText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: width * 0.65,
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 26,
    marginBottom: 16,
  },
  descriptionHighlight: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 26,
  },
  bold: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
