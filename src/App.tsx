import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ShowRecentTasks from "./components/ShowRecentTasks";
import themeContext from "./themeContext";
import ModalForm from "./components/ModalForm";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./context/AuthContext";
import ShowAllTasks from "./components/ShowAllTasks";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { useTasks, type Task } from "./hooks/useTasks";
import PageShell from "./components/PageShell";
import EmptyState from "./components/EmptyState";
import { taskContext } from "./hooks/TaskContext";

export type { Task };

function App() {
  const { user } = useAuth();
  const { tasks, addTask, editTask, deleteTask, completeTask } = useTasks(user?.id);

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light",
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showAllTasks, setShowAllTasks] = useState<boolean>(false);

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

  const handleCompleteTask = (id: string) => {
    completeTask(id);
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
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <taskContext.Provider value={{ tasks, addTask, editTask, deleteTask, completeTask }}>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        {showAllTasks ? (
          <PageShell>
            <Header
              onClick={() => setShowAllTasks(false)}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />
            <div className="flex flex-col items-center gap-5 mt-4 px-4 sm:px-6 w-full mx-auto">
              <ShowAllTasks
                searchedTasks={searchedTasks}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                searchTasks={searchTasks}
                setEditingTask={setEditingTask}
                setIsAddTaskModalOpen={setIsModalOpen}
                setShowAllTasks={setShowAllTasks}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
              <Footer />
            </div>
          </PageShell>
        ) : (
          <PageShell>
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
                  setIsModalOpen(true);
                }}
                title="Add Task"
                className="w-32 text-md mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors"
              >
                Add Task
              </button>
            </div>
            {isModalOpen && (
              <ModalForm
                editingTask={editingTask}
                taskId={editingTask?.id || ""}
                handleCloseModal={handleCloseModal}
              />
            )}

            {tasks.length > 0 ? (
              <ShowRecentTasks
                setShowAllTasks={setShowAllTasks}
                searchValue={searchValue}
                setEditingTask={setEditingTask}
                isSearching={isSearching}
                searchedTasks={searchedTasks}
                setIsModalOpen={setIsModalOpen}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
              />
            ) : editingTask ? (
              <ModalForm
                editingTask={editingTask}
                taskId={editingTask.id}
                handleCloseModal={handleCloseModal}
              />
            ) : (
              <EmptyState />
            )}
            <Footer />
          </PageShell>
        )}
      </taskContext.Provider>
    </themeContext.Provider>
  );
}

export default App;
