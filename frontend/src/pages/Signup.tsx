import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/api";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/signup", {
        name,
        email,
        address,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      nav("/stores");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Signup failed");
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
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-xl font-bold mb-4 text-yellow-800"
      >
        Create account
      </motion.h1>

      {/* Form */}
      <form onSubmit={submit} className="space-y-3">
        <input
          className="input border-yellow-300 focus:ring-yellow-500"
          placeholder="Name (20–60 chars)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <input
          className="input border-yellow-300 focus:ring-yellow-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          className="input border-yellow-300 focus:ring-yellow-500"
          placeholder="Address (≤400 chars)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={loading}
        />
        <input
          className="input border-yellow-300 focus:ring-yellow-500"
          type="password"
          placeholder="Password (8–16, 1 uppercase, 1 special)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {/* Error animation */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Submit button */}
        <motion.button
          type="submit"
          whileHover={!loading ? { scale: 1.03 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 250 }}
          disabled={loading}
          className={`btn w-full ${
            loading
              ? "bg-yellow-400 text-white cursor-not-allowed"
              : "bg-yellow-600 text-white border border-yellow-700 hover:bg-yellow-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign up"}
        </motion.button>
      </form>
    </motion.div>
  );
}
