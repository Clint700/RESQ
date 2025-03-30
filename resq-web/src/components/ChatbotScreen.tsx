import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList,
    Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { botService } from '../services/api';
import { getAuthToken } from '../utils/auth';
import { theme } from '../styles/theme'; // Import theme
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

interface BotServiceResponse {
    response: string;
}

const ChatbotScreen = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const flatListRef = useRef<FlatList | null>(null);
    const inputRef = useRef<TextInput>(null);

    const quickReplies = [
        "How to stop bleeding?",
        "What to do in case of a heart attack?",
        "How to perform CPR?",
        "Signs of a stroke?",
        "What to do for burns?",
        "Choking emergency?",
        "Dehydration signs?",
    ];

    useEffect(() => {
        setMessages([{ text: "Hello! How can I assist you today?", sender: 'bot' }]);
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);


    const handleSendMessage = useCallback(async (messageText?: string): Promise<void> => {
        const textToSend = messageText || input.trim();
        if (!textToSend) return;

        setShowQuickReplies(false);

        const userMessage: Message = { text: textToSend, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');
        Keyboard.dismiss();

        setIsLoading(true);
        try {
            const token = await getAuthToken();
            if (!token) throw new Error('Authentication token is required.');

            const response: BotServiceResponse = await botService.getFirstAidResponse(textToSend, token);
            const botMessage: Message = { text: response.response, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error: any) {
            console.error('Error fetching chatbot response:', error);
            Alert.alert('Error', error.message || 'Failed to get response from chatbot.');
            setMessages((prevMessages) => [...prevMessages, { text: "Sorry, I am having trouble connecting", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    }, [input]);

    return (
        <GestureHandlerRootView style={styles.flex}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flex}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.flex}>
                        <View style={styles.flex}>
                            {/* Chat Header */}
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Chatbot</Text>
                                <Text style={styles.connectionStatus}>
                                    {isLoading ? 'Loading...' : isConnected ? 'Connected' : 'Disconnected'}
                                </Text>
                            </View>

                            {/* Messages */}
                            <FlatList
                                ref={flatListRef}
                                data={messages}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                                        <Text style={item.sender === 'user' ? styles.userText : styles.botText}>
                                            {item.text}
                                        </Text>
                                    </View>
                                )}
                                contentContainerStyle={styles.messagesContainer}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                                style={styles.messagesList}
                                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                            />

                            {/* Quick Replies */}
                            {!keyboardVisible && showQuickReplies && (
                                <View style={styles.quickRepliesContainer}>
                                    {quickReplies.map((item, index) => (
                                        <TouchableOpacity key={index} style={styles.quickReply} onPress={() => handleSendMessage(item)}>
                                            <Text style={styles.quickReplyText}>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {/* Input Field */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    ref={inputRef}
                                    style={styles.input}
                                    placeholder="Type your message..."
                                    placeholderTextColor={theme.colors.placeholderTextColor}
                                    value={input}
                                    onChangeText={setInput}
                                    onSubmitEditing={() => handleSendMessage()}
                                    returnKeyType="send"
                                    editable={isConnected && !isLoading}
                                    blurOnSubmit={false}
                                />
                                <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage()} disabled={isLoading}>
                                    <Text style={styles.sendButtonText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

/* Styles */
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: Platform.OS === 'android' ? 25 : -65,
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.inputBorder,
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
        flexGrow: 1,
        padding: theme.spacing.medium,
        paddingBottom: 0,
    },
    messagesList: {
        flex: 1,
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
        fontSize: theme.fontSize.medium,
    },
    botText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.medium,
    },
    quickRepliesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: theme.spacing.medium,
    },
    quickReply: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.small,
        borderRadius: theme.borderRadius,
        marginRight: theme.spacing.small,
    },
    quickReplyText: {
        color: theme.colors.buttonText,
        fontSize: theme.fontSize.medium,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: theme.spacing.medium,
        borderTopWidth: 1,
        borderTopColor: theme.colors.inputBorder,
        backgroundColor: 'rgba(240,240,240,0.9)',
    },
    input: {
        flex: 1,
        fontSize: theme.fontSize.medium,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        borderRadius: theme.borderRadius,
    },
    sendButtonText: {
        color: theme.colors.buttonText,
        fontWeight: 'bold',
    },
});

export default ChatbotScreen;

