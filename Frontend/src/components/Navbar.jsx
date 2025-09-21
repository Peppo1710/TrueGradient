import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { User, Settings, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unseen, setUnseen] = useState(true);


  // Example dynamic token count (replace with real logic)
  const tokenCount = 1247;

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white  shadow-md">
      {/* Left: Title */}
      <div className="text-xl font-semibold">AI Chat</div>

      {/* Right: Controls */}
      <div className="flex items-center gap-8">
        {/* Token Count with Coin Icon */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 font-medium shadow-sm border-grsy-500 cursor-default">
          {/* Coin SVG */}
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
          {tokenCount.toLocaleString()}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setMenuOpen(false);
            }}
            className="relative "
          >
            <div className="  ">
            <Bell className="w-4 h-4 text-gray-600 " />
            {unseen && <span className="absolute -top-4 -right-4 w-5 h-5 text-xs flex items-center justify-center bg-blue-600 text-white rounded-full">
              1
            </span>}
            </div>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-78 bg-white rounded-b-xl shadow-lg">
              <div className="flex justify-between items-center px-8 py-4 border-gray-800 text-md font-medium text-gray-700 bg-blue-100/50">
                Notifications

              </div>
              <ul className="flex-col divide-y divide-gray-200  text-sm text-gray-700">
                <div onClick={() => { setUnseen(false) }} className=" flex hover:bg-gray-50">
                  <div className=" p-2 pl-3" >
                    {/* Green dot indicator (Tailwind) */}
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 "></span>
                  </div>
                  <li className="  pr-4 pl-2 py-2  cursor-pointer flex flex-col">
                    <div className="flex py-1 justify-between">
                      <span className="font-bold ">Welcome!</span>
                      <div className="flex justify-center align-center gap-2">
                        <span className=" text-xs  text-gray-400">6m ago</span>
                        {unseen && <button ><span className="inline-block  w-2 h-2 rounded-full bg-blue-500 "></span></button>}
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm pb-2">
                      Welcome to AI Chat. You have 1,250 credits to start with.
                    </span>
                  </li>
                </div>
                <div className="  flex hover:bg-gray-50">
                  <div className=" p-2 pl-3" >
                    {/* Green dot indicator (Tailwind) */}
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 "></span>
                  </div>
                  <li className="  pr-4 pl-2 py-2  cursor-pointer flex flex-col">
                    <div onClick={() => { setUnseen(false) }} className="flex py-1 justify-between">
                      <span className="font-bold ">Feature Update</span>
                      <div className="flex justify-center align-center gap-2">
                        <span className=" text-xs  text-gray-400">6m ago</span>

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

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-blue-100/50 hover:rounded-2xl"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setNotifOpen(false);
            }}
          >
            {/* Gradient Avatar */}
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm font-bold">
              T
            </span>
            <span className="text-sm font-medium text-gray-700">temp</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col text-sm text-gray-700">
                {/* Username */}
                <div className="flex items-center gap-2 px-4 py-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>temp</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Settings */}
                <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span>Settings</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Sign Out */}
                <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50">
                  <LogOut className="w-4 h-4 text-gray-500" />
                  <span>Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
