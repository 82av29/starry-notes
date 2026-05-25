import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@starry_notes';

export async function getNotes() {
  try {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveNote(note) {
  try {
    const notes = await getNotes();
    const existing = notes.findIndex(n => n.id === note.id);
    if (existing >= 0) {
      notes[existing] = note;
    } else {
      notes.unshift(note);
    }
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return notes;
  } catch {
    return [];
  }
}

export async function deleteNote(id) {
  try {
    const notes = await getNotes();
    const filtered = notes.filter(n => n.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    return filtered;
  } catch {
    return [];
  }
}

export function createNote() {
  return {
    id: Date.now().toString(),
    title: '',
    content: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
