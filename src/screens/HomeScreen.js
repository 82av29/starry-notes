import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarryBackground from '../components/StarryBackground';
import NoteCard from '../components/NoteCard';
import { getNotes, deleteNote, createNote } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      getNotes().then(setNotes);
    }, [])
  );

  const filtered = notes.filter(n =>
    n.title?.includes(search) || n.content?.includes(search)
  );

  const handleNew = () => {
    const note = createNote();
    navigation.navigate('Editor', { note, isNew: true });
  };

  const handleDelete = (id) => {
    Alert.alert('حذف الملاحظة', 'هل أنت متأكد؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteNote(id);
          setNotes(updated);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <StarryBackground />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.star}>✦</Text>
          </View>
          <Text style={styles.headerTitle}>Starry Notes</Text>
          <View style={styles.headerRight}>
            <Text style={styles.count}>{notes.length}</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="بحث..."
            placeholderTextColor="rgba(255,255,255,0.25)"
            value={search}
            onChangeText={setSearch}
            textAlign="right"
          />
        </View>

        {/* List */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✦</Text>
            <Text style={styles.emptyText}>لا توجد ملاحظات بعد</Text>
            <Text style={styles.emptySubText}>اضغط + لإضافة ملاحظة جديدة</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onPress={() => navigation.navigate('Editor', { note: item, isNew: false })}
                onLongPress={() => handleDelete(item.id)}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={handleNew} activeOpacity={0.8}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  headerLeft: { width: 40 },
  headerRight: { width: 40, alignItems: 'flex-end' },
  star: { color: '#ffffff', fontSize: 18 },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Tajawal_700Bold',
    letterSpacing: 0.5,
  },
  count: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
    fontFamily: 'Tajawal_400Regular',
  },
  searchBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  searchIcon: { fontSize: 14, marginLeft: 8 },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontFamily: 'Tajawal_400Regular',
    fontSize: 14,
    paddingVertical: 12,
  },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyIcon: { fontSize: 40, marginBottom: 16, color: 'rgba(255,255,255,0.15)' },
  emptyText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 17,
    fontFamily: 'Tajawal_600SemiBold',
    marginBottom: 8,
  },
  emptySubText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 13,
    fontFamily: 'Tajawal_400Regular',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  fabText: {
    color: '#000000',
    fontSize: 28,
    fontFamily: 'Tajawal_400Regular',
    lineHeight: 32,
  },
});
