import type { Task } from "../types";

interface TaskItemProps {
    task: Task;
    onToggle: (id: number | string) => void;
    onDelete: (id: number | string) => void;
}
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return(
        <div
        className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
          task.isCompleted
            ? "bg-white/[0.02] border-white/5 opacity-60"
            : "bg-white/[0.04] border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.07]"
        }`}
      >
        {/* بخش تسک و چک‌باکس */}
        <label className="flex items-center gap-3 cursor-pointer select-none flex-1">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-indigo-500 focus:ring-indigo-500/40 cursor-pointer accent-indigo-500 transition-all"
          />
          <span
            className={`text-sm transition-all duration-200 ${
              task.isCompleted
                ? "line-through text-slate-500"
                : "text-slate-200 font-medium"
            }`}
          >
            {task.title}
          </span>
        </label>
    
        {/* دکمه حذف با هاور قرمز ملایم */}
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-xs px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors duration-150 cursor-pointer"
        >
          حذف
        </button>
      </div>
    );
  }
  