import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
//import { useNavigation } from 'expo-router'; // Removed Expo Router
//import { NavigationProp } from '../../src/types/navigation'; // Removed
//import { io, Socket } from 'socket.io-client'; // Removed socket.io-client
import { theme } from '../src/styles/theme'; // Assuming this is your theme
import { ActivityIndicator } from 'react-native';

// Mock Socket.IO for React Native and Web compatibility
const mockSocket: any = {
    on: (event: string, callback: (...args: any[]) => void) => { },
    emit: (event: string, data: any) => { },
    disconnect: () => { },
};

let socket: any = mockSocket;

const ChatbotScreen = () => {
    //const navigation = useNavigation<NavigationProp>(); // Removed Expo Router
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add a loading state

    //const socketRef = useRef<Socket | null>(null); // Removed Socket
    const connectToChatbot = useCallback(() => {
        setIsLoading(true); // Start loading
        // socketRef.current = io('http://localhost:3001'); // Use your server address //Removed
        // const socket = io('http://localhost:3001');
        setIsConnected(true);

        // Simulate connection and response
        setTimeout(() => {
            setIsConnected(true);
             setMessages(prevMessages => [...prevMessages, { text: "Hello! How can I assist you today?", sender: 'bot' }]);
            setIsLoading(false);
        }, 1000);



        socket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to server');
            // setMessages(prevMessages => [...prevMessages, { text: "Connected to server", sender: 'bot' }]);

        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from server');
            //  setMessages(prevMessages => [...prevMessages, { text: "Disconnected from server", sender: 'bot' }]);
        });

        socket.on('message', (message: string) => {
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'bot' }]);
        });

        socket.on('error', (error: any) => {
            console.error('Socket error:', error);
            Alert.alert('Error', 'Failed to connect to chatbot service.');
            setIsLoading(false);
        });

        // return () => {  //Removed
        //     if (socketRef.current) {
        //         socketRef.current.disconnect();
        //     }
        // };
    }, []);

    useEffect(() => {
        connectToChatbot();
        return () => {
            socket.disconnect();
        }
    }, [connectToChatbot]);

    const handleSendMessage = useCallback(() => {
        if (!input.trim()) return;
        setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
        //  socketRef.current?.emit('message', input); //Removed
        socket.emit('message', input);
        setInput('');
        // Simulate a bot response
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: "This is a simulated response.", sender: 'bot' }]);
        }, 1500);

    }, [input]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chatbot</Text>
                <Text style={styles.connectionStatus}>
                    {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
                </Text>
            </View>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            styles.message,
                            message.sender === 'user' ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text style={message.sender === 'user' ? styles.userText : styles.botText}>
                            {message.text}
                        </Text>
                    </View>
                ))}
                {isLoading && (
                    <View style={styles.botMessage}>
                        <ActivityIndicator size="small" color={theme.colors.buttonText} />
                    </View>
                )}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleSendMessage}
                    returnKeyType="send"
                    editable={isConnected && !isLoading}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                    disabled={!isConnected || isLoading}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        color: theme.colors.buttonText,
    },
    connectionStatus: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.buttonText,
    },
    messagesContainer: {
        flex: 1,
        padding: theme.spacing.medium,
    },
    message: {
        borderRadius: theme.borderRadius,
        padding: theme.spacing.small,
        marginBottom: theme.spacing.small,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: theme.colors.primaryLight,
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: theme.colors.inputBackground,
        alignSelf: 'flex-start',
    },
    userText: {
        color: theme.colors.buttonText,
    },
    botText: {
        color: theme.colors.text,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.medium,
        paddingBottom: 20,
    },
    input: {
        flex: 1,
        height: theme.inputHeight,
        paddingHorizontal: theme.spacing.medium,
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.colors.inputBackground,
        marginRight: theme.spacing.small,
        fontSize: theme.fontSize.medium,
        color: theme.colors.text,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        borderRadius: theme.borderRadius,
    },
    sendButtonText: {
        color: theme.colors.buttonText,
        fontWeight: 'bold',
        fontSize: theme.fontSize.medium,
    },
});

export default ChatbotScreen;
