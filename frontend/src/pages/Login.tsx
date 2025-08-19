import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../lib/api";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      if (data.user.role === "ADMIN") nav("/admin");
      else if (data.user.role === "OWNER") nav("/owner");
      else nav("/stores");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto mt-20 card border border-yellow-200"
    >
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-xl font-bold mb-4 text-yellow-800"
      >
        Log in
      </motion.h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="input border-yellow-300 focus:ring-yellow-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="input border-yellow-300 focus:ring-yellow-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250 }}
          disabled={loading}
          className={`btn w-full ${
            loading
              ? "bg-yellow-400 text-white cursor-not-allowed"
              : "bg-yellow-600 text-white border border-yellow-700 hover:bg-yellow-700"
          }`}
        >
          {loading ? "Logging in..." : "Log in"}
        </motion.button>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm mt-3 text-yellow-800"
      >
        No account?{" "}
        <Link className="underline hover:text-yellow-600" to="/signup">
          Sign up
        </Link>
      </motion.div>
    </motion.div>
  );
}
