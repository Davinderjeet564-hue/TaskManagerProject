import React, { useEffect, useState } from "react";
import type { Task } from "../App";

interface AddTaskModalFormProps {
  editingTask: Task | null;
  EditableTitle: string,
  EditableDescription: string,
  setEditableDescription: (value: string) => void,
  taskId: string,
  addTask: (title: string, description: string, date: string) => void;
  editTask: (id: string, newTitle: string, newDescription: string, newDate: string)=>void,
  handleCloseModal: () => void;
  
}

function AddTaskModalForm({
  editingTask,
  EditableTitle,
  EditableDescription,
  setEditableDescription,
  taskId,
  addTask,
  editTask,
  handleCloseModal,
}: AddTaskModalFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (editingTask) {
      setTitle(EditableTitle);
      setDescription(EditableDescription);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask, EditableTitle, EditableDescription]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm z-20" onClick={(e)=>{
        if(e.target === e.currentTarget) handleCloseModal()
      }}> 
      <div className="flex flex-col gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 z-10 ">
        <label
          htmlFor="title"
          className="uppercase font-semibold text-sm opacity-70 dark:text-gray-100"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-md border border-gray-300 rounded-lg p-4 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:outline-none transition-colors duration-300"
        />
        <label
          htmlFor="description"
          className="uppercase font-semibold text-sm opacity-70 dark:text-gray-100"
        >
          Description
        </label>
        <textarea
          className="w-full h-32 p-3 border rounded-lg transition-colors duration-200
              resize-none overflow-y-auto
              /* Light Mode Colors */
              bg-white border-gray-300 text-gray-900
              /* Dark Mode Colors */
              dark:bg-gray-700 dark:border-gray-700 dark:text-gray-100
              
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
          "
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>

        <div className="flex flex-row justify-end gap-5 mt-5">
          <button
            type="button"
            onClick={() => {
              handleCloseModal();
            }}
            className="w-24 text-sm bg-red-500 hover:bg-red-600 text-white dark:text-gray-100 font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-24 bg-green-500 text-sm hover:bg-green-600 text-white dark:text-gray-100 font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModalForm;
