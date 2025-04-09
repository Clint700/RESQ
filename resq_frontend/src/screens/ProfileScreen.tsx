import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import AppButton from '@components/common/AppButton';
import { useProfile } from '@context/ProfileContext';
import { theme } from '@styles/theme';

const ProfileScreen = () => {
  const profileContext = useProfile();
  if (!profileContext) {
    throw new Error('ProfileContext is null. Ensure the provider is correctly set up.');
  }

  const { profile, saveProfile } = profileContext;
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    const { name, email, phone } = form;
    if (!name || !email || !phone) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    await saveProfile(form);
    Alert.alert('Success', 'Profile saved!');
    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}></Text>

        <View style={styles.avatarContainer}>
          <Image
            source={require('/Users/clinton/RESQ-Project/resq_frontend/assets/images/icon.png')}
            style={styles.avatar}
          />
        </View>

        {isEditing ? (
          <>
            {(['name', 'email', 'phone'] as const).map((field) => (
              <TextInput
                key={field}
                placeholder={
                  field === 'phone' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={form[field]}
                onChangeText={(text) => handleChange(field, text)}
                style={styles.input}
                keyboardType={field === 'phone' ? 'phone-pad' : 'default'}
                placeholderTextColor={theme.colors.textSecondary}
                autoCapitalize={field === 'email' ? 'none' : 'words'}
              />
            ))}

            <AppButton onPress={handleSave} style={styles.saveButton}>
              Save Profile
            </AppButton>

            <AppButton
              onPress={() => {
                setIsEditing(false);
                setForm(profile || { name: '', email: '', phone: '' });
              }}
              style={styles.cancelButton}
            >
              Cancel
            </AppButton>
          </>
        ) : profile ? (
          <>
            <View style={styles.card}>
              <View style={styles.field}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{profile.name}</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{profile.email}</Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{profile.phone}</Text>
              </View>
            </View>

            <AppButton onPress={() => setIsEditing(true)} style={styles.editButton}>
              Edit Profile
            </AppButton>
          </>
        ) : (
          <Text style={styles.emptyText}>No profile found. Tap "Edit" to get started.</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSize.title + 2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.large,
    color: theme.colors.primary,
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: theme.colors.inputBackground,
    overflow: 'hidden',
    marginBottom: theme.spacing.large,
    borderWidth: 2,
    borderColor: theme.colors.inputBorder,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: theme.spacing.medium,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    backgroundColor: theme.colors.inputBackground,
    marginBottom: theme.spacing.medium,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: theme.spacing.small,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: theme.spacing.small,
    width: '100%',
  },
  editButton: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: theme.spacing.large,
    width: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: theme.spacing.large,
    ...theme.shadow.medium,
  },
  field: {
    marginBottom: theme.spacing.medium,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.small,
    marginBottom: 4,
  },
  value: {
    color: theme.colors.text,
    fontSize: theme.fontSize.medium,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.large,
  },
});

export default ProfileScreen;