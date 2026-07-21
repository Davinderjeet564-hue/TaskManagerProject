import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ShowRecentTasks from "./components/ShowRecentTasks";
import themeContext from "./themeContext";
import ModalForm from "./components/ModalForm";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./context/AuthContext";
import ShowAllTasks from "./components/ShowAllTasks";
import Footer from "./components/Footer";
import loadStoredTasks from "./loadTasks";
import SearchBar from "./components/SearchBar";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

function App() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks(user?.id));

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light",
  );
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showAllTasks, setShowAllTasks] = useState<boolean>(false);



  // Sync tasks when user changes (login/logout)
  useEffect(() => {
    setTasks(loadStoredTasks(user?.id));
  }, [user?.id]);

  // Persist tasks ONLY for authenticated users
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user?.id]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.transition = "all 0.3s ease";

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = (title: string, description: string, date: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      date,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (
    id: string,
    newTitle: string,
    newDescription: string,
    newdate: string,
  ) => {
    if (!user) return; // Editing restricted for unauthenticated users
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              description: newDescription,
              date: newdate,
            }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
    if (editingTask && editingTask.id === id) {
      setEditingTask((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
    }
  };

  const searchTasks = (value: string) => {
    setSearchedTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
    setEditingTask(null);
  };

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {showAllTasks ? (
        <div className="flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
          <Header
            onClick={() => setShowAllTasks(false)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
          <div className="flex flex-col items-center gap-5 mt-4 px-4 sm:px-6 w-full mx-auto">
            <ShowAllTasks
              tasks={tasks}
              searchedTasks={searchedTasks}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              searchTasks={searchTasks}
              setEditingTask={setEditingTask}
              deleteTask={deleteTask}
              completeTask={completeTask}
              setIsAddTaskModalOpen={setIsAddTaskModalOpen}
              setShowAllTasks={setShowAllTasks}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
          <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />
          <div className="flex flex-row justify-end items-center gap-5 mt-4 ">
            <div className="relative w-full max-w-md mx-auto mt-12 px-4">
              <SearchBar
                inputRef={inputRef}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setIsSearching={setIsSearching}
                searchTasks={searchTasks}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-5 mt-12 mb-8">
            <button
              onClick={() => {
                setIsAddTaskModalOpen(true);
              }}
              title="Add Task"
              className="w-32 text-md mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors"
            >
              Add Task
            </button>
          </div>
          {isAddTaskModalOpen && (
            <ModalForm
              completeTask={completeTask}
              editingTask={editingTask}
              taskId={editingTask?.id || ""}
              addTask={addTask}
              editTask={editTask}
              handleCloseModal={handleCloseModal}
            />
          )}

          {tasks.length > 0 ? (
            <ShowRecentTasks
              setShowAllTasks={setShowAllTasks}
              tasks={tasks}
              searchValue={searchValue}
              setEditingTask={setEditingTask}
              isSearching={isSearching}
              searchedTasks={searchedTasks}
              deleteTask={deleteTask}
              completeTask={completeTask}
              setIsAddTaskModalOpen={setIsAddTaskModalOpen}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />
          ) : editingTask ? (
            <ModalForm
              completeTask={completeTask}
              editingTask={editingTask}
              taskId={editingTask.id}
              addTask={addTask}
              editTask={editTask}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <div className="flex flex-col justify-center items-center mt-8">
              <svg
                className="opacity-50"
                width="96"
                height="96"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38 43H10C8.34315 43 7 41.6569 7 40V8C7 6.34315 8.34315 5 10 5H19.9844C20.5366 5 21.069 5.21071 21.4452 5.61421L28.5548 13.3858C28.9309 13.7893 29.4634 14 30.0156 14H38C39.6569 14 41 15.3431 41 17V40C41 41.6569 39.6569 43 38 43Z"
                  stroke="#9CA3AF"
                  strokeWidth="4"
                />
                <path
                  d="M22 26H26"
                  stroke="#9CA3AF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M18 32H30"
                  stroke="#9CA3AF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-2xl font-semibold opacity-50 dark:text-gray-100">
                No Tasks Found
              </p>
            </div>
          )}
          <Footer />
        </div>
      )}
    </themeContext.Provider>
  );
}

export default App;
