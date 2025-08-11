import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function TaskItem({ task, onTaskUpdate, onTaskDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);
  const rowRef = useRef(null);
  const [buttonTop, setButtonTop] = useState(0);

  useEffect(() => {
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect();
      setButtonTop(rect.top + window.scrollY);
    }
  }, []);

  const toggleComplete = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/update/${task.taskId}`,
        { completed: !task.completed },
        { withCredentials: true }
      );
      onTaskUpdate(res.data.task);
    } catch (error) {
      console.error("Failed to update task completion", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/task/update/${task.taskId}`,
        { title, description },
        { withCredentials: true }
      );
      onTaskUpdate(res.data.task);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task", error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/task/delete/${task.taskId}`,
        { withCredentials: true }
      );
      onTaskDelete(task.taskId);
    } catch (error) {
      console.error("Failed to delete task", error);
    }
    setLoading(false);
  };

  return (
    <div
      ref={rowRef}
      className={`relative p-3 mb-3 rounded-lg ${
        task.completed ? "bg-green-100" : "bg-white"
      } ${loading ? "opacity-60" : ""}`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            disabled={loading}
            className="w-full p-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            disabled={loading}
            rows={3}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Left checkbox */}
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleComplete}
              disabled={loading}
              className="w-5 h-5 mt-1 cursor-pointer fixed left-4"
            />

            {/* Title + description */}
            <div className="ml-12">
              <h3
                onClick={toggleComplete}
                title="Click to toggle complete"
                className={`cursor-pointer font-semibold ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>
          </div>

          {/* Right fixed buttons */}
          <div
            className="fixed right-4 flex gap-3 bg-white p-1 rounded shadow"
            style={{ top: `${buttonTop}px` }}
          >

          
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
