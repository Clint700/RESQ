import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { contactsService, alertsService } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import {
    Phone,
    Save,
    X,
    Edit,
    Trash2,
    AlertTriangle,
    MapPin,
    Clock,
    CheckCircle,
    UserPlus
} from 'lucide-react-native'; // Import the icons

interface Theme {
    colors: {
        primary: string;
        primaryLight: string;
        secondary: string;
        text: string;
        textSecondary: string;
        background: string;
        inputBackground: string;
        buttonText: string;
        link: string;
        inputBorder: string;
        card: string;
        cardTitle: string;
        cardDescription: string;
    };
    spacing: {
        small: number;
        medium: number;
        large: number;
        xLarge: number;
    };
    fontSize: {
        small: number;
        medium: number;
        large: number;
        xLarge: number;
        title: number;
        h1: number;
        h2: number;
    };
    fontWeight: {
        normal: '400' | '500' | '700';
        bold: '400' | '500' | '700';
    };
    borderRadius: number;
    inputHeight: number;
    buttonHeight: number;
    shadow: {
        small: any;
        medium: any;
        large: any;
    };
}

const theme: Theme = {
    colors: {
        primary: '#e53e3e',
        primaryLight: '#f56565',
        secondary: '#a0aec0',
        text: '#2d3748',
        textSecondary: '#718096',
        background: '#f7fafc',
        inputBackground: '#fff',
        inputBorder: '#cbd5e0',
        buttonText: '#fff',
        link: '#3182ce',
        card: '#fff',
        cardTitle: '#2d3748',
        cardDescription: '#718096',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
        xLarge: 32,
    },
    fontSize: {
        small: 12,
        medium: 14,
        large: 18,
        xLarge: 24,
        title: 28,
        h1: 30,
        h2: 24,
    },
    fontWeight: {
        normal: '400',
        bold: '700',
    },
    borderRadius: 8,
    inputHeight: 50,
    buttonHeight: Platform.OS === 'web' ? 40 : 50,
    shadow: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 4,
        },
        large: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
        },
    },
};
const AppInput = forwardRef<TextInput, TextInputProps>(({ style, ...props }, ref) => {
    const inputStyle = [styles.input, style];
    return (
        <TextInput
            ref={ref}
            style={inputStyle}
            placeholderTextColor={theme.colors.textSecondary}
            {...props}
        />
    );
});
AppInput.displayName = 'AppInput';

const AppButton: React.FC<any> = ({ children, onPress, style, textStyle, ...props }) => {
    const buttonStyle = [styles.button, style];
    const textStyleProp = [styles.buttonText, textStyle];
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} {...props}>
            <Text style={textStyleProp}>{children}</Text>
        </TouchableOpacity>
    );
};

const Card = ({ style, children }: { style?: any, children: React.ReactNode }) => {
    const cardStyle = [styles.card, style];
    return (
        <View style={cardStyle}>
            {children}
        </View>
    );
};

const CardHeader = ({ style, children }: { style?: any, children: React.ReactNode }) => {
    const headerStyle = [styles.cardHeader, style];
    return (
        <View style={headerStyle}>
            {children}
        </View>
    );
};

const CardTitle = ({ style, children }: { style?: any, children: React.ReactNode }) => {
    const titleStyle = [styles.cardTitle, style];
    return (
        <Text style={titleStyle}>
            {children}
        </Text>
    );
};

const CardDescription = ({ style, children }: { style?: any, children: React.ReactNode }) => {
    const descriptionStyle = [styles.cardDescription, style];
    return (
        <Text style={descriptionStyle}>
            {children}
        </Text>
    );
};

const CardContent = ({ style, children }: { style?: any, children: React.ReactNode }) => {
    const contentStyle = [styles.cardContent, style];
    return (
        <View style={contentStyle}>
            {children}
        </View>
    );
};

