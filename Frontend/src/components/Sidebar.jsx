import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useConversationState, useChatState } from '../hooks/redux';
import { createNewConversation, deleteConversation } from '../store/slices/conversationSlice';
import { setCurrentConversation, setNewConversation, setMessages, setWelcomeScreen, clearMessages } from '../store/slices/chatSlice';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const { conversation, dispatch } = useConversationState();
  const { chat, dispatch: chatDispatch } = useChatState();
  
  const handleNewChat = () => {
    // Create new conversation first
    dispatch(createNewConversation());
    
    // Get the newly created conversation ID (it will be the first one in the array)
    const newConversationId = conversation.nextId;
    
    // Set the new conversation with welcome screen
    chatDispatch(setNewConversation(newConversationId));
  };

  const handleConversationClick = (conversationId) => {
    const selectedConversation = conversation.conversations.find(conv => conv.id === conversationId);
    if (selectedConversation) {
      chatDispatch(setCurrentConversation(conversationId));
      chatDispatch(setMessages(selectedConversation.messages || []));
      chatDispatch(setWelcomeScreen(selectedConversation.messages.length === 0));
    }
  };

  const handleDeleteConversation = (conversationId, e) => {
    e.stopPropagation();
    dispatch(deleteConversation(conversationId));
    
    // If we're deleting the current conversation, clear the chat
    if (chat.currentConversationId === conversationId) {
      chatDispatch(clearMessages());
      chatDispatch(setWelcomeScreen(true));
    }
  };

  return (
    <div className={`bg-gray-50 border-r shadow-outer border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>


      {/* Conversations Section */}
      {!isCollapsed && (
        <div className="flex-1 divide-y divide-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md  font-bold text-gray-700">Conversations</h2>
              <button 
                onClick={onToggle}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* New Chat Button */}
            <button 
              onClick={handleNewChat}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-3 mb-4 flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Chat
            </button>
          </div>

          {/* Conversation List */}
          <div className="px-4 pb-4 flex-1 overflow-y-auto">
            {conversation.conversations.length === 0 ? (
              /* No conversations yet state */
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-4">
                  <img 
                    src="/Chat_icon.png" 
                    alt="Chat Icon" 
                    className="w-12 h-12 object-contain opacity-60"
                  />
                </div>
                <p className="text-gray-500 text-sm">No conversations yet</p>
              </div>
            ) : (
              conversation.conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleConversationClick(conv.id)}
                  className={`p-3 mb-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors relative group ${
                    chat.currentConversationId === conv.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm mb-1 truncate">
                        {conv.title}
                      </div>
                      <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {conv.preview}
                      </div>
                      <div className="text-xs text-gray-400">
                        {conv.timestamp}
                      </div>
                    </div>
                    
                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all duration-200"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Collapsed Vieww */}
      {isCollapsed && (
        <div className="flex-1 p-2">
          <button 
            onClick={onToggle}
            className="w-full p-3 hover:bg-gray-200 rounded-lg mb-4 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>
          
          <button 
            onClick={handleNewChat}
            className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;