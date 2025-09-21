// Utility functions for chat and token management

export const calculateTokenCost = (message) => {
  // Simple token calculation based on word count
  // In a real app, you'd use a proper tokenizer
  const wordCount = message.split(' ').length;
  return Math.max(1, Math.ceil(wordCount / 8)); // Rough estimate: 8 words = 1 token (reduced cost)
};

export const generateMockAIResponse = (userMessage) => {
  // Mock AI responses based on user input
  const responses = [
    "That's an interesting point. Let me help you with that...",
    "I understand your question. Here's what I think...",
    "Great question! Let me provide you with a detailed response...",
    "I can help you with that. Here's my analysis...",
    "That's a thoughtful inquiry. Let me break this down for you...",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return `${randomResponse} This is a mock response to demonstrate the chat functionality. In a real application, this would be connected to an actual AI service.`;
};

export const createMessage = (text, sender, conversationId) => {
  return {
    id: Date.now() + Math.random(),
    text,
    sender,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    conversationId,
  };
};

export const formatTimestamp = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  
  if (messageDate.toDateString() === now.toDateString()) {
    return "Today";
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  
  return messageDate.toLocaleDateString();
};
