import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Stats from "./components/Stats";
import TaskModal from "./components/TaskModal";
import FrappeService from "./services/frappeService";
import { Task, ViewMode } from "./types";
import {
  Plus,
  Search,
  Trash2,
  Grid,
  List as ListIcon,
  Loader2,
  CheckSquare,
} from "lucide-react";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateOrUpdateTask = async (taskData: Partial<Task>) => {
    try {
      if (selectedTask) {
        await FrappeService.deleteTask(selectedTask.name);
      }
      await FrappeService.createTask(taskData);
      fetchTasks();
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Task operation failed', error);
    }
  };

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await FrappeService.getAllTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteTask = async (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await FrappeService.deleteTask(name);
        setTasks((prev) => prev.filter((t) => t.name !== name));
      } catch (error) {
        console.error('Deletion failed', error);
      }
    }
  };

  const safeTasks = tasks || [];
  const filteredTasks = safeTasks.filter(
    (t) =>
      t &&
      ((t.task_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.task_desc || "").toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-12 transition-all">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Task Management
            </h1>
            <p className="text-slate-500 mt-1">
              Create, view, and manage your project tasks seamlessly.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedTask(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>

        {/* Overview Stats */}
        <Stats tasks={safeTasks} />

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-xl outline-none transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
            <button
              onClick={() => setViewMode(ViewMode.GRID)}
              className={`p-2 rounded-lg transition-all ${viewMode === ViewMode.GRID ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode(ViewMode.LIST)}
              className={`p-2 rounded-lg transition-all ${viewMode === ViewMode.LIST ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        {/* Task Grid/List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-slate-500 font-medium">Loading your tasks...</p>
          </div>
        ) : filteredTasks.length > 0 ? (
          <div
            className={
              viewMode === ViewMode.GRID
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-3"
            }
          >
            {filteredTasks.map((task) => (
              <div
                key={task.name}
                onClick={() => {
                  setSelectedTask(task);
                  setIsModalOpen(true);
                }}
                className={`group bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer relative ${
                  viewMode === ViewMode.LIST
                    ? "flex items-center justify-between"
                    : ""
                }`}
              >
                <div className={viewMode === ViewMode.LIST ? "flex-1" : ""}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {task.name}
                    </span>
                    <button
                      onClick={(e) => handleDeleteTask(task.name, e)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {task.task_name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {task.task_desc}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Active Task
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
              <CheckSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No tasks found</h3>
            <p className="text-slate-500 mt-2">
              Create a new task to get started with FrappeFlow.
            </p>
          </div>
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleCreateOrUpdateTask}
          initialTask={selectedTask}
        />
      </main>
    </div>
  );
};

export default App;
