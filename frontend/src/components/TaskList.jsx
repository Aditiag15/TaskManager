import axios from "axios";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Update debouncedSearchTerm after 500ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler); // cleanup if user types again within 500ms
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/task/all", {
          params: { search: debouncedSearchTerm.trim() === "" ? undefined : debouncedSearchTerm },
          withCredentials: true,
        });
        setTasks(res.data.tasks || []);
        setError("");
      } catch (err) {
        setError("Failed to load tasks");
      }
      setLoading(false);
    };

    fetchTasks();
  }, [debouncedSearchTerm]);


 // Update a task in tasks state
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );
  };

  // Remove a task from tasks state
  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
  };


  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <div> <a href="/createTask" className="bg-green-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Add</a></div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {tasks.length === 0 && !loading && <p>No tasks found</p>}
      {tasks.map((task) => (
        <TaskItem
          key={task.taskId}
          task={task}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      ))}


    </div>
  );
}

