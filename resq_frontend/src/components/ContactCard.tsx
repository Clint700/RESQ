import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { Pencil, Trash2, Save, User, Mail, Phone } from 'lucide-react-native';
import AppButton from '@components/common/AppButton';
import { theme } from '@styles/theme';

const ContactCard = ({
  contact,
  onDelete,
  onSave,
}: {
  contact: any;
  onDelete: () => void;
  onSave: (updated: { name: string; email: string; phone_number: string }) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(contact);

  const handleSave = () => {
    onSave(edited);
    setIsEditing(false);
  };

  const Field = ({
    label,
    value,
    icon,
    field,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    field: keyof typeof edited;
  }) => (
    <View style={styles.fieldRow}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.fieldText}>
        <Text style={styles.label}>{label}</Text>
        {isEditing ? (
          <TextInput
            value={edited[field]}
            onChangeText={(text) => setEdited({ ...edited, [field]: text })}
            style={styles.input}
            placeholder={label}
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
            keyboardType={field === 'phone_number' ? 'phone-pad' : 'default'}
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <Field label="Name" value={edited.name} icon={<User size={18} />} field="name" />
      <Field label="Email" value={edited.email} icon={<Mail size={18} />} field="email" />
      <Field label="Phone" value={edited.phone_number} icon={<Phone size={18} />} field="phone_number" />

      <View style={styles.buttonRow}>
        <AppButton
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
        >
          <Trash2 size={16} color={theme.colors.buttonText} />
        </AppButton>

        <AppButton
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          style={[styles.button, styles.editButton]}
        >
          {isEditing ? (
            <Save size={16} color={theme.colors.buttonText} />
          ) : (
            <Pencil size={16} color={theme.colors.buttonText} />
          )}
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.large,
    marginBottom: theme.spacing.large,
    ...theme.shadow.medium,
    width: '100%',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.medium,
  },
  icon: {
    marginRight: theme.spacing.medium,
    marginTop: 4,
  },
  fieldText: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingHorizontal: theme.spacing.medium,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    backgroundColor: theme.colors.inputBackground,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.large,
    gap: 12,
  },
  button: {
    minWidth: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
  },
  deleteButton: {
    backgroundColor: theme.colors.secondary,
  },
  editButton: {
    backgroundColor: theme.colors.primaryLight,
  },
});

export default ContactCard;