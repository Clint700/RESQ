import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { contactsService } from '@services/api';
import { theme } from '@styles/theme';
import AppButton from '@components/common/AppButton';

const AddContactScreen = () => {
  const [form, setForm] = useState({ name: '', email: '', phone_number: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const { name, email, phone_number } = form;
    if (!name || !email || !phone_number) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      await contactsService.addContact(form);
      Alert.alert('Success', 'Contact added successfully!');
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to add contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>➕ Add New Contact</Text>

        {(['name', 'email', 'phone_number'] as const).map((field) => (
          <TextInput
            key={field}
            placeholder={field === 'phone_number' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChangeText={(text) => handleChange(field, text)}
            keyboardType={field === 'phone_number' ? 'phone-pad' : 'default'}
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor={theme.colors.textSecondary}
          />
        ))}

        <AppButton
          onPress={handleSubmit}
          disabled={loading}
          style={styles.submitButton}
        >
          {loading ? 'Adding...' : 'Save Contact'}
        </AppButton>

        <AppButton
          onPress={() => router.back()}
          style={[styles.cancelButton]}
        >
          Cancel
        </AppButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSize.title + 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xLarge,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: theme.spacing.medium,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    backgroundColor: theme.colors.inputBackground,
    marginBottom: theme.spacing.medium,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius * 2,
    paddingVertical: Platform.OS === 'ios' ? 14 : theme.spacing.medium,
    marginTop: theme.spacing.medium,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius * 2,
    paddingVertical: Platform.OS === 'ios' ? 14 : theme.spacing.medium,
    marginTop: theme.spacing.small,
    alignItems: 'center',
  },
});

export default AddContactScreen;