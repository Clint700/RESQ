import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { contactsService } from '@services/api';
import { theme } from '@styles/theme';
import ContactCard from '@components/ContactCard';
import AppButton from '@components/common/AppButton';
import { Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ContactScreen = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactsService.getContacts();
      setContacts(data);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Could not fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, updated: any) => {
    try {
      const updatedContact = await contactsService.updateContact(id, updated);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updatedContact } : c))
      );
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to update contact');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await contactsService.deleteContact(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to delete contact');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchContacts();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>📞 Emergency Contacts</Text> */}

      <AppButton onPress={() => router.push('/add-contact')} style={styles.addButton}>
        <Plus size={18} color={theme.colors.buttonText} style={{ marginRight: 8 }} />
        <Text style={styles.addButtonText}>Add Contact</Text>
      </AppButton>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
      ) : contacts.length === 0 ? (
        <Text style={styles.emptyText}>No contacts found.</Text>
      ) : (
        contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={() => handleDelete(contact.id)}
            onSave={(updated) => handleUpdate(contact.id, updated)}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    paddingBottom: 100,
    backgroundColor: theme.colors.background,
    minHeight: '100%',
  },
  title: {
    fontSize: theme.fontSize.title + 2,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.colors.primary,
    marginBottom: theme.spacing.large,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: theme.spacing.large,
    minWidth: width * 0.6,
  },
  addButtonText: {
    fontSize: theme.fontSize.medium + 1,
    fontWeight: '600',
    color: theme.colors.buttonText,
  },
  loading: {
    marginTop: theme.spacing.large,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.large,
  },
});

export default ContactScreen;