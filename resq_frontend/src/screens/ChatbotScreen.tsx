import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, FlatList,
    Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { botService } from '../services/api';
import { getAuthToken } from '../utils/auth';
import { theme } from '@styles/theme';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const quickReplies = [
    "How to stop bleeding?",
    "How to perform CPR?",
    "What to do for burns?"
];

const ChatbotScreen = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        setMessages([{ text: "Hello! How can I assist you today?", sender: 'bot' }]);
    }, []);

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const handleSendMessage = useCallback(async (messageText?: string) => {
        const textToSend = messageText || input.trim();
        if (!textToSend) return;

        setShowQuickReplies(false);
        const userMessage: Message = { text: textToSend, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        Keyboard.dismiss();

        setIsLoading(true);
        try {
            const token = await getAuthToken();
            if (!token) throw new Error('Authentication token is required.');

            const response = await botService.getFirstAidResponse(textToSend, token);
            setMessages((prev) => [...prev, { text: response.response, sender: 'bot' }]);
        } catch (err: any) {
            Alert.alert('Error', err.message || 'Chatbot response failed.');
            setMessages((prev) => [...prev, { text: "Sorry, I'm having trouble connecting.", sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    }, [input]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1 }}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>💬 Chatbot Assistant</Text>
                                <Text style={styles.status}>{isLoading ? 'Loading...' : isConnected ? 'Connected' : 'Offline'}</Text>
                            </View>

                            {/* Messages */}
                            <FlatList
                                ref={flatListRef}
                                data={messages}
                                keyExtractor={(_, i) => i.toString()}
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
                            />

                            {/* Quick Replies */}
                            {!keyboardVisible && showQuickReplies && (
  <View style={styles.quickRepliesContainer}>
    <Text style={styles.examplesTitle}>Need help fast? Tap one:</Text>
    <View style={styles.quickRepliesList}>
      {quickReplies.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.quickReply}
          onPress={() => handleSendMessage(item)}
        >
          <Text style={styles.quickReplyText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
)}

                            {/* Input Area */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={input}
                                    onChangeText={setInput}
                                    placeholder="Type a message..."
                                    placeholderTextColor={theme.colors.textSecondary}
                                    returnKeyType="send"
                                    onSubmitEditing={() => handleSendMessage()}
                                    editable={!isLoading}
                                />
                                <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage()} disabled={isLoading}>
                                    <Text style={styles.sendText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GestureHandlerRootView>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        color: theme.colors.buttonText,
    },
    status: {
        fontSize: theme.fontSize.small,
        color: theme.colors.buttonText,
    },
    messagesContainer: {
        padding: theme.spacing.medium,
        paddingBottom: 0,
    },
    message: {
        maxWidth: '75%',
        borderRadius: theme.borderRadius,
        padding: theme.spacing.small,
        marginBottom: theme.spacing.small,
    },
    userMessage: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: theme.colors.inputBackground,
        alignSelf: 'flex-start',
    },
    userText: {
        color: 'white',
        fontSize: theme.fontSize.medium,
    },
    botText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.medium,
    },
    quickReplies: {
        flexDirection: 'row',
        padding: theme.spacing.medium,
        paddingBottom: 4,
    },
    // quickRepliesContainer: {
    //     flexDirection: 'column',
    //     paddingHorizontal: 5,
    //     paddingBottom: 5,
    //     paddingTop: 0,
       
    // },

    quickRepliesContainer: {
        paddingHorizontal: theme.spacing.medium,
        paddingTop: theme.spacing.medium,
        paddingBottom: theme.spacing.large,
        backgroundColor: theme.colors.background,
      },
      
      examplesTitle: {
        fontSize: theme.fontSize.medium,
        fontWeight: '600',
        marginBottom: theme.spacing.small,
        color: theme.colors.text,
        textAlign: 'center',
      },
      
      quickRepliesList: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: theme.spacing.small,
      },
      
      quickReply: {
        backgroundColor: theme.colors.primaryLight,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: theme.borderRadius * 2,
        marginBottom: theme.spacing.small,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.2,
        shadowRadius: 3,
        elevation: 2,
      },
      
      quickReplyText: {
        color: theme.colors.buttonText,
        fontSize: theme.fontSize.medium,
        fontWeight: '500',
        textAlign: 'center',
      },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: theme.colors.inputBorder,
        borderTopWidth: 1,
        padding: theme.spacing.small,
        backgroundColor: theme.colors.inputBackground,
    },
    input: {
        flex: 1,
        fontSize: theme.fontSize.medium,
        paddingVertical: Platform.OS === 'ios' ? 10 : 8,
        paddingHorizontal: theme.spacing.medium,
        backgroundColor: 'white',
        borderRadius: theme.borderRadius,
        marginRight: theme.spacing.small,
        borderWidth: 1,
        borderColor: theme.colors.inputBorder,
        color: theme.colors.text,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: theme.borderRadius,
    },
    sendText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: theme.fontSize.medium,
    },
});

export default ChatbotScreen;