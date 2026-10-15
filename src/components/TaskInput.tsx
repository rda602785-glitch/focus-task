import React, { useState } from "react";

interface TaskInputProps { 
    onAddTask: (title: string) => void;
}
export function InputTask({onAddTask}: TaskInputProps) {
    const [input, setInput] = useState<string>('');

    const handleInput  = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(input.trim() === '')return;
        onAddTask(input);
        setInput('')
    }
   
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
        <input
          type="text"
          name="input"
          id="input"
          placeholder="عنوان تسک جدید..."
          value={input}
          onChange={handleInput}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-slate-800 transition-all duration-200 placeholder:text-slate-500 shadow-inner"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-indigo-700 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          افزودن 🚀
        </button>
      </form>
    );
}