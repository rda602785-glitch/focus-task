import { useState, useEffect } from "react";
import type { Task } from "./types";
import { TaskItem } from "./components/TaskItem";
import { InputTask } from "./components/TaskInput";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.log("error", error);
    }
  }, [tasks]);

  const handleAddTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, isCompleted: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggleTask = (id: number | string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (id: number | string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 py-16 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* یک افکت نور نئونی ملایم و محو در پس‌زمینه برای زیبایی بصری مدرن */}
      <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20"></div>

      {/* کارت اصلی با شیشه تار (Glassmorphism) عمیق و حاشیه نئونی ظریف */}
      <div className="w-full max-w-md p-7 md:p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/50 border border-white/10 relative z-10">
        
        {/* هدر همراه با تایتل شیک و بج شمارنده تسک‌ها */}
        <div className="flex items-center justify-between mb-7 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent tracking-tight">
              FocusTask 🚀
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">مدیریت هوشمند اهداف روزانه</p>
          </div>
          
          {/* بج تعداد تسک‌ها */}
          {tasks.length > 0 && (
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide shadow-inner">
              {tasks.filter(t => t.isCompleted).length} / {tasks.length}
            </span>
          )}
        </div>

        {/* کامپوننت ورودی */}
        <InputTask onAddTask={handleAddTask} />

        {/* لیست تسک‌ها با اسکرول‌بار نرم در صورت زیاد شدن */}
        <div className="mt-6 space-y-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <div className="text-3xl mb-2">✨</div>
              <p className="text-sm font-medium text-slate-400">
                هیچ تسکی نداری! اولین هدف امروزت رو اضافه کن.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );

}
