export default function Home() {
  return (
    <div className="pt-10 w-full"> {/* padding to avoid overlap with fixed navbar */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-blue-950 text-white min-h-[80vh] flex flex-col justify-center items-center text-center px-6 w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to TaskManager
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Manage your tasks efficiently and boost your productivity with our easy-to-use platform.
        </p>
        <a
          href="/register"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Easy Task Management</h2>
          <p className="text-gray-600">
            Organize tasks by priority and keep your workflow smooth.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Track Your Progress</h2>
          <p className="text-gray-600">
            Monitor task completion and stay motivated every day.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Responsive Design</h2>
          <p className="text-gray-600">
            Works perfectly on any device — desktop, tablet, or mobile.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© {new Date().getFullYear()} TaskManager. All rights reserved.</p>
      </footer>
    </div>
  );
}
