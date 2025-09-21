import React from 'react';
import { Send, User, Bot } from 'lucide-react';
import { useChatState, useTokenState, useConversationState } from '../hooks/redux';
import { 
  addMessage, 
  setInputMessage, 
  clearInput, 
  setLoading, 
  setError, 
  clearError,
  setCurrentConversation,
  setWelcomeScreen
} from '../store/slices/chatSlice';
import { spendTokens } from '../store/slices/tokenSlice';
import { updateConversation, createNewConversation } from '../store/slices/conversationSlice';
import { calculateTokenCost, generateMockAIResponse, createMessage } from '../utils/chatUtils';

const Chat = ({ sidebarCollapsed }) => {
  const { chat, dispatch } = useChatState();
  const { token, dispatch: tokenDispatch } = useTokenState();
  const { conversation, dispatch: conversationDispatch } = useConversationState();

  const suggestedPrompts = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort a list",
    "What are the benefits of meditation?",
    "Help me plan a weekend trip to Paris"
  ];

  const handleSendMessage = async () => {
    if (!chat.inputMessage.trim()) return;
    
    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      // Check if user has enough tokens
      const messageCost = calculateTokenCost(chat.inputMessage);
      const responseCost = token.costPerResponse;
      const totalCost = messageCost + responseCost;
      
      if (token.tokensRemaining < totalCost) {
        dispatch(setError('Insufficient tokens. Please add more tokens to continue.'));
        dispatch(setLoading(false));
        return;
      }
      
      // If no current conversation, use the first available conversation or create one
      let currentConversationId = chat.currentConversationId;
      if (!currentConversationId) {
        // Get the latest conversation ID from the conversation state
        if (conversation.conversations && conversation.conversations.length > 0) {
          const latestConversation = conversation.conversations[0];
          currentConversationId = latestConversation.id;
          dispatch(setCurrentConversation(currentConversationId));
        } else {
          // Create a new conversation if none exists
          conversationDispatch(createNewConversation());
          // Use the nextId as the new conversation ID
          currentConversationId = conversation.nextId;
          dispatch(setCurrentConversation(currentConversationId));
        }
      }
      
      // Create user message
      const userMessage = createMessage(chat.inputMessage, 'user', currentConversationId);
      dispatch(addMessage(userMessage));
      
      // Generate AI response
      const aiResponseText = generateMockAIResponse(chat.inputMessage);
      const aiResponse = createMessage(aiResponseText, 'ai', currentConversationId);
      
      // Add AI response after a short delay to simulate API call
      setTimeout(() => {
        dispatch(addMessage(aiResponse));
        
        // Update conversation in Redux with the new messages
        const updatedMessages = [...chat.messages, userMessage, aiResponse];
        conversationDispatch(updateConversation({
          conversationId: currentConversationId,
          messages: updatedMessages,
          userMessage: chat.inputMessage,
          aiMessage: aiResponseText
        }));
        
        // Spend tokens
        tokenDispatch(spendTokens({ messageCost, responseCost }));
        
        dispatch(clearInput());
        dispatch(setLoading(false));
      }, 1000);
      
    } catch (error) {
      dispatch(setError('Failed to send message. Please try again.'));
      dispatch(setLoading(false));
    }
  };

  const handlePromptClick = (prompt) => {
    dispatch(setInputMessage(prompt));
    dispatch(setWelcomeScreen(false));
    
    // Auto-send the prompt after a short delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col bg-white transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-full' : 'flex-1'}`}>
      {/* Chat Content Area */}
      <div className="flex-1 overflow-y-auto">
        {chat.isWelcomeScreen ? (
          /* Welcome Screen */
          <div className="flex flex-col items-center justify-center h-full px-8">
            {/* AI Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <img 
                  src="/Chat.png" 
                  alt="AI Chat Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to AI Chat</h1>
            <p className="text-gray-500 text-center max-w-2xl mb-12">
              Start a conversation with our AI assistant. Ask questions, get help with tasks, or explore ideas together.
            </p>

            {/* Suggested Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                      <img 
                        src="/Chat_icon.png" 
                        alt="Chat Icon" 
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <span className="text-gray-700">{prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="max-w-4xl mx-auto px-8 py-8">
            {chat.messages.map((message) => (
              <div key={message.id} className="mb-8">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Bot className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                </div>
                <div className="ml-11">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-gray-800 leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={chat.inputMessage}
              onChange={(e) => dispatch(setInputMessage(e.target.value))}
              onKeyPress={handleKeyPress}
              placeholder={chat.isWelcomeScreen ? "Ask me anything..." : "Type your message..."}
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="1"
              style={{ minHeight: '48px' }}
              disabled={chat.isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!chat.inputMessage.trim() || chat.isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {chat.isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {/* Footer Text */}
          <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{chat.inputMessage.length}/2000</span>
          </div>
          
          {/* Error Display */}
          {chat.error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{chat.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;