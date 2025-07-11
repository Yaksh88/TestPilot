import { useState } from "react";
import {
  FiFolder,
  FiPlay,
  FiFileText,
  FiClock,
  
  FiMenu,
} from "react-icons/fi";

const menuItems = [
  { label: "Test Cases", icon: <FiFolder /> },
  { label: "Run & View", icon: <FiPlay /> },
  { label: "Files", icon: <FiFileText /> },
  { label: "Queue", icon: <FiClock /> },
];

const Sidebar = () => {
  const [active, setActive] = useState("Test Cases");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile navbar */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white/70 backdrop-blur-lg shadow z-20">
        <h1 className="text-lg font-extrabold text-blue-700">TestPilot</h1>
        <button
          className="text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white/80 backdrop-blur-md z-30 shadow-md">
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => {
                  setActive(label);
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  active === label
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 h-screen p-5 flex-col justify-between bg-gradient-to-b from-white/70 to-white/20 backdrop-blur-xl shadow-inner">
        <div>
          <h1 className="text-xl font-extrabold text-blue-700 mb-10 tracking-tight">
            QualGent
          </h1>
          <nav className="space-y-3">
            {menuItems.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  active === label
                    ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            YP
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-800">Yaksh Patel</p>
            <p className="text-gray-500 text-xs">yaksh@example.com</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
