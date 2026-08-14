import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/src/theme/colors';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  style?: any;
}

export function ProgressBar({
  progress,
  height = 8,
  backgroundColor = Colors.surfaceLight,
  fillColor = Colors.accent,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={[styles.container, { height, backgroundColor }, style]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: fillColor,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    overflow: 'hidden',
    flex: 1,
  },
  fill: {
    borderRadius: 100,
  },
});
