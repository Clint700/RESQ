import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { alertsService } from '@services/api';
import { theme } from '@styles/theme';
import AppButton from '@components/common/AppButton';
import AlertCard from '@components/AlertCard';
import { useLocation } from '@context/LocationContext';

const { width } = Dimensions.get('window');

const EmergencyScreen = () => {
    const { location } = useLocation();
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const data = await alertsService.getAlerts();
            setAlerts(data);
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to load alerts');
        } finally {
            setLoading(false);
        }
    };

    const handleTriggerAlert = async () => {
        if (!location) {
            Alert.alert('Location missing', 'Cannot send alert without location.');
            return;
        }

        try {
            const payload = {
                message: "Help! I'm in danger!",
                location,
                status: "active",
            };

            await alertsService.triggerAlert(payload);
            await fetchAlerts();
            Alert.alert('Success', 'Emergency alert sent!');
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to trigger alert');
        }
    };

    const handleDeleteAlert = async (id: number) => {
        try {
            await alertsService.deleteAlert(id);
            setAlerts(prev => prev.filter(alert => alert.id !== id));
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to delete alert');
        }
    };

    const handleAlertUpdate = async (id: number, updatedData: { message: string; status: string }) => {
        try {
            if (!location) {
                Alert.alert('Location missing', 'Cannot update alert without location.');
                return;
            }

            await alertsService.updateAlertStatus(id, {
                ...updatedData,
                location,
            });

            await fetchAlerts();
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Failed to update alert');
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.alertCircleButton} onPress={handleTriggerAlert}>
                <View style={styles.alertContent}>
                    <AlertTriangle size={32} color={theme.colors.buttonText} />
                    <Text style={styles.alertCircleText}>ALERT</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.subtitle}>Your Alerts</Text>

            {loading ? (
                <ActivityIndicator color={theme.colors.primary} size="large" style={styles.loading} />
            ) : alerts.length === 0 ? (
                <Text style={styles.emptyText}>No alerts yet. Stay safe!</Text>
            ) : (
                alerts.map(alert => (
                    <AlertCard
                        key={alert.id}
                        alert={alert}
                        onDelete={() => handleDeleteAlert(alert.id)}
                        onSave={(data) => handleAlertUpdate(alert.id, data)}
                    />
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: theme.spacing.medium,
        paddingTop: theme.spacing.large,
        paddingBottom: theme.spacing.xLarge,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: theme.fontSize.title + 2,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: theme.spacing.medium,
        color: theme.colors.primary,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: theme.fontSize.large,
        fontWeight: '600',
        marginTop: theme.spacing.large,
        marginBottom: theme.spacing.medium,
        color: theme.colors.text,
    },
    alertCircleButton: {
        width: 150,
        height: 150,
        borderRadius: 70,
        backgroundColor: '#e21e0e',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: theme.spacing.large,
      },
      
      alertContent: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      alertCircleText: {
        marginTop: 6,
        color: theme.colors.buttonText,
        fontSize: theme.fontSize.medium + 2,
        fontWeight: 'bold',
      },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontSize: theme.fontSize.medium,
        marginTop: theme.spacing.large,
        fontStyle: 'italic',
    },
    loading: {
        marginTop: theme.spacing.large,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.inputBorder,
        marginVertical: theme.spacing.large,
        opacity: 0.4,
        borderRadius: 1,
    },
});

export default EmergencyScreen;