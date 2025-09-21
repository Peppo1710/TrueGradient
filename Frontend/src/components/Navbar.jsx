import { useState, useEffect } from "react";
import { Bell, ChevronDown, MessageSquare } from "lucide-react";
import { User, Settings, LogOut } from "lucide-react";
import { useTokenState } from "../hooks/redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unseen, setUnseen] = useState(true);
  const [username, setUsername] = useState("temp");
  const { token } = useTokenState();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt_token');
    if (jwtToken) {
      try {
        const payload = JSON.parse(atob(jwtToken.split('.')[1]));
        setUsername(payload.username || "temp");
      } catch (error) {
        console.error("Error decoding JWT:", error);
        setUsername("temp");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/signin');
  };

  const handleMarkAllRead = () => {
    setUnseen(false);
  };

  return (
    <>
      <style jsx>{`
        .notification-btn {
  position: relative;
  padding: 8px 14px;             /* wider than tall -> rectangle */
  border-radius: 8px;            /* softer corners */
  transition: all 0.2s ease;
  cursor: pointer;               /* pointer cursor */
}

.notification-btn:hover {
  background-color: #ECF5FF;
  border-radius: 12px;           /* slightly more rounded on hover */
}

        
        
        
        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #2563EB;
          color: white;
          border-radius: 50%;
        }
      `}</style>
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-lg shadow-gray-150 border-b border-gray-200 backdrop-blur-xl shadow-sm">
        <div className="text-xl font-semibold">AI Chat</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 font-medium shadow-sm border-grsy-500 cursor-default">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-coins"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M18 5v1a6 6 0 0 1-6 6H5" />
            <circle cx="18" cy="16" r="6" />
          </svg>
          {token.tokensRemaining.toLocaleString()}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setMenuOpen(false);
            }}
            className="notification-btn hover:bg-blue-50 rounded-xl"
          >
            <Bell className="w-4 h-4 text-gray-600 bell-icon" />
            {unseen && <span className="notification-badge">
              1
            </span>}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-78 bg-white rounded-b-xl shadow-lg">
              <div className="flex justify-between items-center px-8 py-4 border-gray-800 text-md font-medium text-gray-700 bg-blue-100/50">
                <span>Notifications</span>
                <button 
                  onClick={handleMarkAllRead}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Mark all read
                </button>
              </div>
              <ul className="flex-col divide-y divide-gray-200 text-sm text-gray-700">
                <div onClick={() => { setUnseen(false) }} className="flex hover:bg-blue-50/50 rounded-lg mx-2 my-1 transition-colors">
                  <div className="p-2 pl-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <li className="pr-4 pl-2 py-2 cursor-pointer flex flex-col">
                    <div className="flex py-1 justify-between">
                      <span className="font-bold">Welcome!</span>
                      <div className="flex justify-center align-center gap-2">
                        <span className="text-xs text-gray-400">5m ago</span>
                        {unseen && <button><span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span></button>}
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm pb-2">
                      Welcome to AI Chat. You have {token.tokensRemaining.toLocaleString()} credits to start with.
                    </span>
                  </li>
                </div>
                <div className="flex hover:bg-blue-50/50 rounded-lg mx-2 my-1 transition-colors">
                  <div className="p-2 pl-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <li className="pr-4 pl-2 py-2 cursor-pointer flex flex-col">
                    <div onClick={() => { setUnseen(false) }} className="flex py-1 justify-between">
                      <span className="font-bold">Feature Update</span>
                      <div className="flex justify-center align-center gap-2">
                        <span className="text-xs text-gray-400">2h ago</span>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm pb-2">
                      New conversation export feature is now available.
                    </span>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-blue-100/50 hover:rounded-2xl"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setNotifOpen(false);
            }}
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold avatar-fallback">
              {username.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-medium ">{username}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className=" flex flex-col text-sm text-gray-700">
                <div className="flex items-center gap-3 px-4 py-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">{username}</span>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50 rounded-lg  my-1 transition-colors">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-black">Settings</span>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50 rounded-lg  my-1 transition-colors" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 text-gray-500" />
                  <span className="text-black">Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
