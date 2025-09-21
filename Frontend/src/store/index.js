
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import tokenReducer from './slices/tokenSlice';
import conversationReducer from './slices/conversationSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    token: tokenReducer,
    conversation: conversationReducer,
  },
});
