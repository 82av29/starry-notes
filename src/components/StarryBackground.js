import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const NUM_STARS = 120;

function generateStars() {
  return Array.from({ length: NUM_STARS }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4000,
    duration: Math.random() * 3000 + 2000,
  }));
}

const STARS = generateStars();

function Star({ x, y, size, delay, duration }) {
  const opacity = useRef(new Animated.Value(Math.random())).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: Math.random() * 0.5 + 0.5,
          duration,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: Math.random() * 0.2 + 0.1,
          duration,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#ffffff',
        opacity,
      }}
    />
  );
}

export default function StarryBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {STARS.map(star => (
        <Star key={star.id} {...star} />
      ))}
    </View>
  );
}
