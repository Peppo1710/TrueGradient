import { useDispatch, useSelector } from 'react-redux';

// Custom hooks for Redux state management
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Chat hooks
export const useChatState = () => {
  const chat = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  return { chat, dispatch };
};

// Token hooks
export const useTokenState = () => {
  const token = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  return { token, dispatch };
};

// Conversation hooks
export const useConversationState = () => {
  const conversation = useAppSelector((state) => state.conversation);
  const dispatch = useAppDispatch();
  return { conversation, dispatch };
};
