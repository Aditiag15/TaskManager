import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        // Clear local storage or any state management store
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login page
        navigate("/login");
      }
    };

    doLogout();
  }, [navigate]);

  return <p>Logging you out...</p>;
};

export default Logout;
