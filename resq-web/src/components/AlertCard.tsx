import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  MapPin,
  Clock,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Pencil,
  Save,
  ChevronDown,
} from 'lucide-react-native';
import { theme } from '@styles/theme';
import AppButton from '@components/common/AppButton';

const statusOptions: { label: string; value: 'active' | 'in_progress' | 'resolved' }[] = [
  { label: 'Active', value: 'active' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Resolved', value: 'resolved' },
];

const AlertCard = ({
  alert,
  onDelete,
  onSave,
}: {
  alert: {
    message: string;
    status: 'active' | 'in_progress' | 'resolved';
    location: string | { latitude: number; longitude: number };
    created_at: string;
  };
  onDelete: () => void;
  onSave: (updated: { message: string; status: 'active' | 'in_progress' | 'resolved' }) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(alert.message);
  const [editedStatus, setEditedStatus] = useState(alert.status);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleSave = () => {
    onSave({ message: editedMessage, status: editedStatus });
    setIsEditing(false);
    setShowStatusDropdown(false);
  };

  const statusColor = {
    active: 'orange',
    in_progress: 'blue',
    resolved: 'green',
  }[alert.status] || 'gray';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <AlertTriangle size={20} color={theme.colors.primary} />
        <Text style={styles.title}>Emergency Alert</Text>
      </View>

      {/* Location */}
      <View style={styles.row}>
        <MapPin size={16} color={theme.colors.textSecondary} />
        <Text style={styles.text}>
          {typeof alert.location === 'string'
            ? alert.location
            : `Lat: ${alert.location.latitude}, Lng: ${alert.location.longitude}`}
        </Text>
      </View>

      {/* Timestamp */}
      <View style={styles.row}>
        <Clock size={16} color={theme.colors.textSecondary} />
        <Text style={styles.text}>
          {new Date(alert.created_at).toLocaleString()}
        </Text>
      </View>

      {/* Status */}
      <View style={styles.row}>
        <CheckCircle size={16} color={statusColor} />
        {isEditing ? (
          <TouchableOpacity
            onPress={() => setShowStatusDropdown((prev) => !prev)}
            style={styles.dropdownToggle}
          >
            <Text style={[styles.text, { flex: 1 }]}>
              {statusOptions.find((o) => o.value === editedStatus)?.label}
            </Text>
            <ChevronDown size={16} color={theme.colors.text} />
          </TouchableOpacity>
        ) : (
          <Text style={[styles.text, { color: statusColor }]}>
            Status: {alert.status}
          </Text>
        )}
      </View>

      {/* Dropdown */}
      {isEditing && showStatusDropdown && (
        <View style={styles.dropdown}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                setEditedStatus(option.value);
                setShowStatusDropdown(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.text}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Message */}
      <View style={styles.editSection}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedMessage}
            onChangeText={setEditedMessage}
            multiline
            placeholder="Edit alert message..."
            placeholderTextColor={theme.colors.textSecondary}
          />
        ) : (
          <Text style={styles.text}>{alert.message}</Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <AppButton
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
        >
          <Trash2 size={16} color={theme.colors.buttonText} style={{ marginRight: 6 }} />
          Delete
        </AppButton>

        <AppButton
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          style={[styles.button, styles.editButton]}
        >
          {isEditing ? (
            <>
              <Save size={16} color={theme.colors.buttonText} style={{ marginRight: 6 }} />
              Save
            </>
          ) : (
            <>
              <Pencil size={16} color={theme.colors.buttonText} style={{ marginRight: 6 }} />
              Edit
            </>
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
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    ...theme.shadow.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  title: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.small,
  },
  text: {
    marginLeft: theme.spacing.small,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
  },
  input: {
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    padding: Platform.OS === 'ios' ? 14 : 10,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    marginTop: theme.spacing.small,
    backgroundColor: theme.colors.inputBackground,
  },
  editSection: {
    marginTop: theme.spacing.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.medium,
    gap: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 12 : theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.secondary,
  },
  editButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.small,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.inputBackground,
    flex: 1,
  },
  dropdown: {
    marginTop: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.inputBackground,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.medium,
  },
});

export default AlertCard;