const ContactCard = ({
    contact,
    onEdit,
    onDelete,
    isEditing,
    onSave,
    onCancel,
    setEditedContact,
}: {
    contact: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isEditing: boolean;
    onSave: (id: string, updatedContact: any) => void;
    onCancel: () => void;
    setEditedContact: (updatedContact: any) => void;
}) => {
    const [localContact, setLocalContact] = useState(contact);

    useEffect(() => {
        setLocalContact(contact);
    }, [contact]);

    const handleInputChange = (field: string, value: string) => {
        setLocalContact({ ...localContact, [field]: value });
        setEditedContact({ ...localContact, [field]: value });
    };

    return (
        <Card style={styles.card}>
            <CardHeader>
                {isEditing ? (
                    <AppInput
                        value={localContact.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        style={styles.editInput}
                    />
                ) : (
                    <CardTitle style={styles.cardTitle}>{localContact.name}</CardTitle>
                )}
                <CardDescription style={styles.cardDescription}>
                    {contact.relationship}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <View style={styles.contactInfo}>
                    <Phone size={16} color={theme.colors.textSecondary} style={{ marginRight: theme.spacing.small }} />
                    {isEditing ? (
                        <AppInput
                            value={localContact.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            style={styles.editInput}
                            keyboardType="phone-pad"
                        />
                    ) : (
                        <Text style={styles.contactText}>{contact.phone}</Text>
                    )}
                </View>
                {isEditing ? (
                    <View style={styles.editActions}>
                        <AppButton
                            variant="outline"
                            size="sm"
                            onPress={() => onSave(contact._id, localContact)}
                            style={{ backgroundColor: theme.colors.primary, color: theme.colors.buttonText }}
                        >
                            <Save size={16} color={theme.colors.buttonText} />
                        </AppButton>
                        <AppButton
                            variant="outline"
                            size="sm"
                            onPress={onCancel}
                            style={{ backgroundColor: theme.colors.secondary, color: theme.colors.buttonText }}
                        >
                            <X size={16} color={theme.colors.buttonText} />
                        </AppButton>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <AppButton
                            variant="outline"
                            size="sm"
                            onPress={() => onEdit(contact._id)}
                            style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.buttonText }}
                        >
                            <Edit size={16} color={theme.colors.buttonText} />
                        </AppButton>
                        <AppButton
                            variant="outline"
                            size="sm"
                            onPress={() => onDelete(contact._id)}
                            style={{ backgroundColor: theme.colors.secondary, color: theme.colors.buttonText }}
                        >
                            <Trash2 size={16} color={theme.colors.buttonText} />
                        </AppButton>
                    </View>
                )}
            </CardContent>
        </Card>
    );
};

const AlertCard = ({ alert, onDelete }: { alert: any, onDelete: (id: string) => void }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'orange';
            case 'acknowledged':
                return 'blue';
            case 'resolved':
                return 'green';
            default:
                return 'gray';
        }
    };

    const statusColor = getStatusColor(alert.status);

    return (
        <Card style={styles.alertCard}>
            <CardHeader>
                <CardTitle style={styles.alertTitle}>
                    <AlertTriangle size={20} color={theme.colors.primary} style={{ marginRight: theme.spacing.small }} />
                    Emergency Alert
                </CardTitle>
                <CardDescription style={styles.cardDescription}>
                    <MapPin size={16} color={theme.colors.textSecondary} style={{ marginRight: theme.spacing.small }} />
                    {alert.location || 'Location N/A'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <View style={styles.alertInfo}>
                    <Clock size={16} color={theme.colors.textSecondary} style={{ marginRight: theme.spacing.small }} />
                    <Text style={styles.alertText}>
                        {new Date(alert.createdAt).toLocaleString()}
                    </Text>
                </View>
                <View style={styles.alertInfo}>
                    <CheckCircle size={16} color={statusColor} style={{ marginRight: theme.spacing.small }} />
                    <Text style={[styles.alertText, { color: statusColor }]}>
                        Status: {alert.status}
                    </Text>
                </View>
                <AppButton
                    variant="outline"
                    size="sm"
                    onPress={() => onDelete(alert._id)}
                    style={{
                        marginTop: theme.spacing.medium,
                        backgroundColor: theme.colors.secondary,
                        color: theme.colors.buttonText
                    }}
                >
                    <Trash2 size={16} color={theme.colors.buttonText} />
                    <Text style={{ marginLeft: theme.spacing.small }}>Delete</Text>
                </AppButton>
            </CardContent>
        </Card>
    );
};

