import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  nextId: 1,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    createNewConversation: (state) => {
      const newConversation = {
        id: state.nextId,
        title: "New Chat",
        preview: "Start a new conversation...",
        timestamp: "Now",
        messages: [],
        lastUserMessage: "",
        lastAiMessage: "",
      };
      state.conversations.unshift(newConversation);
      state.nextId += 1;
    },
    updateConversation: (state, action) => {
      const { conversationId, messages, userMessage, aiMessage } = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      
      if (conversation) {
        conversation.messages = messages;
        conversation.lastUserMessage = userMessage;
        conversation.lastAiMessage = aiMessage;
        
        // Update title with last user message (first 30 characters)
        if (userMessage && userMessage.trim()) {
          conversation.title = userMessage.length > 30 
            ? userMessage.substring(0, 30) + "..." 
            : userMessage;
        }
        
        // Update preview with last AI message (first 50 characters)
        if (aiMessage && aiMessage.trim()) {
          conversation.preview = aiMessage.length > 50 
            ? aiMessage.substring(0, 50) + "..." 
            : aiMessage;
        }
        
        // Update timestamp
        conversation.timestamp = new Date().toLocaleDateString() === new Date().toLocaleDateString() 
          ? "Today" 
          : new Date().toLocaleDateString();
      }
    },
    deleteConversation: (state, action) => {
      const conversationId = action.payload;
      state.conversations = state.conversations.filter(conv => conv.id !== conversationId);
    },
    setConversationTitle: (state, action) => {
      const { conversationId, title } = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.title = title;
      }
    },
    loadConversation: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        // This will be handled by the chat slice
        return state;
      }
    },
  },
});

export const {
  createNewConversation,
  updateConversation,
  deleteConversation,
  setConversationTitle,
  loadConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
