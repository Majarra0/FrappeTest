import React from "react";
import { CheckSquare, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 overflow-y-auto no-scrollbar hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">
            Tasks
          </span>
        </div>

        <nav className="space-y-1">
          <div className="px-4 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-lg flex items-center gap-3">
            <CheckSquare size={20} className="text-indigo-600" />
            <span>Tasks</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