const EmergencyScreen = () => {
    const navigation = useNavigation<NavigationProp<any>>(); // Change type to any
    const [contacts, setContacts] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [isAddingContact, setIsAddingContact] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', phone: '' });
    const [isEditingId, setIsEditingId] = useState<string | null>(null);
    const [editedContact, setEditedContact] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await contactsService.getContacts();
            setContacts(data);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAlerts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await alertsService.getAlerts();
            setAlerts(data);
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to fetch alerts');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContacts();
        fetchAlerts();
    }, [fetchContacts, fetchAlerts]);

    const handleAddContact = async () => {
        if (!newContact.name.trim() || !newContact.phone.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const data = await contactsService.addContact(newContact);
            setContacts([...contacts, data]);
            setNewContact({ name: '', phone: '' });
            setIsAddingContact(false);
            Alert.alert('Success', 'Contact added successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to add contact');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContact = async (id: string) => {
        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', onPress: async () => {
                        setLoading(true);
                        try {
                            await contactsService.deleteContact(id);
                            setContacts(contacts.filter(c => c._id !== id));
                            Alert.alert('Success', 'Contact deleted successfully!');
                        } catch (error: any) {
                            Alert.alert('Error', error.message || 'Failed to delete contact');
                        } finally {
                            setLoading(false);
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    };

    const handleTriggerAlert = async () => {
        Alert.alert(
            'Trigger Emergency Alert',
            'Are you sure you want to send an emergency alert to your contacts?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Send Alert', onPress: async () => {
                        setLoading(true);
                        try {
                            const alertData = {
                                location: 'User Location',
                            };
                            await alertsService.triggerAlert(alertData);
                            await fetchAlerts();
                            Alert.alert('Alert Sent', 'Emergency alert has been sent to your contacts.');
                        } catch (error: any) {
                            Alert.alert('Error', error.message || 'Failed to trigger alert');
                        } finally {
                            setLoading(false);
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    };

    const handleEditContact = (id: string) => {
        const contactToEdit = contacts.find(c => c._id === id);
        if (contactToEdit) {
            setIsEditingId(id);
            setEditedContact(contactToEdit);
        }
    };

    const handleSaveContact = async (id: string, updatedContact: any) => {
        setLoading(true);
        try {
            await contactsService.updateContact(id, updatedContact);
            setContacts(contacts.map(c => c._id === id ? updatedContact : c));
            setIsEditingId(null);
            setEditedContact(null);
            Alert.alert('Success', 'Contact updated successfully!');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update contact');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingId(null);
        setEditedContact(null);
    };

    const setEditedContactState = (updatedContact: any) => {
        setEditedContact(updatedContact);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emergency Contacts</Text>
                {loading ? (
                    <Text>Loading contacts...</Text>
                ) : (
                    contacts.map(contact => (
                        <ContactCard
                            key={contact._id}  // Add key here
                            contact={contact}
                            onEdit={handleEditContact}
                            onDelete={handleDeleteContact}
                            isEditing={isEditingId === contact._id}
                            onSave={handleSaveContact}
                            onCancel={handleCancelEdit}
                            setEditedContact={setEditedContactState}
                        />
                    ))
                )}
                {isAddingContact ? (
                    <Card style={styles.card}>
                        <CardHeader>
                            <CardTitle>Add New Contact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AppInput
                                placeholder="Name"
                                value={newContact.name}
                                onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                                style={styles.input}
                            />
                            <AppInput
                                placeholder="Phone"
                                value={newContact.phone}
                                onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                                style={styles.input}
                                keyboardType="phone-pad"
                            />
                            <View style={styles.addContactActions}>
                                <AppButton
                                    onPress={handleAddContact}
                                    style={{ backgroundColor: theme.colors.primary, color: theme.colors.buttonText }}
                                >
                                    <UserPlus size={16} color={theme.colors.buttonText} style={{ marginRight: theme.spacing.small }} />
                                    Add Contact
                                </AppButton>
                                <AppButton
                                    onPress={() => setIsAddingContact(false)}
                                    style={{ backgroundColor: theme.colors.secondary, color: theme.colors.buttonText }}
                                >
                                    <X size={16} color={theme.colors.buttonText} style={{ marginRight: theme.spacing.small }} />
                                    Cancel
                                </AppButton>
                            </View>
                        </CardContent>
                    </Card>
                ) : (
                    <AppButton
                        onPress={() => setIsAddingContact(true)}
                        style={styles.addContactButton}
                    >
                        <UserPlus size={16} style={{ marginRight: theme.spacing.small }} />
                        Add New Contact
                    </AppButton>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emergency Alerts</Text>
                {loading ? (
                    <Text>Loading alerts...</Text>
                ) : (
                    alerts.map(alert => (
                        <AlertCard
                            key={alert._id}  // Add key here
                            alert={alert}
                            onDelete={() => { }} />
                    ))
                )}
                <AppButton
                    onPress={handleTriggerAlert}
                    style={styles.alertButton}
                    disabled={loading}
                >
                    <AlertTriangle size={16} style={{ marginRight: theme.spacing.small }} />
                    {loading ? 'Sending...' : 'Trigger Emergency Alert'}
                </AppButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.medium,
    },
    section: {
        marginBottom: theme.spacing.large,
    },
    sectionTitle: {
        fontSize: theme.fontSize.h2,
        fontWeight: 'bold',
        marginBottom: theme.spacing.medium,
        color: theme.colors.text,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius,
        marginBottom: theme.spacing.medium,
        ...theme.shadow.small,
    },
    cardTitle: {
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        color: theme.colors.cardTitle,
    },
    cardDescription: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.cardDescription,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.small,
    },
    contactText: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.text,
    },
    alertInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.small
    },
    alertText: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.text
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: theme.spacing.small,
    },
    editActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: theme.spacing.small
    },
    input: {
        width: '100%',
        height: theme.inputHeight,
        paddingHorizontal: theme.spacing.medium,
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.inputBackground,
        marginBottom: theme.spacing.small,
        fontSize: theme.fontSize.medium,
        color: theme.colors.text,
    },
    editInput: {
        width: '100%',
        height: theme.inputHeight,
        paddingHorizontal: theme.spacing.medium,
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.inputBackground,
        marginBottom: theme.spacing.small,
        fontSize: theme.fontSize.medium,
        color: theme.colors.text,
    },
    button: {
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.medium,
        borderRadius: theme.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.colors.buttonText,
        fontSize: theme.fontSize.medium,
        fontWeight: 'bold',
    },
    addContactButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.buttonText,
        paddingVertical: theme.spacing.medium,
        borderRadius: theme.borderRadius,
        alignItems: 'center',
        marginTop: theme.spacing.medium,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    alertButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.buttonText,
        paddingVertical: theme.spacing.medium,
        borderRadius: theme.borderRadius,
        alignItems: 'center',
        marginTop: theme.spacing.medium,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addContactActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.medium,
    },
    alertCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius,
        marginBottom: theme.spacing.medium,
        ...theme.shadow.small
    },
    alertTitle: {
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        color: theme.colors.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.small,
    },
    cardContent: {
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius,
    },
});

export default EmergencyScreen;