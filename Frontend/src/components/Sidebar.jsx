import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Sample conversation data
  const conversations = [
    {
      id: 1,
      title: "hi",
      preview: "I understand your question. Let me help yo...",
      timestamp: "Today"
    },
    {
      id: 2,
      title: "hi",
      preview: "I understand your question. Let me help yo...",
      timestamp: "Today"
    }
  ];

  return (
    <div className={`bg-gray-50 border-r shadow-outer border-gray-200 flex flex-col h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>


      {/* Conversations Section */}
      {!isCollapsed && (
        <div className="flex-1 divide-y divide-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md  font-bold text-gray-700">Conversations</h2>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* New Chat Button */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-3 mb-4 flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              New Chat
            </button>
          </div>

          {/* Conversation List */}
          <div className="px-4 pb-4 flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-3 mb-2  rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="font-medium text-gray-800 text-sm mb-1">
                  {conversation.title}
                </div>
                <div className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {conversation.preview}
                </div>
                <div className="text-xs text-gray-400">
                  {conversation.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed View */}
      {isCollapsed && (
        <div className="flex-1 p-2">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full p-3 hover:bg-gray-200 rounded-lg mb-4 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>
          
          <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;