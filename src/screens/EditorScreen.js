import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarryBackground from '../components/StarryBackground';
import { saveNote, deleteNote } from '../utils/storage';

export default function EditorScreen({ route, navigation }) {
  const { note: initialNote, isNew } = route.params;
  const [title, setTitle] = useState(initialNote.title || '');
  const [content, setContent] = useState(initialNote.content || '');
  const contentRef = useRef(null);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      navigation.goBack();
      return;
    }
    const updated = {
      ...initialNote,
      title: title.trim(),
      content: content.trim(),
      updatedAt: Date.now(),
    };
    await saveNote(updated);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('حذف الملاحظة', 'هل أنت متأكد؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: async () => {
          await deleteNote(initialNote.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <StarryBackground />
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSave} style={styles.headerBtn}>
            <Text style={styles.backText}>حفظ</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter} />
          {!isNew && (
            <TouchableOpacity onPress={handleDelete} style={styles.headerBtn}>
              <Text style={styles.deleteText}>حذف</Text>
            </TouchableOpacity>
          )}
          {isNew && <View style={styles.headerBtn} />}
        </View>

        <KeyboardAvoidingView
          style={styles.editor}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          {/* Title */}
          <TextInput
            style={styles.titleInput}
            placeholder="العنوان"
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={title}
            onChangeText={setTitle}
            textAlign="right"
            multiline={false}
            returnKeyType="next"
            onSubmitEditing={() => contentRef.current?.focus()}
          />

          <View style={styles.divider} />

          {/* Content */}
          <TextInput
            ref={contentRef}
            style={styles.contentInput}
            placeholder="ابدأ الكتابة..."
            placeholderTextColor="rgba(255,255,255,0.2)"
            value={content}
            onChangeText={setContent}
            textAlign="right"
            multiline
            textAlignVertical="top"
            autoFocus={isNew}
          />
        </KeyboardAvoidingView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{wordCount} كلمة</Text>
          <Text style={styles.footerDot}>✦</Text>
          <Text style={styles.footerText}>
            {new Date(initialNote.updatedAt).toLocaleDateString('ar-SA')}
          </Text>
        </View>
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
    paddingVertical: 12,
  },
  headerBtn: { minWidth: 50 },
  headerCenter: { flex: 1 },
  backText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Tajawal_600SemiBold',
    textAlign: 'right',
  },
  deleteText: {
    color: 'rgba(255,80,80,0.8)',
    fontSize: 15,
    fontFamily: 'Tajawal_400Regular',
    textAlign: 'left',
  },
  editor: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleInput: {
    color: '#ffffff',
    fontSize: 26,
    fontFamily: 'Tajawal_700Bold',
    paddingVertical: 12,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginBottom: 16,
  },
  contentInput: {
    flex: 1,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontFamily: 'Tajawal_400Regular',
    lineHeight: 28,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  footerText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 12,
    fontFamily: 'Tajawal_400Regular',
  },
  footerDot: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: 8,
  },
});
