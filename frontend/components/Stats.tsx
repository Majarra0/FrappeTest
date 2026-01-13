
import React from 'react';
import { Briefcase, CheckCircle2, Clock, Zap } from 'lucide-react';
import { Task } from '../types';

interface StatsProps {
  tasks: Task[];
}

const Stats: React.FC<StatsProps> = ({ tasks }) => {
  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: Briefcase, color: 'bg-blue-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10`}>
              <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
          <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
