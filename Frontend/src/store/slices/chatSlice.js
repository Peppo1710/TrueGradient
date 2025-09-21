import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentConversationId: null,
  messages: [],
  isWelcomeScreen: true,
  inputMessage: '',
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversationId = action.payload;
      state.isWelcomeScreen = false;
    },
    setNewConversation: (state, action) => {
      state.currentConversationId = action.payload;
      state.isWelcomeScreen = true;
      state.messages = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      state.isWelcomeScreen = false;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.isWelcomeScreen = false;
    },
    setInputMessage: (state, action) => {
      state.inputMessage = action.payload;
    },
    clearInput: (state) => {
      state.inputMessage = '';
    },
    setWelcomeScreen: (state, action) => {
      state.isWelcomeScreen = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.isWelcomeScreen = true;
      state.currentConversationId = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentConversation,
  setNewConversation,
  addMessage,
  setMessages,
  setInputMessage,
  clearInput,
  setWelcomeScreen,
  setLoading,
  setError,
  clearMessages,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
