import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NoteCard({ note, onPress, onLongPress }) {
  const preview = note.content?.slice(0, 80) || '';
  const date = new Date(note.updatedAt);
  const dateStr = date.toLocaleDateString('ar-SA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.glow} />
      <Text style={styles.title} numberOfLines={1}>
        {note.title || 'بدون عنوان'}
      </Text>
      {preview ? (
        <Text style={styles.preview} numberOfLines={2}>
          {preview}
        </Text>
      ) : null}
      <Text style={styles.date}>{dateStr}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(180,160,255,0.07)',
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Tajawal_600SemiBold',
    marginBottom: 6,
    textAlign: 'right',
  },
  preview: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    fontFamily: 'Tajawal_400Regular',
    lineHeight: 20,
    textAlign: 'right',
    marginBottom: 10,
  },
  date: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 11,
    fontFamily: 'Tajawal_400Regular',
    textAlign: 'right',
  },
});
