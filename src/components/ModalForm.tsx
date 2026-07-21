import { useEffect, useState, useRef } from "react";
import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import type { Task } from "../App";

interface ModalFormProps {
  editingTask: Task | null;
  taskId: string;
  addTask: (title: string, description: string, date: string) => void;
  editTask: (id: string, newTitle: string, newDescription: string, newDate: string) => void;
  handleCloseModal: () => void;
  completeTask: (id: string) => void;
}

function ModalForm({
  editingTask,
  taskId,
  completeTask,
  addTask,
  editTask,
  handleCloseModal,
}: ModalFormProps) {
  const [title, setTitle] = useState(() => (editingTask ? editingTask.title : ""));
  const [description, setDescription] = useState(() => (editingTask ? editingTask.description : ""));
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!e.currentTarget.value && titleRef.current) {
        titleRef.current.placeholder = "Please enter a title";
        return;
      }
    }
    descriptionRef.current?.focus();
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDescriptionKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!e.currentTarget.value && descriptionRef.current) {
        descriptionRef.current.placeholder = "Please enter task details";
        return;
      }
      handleSubmit();
    }
  };

  const handleSubmit = (e?: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (editingTask) {
      if (!title.trim() || !description.trim()) return;

      editTask(taskId, title, description, new Date().toISOString());
      handleCloseModal();
      return;
    }

    if (!title.trim() || !description.trim()) return;

    addTask(title, description, new Date().toISOString());
    handleCloseModal();
  };


  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-20 overflow-y-auto flex items-center justify-center p-4" onClick={(e) => {
      if (e.target === e.currentTarget) handleCloseModal()
    }}>
      <div className="flex flex-col w-full max-w-md gap-5 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 my-auto z-10" onClick={(e) => {
        e.stopPropagation();
      }}>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{editingTask ? "Edit Task" : "Add Task"}</h2>
        <label
          htmlFor="title"
          className="uppercase font-semibold text-sm opacity-70 dark:text-gray-100"
        >
          Task Title
        </label>
        <input
          type="text"
          ref={titleRef}
          id="title"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleTitleKeyDown}
          className={`border border-gray-300 rounded-lg p-4 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:outline-none transition-colors duration-300 ${editingTask && editingTask.completed ? "opacity-70 text-gray-700 dark:text-gray-200" : "text-gray-800 dark:text-gray-200"}`}
        />
        <label
          htmlFor="description"
          className="uppercase font-semibold text-sm opacity-70 dark:text-gray-100"
        >
          Task Details
        </label>
        <textarea
          className={`w-full h-32 p-3 border rounded-lg transition-colors duration-200
              resize-none overflow-y-auto
              /* Light Mode Colors */
              bg-white border-gray-300 text-gray-900 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none ${editingTask && editingTask.completed ? "opacity-70 text-gray-700 dark:text-gray-200" : "text-gray-800 dark:text-gray-200"}
              /* Dark Mode Colors */
              dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:ring-indigo-300 dark:focus:outline-none

              /* Base Scrollbar Settings (Hidden by default) */
              scrollbar-width-none
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-transparent
              [&::-webkit-scrollbar-thumb]:rounded-full
              
              /* Hover Interaction - Standard Browsers (Firefox) */
              hover:scrollbar-thin
              hover:scrollbar-thumb-slate-300
              dark:hover:scrollbar-thumb-slate-600
              
              /* Hover Interaction - Webkit Browsers (Chrome, Safari, Edge) */
              hover:[&::-webkit-scrollbar-track]:bg-slate-100
              dark:hover:[&::-webkit-scrollbar-track]:bg-slate-800/50
              
              hover:[&::-webkit-scrollbar-thumb]:bg-slate-300
              dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-600
              
              /* Thumb Hover Effect (When dragging the scrollbar itself) */
              hover:[&::-webkit-scrollbar-thumb]:hover:bg-slate-400
              dark:hover:[&::-webkit-scrollbar-thumb]:hover:bg-slate-500
          `}
          value={description}
          onChange={handleDescriptionChange}
          onKeyDown={handleDescriptionKeyDown}
          ref={descriptionRef}
        ></textarea>

        {editingTask && 
          <div className="flex items-center justify-start gap-3 mt-2">
            <label
              htmlFor="Completed"
              className={`text-sm font-semibold opacity-70 uppercase tracking-wide text-gray-700 dark:text-gray-200 ${editingTask.completed ? "opacity-100" : ""}`}
            >
              Completed
            </label>

            <label htmlFor="Completed" className="relative flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="Completed"
                checked={editingTask.completed}
                onChange={() => completeTask(editingTask.id)}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-green-500 dark:bg-gray-600"/>
              <div className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
        }

        <div className="flex flex-row justify-end gap-5 mt-5">
          <button
            type="button"
            onClick={() => {
              handleCloseModal();
            }}
            className="w-24 text-xs bg-red-500 hover:bg-red-600 text-white dark:text-gray-100 font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="w-24 bg-green-500 text-xs hover:bg-green-600 text-white dark:text-gray-100 font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
