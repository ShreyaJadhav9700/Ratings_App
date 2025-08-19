import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <div className="flex min-h-screen bg-yellow-50 text-yellow-900">
      {/* Sidebar with slide-in animation */}
      <motion.aside
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-60 bg-yellow-500 text-white p-5 flex flex-col shadow-lg"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-6"
        >
          Ratings App
        </motion.h1>

        <nav className="space-y-3">
          {role === "ADMIN" && (
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/admin" className="hover:text-yellow-200">Admin Dashboard</Link>
            </motion.div>
          )}
          {role === "OWNER" && (
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/owner" className="hover:text-yellow-200">Owner Dashboard</Link>
            </motion.div>
          )}
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Link to="/stores" className="hover:text-yellow-200">Stores</Link>
          </motion.div>

          {/* Logout with framer-motion */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={logout}
            className="btn mt-6 bg-yellow-600 text-white border border-yellow-700 px-4 py-2 rounded-lg"
          >
            Logout
          </motion.button>
        </nav>
      </motion.aside>

      {/* Main content with fade-in animation */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}
