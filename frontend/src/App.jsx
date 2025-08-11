import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="pt-16">  {/* padding-top to offset fixed navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createTask" element={<TaskForm />} />
          <Route path="/changeTask" element={<TaskItem />} />
          <Route path="/taskList" element={<TaskList />} />
        </Routes>
      </div>
    </BrowserRouter>




  );
}

export default App;


// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css';
// import Home from './components/Home';
// import Navbar from "./components/Navbar";
// import TaskForm from "./components/TaskForm";
// import TaskItem from "./components/TaskItem";
// import TaskList from "./components/TaskList";
// import Login from './pages/Login';
// import Register from './pages/Register';

// import { AuthProvider } from "./components/AuthContext"; // import AuthProvider

// function App() {
//   return (
//     <AuthProvider> {/* Wrap the entire app */}
//       <BrowserRouter>
//         <Navbar />
//         <div className="pt-16">  {/* padding-top to offset fixed navbar height */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/createTask" element={<TaskForm />} />
//             <Route path="/changeTask" element={<TaskItem />} />
//             <Route path="/taskList" element={<TaskList />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;
