import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [taskId, setTaskId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!taskId || !title || !description) {
      setError("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/task/create",
        {
          taskId: Number(taskId),
          title,
          description,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Task added successfully!");
      setTaskId("");
      setTitle("");
      setDescription("");
      navigate("/tasklist", { state: { taskId, title, description } });
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Task
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}

        {/* Task ID */}
        <div className="mb-5">
          <label
            htmlFor="taskId"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Task ID
          </label>
          <input
            type="number"
            id="taskId"
            value={taskId}
            placeholder="Enter task ID"
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            placeholder="Enter task description"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-blue-700 transition-all duration-200 
                     shadow-md hover:shadow-lg"
        >
          Save Task
        </button>
      </form>
    </div>
  );
}
