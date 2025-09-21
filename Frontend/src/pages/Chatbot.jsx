import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Chatbot = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Navbar at the top */}
            <Navbar />
            
            {/* Main content area with sidebar and chat side by side */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                    isCollapsed={sidebarCollapsed} 
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
                />
                <Chat sidebarCollapsed={sidebarCollapsed} />
            </div>
        </div>
    );
};

export default Chatbot;